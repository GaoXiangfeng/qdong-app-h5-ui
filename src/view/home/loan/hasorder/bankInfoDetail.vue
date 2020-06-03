<template>
  <div class="should_repay_page">
    <myheader @goback="handleGoBack" title="Hướng dẫn thanh toán" />
    <div class="acountinfo">
      <div class="numandday">
        <span class="num">{{amount}}</span>
        <span class="day" v-bind:class="{ 'overdue': isOverdue }">Trước hạn 5 ngày</span>
      </div>
      <div class="deadlineday">Ngày thanh toán ：{{deadLine}}</div>
    </div>
    <!--还款说明-->
    <div class="repaydiscrib">
      <p class="repaydiscribtitle">Hướng dẫn thanh toán:</p>
      <p
        class="step1"
      >Chuyển #1,000,000#VND vào tài khoản của công ty Ngân Lượng theo các thông tin dưới đây</p>
      <table class="table" frame="void">
        <tr>
          <td class="firstcol">Số tài khoản ngân hàng</td>
          <td class="seccol">{{bankInfo.bankAccount}}</td>
        </tr>
        <tr>
          <td class="firstcol">Chủ tài khoản ngân hàng</td>
          <td class="seccol">{{bankInfo.companyName}}</td>
        </tr>
        <tr>
          <td class="firstcol">Ngân hàng</td>
          <td class="seccol">{{bankInfo.bankName}}</td>
        </tr>
        <tr>
          <td class="firstcol">Chi nhánh ngân hàng</td>
          <td class="seccol">{{bankInfo.branchBank}}</td>
        </tr>
        <tr>
          <td class="firstcol">Nội dung chuyển khoản</td>
          <td class="seccol">Creditdong + Số điện thoại</td>
        </tr>
      </table>
      <p class="step2">Chú ý : Nội dung chuyển tiền bắt buộc phải ghi : Creditdong + Số điện thoại.</p>
    </div>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import btnRepay from "../../../../components/btnRepay";
import numOperation from "../../../../lib/numOperation";
import process from '../../../../lib/process'

import { Steps } from "mand-mobile";
export default {
  name: "should_repay_page",
  data() {
    return {
      //是否逾期
      isOverdue: false,

      activeNames: ["1"],

      amount: "", //金额
      deadLine: "", //截止日期
      bankInfo: {
        bankAccount: "",
        bankName: "",
        branchBank: "",
        companyName: ""
      }
    };
  },
  components: {
    myheader,
    btnRepay
  },
  methods: {
    handleGoBack() {
      process.goToProcessPage()
    }
  },

  mounted() {
    this.amount = this.$route.params.amount;
    this.deadLine = this.$route.params.deadLine;
    this.bankInfo = this.$route.params.bankInfo.bankInfo;
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
  .repaydiscrib {
    margin-top: 10px;
    .repaydiscribtitle {
      font-size: 18px;
      font-family: SourceHanSansCN-Medium;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      margin: 0px 20px;
      text-align: left;
    }
    .step1 {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      margin: 5px 20px 0 20px;
      text-align: left;
    }
    .table {
      margin: 10px 18px 10px 18px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .firstcol {
        padding: 4px 12px 4px 12px;
        background: rgba(221, 229, 251, 1);
        border-radius: 2px;
        border: 0.5px solid rgba(255, 255, 255, 1);
        text-align: left;
      }
      .seccol {
        flex: 1;
        padding: 4px 12px 4px 12px;
        background: rgba(241, 244, 255, 1);
        border-radius: 2px;
        border: 0.5px solid rgba(255, 255, 255, 1);
        text-align: left;
      }
    }
    .step2 {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: red;
      line-height: 22px;
      margin: 12px 20px 0 20px;
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
  .overdue {
    color: rgba(255, 0, 0, 1) !important;
  }
}
</style>

<!--vant组件风格-->
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";
</style>