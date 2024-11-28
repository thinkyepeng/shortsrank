function fail(response, message) {
  response.json({ code: 1, message });
}

function success(response, data) {
  response.json({ code: 0, data });
}

module.exports = {
  fail,
  success,
};
