const catModel = require('../../models/category');
const playletModel = require('../../models/playlet');
const bannerModel = require('../../models/banner');
const responseUtils = require('../../utils/response');

async function getBanners() {
  const rows = await bannerModel.getModel().where({ enabled: 1 }).select('id', 'image', 'playlet_id');
  const playletIds = rows.map((x) => x.playlet_id);
  const playlets = await playletModel.getModel().whereIn('id', playletIds).andWhere({ is_delete: 0 }).select('*');
  const playletMap = playlets.reduce((calc, t) => {
    calc[t.id] = t;
    return calc;
  }, {});
  const banners = rows.map((x) => ({
    ...x,
    playlet: playletMap[x.playlet_id] || {},
  }));
  return banners;
}

async function getSections(req, res) {
  const cats = await catModel.getModel().where({is_delete: 0}).orderBy('sort', 'desc').select('*')
  const sections = [];
  for (let i = 0; i < cats.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const playlets = await playletModel.getByCategory(cats[i].id, 6);
    sections.push({ category: cats[i], playlets });
  }
  const banners = await getBanners();
  responseUtils.success(res, { sections, banner: banners[0] });
}

module.exports = {
  getSections,
};
