// admin routers
const multer = require('multer');
const auth = require('../../../middleware/auth');
const userRouter = require('./users/index');
const bannerRouter = require('./banners/index');
const categoryRouter = require('./categories/index');
const playletRouter = require('./playlets/index');
const videoRouter = require('./videos/index');
const productRouter = require('./products/index');
const orderRouter = require('./orders/index');
const assetRouter = require('./assets/index');
const logRouter = require('./logs/index');
const { getFileExt } = require('../../utils/string');

const storage = multer.diskStorage({
  destination: process.env.UPLOAD_PATH,
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = getFileExt(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});
const upload = multer({
  // dest: process.env.UPLOAD_PATH,
  storage,
  fileFilter(req, file, cb) {
    const ext = getFileExt(file.originalname);
    if (['.jpg', '.jpeg', '.webp', '.png', '.gif', '.mp4', '.m3u8'].includes(ext)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

function applyAdminRouter(app) {
  app.get('/api/admin/users/me', auth.authAdmin, userRouter.getUserInfo);
  app.get('/api/admin/user/list', auth.authAdmin, userRouter.getList);
  app.post('/api/admin/user/delete', auth.authAdmin, userRouter.deleteData);
  app.get('/api/admin/banner/list', auth.authAdmin, bannerRouter.getList);
  app.post('/api/admin/banner/update', auth.authAdmin, bannerRouter.updateData);
  app.get('/api/admin/category/list', auth.authAdmin, categoryRouter.getList);
  app.post('/api/admin/category/update', auth.authAdmin, categoryRouter.updateData);
  app.post('/api/admin/category/delete', auth.authAdmin, categoryRouter.deleteData);
  app.get('/api/admin/playlet/list', auth.authAdmin, playletRouter.getList);
  app.post('/api/admin/playlet/update', auth.authAdmin, playletRouter.updateData);
  app.post('/api/admin/playlet/delete', auth.authAdmin, playletRouter.deleteData);
  app.get('/api/admin/video/list', auth.authAdmin, videoRouter.getList);
  app.post('/api/admin/video/update', auth.authAdmin, videoRouter.updateData);
  app.post('/api/admin/video/delete', auth.authAdmin, videoRouter.deleteData);
  app.get('/api/admin/product/list', auth.authAdmin, productRouter.getList);
  app.post('/api/admin/product/update', auth.authAdmin, productRouter.updateData);
  app.post('/api/admin/product/delete', auth.authAdmin, productRouter.deleteData);
  app.get('/api/admin/order/list', auth.authAdmin, orderRouter.getList);
  app.post('/api/admin/asset/upload', auth.authAdmin, upload.single('file'), assetRouter.uploadFile);
  app.get('/api/admin/logs/list', auth.authAdmin, logRouter.getList);
  app.get('/api/admin/logs/ip', auth.authAdmin, logRouter.getIpInfo);
  app.get('/api/admin/logs/visitors/today', auth.authAdmin, logRouter.getVisitors);
}

module.exports = {
  applyAdminRouter,
};
