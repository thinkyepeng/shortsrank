import { describe, test, expect} from '@jest/globals'
import { getSpiderName } from './util'

describe('getSpiderName', () => {
  test('Googlebot', () => {
    const ua = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.224 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    const result = getSpiderName(ua)
    expect(result).toBe('Googlebot')
  })
  test('Baiduspider', () => {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)'
    const result = getSpiderName(ua)
    expect(result).toBe('Baiduspider')
  })
  test('bingbot', () => {
    const ua = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/100.0.4896.127 Safari/537.36'
    const result = getSpiderName(ua)
    expect(result).toBe('bingbot')
  })
  test('360Spider', () => {
    const ua = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36; 360Spider'
    const result = getSpiderName(ua)
    expect(result).toBe('360Spider')
  })
  test('Sougou', () => {
    const ua = 'Sogou web spider/4.0'
    const result = getSpiderName(ua)
    expect(result).toBe('Sogou')
  })
  test('AhrefsBot', () => {
    const ua = 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)'
    const result = getSpiderName(ua)
    expect(result).toBe('AhrefsBot')
  })
  test('applebot', () => {
    const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)'
    const result = getSpiderName(ua)
    expect(result).toBe('applebot')
  })
  
  test('yandexs', () => {
    const ua = 'Mozilla/5.0 (compatible; YandexRenderResourcesBot/1.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0'
    const result = getSpiderName(ua)
    expect(result).toBe('yandex')
  })
  
})