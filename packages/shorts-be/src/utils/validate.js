// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
// http://jsfiddle.net/ghvj4gy9/
// https://rootsh.com/
// 检测是否是临时邮箱的服务 https://verifymail.io/email/test@wenkuu.com
const tempEmailDomains = [
  'iubridge.com',
  'linshiyouxiang.net',
  'duck.com',
  'bccto.cc',
  'lyx13.xyz',
  '139.telemail.tk',
  'wfes.site',
  'deomail.top',
  'trx365.org',
  'h11gggujjj.bond',
  'xdanae.com',
  'fc2023888.com',
  'jkd.tmmad.com',
  'longshan.bond',
  'maladi.top',
  'dijingka.com',
  'mail.wvwvw.tech',
  'adxp.haihantnc.xyz',
  'jkb.tmmad.com',
  'nm.pe',
  'missac.cc',
  'coolxyz.top',
  'oxuzn.icu',
  'wenkuu.com',
  'sharklasers.com',
];
const isEmail = (email) => {
  const str = String(email);
  const domain = str.split('@')[1];
  if (!domain) {
    return false;
  }
  if (tempEmailDomains.includes(domain)) {
    return false;
  }
  return str
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const isPhone = (str) => /^\d+$/.test(str);

const isValidUserName = (str) => str && (isEmail(str) || isPhone(str));

module.exports = {
  isPhone,
  isEmail,
  isValidUserName,
};
