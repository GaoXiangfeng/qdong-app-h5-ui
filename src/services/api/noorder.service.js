import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost

export default {
    //基础信息--提交
    commitBaseInfo: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/applyOrder`, params)
    },
    //基础信息--获取
    getBaseInfo: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/getOrderInfo`)
    },
    //工作信息--提交
    commitWorkInfo: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/applyCompanyInfo`, params)
    },
    //工作信息--获取
    getWorkInfo: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/getCompanyInfo`)
    },

    //身份信息--上传照片
    uploadImg: (param) => {
        return axios.post(`${ApiBaseUrl}/ex/order/uploadImage`, param)
    },
    //身份信息--提交信息
    commitIdInfo: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/applyImageInfo`, params)
    },
    //身份信息--获取信息
    getIdInfo: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/getImageInfo`)
    },
    //其他信息--获取银行列表信息
    getBankList: () => {
        return axios.get(`${ApiBaseUrl}/app/bankList`)
    },
    //其他信息--提交银行信息
    commitOtherInfo: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/applyOtherInfo`, params)
    },
    //其他信息--获取银行信息
    getBankAndContact: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/getBankAndContact`)
    },
    //获取详细信息
    getOtherInfo: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/getOtherInfo`)
    },
    //提交授权信息
    commitAuthStatus: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/authStatus`, qs.stringify(params))
    },
    //进件最后一步修改订单状态信息
    commitInfoLastStep: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/submitOrder`,qs.stringify(params))
    },
}