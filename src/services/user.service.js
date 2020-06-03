import localStorage from './localStorage.service.js'
import Cookies from './cookieStorage.service'
import router from '../router'
import config from "../config"

export default {
  saveToken(token) {
    Cookies.set('token', token);
  },
  removeToken() {
    Cookies.remove('token');
  },
  getToken() {
    return Cookies.get('token');
  },
  isLogin() {
    return !!(this.getToken());
  },
  goLogin() {
    const url = config.LoginUrl
    window.location.href = url;
  },
};
