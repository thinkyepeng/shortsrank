const COS = require('cos-nodejs-sdk-v5');
const path = require('path');
const fs = require('fs');
const responseUtils = require('../../../utils/response');
const assetModel = require('../../models/asset');
const configModel = require('../../../models/config');

async function getCosConfig() {
  const data = await configModel.getModel().whereIn('key', [
    'asset_host_type', // default to local, aliyun/tencent
    'cos_domain_home',
    'cos_secret_id',
    'cos_secret_key',
    'cos_bucket',
    'cos_region'
  ]).select();
  const result = {}
  for(let i = 0; i < data.length; i++) {
    result[data[i].key] = data[i].value;
  }
  return result
}

async function getCosClient(SecretId, SecretKey) {
  return new COS({
    // 必选参数
    SecretId: SecretId || '',
    SecretKey: SecretKey || '',
    // 可选参数
    FileParallelLimit: 3, // 控制文件上传并发数
    ChunkParallelLimit: 8, // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
    ChunkSize: 1024 * 1024 * 8, // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
    Proxy: '',
    Protocol: 'https:',
    Timeout: 10000,
  });
}

async function cosUpload(cos, options, filepath) {
  return new Promise((resolve, reject) => {
    cos.uploadFile(
      options,
      function (err, data) {
        if (err) {
          reject(err)
        } else {
          fs.unlinkSync(filepath);
          resolve(data)
        }
      }
    );
  })
}

async function uploadFile(req, res, next) {
  if (!req.file) {
    return next('file type not supported');
  }
  const data = {
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    originalname: req.file.originalname,
    size: req.file.size,
  };
  await assetModel.create(data);
  let url = `${process.env.STATIC_URI}/${data.filename}`;
  const config = await getCosConfig()
  if (config['asset_host_type'] === 'tencent') {
    const cos = await getCosClient(config.cos_secret_id, config.cos_secret_key)
    const filepath = path.resolve(process.env.UPLOAD_PATH, data.filename)
    const options = {
      Bucket: config.cos_bucket,
      Region: config.cos_region,
      Key: data.filename,
      FilePath: filepath,
      SliceSize: 1024 * 1024 * 5, // 大于5mb才进行分块上传
    }
    try {
      await cosUpload(cos, options, filepath)
      url = `${config['cos_domain_home']}/${data.filename}`
    } catch(err) {
      return next(err)
    }
    
  }
  
  responseUtils.success(res, { url });
}

module.exports = {
  uploadFile,
};
