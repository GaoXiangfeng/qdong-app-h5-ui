<template>
  <div class="passwordoperationpage">
    <div class="regist">
      <span @click="handleToLogin">Đăng nhập</span>
    </div>
    <van-field
      class="phone"
      v-model="form.phoneNo"
      clearable
      label="+84"
      label-width="40px"
      maxlength="9"
      placeholder="Nhập số điện thoại"
      @input="monitorData"
    >
      <img
        slot="left-icon"
        style="display:block;width:32px;height:32px;"
        src="../../assets/img/login/phone.png"
        alt
      />
    </van-field>
    <van-field
      class="vertifyCode"
      @input="monitorData"
      maxlength="4"
      v-model="form.smsCode"
      placeholder="Mời nhập mã xác nhận"
    >
      <img
        slot="left-icon"
        style="display:block;width:32px;height:32px;"
        src="../../assets/img/login/vertifycode.png"
        alt
      />
      <div
        @click="showVertifyCodeDia"
        class="btnsendmessage"
        v-bind:class="{'btnSendMsgDisable': btnSendMsgDisable}"
        slot="button"
      >{{btnSendMsgText}}</div>
    </van-field>
    <van-field
      class="passworld"
      :type="passwordType"
      v-model="form.password"
      left-icon="phone-o"
      placeholder="Nhập mật khẩu"
      maxlength="10"
      @input="monitorData"
    >
      <img
        slot="left-icon"
        style="display:block;width:32px;height:32px;"
        src="../../assets/img/login/password.png"
        alt
      />
      <van-checkbox slot="right-icon" v-model="showPassword">
        <img
          slot="icon"
          v-if="!showPassword"
          style="display:block;width:16px;height:10px;"
          src="../../assets/img/login/display.png"
          alt
        />
        <img
          slot="icon"
          v-if="showPassword"
          style="display:block;width:16px;height:10px;"
          src="../../assets/img/login/hide.png"
          alt
        />
      </van-checkbox>
    </van-field>
    <!--******重复的密码******-->
    <van-field
      class="passworld"
      :type="passwordTypeRep"
      v-model="repeatPwd"
      left-icon="phone-o"
      placeholder="Nhập lại mật khẩu"
      maxlength="10"
    >
      <img
        slot="left-icon"
        style="display:block;width:32px;height:32px;"
        src="../../assets/img/login/password.png"
        alt
      />
      <van-checkbox slot="right-icon" v-model="showPasswordRep">
        <img
          slot="icon"
          v-if="!showPasswordRep"
          style="display:block;width:16px;height:10px;"
          src="../../assets/img/login/display.png"
          alt
        />
        <img
          slot="icon"
          v-if="showPasswordRep"
          style="display:block;width:16px;height:10px;"
          src="../../assets/img/login/hide.png"
          alt
        />
      </van-checkbox>
    </van-field>
    <div class="passwordtip">（Chữ hoặc số từ 6 -10 ký tự）</div>

    <van-button
      @click="handleResetPwd"
      class="btnlogin"
      type="default"
      v-bind:class="{'btnBottomDisable': btnBottomDisable}"
    >Đổi mật khẩu</van-button>
    <van-dialog
      class="diavertifycode"
      v-model="showVertifyDia"
      show-cancel-button
      width="240"
      @confirm="diaConfirm"
    >
      <div slot="title" class="diatitle">Nhập mã xác nhận</div>
      <div slot="default" class="content">
        <van-field
          v-model="imageCode"
          class="contentpic"
          input-align="center"
          placeholder="Mời nhập mã xác nhận"
          maxlength="4"
        />
        <div class="picarea">
          <img class="picareaimg" :src="image" alt />
          <i
            @click="handleRefreshImgcode"
            class="iconfont my-icon-shuaxin picareaicon"
            style="display:block;font-size:22px;color:#999999"
          ></i>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import loginServiceApi from "../../services/api/login.service";
import formatVertify from "../../lib/formatVertify";

export default {
  name: "login",
  data() {
    return {
      showVertifyDia: false, //显示对话框
      showPassword: false, //显示密码
      passwordType: "password", //密码类型
      showPasswordRep: false,//显示重复密码
      passwordTypeRep: "password", //重复的密码类型
      
      form: {
        phoneNo: "", //手机号
        password: "", //密码
        smsCode: "" //验证码
      },
      repeatPwd: '',//重复的密码

      imageCode: "", //图片验证码
      image: "", //图片
      imageId: "", //图片id
      btnSendMsgDisable: false, //发送短信按钮是否可用
      btnSendMsgText: "Nhận mã xác nhận", //发送短信按钮文案

      //提交按钮是否可用
      btnBottomDisable: true
    };
  },
  methods: {
    //to登录
    handleToLogin() {
      this.$router.push({ path: "/login", query: "" });
    },
    //更换验证码
    handleChangeVertifyImg() {},
    //获取验证码并显示对话框
    showVertifyCodeDia() {
      if (!formatVertify.vertifyPhoneFormat(this.form.phoneNo)) {
        return;
      }

      this.getImageCode();
      this.showVertifyDia = true;
    },

    //刷新验证吗
    handleRefreshImgcode() {
      this.getImageCode();
    },
    getImageCode() {
      loginServiceApi.getImageCode().then(res => {
        if (res.code == 0) {
          this.image = "data:image/png;base64," + res.data.image;
          this.imageId = res.data.imageCodeId;
        }
      });
    },
    //图片验证码对话框确认消息,发送获取验证码请求
    diaConfirm() {
      let param = {};
      param.phoneNo = "84" + this.form.phoneNo;
      param.imageCode = this.imageCode;
      param.imageCodeId = this.imageId;
      this.imageCode = ''
      this.imageId = ''

      loginServiceApi.getSmsCode(param).then(res => {
        if (res.code == 0) {
          //限制60秒内不可点击
          this.btnSendMsgStatusChange();

        }
      });
    },

    //发送短信按钮状态控制
    btnSendMsgStatusChange() {
      let sec = 60;
      let timer = setInterval(() => {
        if (sec > 1) {
          this.btnSendMsgDisable = true;
          sec -= 1;
          this.btnSendMsgText = sec + " (s)";
        } else {
          this.btnSendMsgDisable = false;
          this.btnSendMsgText = "Nhận mã xác nhận";
          clearInterval(timer);
        }
      }, 1000);
    },

    //监测数据是否填写
    monitorData() {
      if (
        this.form.phoneNo != "" &&
        this.form.password != "" &&
        this.form.smsCode != ""
      ) {
        this.btnBottomDisable = false;
      } else {
        this.btnBottomDisable = true;
      }
    },
    //重置密码
    handleResetPwd() {
      if(this.repeatPwd != this.form.password){
        this.$toast('两次密码输入不一致');
        return
      }
      if (!formatVertify.vertifyPhoneFormat(this.form.phoneNo)) {
        return;
      }
      if (!formatVertify.vertifyPasswordFormat(this.form.password)) {
        return;
      }
      let param = JSON.parse(JSON.stringify(this.form));
      param.phoneNo = "84" + param.phoneNo;

      loginServiceApi.resetPwd(param).then(res => {
        if (res.code == 0) {
          this.$router.push({ path: "/login" });
        }
      });
    }
  },
  watch: {
    showPassword(val) {
      if (val) {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    showPasswordRep(val) {
      if (val) {
        this.passwordTypeRep = "text";
      } else {
        this.passwordTypeRep = "password";
      }
    },

  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../assets/style/var.less";
.passwordoperationpage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: Pingfang SC;
  .regist {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: @component-width;
    height: @header-height;
    margin-top: 20px;
    font-size: @font-size-base;
    text-align: right;
  }
  .phone {
    width: @component-width;
    height: 48px;
    margin-top: 35px;
    border: 1px solid #999999;
    border-radius: 2px;
  }
  .vertifyCode {
    width: @component-width;
    height: 48px;
    margin-top: 20px;
    border: 1px solid #999999;
    border-radius: 2px;
    .btnsendmessage {
      font-size: @component-font-size;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(77, 110, 253, 1);
    }
  }
  .passworld {
    width: @component-width;
    height: 48px;
    margin-top: 20px;
    border: 1px solid #999999;
    border-radius: 2px;
  }
  .passwordtip {
    width: @component-width;
    margin-top: 15px;
    font-size: @component-font-size;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    text-align: left;
    color: rgba(142, 142, 142, 1);
    line-height: 21px;
  }
  .forgetPassword {
    width: @component-width;
    height: 12px;
    margin-top: 16px;
    text-align: right;
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(77, 108, 253, 1);
    line-height: 12px;
  }
  .agreeCheck {
    width: @component-width;
    margin-top: 23px;
  }
  .btnlogin {
    width: @component-width;
    height: 48px;
    margin-top: 55px;
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
  //发送短信按钮
  .btnSendMsgDisable {
    pointer-events: none !important;
    color: #999999 !important;
  }
  .btnBottomDisable {
    background: rgba(200, 200, 200, 1) !important;
    box-shadow: 0px 4px 10px 0px rgba(226, 226, 226, 1) !important;
  }
}
</style>
<style lang="less">
@import "../../assets/style/var.less";
@import "../../assets/iconfont/iconfont.css";

//密码操作页面
.passwordoperationpage {
  .van-cell {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 6px;
    font-size: @font-size-field;
    line-height: @line-height-field;
    .van-field__left-icon{
      margin-right: 0;
    }
    .van-cell__title{
      height: 26px;
      line-height: 29px;
      padding-right: 3px!important;
    }
    .van-cell__value{
      height: 26px;
      line-height: 29px;
      font-size: 20px!important;
      .van-field__control{
        letter-spacing:.5px;
      }
    }
  }
  .van-dialog {
    .van-dialog__header {
      width: 100%;
      height: 51px;
      padding-top: 0px;
      background: linear-gradient(
        135deg,
        rgba(77, 107, 253, 1) 0%,
        rgba(77, 124, 253, 1) 100%
      );
      .diatitle {
        line-height: 51px;
        font-size: @component-font-size;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    .van-dialog__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 128px;
      .content {
        width: 200px;
        // border-radius: 2px;
        // border: 1px solid rgba(214, 214, 214, 1);
        // text-align: center;
        .contentpic {
          display: flex;
          align-items: center;
          height: 44px;
          border-radius: 2px;
          border: 1px solid rgba(214, 214, 214, 1);
          text-align: center;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(183, 183, 183, 1);
          .van-cell__value {
            height: 44px;
            .van-field__control {
              border-width: 0;
              font-size: 20px;
              line-height: 44px;
            }
          }
        }
        .picarea {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-top: 10px;

          .picareaimg {
            display: block;
            height: 30px;
            width: 100px;
          }
          .picareaicon {
            position: absolute;
            top: 5px;
            right: 10px;
          }
        }
      }
    }
  }
  .van-checkbox {
    .van-checkbox__label {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(77, 124, 253, 1);
      line-height: 14px;
    }
  }
  .passworld {
    .van-checkbox__icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
