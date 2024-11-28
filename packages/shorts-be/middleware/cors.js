function setCors(req, res, next) {
  res.append('Cache-Control', 'no-store');
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
}

module.exports = {
  setCors,
};
