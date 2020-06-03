<template>
  <div class="should_repay_page">
    <myheader :showTitle="false" title="Chi tiết thanh toán" />
    <div class="acountinfo">
      <div class="numandday">
        <span class="num">{{amount}}</span>
        <span class="day" v-bind:class="{ 'overdue': isOverdue }">Trước hạn {{remainDays}} ngày</span>
      </div>
      <div class="deadlineday">Ngày thanh toán ：{{deadLine}}</div>
    </div>
    <van-notice-bar
      class="noticebar"
      color="rgba(96,96,96,1)"
      :scrollable="true"
      background="rgba(255,255,255,1)"
      text="通知内容1231231313131313131通知内容123123131313131313"
    >
      <img
        slot="left-icon"
        style="display:block;padding-right:5px;width:18px;height:14px;"
        src="../../../../assets/img/loan/notifybar.png"
        alt
      />
    </van-notice-bar>
    <div class="item">
      <!-- <btnRepay
        :gKey="gKeyBJ"
        :leftIconUrl="leftIconUrlBJ"
        :leftLabel="leftLabelBJ"
        :showRightLabel="showRightLabelBJ"
        :rightLabel="rightLabelBJ"
        @clickcallback="repayCallBack"
      />-->
      <van-collapse v-model="activeNames">
        <van-collapse-item title="Trả nợ thuận tiện" name="1">
          <img
            slot="icon"
            style="display:block;padding-right:5px;width:26px;height:20px;"
            src="../../../../assets/img/loan/convinentRepay.png"
            alt
          />
          <van-cell
            :title="item.bankName"
            value
            @click="handleBankListClick(item)"
            is-link
            v-for="item in convenientBankList"
            :key="item.bankName"
          />
        </van-collapse-item>
      </van-collapse>
      <btnRepay
        class="btnRepay"
        :gKey="gKeyDSF"
        :leftIconUrl="leftIconUrlDSF"
        :leftLabel="leftLabelDSF"
        :showRightLabel="showRightLabelDSF"
        :rightLabel="rightLabelDSF"
        @clickcallback="repayCallBack"
      />
    </div>
  </div>
</template>

<script>
import process from "../../../../lib/process";
import myheader from "../../../../components/header";
import btnRepay from "../../../../components/btnRepay";
import numOperation from "../../../../lib/numOperation";
import homeServiceApi from "../../../../services/api/home.service";

import { Steps } from "mand-mobile";
export default {
  name: "should_repay_page",
  data() {
    return {
      //是否逾期
      isOverdue: false,

      activeNames: ["1"],

      //便捷还款按钮
      gKeyBJ: "1",
      leftIconUrlBJ: require("../../../../assets/img/loan/convinentRepay.png"),
      leftLabelBJ: "Trả nợ thuận tiện",
      showRightLabelBJ: true,
      rightLabelBJ: "Gia công",

      //第三方还款按钮
      gKeyDSF: "2",
      leftIconUrlDSF: require("../../../../assets/img/loan/thirdRepay.png"),
      leftLabelDSF: "Trả nợ của bên thứ ba",
      showRightLabelDSF: true,
      rightLabelDSF: "",

      amount: "", //金额
      deadLine: "", //截止日期
      convenientBankList: [], //便捷还款列表
      remainDays: ""
    };
  },
  components: {
    myheader,
    btnRepay
  },
  methods: {
    repayCallBack(key) {
      process.getProcessStatus().then(res => {
        if (res == 6) {
          switch (key) {
            case "1":
              {
                //便捷还款
                //alert("便捷还款");
              }
              break;
            case "2":
              {
                //第三方还款
                this.$router.push({
                  name: "repaydsfhasorder",
                  params: this.orderData
                });
              }
              break;
            default:
              break;
          }
        } else {
          process.goToProcessPage();
        }
      });
    },
    onChange(event) {
      this.setData({
        activeNames: event.detail
      });
    },
    handleBankListClick(param) {
      this.$router.push({
        name: "bankinfodetail",
        params: {
          bankInfo: param,
          amount: this.amount,
          deadLine: this.deadLine
        }
      });
    },
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        //将结果存在store中
        this.amount = numOperation.amountFormat(
          parseFloat(res.data.repayAmount)
        );
        this.deadLine = res.data.deadline;
        this.isOverdue = res.data.whetherOverdue == 0 ? false : true;
        this.convenientBankList = res.data.convenientBankList;
        this.remainDays = res.data.remainDays;
      });
    }
  },
  mounted() {
    this.getOrderStatus();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.should_repay_page {
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
  .noticebar {
    width: 312px;
    height: 28px;
    margin-top: 10px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(238, 238, 238, 1);
  }
  .item {
    width: 342px;
    margin-bottom: 90px;
  }
  .overdue {
    color: rgba(255, 0, 0, 1) !important;
  }
}
</style>

<!--vant组件风格-->
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";

.should_repay_page {
  .van-collapse-item__title {
    display: flex;
    align-items: center;
    width: 342px;
    height: 63px;
    padding: 10px 0;
    border-bottom: 1px solid #ebedf0;
    .van-cell__title {
      text-align: left;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .van-cell__value {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(21, 21, 21, 1);
    }
  }
  .van-collapse-item__title:not(:last-child)::after {
    left: 0px;
    border-bottom-width: 0px;
  }
  .van-collapse {
    width: 342px;
    padding: 0;
    border-top-width: 0;
    .van-collapse-item__wrapper {
      .van-collapse-item__content {
        padding: 0;
        text-align: right;
        .van-cell {
          width: 322px;
          padding: 10px 0;
          margin-left: 20px;
          font-size: 12px !important;
          .van-cell__title {
            text-align: left;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
          }
        }
      }
    }
    .van-cell:not(:last-child)::after {
      left: 0px;
    }
  }

  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-top-width: 0;
  }
}
</style>