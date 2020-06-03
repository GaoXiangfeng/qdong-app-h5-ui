<template>
  <div class="failed_hasorder_page">
    <div class="maininfo">
      <div class="comment">Số tiền vào tài khoản</div>
      <div class="acountnum">{{amount}}</div>
    </div>
    <div class="orderstatus">
      <div class="stepimg">
        <span>Đăng ký</span>
        <span>Xét duy</span>
        <span>Cho vay</span>
      </div>
      <img class="resultimg" src="../../../../assets/img/loan/failed.png" alt />
      <div class="status">Cho vay thất bại, mời quý khách đăng ký lại</div>
      <div class="reason">{{desc}}</div>
    </div>
    <div class="question" @click="handleToFeedback">Vấn đề của bạn là gì?</div>

    <van-button class="btnApplyagAgain" type="default" @click="handleApplyagAgain">Mời đăng ký lại</van-button>
  </div>
</template>

<script>
import process from "../../../../lib/process";
import numOperation from "../../../../lib/numOperation";
import homeServiceApi from "../../../../services/api/home.service";
import hasorderServiceApi from "../../../../services/api/hasorder.service";

export default {
  name: "failed_hasorder_page",
  data() {
    return {
      amount: "",
      desc: "",
      orderId: ""
    };
  },
  components: {},
  methods: {
    handleToFeedback() {
      this.$router.push({ path: "/minefeedback", query: "" });
    },
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        this.amount = numOperation.amountFormat(parseFloat(res.data.amount));
        this.desc = res.data.desc;
        this.orderId = res.data.orderId;
      });
    },
    handleApplyagAgain() {
      process.getProcessStatus().then(res => {
        if (res == 5) {
          hasorderServiceApi.applyAgain({ orderId: this.orderId }).then(res => {
            if (res.code == 0) {
              process.goToProcessPage();
            }
          });
        } else {
          process.goToProcessPage();
        }
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
.failed_hasorder_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .maininfo {
    width: 100%;
    height: 190px;
    background: linear-gradient(
      135deg,
      rgba(77, 107, 253, 1) 0%,
      rgba(77, 124, 253, 1) 100%
    );
    .comment {
      margin: 54px 0 0 41px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(222, 222, 222, 1);
      line-height: 25px;
      text-align: left;
    }
    .acountnum {
      margin: 10px 0 0 41px;
      font-size: 32px;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 37px;
      text-align: left;
    }
  }
  .orderstatus {
    position: relative;
    top: -40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 343px;
    height: 380px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(197, 197, 197, 0.5);
    border-radius: 10px;
    .stepimg {
      width: 330px;
      height: 24px;
      margin-top: 21px;
      background-image: url("../../../../assets/img/loan/threeprocess.png");
      background-size: 100%;
      span {
        display: inline-block;
        width: 107px;
        height: 24px;
        font-size: 12px;
        font-family: LucidaGrande;
        color: rgba(255, 255, 255, 1);
        line-height: 12px;
      }
    }
    .resultimg {
      display: block;
      width: 168px;
      height: 144px;
      margin-top: 43px;
    }
    .status {
      width: 288px;
      margin-top: 38px;
      font-size: 18px;
      font-family: LucidaGrande-Bold, LucidaGrande;
      font-weight: bold;
      color: rgba(238, 89, 89, 1);
      line-height: 26px;
      word-wrap: break-word;
      white-space: normal;
    }
    .reason {
      margin-top: 22px;
      width: 207px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
      word-wrap: break-word;
      white-space: normal;
    }
  }
  .question {
    position: relative;
    top: -20px;
    width: 343px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(180, 180, 180, 1);
    line-height: 17px;
    text-align: right;
  }
  .btnApplyagAgain {
    width: @component-width;
    height: 48px;
    margin: 100px 0 40px 0;
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
}
</style>
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";
</style>