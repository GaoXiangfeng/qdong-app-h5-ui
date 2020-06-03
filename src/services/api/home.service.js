import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost
export default {
    // //获取图片验证码
    getOrderProcess: () => {
        return axios.get(`${ApiBaseUrl}/ex/order/progress`)
    },
}
