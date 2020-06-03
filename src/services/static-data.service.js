const ua = window.navigator.userAgent.toLowerCase()
// console.log(window.navigator.userAgent)
export default {
	isAndroid: ua.indexOf('android') > -1,
	isIOS: ua.indexOf('iphone') > -1,
};
