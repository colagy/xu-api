'use strict';

let ls = localStorage

ls = {
  get(k) {
    let v = ls.getItem(k)
    if (!v) {
      return undefined
    }
    const t = v.split(':-')[0]
    v = v.split(':-')[1]
    switch (t) {
      case 'string':
        return v
        break;
      case 'number':
        return parseFloat(v)
        break;
      case 'object':
        return JSON.parse(v)
        break;
      case 'boolean':
        return v === 'false' ? false : true
        break;
      default:
        return v
        break;
    }
  },
  set(k, v) {
    const t = typeof v
    if (t === 'object') {
      v = JSON.stringify(v)
    }
    ls.setItem(k, t + ':-' + v)
  }
}

class Api {
  constructor(...rest) { // rest=[host='http://',eache=false];
    switch (rest.length) {
      case 1:
        this.host = rest[0]
        break;
      case 2:
        if (typeof rest[0] == 'string' && typeof rest[1] == 'boolean') {
          this.host = rest[0]
          this.eache = rest[1]
        }
        break;
      default:
        break;
    }
  }
  get(url, params, { eache = this.eache }) {
    url = this.host + url
    if (params) {
      const paramsArray = [];
      // 拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    }
    // 检查缓存
    if (eache) {
      const localEache = ls.get('api:' + url)
      if (localEache) {
        return localEache
      }
    }
    // fetch请求
    const myFetch = fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    return new Promise((resolve, reject) => {
      this.timeOut(myFetch)
        .then(response => {
          return response.json()
        })
        .then(res => {
          resolve(res)
          if (eache) {
            ls.set('api:' + url, res)
          }
        })
        .catch(e => {
          reject(e);
        });
    })
  }
  post(url, body, { eache = this.eache }) {
    url = this.host + url
    // Default options are marked with *
    // 检查缓存
    if (eache) {
      const localEache = ls.get('api:' + url)
      if (localEache) {
        return localEache
      }
    }
    const myFetch = fetch(url, {
      body: JSON.stringify(body), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc. 88019005
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer' // *client, no-referrer
    })

    return new Promise((resolve, reject) => {
      this.timeOut(myFetch)
        .then(response => {
          return response.json();
        })
        .then(res => {
          resolve(res)
          if (eache) {
            ls.set('api:' + url, res)
          }
        })
        .catch(e => {
          reject(e);
        });
    })
  }
  put(url, body, { eache = this.eache }) {
    url = this.host + url
    // Default options are marked with *
    // 检查缓存
    if (eache) {
      const localEache = ls.get('api:' + url)
      if (localEache) {
        return localEache
      }
    }
    const myFetch = fetch(url, {
      body: JSON.stringify(body), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT', // *GET, POST, PUT, DELETE, etc. 88019005
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer' // *client, no-referrer
    })

    return new Promise((resolve, reject) => {
      this.timeOut(myFetch)
        .then(response => {
          return response.json();
        })
        .then(res => {
          resolve(res)
          if (eache) {
            ls.set('api:' + url, res)
          }
        })
        .catch(e => {
          reject(e);
        });
    })
  }
  del(url, body, { eache = this.eache }) {
    url = this.host + url
    // Default options are marked with *
    // 检查缓存
    if (eache) {
      const localEache = ls.get('api:' + url)
      if (localEache) {
        return localEache
      }
    }
    const myFetch = fetch(url, {
      body: JSON.stringify(body), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc. 88019005
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer' // *client, no-referrer
    })

    return new Promise((resolve, reject) => {
      this.timeOut(myFetch)
        .then(response => {
          return response.json();
        })
        .then(res => {
          resolve(res)
          if (eache) {
            ls.set('api:' + url, res)
          }
        })
        .catch(e => {
          reject(e);
        });
    })
  }
  timeOut(requestPromise, timeout = 10000) {
    let timeoutAction = null;
    const timerPromise = new Promise((resolve, reject) => {
      timeoutAction = () => {
        reject('请求超时');
      }
    })
    setTimeout(() => {
      timeoutAction()
    }, timeout)
    return Promise.race([requestPromise, timerPromise]);
  }
}

module.exports = Api
