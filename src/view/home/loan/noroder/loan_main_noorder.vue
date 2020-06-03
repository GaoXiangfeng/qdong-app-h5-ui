<template>
  <div class="loan_main_noorder_page">
    <img class="backimg" src="../../../../assets/img/loan/backimg.png" alt />
    <div class="acountinfo">
      <div class="condiscri">Số tiền nhận được</div>
      <div class="conacount">{{maxAmount}}</div>
      <div class="condiscri2">
        <div class="child">
          <img src="../../../../assets/img/loan/clock.png" alt />
          <div class="text">Giải ngân nhanh chón</div>
        </div>
        <div class="line"></div>
        <div class="child">
          <img src="../../../../assets/img/loan/calen.png" alt />
          <div class="text">Thanh toán linh hoạt</div>
        </div>
      </div>
    </div>
    <div class="fornull"></div>
    <!-- <van-notice-bar
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
    </van-notice-bar>-->
    <div class="chooseinfo">
      <div class="loannum loaninfo">
        <div class="loaninfochild">
          <img src="../../../../assets/img/loan/money.png" alt />
          <span class="text">Số tiền vay</span>
        </div>
        <van-cell
          tabindex="0"
          @click="handleChooseParam(1)"
          class="loaninfoparam"
          is-link
          arrow-direction="down"
          :value="columnsAcount[selectAcountIndex]"
        >
          <img
            slot="right-icon"
            style="display:block;width:14px;height:8px;"
            src="../../../../assets/img/loan/arrowdown.png"
            alt
          />
        </van-cell>
      </div>
      <div class="loanday loaninfo">
        <div class="loaninfochild">
          <img src="../../../../assets/img/loan/clock2.png" alt />
          <span class="text">Thời hạn vay</span>
        </div>
        <van-cell
          tabindex="0"
          @click="handleChooseParam(2)"
          class="loaninfoparam"
          is-link
          arrow-direction="down"
          :value="columnsDay[selectDayIndex]"
        >
          <img
            slot="right-icon"
            style="display:block;width:14px;height:8px;"
            src="../../../../assets/img/loan/arrowdown.png"
            alt
          />
        </van-cell>
      </div>
    </div>
    <van-button @click="handleLoanNow" class="btnloan" type="default">Đăng ký ngay</van-button>
    <!--贷款金额 底部弹出框-->
    <van-popup
      class="bompanlfeedback"
      v-model="showBtmPalForAcount"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        show-toolbar
        :columns="columnsAcount"
        :default-index="defaultAcountIndex"
        @confirm="onAcountConfirm"
        @cancel="showBtmPalForAcount = false"
      />
    </van-popup>
    <!--天数 底部弹出框-->
    <van-popup
      class="bompanlfeedback"
      v-model="showBtmPalForDay"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        show-toolbar
        :columns="columnsDay"
        :default-index="defaultDayIndex"
        @confirm="onDayConfirm"
        @cancel="showBtmPalForDay = false"
      />
    </van-popup>
  </div>
</template>

<script>
import numOperation from "../../../../lib/numOperation";
import process from "../../../../lib/process";
import homeServiceApi from "../../../../services/api/home.service";
import localStorage from "../../../../services/localStorage.service";

export default {
  name: "loan_main_noorder_page",
  data() {
    return {
      maxAmount: "",
      showBtmPalForAcount: false,
      columnsAcount: [],
      defaultAcountIndex: 0,
      selectAcountIndex: "0",
      selectAcount: "",

      showBtmPalForDay: false,
      columnsDay: [],
      defaultDayIndex: 0,
      selectDayIndex: "0",
      selectDay: 0
    };
  },
  methods: {
    handleChooseParam(index) {
      if (index == 1) {
        this.showBtmPalForAcount = true;
      } else {
        this.showBtmPalForDay = true;
      }
    },
    onAcountConfirm(value, index) {
      this.selectAcount = value;
      this.selectAcountIndex = index;
      this.showBtmPalForAcount = false;
    },
    onDayConfirm(value, index) {
      this.selectDay = value;
      this.selectDayIndex = index;
      this.showBtmPalForDay = false;
    },
    handleLoanNow() {
      process.getProcessStatus().then(res => {
        if (res == 0 ||res == 1) {
          this.$router.push({
            path: "/firststep",
            query: { amount: this.selectAcount, days: this.selectDay }
          });
        } else {
          process.goToProcessPage();
        }
      });
    },
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        this.maxAmount = numOperation.amountFormat(
          parseFloat(res.data.maxAmount)
        );
        this.columnsAcount = res.data.amountType.amounts;
        this.selectAcount = res.data.amountType.select;
        this.selectAcountIndex = res.data.amountType.amounts.findIndex(function(
          value,
          index,
          arr
        ) {
          return value == res.data.amountType.select;
        });

        this.columnsDay = res.data.daysType.days;
        this.selectDay = res.data.daysType.select;
        this.selectDayIndex = res.data.daysType.days.findIndex(function(
          value,
          index,
          arr
        ) {
          return value == res.data.daysType.select;
        });
      });
    }
  },
  mounted() {
    this.getOrderStatus();
  },
  created(){
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.loan_main_noorder_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .backimg {
    max-width: 100%;
  }
  .acountinfo {
    position: absolute;
    top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 342px;
    height: 179px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(241, 241, 241, 1);
    border-radius: 10px;
    .condiscri {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(22, 22, 22, 1);
      line-height: 14px;
    }
    .conacount {
      margin: 14px 0 26px 0;
      font-size: 36px;
      font-family: HelveticaNeue-Medium, HelveticaNeue;
      font-weight: 500;
      color: rgba(55, 107, 255, 1);
      line-height: 40px;
    }
    .condiscri2 {
      display: flex;
      justify-content: center;
      align-items: center;
      .line {
        width: 0px;
        height: 14px;
        margin: 0 10px;
        border: 0.5px solid rgba(96, 96, 96, 1);
      }
      .child {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          display: block;
          width: 17px;
          height: 17px;
          margin-right: 5px;
        }
        .text {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(96, 96, 96, 1);
          line-height: 17px;
        }
      }
    }
  }
  .fornull {
    height: 60px;
  }
  .noticebar {
    width: 312px;
    height: 28px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(238, 238, 238, 1);
  }
  .chooseinfo {
    width: 342px;
    text-align: left;
    .loaninfochild {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-top: 15px;
      img {
        display: block;
        width: 17px;
        height: 17px;
        margin-right: 10px;
      }
      .text {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(68, 68, 68, 1);
        line-height: 20px;
      }
    }
    .loaninfoparam {
      display: flex;
      align-items: center;
      width: 342px;
      height: 54px;
      margin-top: 15px;
      border-radius: 4px;
      border: 1px solid #4d6dfd;
      font-size: 18px;
      font-family: HelveticaNeue;
      color: rgba(77, 112, 253, 1);
      line-height: 18px;
    }
    // .loaninfoparam:focus {
    //   border: 1px solid #4d6dfd;
    //   color: #4d6dfd !important;
    // }
  }
  .btnloan {
    width: @component-width;
    height: 48px;
    margin-top: 54px;
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

<!--vant组件风格-->
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";

.loan_main_noorder_page {
  .chooseinfo {
    .loaninfo {
      .van-cell {
        border: 1px solid #4d6dfd;
        .van-cell__value {
          span {
            //color: #4d6dfd !important;
          }
        }
      }
    }
  }
}
</style>