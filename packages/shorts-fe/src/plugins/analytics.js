/* eslint-disable */
export function init(win, name) {
  if (typeof win[name] !== 'function') {
    return
  }

  var gif = '/da.gif';
  var base = {
    tid: '',
    cid: getCid(name) || setCid(name, createCid()) || '',
    group: isStorageSupport() ? localStorage.getItem('__group') : ''
  };
  var sessionId = createCid();

  function extend(target, obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        target[key] = obj[key];
      }
    }
  }

  function ga() {
    ga.q.push(arguments);
    publish();
  }
  ga.q = win[name].q || [];
  ga.l = win[name].l;
  win[name] = ga;

  function isObject(obj) {
    return ({}).toString.call(obj) === '[object Object]'
  }

  function isStorageSupport() {
    return 'localStorage' in window
  }

  function getCid(name) {
    var value = getFromCookie(name)
    if (value && isStorageSupport()) {//转移之前的cookie信息
      setStorage(name, value)
      return value
    }
    return isStorageSupport() ? localStorage.getItem(name): getFromCookie(name)
  }

  function getFromCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  function createCid() {
    //https://gist.github.com/gordonbrander/2230317
    return Math.random().toString(36).substr(2, 9)
  }

  function setStorage(name, value) {
    localStorage.setItem(name, value)
  }

  function setCid(name, value) {
    if (isStorageSupport()) {
      setStorage(name, value)
    } else {
      setCookie(name, value, 770)
    }
    return value
  }

  function setCookie(name, value, days) {
    //https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
  }

  function log(hitType, params) {
    var arr = [];
    var z = +new Date();
    if (isObject(params)) {
      extend(params, base);
      params.t = hitType;
      for(var key in params) {
        if (params.hasOwnProperty(key)) {
          arr.push(key + '=' + encodeURIComponent(params[key]))
        }
      }
      arr.push('w='+window.innerWidth)
      arr.push('h='+window.innerHeight)
      arr.push('r='+window.devicePixelRatio)
      arr.push('lng='+getFromCookie('locale'))
      arr.push('z='+z)
    }
    const url = `/api/log?${arr.join('&')}`
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.send()
    // (new Image()).src = gif + '?' + arr.join('&');
  }

  function getUID() {
    return (localStorage.getItem('__uid') || '').replace(/"/g, '')
  }

  function handlePageView(page) {
    if (!page) {
      page = location.href
    }
    return {
      dl: page,
      dh: location.hostname,
      refer: arguments[1] || '',
      uid: getUID(),
      sid: sessionId,
    }
  }

  function handleEvent() {
    const evtObj = {
      ec: arguments[0],
      ea: arguments[1],
      dl: location.href,
      dh: location.hostname,
      uid: getUID(),
      sid: sessionId,
    }
    const fields = ['ec', 'ea', 'el', 'ev']
    let i = 0
    while(i < arguments.length && i < fields.length + 1) {
      // if any argument is an object, stop search and merge it
      if (isObject(arguments[i])) {
        Object.assign(evtObj, arguments[i])
        break
      } else if (i < fields.length) {
        evtObj[fields[i]] = arguments[i]
      }
      i++
    }
    return evtObj
  }

  function parse(hitType, others) {
    var params = {};
    switch (hitType) {
      case 'pageview':
        params = handlePageView.apply(null, others);
        break;
      case 'event':
        params = handleEvent.apply(null, others);
        if (!params.ec || !params.ea) {
          return;
        }
        break;
      default:
        return;
    }
    log(hitType, params);
  }

  function publish() {
    ga.q.filter(function(t){return t[0] === 'create'})
      .map(function(t) {
        base.tid = t[1] || ''
      });
    for (var i = 0; i < ga.q.length; i++) {
      var item = ga.q[i];
      if (item.length < 2) {
        continue;
      }
      var command = item[0],
        hitType = item[1],
        others = [].slice.call(item, 2);
      if (command === 'send') {
        parse(hitType, others)
      }
    }
    ga.q = [];
  }

  publish();
};
