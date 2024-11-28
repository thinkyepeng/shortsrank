function isValidPass(password) {
  return /.{6,20}/.test(password);
}

function isMobile(phone) {
  return /\d{11}/.test(phone);
}

module.exports = {
  isValidPass,
  isMobile,
};
