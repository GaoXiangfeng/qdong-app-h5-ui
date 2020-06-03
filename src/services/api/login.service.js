import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost
export default {
    //登录
    login: (params) => {
        // params.password = window.btoa(params.password)
        return axios.post(`${ApiBaseUrl}/ex/user/login/form`, qs.stringify(params))
    },
    //注册
    regist:(params) => {
        return axios.post(`${ApiBaseUrl}/ex/user/register/pwd`, qs.stringify(params))
    },
    //获取图片验证码
    getImageCode: () => {
        return axios.get(`${ApiBaseUrl}/ex/user/validate/imageCode`)
    },
    //获取短信码
    getSmsCode: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/user/validate/smsCode`, qs.stringify(params))
    },
    //重置密码
    resetPwd:(params) => {
        return axios.post(`${ApiBaseUrl}/ex/user/login/resetPwd`, qs.stringify(params))
    },
}
