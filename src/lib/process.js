import router from '../router/index'
import homeServiceApi from "../services/api/home.service";
import Promise from "../services/promise.service";


export default {
    goToProcessPage() {
        // 0 未申请订单
            // 1 申请成功
            // 2 审核中
            // 3 审核拒绝
            // 4 审核通过
            // 5 放款失败
            // 6 放款成功
            // 7 贷款结清
        homeServiceApi.getOrderProcess().then(res => {
            let orderStatus = res.data.status
            
            if (orderStatus == 0 || orderStatus == 1) {
                router.push({ path: "/home/loanmainnoorder", query: "" });
              } else if (orderStatus == 2) {
                router.push({
                  path: "/home/underreviewhasorder",
                  query: ""
                });
              } else if (orderStatus == 3) {
                router.push({ path: "/home/rejecthasorder", query: "" });
              } else if (orderStatus == 4) {
                router.push({ path: "/home/loaning", query: "" });
              } else if (orderStatus == 5) {
                router.push({ path: "/home/failedhasorder", query: "" });
              } else if (orderStatus == 6) {
                router.push({
                  path: "/home/shouldrepayhasorder",
                  query: ""
                });
              } else if (orderStatus == 7) {
                router.push({
                  path: "/home/repaysuccessedhasorder",
                  query: ""
                });
              }
        });
    },
    //获取订单状态（加判断订单状态判断，防止浏览器或者手机回退键）
    getProcessStatus(){
      return new Promise((resolve,reject) => {
        homeServiceApi.getOrderProcess().then(res => {
          resolve(res.data.status)
        })
      })
    }
}