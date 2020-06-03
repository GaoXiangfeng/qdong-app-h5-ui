import * as types from './type'

// 0 未申请订单
// 1 申请成功
// 2 审核中
// 3 审核拒绝
// 4 审核通过
// 5 放款失败
// 6 放款成功
// 7 贷款结清


const state = {
    orderStatus: -1,//订单状态
    orderData: {},//订单数据
    loading:{
        open: false,
    },
    activeHomePage: 0,//贷款还是我的
}

const actions = {

}

const mutations = {
    [types.OPEN_LOADING](state){
        state.loading.open = true
    },
    [types.CLOSE_LOADING](state){
        state.loading.open = false
    },
    [types.ACTIVE_HOME_PAGE](state,pageIndex){
        state.activeHomePage = pageIndex
    },
    [types.ORDER_STATUS](state,status){
        state.orderStatus = status
    },
    [types.ORDER_DATA](state,data){
        state.orderData = data
    }
}

const getters = {
   
}

export default {
    state,
    actions,
    mutations,
    getters
}


