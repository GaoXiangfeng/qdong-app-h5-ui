<template>
  <div class="repayDSF_hasorder">
    <myheader @goback="handleGoBack" title="Chi tiết thanh toán" />
    <div class="acountinfo">
      <div class="numandday">
        <span class="num">{{amount}}</span>
        <span class="day" v-bind:class="{ 'overdue': isOverdue }">Trước hạn {{remainDays}} ngày</span>
      </div>
      <div class="deadlineday">Ngày thanh toán ：{{deadLine}}</div>
    </div>
    <div class="item">
      <inputMiniLabel
        v-for="(item, key) in itemSource"
        :key="key"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChange"
        @childClick="handleChooseOpInfo"
      />
    </div>
    <van-button
      @click="handleRepay()"
      class="btnrepay"
      type="default"
      v-bind:class="{'btnBottomDisable': btnBottomDisable}"
    >Thanh toán khoản vay</van-button>
    <!--底部弹框 还款方式-->
    <van-popup v-model="showBtmPalForRepayWay" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsRepayWay"
        :default-index="defaultRepayWayIndex"
        @confirm="onRepayWayConfirm"
        @cancel="showBtmPalForRepayWay = false"
      />
    </van-popup>

    <!--底部弹框 银行代码-->
    <van-popup v-model="showBtmPalForBankCode" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsBankCode"
        :default-index="defaultBankCodeIndex"
        @confirm="onBankCodeConfirm"
        @cancel="showBtmPalForBankCode = false"
      />
    </van-popup>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import inputMiniLabel from "../../../../components/inputMiniLabel";

import process from "../../../../lib/process";
import numOperation from "../../../../lib/numOperation";
import homeServiceApi from "../../../../services/api/home.service";
import hasorderServiceApi from "../../../../services/api/hasorder.service";
import formatVertify from "../../../../lib/formatVertify";

import { Steps } from "mand-mobile";
export default {
  name: "repayDSF_hasorder",
  data() {
    return {
      //是否逾期
      isOverdue: false,
      orderId: "",

      //还款方式
      repayMethodList: [],
      showBtmPalForRepayWay: false,
      columnsRepayWay: [],
      defaultRepayWayIndex: 0,
      selectRepayWayIndex: "0",

      //银行代码
      bankList: [],
      showBtmPalForBankCode: false,
      columnsBankCode: [],
      defaultBankCodeIndex: 0,
      selectBankCodeIndex: "0",
      itemSource: [
        {
          key: 1,
          minLabel: "Số tiền thanh toán",//付款金额
          paramValue: "",
          placeHolder: "Số tiền thanh toán",
          readOnly: false,
          showIcon: false
        },
        {
          key: 2,
          minLabel: "Phương thức thanh toán",//付款方式
          paramValue: "",
          placeHolder: "Phương thức thanh toán",
          readOnly: true,
          showIcon: true
        },
        {
          key: 3,
          minLabel: "Tên ngân hàng",//银行名称
          paramValue: "",
          placeHolder: "Tên ngân hàng",
          readOnly: true,
          showIcon: true
        },
        {
          key: 4,
          minLabel: "Họ tên",//全名
          paramValue: "",
          placeHolder: "Họ tên",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 5,
          minLabel: "Số điện thoại",//电话号码
          paramValue: "",
          placeHolder: "Số điện thoại",
          readOnly: false,
          showIcon: false,
          maxLength: 12
        },
        {
          key: 6,
          minLabel: "Email",
          paramValue: "",
          placeHolder: "Email",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        }
      ],

      amount: "", //金额
      deadLine: "", //截止日期
      remainDays: "",

      info: {},

      //底部按钮是否可用
      btnBottomDisable: true
    };
  },
  components: {
    myheader,
    inputMiniLabel
  },
  methods: {
    handleGoBack() {
      process.goToProcessPage();
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    //子控件值变化回调函数********************************
    handleChildChange(val, key) {
      let _index = this.itemSource.findIndex(function(value, index, arr) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSource[_index].paramValue = val;

      this.monitorData();
    },
    //选择控件
    handleChooseOpInfo(key) {
      switch (key) {
        case 2: //还款方式
          {
            this.showBtmPalForRepayWay = true;
          }
          break;
        case 3: //银行代码
          {
            this.showBtmPalForBankCode = true;
          }
          break;
        default:
          break;
      }

      console.log("click " + key);
    },
    //还款方式
    onRepayWayConfirm(value, index) {
      this.itemSource[1].paramValue = value;
      this.selectRepayWayIndex = index;
      this.showBtmPalForRepayWay = false;

      //根据选择的还款方式，设定银行列表
      this.itemSource[2].paramValue = "";
      this.selectBankCodeIndex = 0;
      this.bankList = this.repayMethodList[index].bankList;
      this.columnsBankCode = this.bankList.map(n => n.name);

      console.log(value, index);
      this.monitorData();
    },

    //银行代码
    onBankCodeConfirm(value, index) {
      this.itemSource[2].paramValue = value;
      this.selectBankCodeIndex = index;
      this.showBtmPalForBankCode = false;
      console.log(value, index);

      this.monitorData();
    },

    //还款
    handleRepay() {
      process.getProcessStatus().then(res => {
        if (res == 6) {
          if (!formatVertify.vertifyOrderIdFormat(this.orderId)) {
            return;
          }
          //名字
          if (!formatVertify.vertifyNameFormat(this.itemSource[3].paramValue)) {
            return;
          }

          //手机号
          if (
            !formatVertify.vertifyPhoneRepayFormat(this.itemSource[4].paramValue)
          ) {
            return;
          }

          //邮箱
          if (
            !formatVertify.vertifyEmailFormat(this.itemSource[5].paramValue)
          ) {
            return;
          }

          let param = {};
          param.orderId = this.orderId;
          param.repayMethod = this.itemSource[1].paramValue;
          param.bankCode = this.bankList[this.selectBankCodeIndex].code;
          param.amount = this.itemSource[0].paramValue;
          param.email = this.itemSource[5].paramValue;
          param.name = this.itemSource[3].paramValue;
          param.phoneNo = this.itemSource[4].paramValue;

          hasorderServiceApi.getRepayUrl(param).then(res => {
            if (res.code == 0) {
              window.location.href = res.data;
            }
          });
        } else {
          process.goToProcessPage();
        }
      });
    },
    //监测数据是否填写
    monitorData() {
      let _index = this.itemSource.findIndex(function(value, index, arr) {
        return value.paramValue == "";
      });

      console.log("index " + _index);

      if (_index < 0) {
        this.btnBottomDisable = false;
      } else {
        this.btnBottomDisable = true;
      }
    },
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        this.amount = numOperation.amountFormat(
          parseFloat(res.data.repayAmount)
        );
        this.deadLine = res.data.deadline;
        this.isOverdue = res.data.whetherOverdue == 0 ? false : true;
        this.remainDays = res.data.remainDays;
        this.orderId = res.data.orderId;
        this.repayMethodList = res.data.repayMethod;
        this.columnsRepayWay = res.data.repayMethod.map(n => n.name);

        this.monitorData();
      });
    }
  },
  mounted() {
    //console.log(this.$route.params);
    this.getOrderStatus();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.repayDSF_hasorder {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .acountinfo {
    width: 343px;
    height: 121px;
    margin-top: 11px;
    background: linear-gradient(
      45deg,
      rgba(253, 190, 66, 1) 0%,
      rgba(242, 121, 121, 1) 100%
    );
    border-radius: 10px;
    .numandday {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 20px 0 0 20px;
      .num {
        font-size: 26px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 57px;
      }
      .day {
        position: absolute;
        right: 20px;
        height: 28px;
        padding: 0 14px;
        background: rgba(242, 249, 255, 1);
        border-radius: 15px;
        font-size: 10px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(96, 96, 96, 1);
        line-height: 28px;
      }
    }
    .deadlineday {
      margin: 10px 0 0 20px;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
      text-align: left;
    }
  }
  .item {
    width: 342px;
  }
  .btnrepay {
    width: @component-width;
    height: 48px;
    margin: 20px 0 40px 0;
    background: linear-gradient(
      140deg,
      rgba(77, 107, 253, 1) 0%,
      rgba(77, 124, 253, 1) 100%
    );
    box-shadow: 0px 4px 10px 0px rgba(164, 187, 255, 1);
    border-radius: 24px;
    border-width: 0;

    font-size: @font-size-base;
    font-family: LucidaGrande;
    color: rgba(255, 255, 255, 1);
  }
  .btnBottomDisable {
    background: rgba(200, 200, 200, 1) !important;
    box-shadow: 0px 4px 10px 0px rgba(226, 226, 226, 1) !important;
  }
}
.overdue {
  color: rgba(255, 0, 0, 1) !important;
}
</style>

<!--vant组件风格-->
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";

.repayDSF_hasorder {
}
</style>