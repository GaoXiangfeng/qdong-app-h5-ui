import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost

export default {
    //获取审核中信息
    getOrderProcess: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/progress`)
    },
    getRepayUrl: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/getRepayUrl`, params)
    },
    //再次申请
    applyAgain: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/order/closeOrder`, qs.stringify(params))
    },
    //获取银行列表信息
    getBankList: () => {
        return axios.get(`${ApiBaseUrl}/app/bankList`)
    },
}
