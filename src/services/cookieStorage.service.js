const cookies = require('js-cookie')
const option = {
  expires: 30
}
const Cookies = {
  get(key) {
    let result = cookies.get(key) || ''
    try {
      return JSON.parse(result)
    } catch (e) {
      return result
    }
  },
  set(key, value) {
    return cookies.set(key, value, option)
  },
  clear() {
    return Object.keys(cookies.get()).forEach(function (cookie) {
      Cookies.remove(cookie, option)
    })
  },
  remove(key) {
    return cookies.remove(key, option)
  }
}

export default Cookies;
