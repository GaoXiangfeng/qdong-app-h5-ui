<template>
  <div class="idinfo_page">
    <myheader
      @goback="handleGoBack"
      title="Thông tin công việc"
      style="box-shadow: 0 0 0 0;!important"
    />
    <div class="steparea">
      <md-steps class="step" :steps="steps" :current="2"></md-steps>
    </div>
    <div class="item">
      <div class="title">Vui lòng điền số ID</div>
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
    <div class="imgitem">
      <img class="imgIdFront" :src="imgIdCardFrontUrl" />
      <input
        class="inputFile"
        type="file"
        value
        accept="image/*"
        capture="camera"
        @change="handleUploadFile($event,'idFront')"
      />
      <div class="imgdiscri">Chụp ảnh mặt trước CMND</div>
    </div>
    <div class="imgitem">
      <img class="imgIdBack" :src="imgIdCardEndUrl" alt />
      <input
        class="inputFile"
        type="file"
        value
        accept="image/*"
        capture="camera"
        @change="handleUploadFile($event,'idBack')"
      />
      <div class="imgdiscri">Chụp ảnh mặt sau CMND</div>
    </div>
    <div class="imgitem">
      <img class="imgidCardHold" :src="imgHandIdCardUrl" alt />
      <input
        class="inputFile"
        type="file"
        value
        accept="image/*"
        capture="camera"
        @change="handleUploadFile($event,'idCardHold')"
      />
      <div class="imgdiscri">Chụp ảnh đang cầm CMND</div>
    </div>
    <div class="imgitem">
      <img class="imgSalary" :src="imgSalaryUrl" alt />
      <input
        class="inputFile"
        type="file"
        value
        accept="image/*"
        capture="camera"
        @change="handleUploadFile($event,'salary')"
      />
      <div class="imgdiscri">Chụp ảnh bảng lương(Nếu có)</div>
    </div>
    <img class="imgtip" src="../../../../assets/img/loan/passimgtip.png" alt />
    <van-button
      @click="handleCommitIdInfo()"
      class="btnnext"
      type="default"
      v-bind:class="{'btnBottomDisable': btnBottomDisable}"
    >Tiếp</van-button>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import process from "../../../../lib/process";
import inputMiniLabel from "../../../../components/inputMiniLabel";
import deviceType from "../../../../lib/deviceType";
import formatVertify from "../../../../lib/formatVertify";

import { Steps } from "mand-mobile";
import noorderServiceApi from "../../../../services/api/noorder.service";
export default {
  name: "idinfo_page",
  data() {
    return {
      isIos: true,
      active: 2,
      steps: [
        {
          name: "Thông tin cơ bản"
        },
        {
          name: "Thông tin công việc"
        },
        {
          name: "Xác nhận thân phận"
        },
        {
          name: "Thông tin khác"
        }
      ],
      itemSource: [
        {
          key: 1,
          minLabel: "Số Chứng Minh Nhân Dân",
          paramValue: "",
          placeHolder: "Số Chứng Minh Nhân Dân",
          readOnly: false,
          showIcon: false,
          maxLength: 12
        }
      ],
      imgIdCardFrontUrl: require("../../../../assets/img/loan/idCardFront.png"),
      imgIdCardFrontSLUrl: "",
      imgIdCardEndUrl: require("../../../../assets/img/loan/idCardBack.png"),
      imgIdCardEndSLUrl: "",
      imgHandIdCardUrl: require("../../../../assets/img/loan/idCardHold.png"),
      imgHandIdCardSLUrl: "",
      imgSalaryUrl: require("../../../../assets/img/loan/salary.png"),
      imgSalarySLUrl: "",

      //底部按钮是否可用
      btnBottomDisable: true
    };
  },
  components: {
    myheader,
    [Steps.name]: Steps,
    inputMiniLabel
  },
  methods: {
    handleGoBack() {
      this.$router.push({ path: "/workinfo", query: "" });
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    handleCommitIdInfo() {
      if (!formatVertify.vertifyOrderIdFormat(this.orderId)) {
        return;
      }

      if (!formatVertify.vertifyIdFormat(this.itemSource[0].paramValue)) {
        return;
      }
      if(this.btnBottomDisable){
        return
      }

      process.getProcessStatus().then(res => {
        if (res == 0 || res == 1) {
          let param = {};
          param.orderId = this.orderId;
          param.idCardNo = this.itemSource[0].paramValue;
          param.idCardFront = {
            originalUrl: this.imgIdCardFrontUrl,
            thumbnailUrl: this.imgIdCardFrontSLUrl
          };
          param.idCardEnd = {
            originalUrl: this.imgIdCardEndUrl,
            thumbnailUrl: this.imgIdCardEndSLUrl
          };
          param.handIdCard = {
            originalUrl: this.imgHandIdCardUrl,
            thumbnailUrl: this.imgHandIdCardSLUrl
          };
          param.salary = {
            originalUrl: this.imgSalaryUrl,
            thumbnailUrl: this.imgSalarySLUrl
          };

          noorderServiceApi.commitIdInfo(param).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "/bankinfo",
                query: { orderId: this.orderId }
              });
            }
          });
        } else {
          process.goToProcessPage();
        }
      });
    },
    //子控件值变化回调函数
    handleChildChange(val, key) {
      let _index = this.itemSource.findIndex(function(value, index, arr) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSource[_index].paramValue = val;

      this.monitorData();
    },
    //点击控件显示相应底部面板回调
    handleChooseOpInfo(key) {},
    //上传文件
    handleUploadFile(event, type) {
      let formData = new FormData();
      let file = event.target.files[0];
      //判断图片大小
      // if(file.size >= 1024){
      //   this.$toast('图片太大,请重新选择!')
      //   return
      // }
      formData.append("file", file);
      switch (type) {
        case "idFront":
          {
            noorderServiceApi.uploadImg(formData).then(res => {
              if (res.code == 0) {
                this.imgIdCardFrontUrl = res.data.originalUrl;
                this.imgIdCardFrontSLUrl = res.data.thumbnailUrl;

                this.monitorData();
              }
            });
          }
          break;
        case "idBack":
          {
            noorderServiceApi.uploadImg(formData).then(res => {
              if (res.code == 0) {
                this.imgIdCardEndUrl = res.data.originalUrl;
                this.imgIdCardEndSLUrl = res.data.thumbnailUrl;

                this.monitorData();
              }
            });
          }
          break;
        case "idCardHold":
          {
            noorderServiceApi.uploadImg(formData).then(res => {
              if (res.code == 0) {
                this.imgHandIdCardUrl = res.data.originalUrl;
                this.imgHandIdCardSLUrl = res.data.thumbnailUrl;

                this.monitorData();
              }
            });
          }
          break;
        case "salary":
          {
            noorderServiceApi.uploadImg(formData).then(res => {
              if (res.code == 0) {
                this.imgSalaryUrl = res.data.originalUrl;
                this.imgSalarySLUrl = res.data.thumbnailUrl;

                this.monitorData();
              }
            });
          }
          break;
        default:
          break;
      }
      //console.log(formData);
    },
    //监测数据是否填写
    monitorData() {
      let _index = this.itemSource.findIndex(function(value, index, arr) {
        return value.paramValue == "";
      });

      console.log("index " + _index);

      if (
        _index < 0 &&
        this.imgIdCardFrontUrl &&
        !this.imgIdCardFrontUrl.includes("idCardFront") &&
        this.imgIdCardEndUrl &&
        !this.imgIdCardEndUrl.includes("idCardBack") &&
        this.imgHandIdCardUrl &&
        !this.imgHandIdCardUrl.includes("idCardHold") &&
        this.imgSalaryUrl &&
        !this.imgSalaryUrl.includes("salary")
      ) {
        this.btnBottomDisable = false;
      } else {
        this.btnBottomDisable = true;
      }
    },

    getIdInfo() {
      noorderServiceApi.getIdInfo().then(res => {
        if (res.code == 0 && res.data.idCardNo) {
          this.itemSource[0].paramValue = res.data.idCardNo;
          this.imgIdCardFrontUrl =
            res.data.idCardNo &&
            res.data.idCardNo.originalUrl != "" &&
            res.data.idCardFront.originalUrl;
          this.imgIdCardEndUrl =
            res.data.idCardEnd &&
            res.data.idCardEnd.originalUrl != "" &&
            res.data.idCardEnd.originalUrl;
          this.imgHandIdCardUrl =
            res.data.handIdCard &&
            res.data.handIdCard.originalUrl != "" &&
            res.data.handIdCard.originalUrl;
          this.imgSalaryUrl =
            res.data.salary &&
            res.data.salary.originalUrl != "" &&
            res.data.salary.originalUrl;

          this.monitorData();
        }
      });
    }
  },
  mounted() {
    this.isIos = deviceType.isIos();
    this.orderId = this.$route.query.orderId;

    this.getIdInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.idinfo_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .steparea {
    display: flex;
    justify-content: center;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(174, 174, 174, 0.13);

    .step {
      width: 322px;
      margin-top: 10px;
    }
  }
  .item {
    width: 342px;
    .title {
      margin-top: 22px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(69, 69, 69, 1);
      line-height: 14px;
      text-align: left;
    }
  }
  .imgitem {
    position: relative;
    margin-top: 17px;
    .inputFile {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 208px;
      height: 134px;
      opacity: 0;
      filter: alpha(opacity=0);
      border: none !important;
    }

    .imgIdFront {
      display: block;
      width: 208px;
      height: 134px;
      max-width: 100%;
      // background-image: url("../../../../assets/img/loan/idCardFront.png");
      // background-size: 100%;
      border: 0 !important;
    }
    .imgIdBack {
      display: block;
      width: 208px;
      height: 134px;
      max-width: 100%;
      // background-image: url("../../../../assets/img/loan/idCardBack.png");
      // background-size: 100%;
      border-width: 0;
    }
    .imgidCardHold {
      display: block;
      width: 208px;
      height: 134px;
      max-width: 100%;
      // background-image: url("../../../../assets/img/loan/idCardHold.png");
      // background-size: 100%;
      border-width: 0;
    }
    .imgSalary {
      display: block;
      width: 208px;
      height: 134px;
      max-width: 100%;
      // background-image: url("../../../../assets/img/loan/salary.png");
      // background-size: 100%;
      border-width: 0;
    }
    .imgdiscri {
      margin-top: 5px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
      border-width: 0;
    }
  }
  .imgtip {
    display: block;
    width: 335px;
    height: 101px;
    margin-top: 20px;
  }
  .btnnext {
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
</style>

<!--vant组件风格-->
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";

.idinfo_page {
  .step {
    padding: 0 10px 45px 10px;
    .step-wrapper {
      .icon-wrapper {
        .md-icon {
          font-size: 20px;
        }
      }
      .text-wrapper {
        padding-top: 0px;
        .name {
          font-size: 14px;
          width: 72px;
          word-wrap: break-word;
          white-space: normal;
          line-height: 16px;
        }
      }
    }
  }
}
</style>