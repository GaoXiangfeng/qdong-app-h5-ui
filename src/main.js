// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import axios from './services/http.service'
import store from './store'
//import VConsole from 'vconsole'
import './assets/iconfont/iconfont.css'
import Vant from 'vant'
import { Locale } from 'vant';
import 'vant/lib/index.css'



Vue.use(Vant)
//按需加载
// import { Button } from 'vant';

// Vue.use(Button);




//vant国际化
const messages = {
  'zh-CN': {
    confirm: 'Xác nhận',
  	cancel: 'Hủy bỏ',
  }
};

Locale.add(messages);



Vue.config.productionTip = false


//将axios挂在到prototype上，在组件中可以直接使用this.axios访问
//Vue.prototype.axios = axios
fastclick.attach(document.body)
fastclick.prototype.needsFocus = function (target) {
	switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'div':
			if (target.contentEditable) {
				return true
			}
		case 'input':
			switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
			}
			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
	}
};

//重新定义console.log 可以直接在手机屏幕上显示
//const vConsole = new VConsole();


new Vue({
  el: '#app',
  router,
  axios,
  store,
  render: h => h(App)
})
