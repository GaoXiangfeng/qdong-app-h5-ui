<template>
  <div class="loandetail_page">
    <myheader @goback="handleGoBack" title="Chi tiết khoản vay" />
    <van-cell title="Số tiền vay" :value="'Rp.' + otherInfo.amount" />
    <van-cell title="Thời hạn cho vay" :value="otherInfo.days" />
    <van-collapse v-model="activeNames">
      <van-collapse-item title="Số lượng đến" name="1" :value="otherInfo.realAmount">
        <van-cell
          title="Lãi suất"
          :value="otherInfo.realAmountDetail.find(n => n.key == 'Lãi suất').value"
        />
        <van-cell
          title="Phí xử lý"
          :value="otherInfo.realAmountDetail.find(n => n.key == 'Phí dịch vụ').value"
        />
      </van-collapse-item>
    </van-collapse>
    <van-cell title="Số tiền đến hạn" :value="otherInfo.totalRepayAmount" />
    <!--运营商认证-->
    <div class="stepLabel">
      <stepLabel title="Bổ sung hồ sơ" />
    </div>
    <!--授权-->
    <van-cell
      v-if="needAuth"
      class="unauth"
      title="Xác nhận điều hành"
      @click="handleAuthClick"
      value="chưa xác nhận"
    >
      <img slot="right-icon" class="myicon" src="../../../../assets/img/common/arrowright.png" alt />
    </van-cell>
    <van-cell v-if="!needAuth" class="auth" title="Xác nhận điều hành" value="đã xác nhận">
      <img slot="right-icon" class="myicon" src="../../../../assets/img/common/arrowright.png" alt />
    </van-cell>

    <van-button
      class="btnCommit"
      type="default"
      v-bind:class="{'btnBottomDisable': needAuth}"
      @click="handleCommitAuthInfo"
    >Nộp</van-button>
    <a ref="target" href target="_self"></a>
    <!-- <a ref="target" href="" target="_blank"></a> -->
  </div>
</template>

<script>
import process from "../../../../lib/process";
import myheader from "../../../../components/header";
import stepLabel from "../../../../components/stepLabel";
import noorderServiceApi from "../../../../services/api/noorder.service";
import localStorage from "../../../../services/localStorage.service";
import numOperation from "../../../../lib/numOperation";

export default {
  name: "loandetail_page",
  data() {
    return {
      from: 0,
      activeNames: ["1"],
      orderId: "",
      //bankInfo: {},
      otherInfo: {
        amount: "",
        days: 0,
        realAmount: "",
        realAmountDetail: [
          { key: "Lãi suất", value: "" },
          { key: "Phí dịch vụ", value: "" }
        ],
        totalRepayAmount: "1500000",
        needAuth: true
      },
      needAuth: true
    };
  },
  components: {
    myheader,
    stepLabel
  },
  methods: {
    handleGoBack() {
      this.$router.push({ path: "/bankinfo", query: "" });
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    getOtherInfo() {
      noorderServiceApi.getOtherInfo().then(res => {
        if (res.code == 0) {
          res.data.amount = numOperation.amountFormat(
            parseFloat(res.data.amount)
          );
          res.data.realAmount = numOperation.amountFormat(
            parseFloat(res.data.realAmount)
          );
          let lixi = res.data.realAmountDetail.find(n => n.key == "Lãi suất")
            .value;
          res.data.realAmountDetail.find(
            n => n.key == "Lãi suất"
          ).value = numOperation.amountFormat(parseFloat(lixi));
          let shouxufei = res.data.realAmountDetail.find(
            n => n.key == "Phí dịch vụ"
          ).value;
          res.data.realAmountDetail.find(
            n => n.key == "Phí dịch vụ"
          ).value = numOperation.amountFormat(parseFloat(shouxufei));
          res.data.totalRepayAmount = numOperation.amountFormat(
            parseFloat(res.data.totalRepayAmount)
          );

          this.otherInfo = res.data;
          this.needAuth = this.otherInfo.needAuth;
          //this.getURLAuth()
        }
      });
    },
    //授权按钮
    handleAuthClick() {
      let authURL = "";
      if (
        window.location.href.includes("localhost") ||
        window.location.href.includes("test")
      ) {
        authURL = "http://h5.v1c.cc:4999/mall/creditdong?callBack=https://vietnam-hk.oss-cn-hongkong.aliyuncs.com/app/qdong-h5-certification/test/certification.html"
      } else {
        authURL = "http://h5.v1c.cc:4999/mall/creditdong?callBack=https://vietnam-hk.oss-cn-hongkong.aliyuncs.com/app/qdong-h5-certification/online/certification.html"
      }
      let target = this.$refs.target;
      target.setAttribute(
        "href",
        authURL
      );
      target.click();
    },
    //提交授权信息
    handleCommitAuthInfo() {
      if (this.needAuth) {
        return;
      }
      process.getProcessStatus().then(res => {
        if (res == 0 || res == 1) {
          //提交修改状态信息
          noorderServiceApi.commitInfoLastStep({from: this.from}).then(res => {
            if (res.code == 0) {
              process.goToProcessPage();
            }
          });
        } else {
          process.goToProcessPage();
        }
      });
    },
    getURLAuth() {
      let query = this.$route.query;

      if (query.param) {
        //只有第三方授权时候才进入此条件
        let param = JSON.parse(
          window.decodeURIComponent(window.atob(query.param))
        );
        this.needAuth = !param.flag;
        if (!this.needAuth) {
          //提交授权信息
          noorderServiceApi
            .commitAuthStatus({
              status: 1
            })
            .then(res => {
              this.getOtherInfo();
            });
        }
      }
      {
        this.getOtherInfo();
      }
    }
  },
  mounted() {
    //this.getOtherInfo();
    this.getURLAuth();
    this.from = localStorage.get('from')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.loandetail_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .stepLabel {
    width: 342px;
    height: 49px;
  }
  .btnCommit {
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
  .btnBottomDisable {
    background: rgba(200, 200, 200, 1) !important;
    box-shadow: 0px 4px 10px 0px rgba(226, 226, 226, 1) !important;
    pointer-events: none;
  }
}
</style>
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";
.loandetail_page {
  .van-cell {
    width: 342px;
    padding: 10px 0;
    border-bottom: 1px solid #ebedf0;
    .van-cell__title {
      text-align: left;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(126, 126, 126, 1);
    }
    .van-cell__value {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(21, 21, 21, 1);
    }
  }
  .van-cell:not(:last-child)::after {
    left: 0px;
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

  .auth {
    display: flex;
    align-items: center;
    width: 342px;
    padding: 10px 0;
    // line-height: 63px;
    border-bottom: 0.5px solid rgba(230, 230, 230, 1);
    .van-cell__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 2;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(126, 126, 126, 1);
    }
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
      margin-right: 8px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(34, 78, 247, 1);
      // span{
      //   line-height: 100%;
      // }
    }
    .myicon {
      display: block;
      width: 8px;
      height: 12px;
    }
  }
  .unauth {
    display: flex;
    align-items: center;
    width: 342px;
    padding: 10px 0;
    // line-height: 63px;
    border-bottom: 0.5px solid rgba(230, 230, 230, 1);
    .van-cell__title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 2;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(126, 126, 126, 1);
    }
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
      margin-right: 8px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: red;
      // span{
      //   line-height: 100%;
      // }
    }
    .myicon {
      display: block;
      width: 8px;
      height: 12px;
    }
  }
}
</style>