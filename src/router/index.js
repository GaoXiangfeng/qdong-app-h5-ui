import Vue from 'vue'
import Router from 'vue-router'
import config from '../config'
import localStorage from '../services/localStorage.service'
import userService from '../services/user.service.js'
import getURLParamLib from "../lib/getURLParam";

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../view/home/home.vue')), 'home')

//登录
const login = r => require.ensure([], () => r(require('../view/login/login.vue')), 'login')

//注册
const regist = r => require.ensure([], () => r(require('../view/login/regist.vue')), 'regist')

//密码
const password = r => require.ensure([], () => r(require('../view/login/passwordOperation.vue')), 'password')

//贷款(无订单)--主页,基础信息,工作信息,身份证信息,银行信息
const loan_main_noorder = r => require.ensure([], () => r(require('../view/home/loan/noroder/loan_main_noorder.vue')), 'loan_main_noorder')
const baseinfo = r => require.ensure([], () => r(require('../view/home/loan/noroder/baseinfo.vue')), 'baseinfo')
const firststep = r => require.ensure([], () => r(require('../view/home/loan/noroder/firststep.vue')), 'firststep')
const workinfo = r => require.ensure([], () => r(require('../view/home/loan/noroder/workinfo.vue')), 'workinfo')
const idinfo = r => require.ensure([], () => r(require('../view/home/loan/noroder/idinfo.vue')), 'idinfo')
const bankinfo = r => require.ensure([], () => r(require('../view/home/loan/noroder/bankinfo.vue')), 'bankinfo')
const loandetail = r => require.ensure([], () => r(require('../view/home/loan/noroder/loandetail.vue')), 'loandetail')

//贷款有订单--审核中,拒绝,失败,应还款,第三方还款
const under_review_hasorder = r => require.ensure([], () => r(require('../view/home/loan/hasorder/under_review_hasorder.vue')), 'under_review_hasorder')
const loaning = r => require.ensure([], () => r(require('../view/home/loan/hasorder/loaning_hasorder.vue')), 'loaning_hasorder')
const reject_hasorder = r => require.ensure([], () => r(require('../view/home/loan/hasorder/reject_hasorder.vue')), 'reject_hasorder')
const failed_hasorder = r => require.ensure([], () => r(require('../view/home/loan/hasorder/failed_hasorder.vue')), 'failed_hasorder')
const should_repay_hasorder = r => require.ensure([], () => r(require('../view/home/loan/hasorder/should_repay_hasorder.vue')), 'should_repay_hasorder')
const repayDSF_hasorder = r => require.ensure([], () => r(require('../view/home/loan/hasorder/repayDSF_hasorder.vue')), 'repayDSF_hasorder')
const repayOperaSuccessed_hasorder = r => require.ensure([], () => r(require('../view/home/loan/hasorder/repayOperaSuccessed_hasorder.vue')), 'repayOperaSuccessed_hasorder')
const repaySuccessed_hasorder = r => require.ensure([], () => r(require('../view/home/loan/hasorder/repaySuccessed_hasorder.vue')), 'repaySuccessed_hasorder')
const bankinfodetail = r => require.ensure([], () => r(require('../view/home/loan/hasorder/bankInfoDetail.vue')), 'bankInfoDetail')

//我的--主页、反馈,服务协议,关于我们
const mine_main = r => require.ensure([], () => r(require('../view/home/mine/mine_main.vue')), 'mine_main')
const mine_feedback = r => require.ensure([], () => r(require('../view/home/mine/feedback.vue')), 'feedback')
const mine_mineseragree = r => require.ensure([], () => r(require('../view/home/mine/serAgreement.vue')), 'seragreement')
const mine_aboutus = r => require.ensure([], () => r(require('../view/home/mine/aboutus.vue')), 'aboutus')

const routes = [
  {
    path: '/',
    redirect: '/home/loanmainnoorder',
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/regist',
    name: 'regist',
    component: regist,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/password',
    name: 'password',
    component: password,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: 'loanmainnoorder',//贷款主页(无订单))
        meta: {
          requireAuth: true,
        },
        component: loan_main_noorder,
      },
      {
        path: 'underreviewhasorder',//审核中(有订单))
        meta: {
          requireAuth: true,
        },
        component: under_review_hasorder,
      }, {
        path: 'loaning',//放款中(有订单))
        meta: {
          requireAuth: true,
        },
        component: loaning,
      },{
        path: 'rejecthasorder',//审核拒绝(有订单))
        meta: {
          requireAuth: true,
        },
        component: reject_hasorder,
      }, {
        path: 'failedhasorder',//放款失败(有订单))
        meta: {
          requireAuth: true,
        },
        component: failed_hasorder,
      },
      {
        path: 'shouldrepayhasorder',//应还款(有订单))
        meta: {
          requireAuth: true,
        },
        component: should_repay_hasorder,
      },
      {
        path: 'repaydsfhasorder',//第三方还款(有订单))
        name: 'repaydsfhasorder',
        meta: {
          requireAuth: true,
        },
        component: repayDSF_hasorder,
      },
      {
        path: 'repaysuccessedhasorder',//贷款结清(有订单))
        meta: {
          requireAuth: true,
        },
        component: repaySuccessed_hasorder,
      },
      {
        path: 'minemain',//我的--主页
        meta: {
          requireAuth: true,
        },
        component: mine_main,
      },
    ]
  },
  {
    path: '/bankinfodetail',//银行详细信息
    name: 'bankinfodetail',
    component: bankinfodetail,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/baseinfo',//贷款--基本信息
    name: 'baseinfo',
    component: baseinfo,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/firststep',//贷款--基本信息
    name: 'firststep',
    component: firststep,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/workinfo',//贷款--工作信息
    name: 'workinfo',
    component: workinfo,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/idinfo',//贷款--id信息
    name: 'idinfo',
    component: idinfo,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/bankinfo',//贷款--银行信息
    name: 'bankinfo',
    component: bankinfo,
    meta: {
      requireAuth: true,
    },
  }, {
    path: '/loandetail',//贷款--详细信息
    name: 'loandetail',
    component: loandetail,
    meta: {
      requireAuth: true,
    },
  }, 
  {
    path: '/repayoperasuccessedhasorder',//贷款--还款操作成功
    name: 'repayOperaSuccessed_hasorder',
    component: repayOperaSuccessed_hasorder,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/minefeedback',//我的--反馈
    name: 'minefeedback',
    component: mine_feedback,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/mineseragree',//我的--服务协议
    name: 'mineseragree',
    component: mine_mineseragree,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/aboutus',//我的--关于我们
    name: 'aboutus',
    component: mine_aboutus,
    meta: {
      requireAuth: true,
    },
  },
]
const router = new Router({
  mode: 'history',
  routes,
})

const opRedirectUrl = config.LoginUrl
router.beforeEach(async (to, from, next) => {
  //查询from
  let _fromChannel = getURLParamLib.getUrlParamFn('from') 
  if(_fromChannel){
    localStorage.set('from',_fromChannel)
  }
  

  //判断是否登录
  let requireAuth = to.matched.some(route => route.meta.requireAuth)
  if (requireAuth) {
    if (userService.isLogin()) {//登录了
      return next()
    } else {//未登录
      window.location.href = opRedirectUrl
      return
    }
  }

  next()
})

export default router
