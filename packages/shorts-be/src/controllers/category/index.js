const catModel = require('../../models/category');
const playletModel = require('../../models/playlet');
const responseUtils = require('../../utils/response');
const paramUtils = require('../../utils/param');

async function getPageData(req, res) {
  const category_id = paramUtils.getString(req.query, 'category_id', '');
  const cats = await catModel.getModel().where({ is_delete: 0 }).orderBy('sort', 'desc').select('*')
  let catId = category_id ? Number(category_id) : '';
  catId = catId || (cats.length > 0 ? cats[0].id : '');
  const playlets = catId ? await playletModel.getByCategory(catId, 96) : [];
  responseUtils.success(res, { cats, playlets, catId });
}

module.exports = {
  getPageData,
};
