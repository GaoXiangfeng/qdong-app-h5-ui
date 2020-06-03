<template>
  <div class="mine_main_page">
    <img class="banner" src="../../../assets/img/mine/banner.png" alt />
    <div class="acount">
      <img class="headerimg" src="../../../assets/img/mine/header.png" alt />
      <div class="text">{{acount}}</div>
    </div>
    <div class="operation">
      <div class="agreement item" @click="handleOperaCli(1)">
        <img class="titleicon" src="../../../assets/img/mine/agreement.png" alt />
        <div>
          <van-cell
            class="btncell"
            title-style="text-align:left"
            :center="isCenter"
            title="Thỏa thuận"
            is-link
          />
        </div>
      </div>
      <div class="fadeback item" @click="handleOperaCli(2)">
        <img class="titleicon" src="../../../assets/img/mine/fadeback.png" alt />
        <div>
          <van-cell
            class="btncell"
            title-style="text-align:left"
            :center="isCenter"
            title="Ý kiến phản hồi"
            is-link
          />
        </div>
      </div>
      <div class="aboutus item" @click="handleOperaCli(3)">
        <img class="titleicon" src="../../../assets/img/mine/aboutus.png" alt />
        <div>
          <van-cell
            class="btncell"
            title-style="text-align:left"
            :center="isCenter"
            title="Về chúng tôi"
            is-link
          />
        </div>
      </div>
      <div class="customtel item" @click="handleOperaCli(4)">
        <img class="titleicon" src="../../../assets/img/mine/customtel.png" alt />
        <div>
          <van-cell
            class="btncell"
            title-style="text-align:left"
            :center="isCenter"
            title="Số điện thoại CSKH"
            is-link
          />
        </div>
      </div>
    </div>
    <van-popup
      class="bompanlfeedback"
      v-model="showBottomPanel"
      position="bottom"
      :style="{ height: '100px' }"
    >
      <div  class="content">
        <img class="tel" src="../../../assets/img/mine/custel.png" alt />
        <div class="teltext">{{contactUsMsg}}</div>
      </div>
      <div>Huỷ bỏ</div>
    </van-popup>
  </div>
</template>

<script>
import mineServiceApi from '../../../services/api/mine.service'
import localStorage from "../../../services/localStorage.service";
export default {
  name: "mine_main_page",
  data() {
    return {
      acount: '',
      isCenter: true,
      showBottomPanel: false,
      contactUsMsg: '',
      agreementLink: '',
    };
  },
  methods: {
    handleOperaCli(index) {
      switch (index) {
        case 1:
          {
            //this.$router.push({ path: "/mineseragree" });
            window.location.href = this.agreementLink
          }
          break;
        case 2:
          {
            this.$router.push({ path: "/minefeedback" });
          }
          break;
        case 3:
          {
            this.$router.push({ path: "/aboutus" });
          }
          break;
        case 4:
          {
            this.showBottomPanel = true;
          }
          break;
        default:
          break;
      }
    },
    contactUs(){
      mineServiceApi.contactUs().then(res => {
        if(res.code == 0){
          this.contactUsMsg = res.data
        }
      })
    },
    getAgreement(){
      mineServiceApi.getAgreement().then(res => {
        if(res.code == 0){
          this.agreementLink = res.data
        }
      })
    }
  },
  mounted() {
    this.contactUs()
    this.getAgreement()
    let strAcount = localStorage.get('acount').toString()
    this.acount = '84' + strAcount.slice(0,1) + '****' + strAcount.slice(5)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.mine_main_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .banner {
    display: block;
    width: 100%;
    height: 213px;
  }
  .acount {
    position: relative;
    top: -40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 343px;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(241, 241, 241, 1);
    border-radius: 10px;
    .headerimg {
      display: block;
      width: 59px;
      height: 59px;
      margin-left: 22px;
    }
    .text {
      margin-left: 32px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(136, 136, 136, 1);
      line-height: 20px;
    }
  }
  .operation {
    width: 340px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 62px;
      .titleicon {
        display: block;
        width: 36px;
        height: 36px;
      }
      .btncell {
        width: 294px;
        height: 62px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(230, 230, 230, 1);
        font-size: 18px;
      }
    }
  }
  .bompanlfeedback {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      .tel {
        display: block;
        width: 19px;
        height: 19px;
        margin-right: 8px;
      }
      .teltext {
        height: 22px;
        line-height: 26px;
        color: #4D6FFD;
      }
    }
  }
}
</style>


<!--vant组件风格-->
<style lang="less">
@import "../../../assets/style/var.less";
@import "../../../assets/iconfont/iconfont.css";

.mine_main_page {
}
</style>
