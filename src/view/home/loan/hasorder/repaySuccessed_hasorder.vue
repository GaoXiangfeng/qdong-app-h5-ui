<template>
  <div class="repaySuccessed_hasorder_page">
    <myheader @goback="handleGoBack" title="Thanh toán khoản vay" />
    <img class="resultimg" src="../../../../assets/img/loan/repaySuccessed.png" alt />
    <div class="discribe">Chúc mừng, quý khách Chúc mừng, quý khách</div>
    <van-button class="btnApplyagain" @click="handleApplyAgain" type="default">Mời đăng ký lại</van-button>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import homeServiceApi from "../../../../services/api/home.service";
import hasorderServiceApi from "../../../../services/api/hasorder.service";
import process from "../../../../lib/process";

export default {
  name: "repaySuccessed_hasorder_page",
  data() {
    return {
      orderId: ""
    };
  },
  components: {
    myheader
  },
  methods: {
    handleGoBack() {
      process.goToProcessPage();
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    handleApplyAgain() {
      process.getProcessStatus().then(res => {
        if (res == 7) {
          hasorderServiceApi.applyAgain({ orderId: this.orderId }).then(res => {
            if (res.code == 0) {
              process.goToProcessPage();
            }
          });
        } else {
          process.goToProcessPage();
        }
      });
    },
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        this.orderId = res.data.orderId;
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
.repaySuccessed_hasorder_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  .resultimg {
    display: block;
    width: 160px;
    height: 163px;
    margin-top: 98px;
  }
  .discribe {
    width: 283px;
    margin-top: 15px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(252, 179, 35, 1);
    line-height: 34px;
    word-wrap: break-word;
    white-space: normal;
  }
  .btnApplyagain {
    width: 343px;
    height: 48px;
    margin-top: 23px;
    background: linear-gradient(
      135deg,
      rgba(77, 107, 253, 1) 0%,
      rgba(77, 124, 253, 1) 100%
    );
    box-shadow: 0px 4px 10px 0px rgba(164, 187, 255, 1);
    border-radius: 24px;
    border-width: 0;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 25px;
  }
}
</style>
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";
</style>