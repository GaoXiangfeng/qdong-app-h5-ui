import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost

export default {
    // 提交反馈
    feedBack: (params) => {
        return axios.post(`${ApiBaseUrl}/app/feedback`, qs.stringify(params))
    },
    //联系我们
    contactUs: () => {
        return axios.get(`${ApiBaseUrl}/app/contact`)
    },
    //服务协议
    getAgreement: () => {
        return axios.get(`${ApiBaseUrl}/app/platformProtocol`)
    },
}
