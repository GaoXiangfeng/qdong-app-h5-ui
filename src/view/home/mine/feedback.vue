<template>
  <div class="feedback_page">
    <myheader @goback="handleGoBack" title="Ý kiến phản hồi" />
    <div class="mylabel">Để lại ý kiến</div>
    <van-cell-group class="feedbackarea">
      <van-field
        class="feedbackmsg"
        v-model="feedbackMsg"
        rows="2"
        :autosize="{ maxHeight: 200}"
        type="textarea"
        maxlength="1000"
        placeholder="Trình bày cụ thể vấn đề hoặc ý kiến của quý khách"
      />
      <div class="limit">{{feedbackMsg.length}}/1000</div>
    </van-cell-group>

    <van-button :disabled="feedbackMsg.length == 0" class="btnCommit" type="default" @click="handleCommit">Nộp</van-button>
    <div class="custel" @click="handleShowBottomPanel">
      <img class="tel" src="../../../assets/img/mine/custel.png" alt />
      <div class="content">Số điện thoại CSKH</div>
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
import myheader from "../../../components/header";
import mineServiceApi from '../../../services/api/mine.service'

export default {
  name: "feedback_page",
  data() {
    return {
      showBottomPanel: false,
      feedbackMsg: "",
      contactUsMsg: '',
    };
  },
  components: {
    myheader
  },
  methods: {
    handleGoBack() {
      this.$router.push({ path: "/home/minemain", query: "" });
      this.$store.commit('ACTIVE_HOME_PAGE', 1)
    },
    handleShowBottomPanel() {
      this.showBottomPanel = true;
    },
    contactUs(){
      mineServiceApi.contactUs().then(res => {
        if(res.code == 0){
          this.contactUsMsg = res.data
        }
      })
    },
    handleCommit(){
      mineServiceApi.feedBack({content: this.feedbackMsg}).then(res => {
        if(res.code == 0){
          this.feedbackMsg = ''
          this.$router.push({ path: "/home/minemain", query: "" });
        }
      })
    }
  },
  mounted() {
    this.contactUs()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.feedback_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  .mylabel {
    width: 315px;
    height: 50px;
    text-align: left;
    line-height: 50px;
    font-size: 14px;
    font-family: LucidaGrande;
    color: rgba(77, 119, 253, 1);
    border-bottom: 1px solid rgba(213, 213, 213, 1);
  }
  .feedbackarea {
    width: 315px;
    margin-top: 12px;
    border-bottom: 1px solid rgba(213, 213, 213, 1);
    .feedbackmsg {
      padding: 0;
    }
    .limit {
      margin-top: 5px;
      margin-bottom: 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(77, 119, 253, 1);
      text-align: right;
      line-height: 14px;
    }
  }
  .btnCommit {
    width: 343px;
    height: 48px;
    margin-top: 40px;
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
  .custel {
    position: absolute;
    bottom: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    .tel {
      display: block;
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
    .content {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(77, 111, 253, 1);
      line-height: 12px;
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
<style lang="less">
@import "../../../assets/style/var.less";
@import "../../../assets/iconfont/iconfont.css";
.feedback_page {
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0 0;
  }
  .van-cell:not(:last-child)::after {
    border: 0 solid #ffffff;
  }
}
</style>