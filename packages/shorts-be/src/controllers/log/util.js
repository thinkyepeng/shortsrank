function getSpiderName(ua) {
  if (/Googlebot/i.test(ua)) {
    return 'Googlebot'
  } else if (/Baiduspider/i.test(ua)) {
    return 'Baiduspider'
  } else if (/bingbot/i.test(ua)){
    return 'bingbot'
  } else if (/360Spider/i.test(ua)) {
    return '360Spider'
  } else if (/Sogou [\sa-z]*spider/i.test(ua)) {
    return 'Sogou'
  } else if (/AhrefsBot/i.test(ua)) {
    return 'AhrefsBot'
  } else if (/applebot/i.test(ua)) {
    return 'applebot'
  } else if (/YandexRenderResourcesBot/i.test(ua)) {
    return 'yandex'
  } else {
    return ''
  }
}

module.exports = {
  getSpiderName
}