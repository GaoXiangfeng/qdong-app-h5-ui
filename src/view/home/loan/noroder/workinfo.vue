<template>
  <div class="workinfo_page">
    <myheader
      @goback="handleGoBack"
      title="Thông tin công việc"
      style="box-shadow: 0 0 0 0;!important"
    />
    <div class="steparea">
      <md-steps class="step" :steps="steps" :current="1"></md-steps>
    </div>
    <div class="item">
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
    <van-button
      @click="handleCommitWorkInfo()"
      class="btnnext"
      type="default"
      v-bind:class="{'btnBottomDisable': btnBottomDisable}"
    >Tiếp</van-button>

    <!--底部弹框 贷款目的-->
    <van-popup v-model="showBtmPalForLoanpurpose" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsLoanpurpose"
        :default-index="defaultLoanpurposeIndex"
        @confirm="onLoanpurposeConfirm"
        @cancel="showBtmPalForLoanpurpose = false"
      />
    </van-popup>

    <!--底部弹框 职业-->
    <van-popup v-model="showBtmPalForJob" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsJob"
        :default-index="defaultJobIndex"
        @confirm="onJobConfirm"
        @cancel="showBtmPalForJob = false"
      />
    </van-popup>

    <!--底部弹框 月薪-->
    <van-popup v-model="showBtmPalForSalary" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsSalary"
        :default-index="defaultSalaryIndex"
        @confirm="onSalaryConfirm"
        @cancel="showBtmPalForSalary = false"
      />
    </van-popup>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import inputMiniLabel from "../../../../components/inputMiniLabel";
import moment from "moment";
import noorderServiceApi from "../../../../services/api/noorder.service";
import process from "../../../../lib/process";

import { Steps } from "mand-mobile";
import formatVertify from "../../../../lib/formatVertify";
export default {
  name: "workinfo_page",
  data() {
    return {
      orderId: "",
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
          minLabel: "Lý do vay tiền",//贷款目的
          paramValue: "",
          placeHolder: "Lý do vay tiền",
          readOnly: true,
          showIcon: true
        },
        {
          key: 2,
          minLabel: "Nghề nghiệp",//职业
          paramValue: "",
          placeHolder: "Nghề nghiệp",
          readOnly: true,
          showIcon: true
        },
        {
          key: 3,
          minLabel: "Lương tháng",//月薪
          paramValue: "",
          placeHolder: "Lương tháng",
          readOnly: true,
          showIcon: true
        },
        {
          key: 4,
          minLabel: "Ngày phát lương(1~31)",//发薪日
          paramValue: "",
          placeHolder: "Ngày phát lương(1~31)",
          readOnly: false,
          showIcon: false,
          maxLength: 2
        },
        {
          key: 5,
          minLabel: "Tên công ty",//公司名称
          paramValue: "",
          placeHolder: "Tên công ty",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 6,
          minLabel: "Số điện thoại công ty",//公司电话
          paramValue: "",
          placeHolder: "Số điện thoại công ty",
          readOnly: false,
          showIcon: false,
          maxLength: 14
        },
        {
          key: 7,
          minLabel: "Địa chỉ công ty",//公司地址
          paramValue: "",
          placeHolder: "Địa chỉ công ty",
          readOnly: false,
          showIcon: false,
          maxLength: 100
        }
      ],

      //贷款目的
      showBtmPalForLoanpurpose: false,
      columnsLoanpurpose: [
        "Chăm sóc sức khỏe",
        "Trả nợ",
        "Kinh doanh",
        "Sản phẩm kỹ thuật số",
        "Giáo dục đào tạo",
        "Phẫu thuật thẩm mỹ",
        "Du lịch",
        "Mua đồ gia dụng, Sửa nhà",
        "Thuê nhà",
        "Vốn kinh doanh",
        "Kết hôn",
        "Mua xe",
        "Mua nhà"
      ],
      defaultLoanpurposeIndex: 0,
      selectLoanpurposeIndex: "0",

      //职业
      showBtmPalForJob: false,
      columnsJob: [
        "Nuôi trồng",
        "Nhân viên phục vụ",
        "Làm thuê",
        "Doanh nhân",
        "Công nhân",
        "Công chức nhà nước",
        "Học sinh",
        "Cảnh sát",
        "Nghỉ hưu",
        "Bác sĩ",
        "Luật sư",
        "Thất nghiệp",
        "Khác"
      ],
      defaultJobIndex: 0,
      selectJobIndex: "0",

      //月薪
      showBtmPalForSalary: false,
      columnsSalary: [
        "dưới 5 triệu",
        "5 triệu - 10 triệu",
        "10 triệu - 15 triệu",
        "15 triệu - 20 triệu",
        "20 triệu - 25 triệu",
        "25 triệu trở lên"
      ],
      defaultSalaryIndex: 0,
      selectSalaryIndex: "0",

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
      this.$router.push({ path: "/firststep", query: "" });
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    handleCommitWorkInfo() {
      if (!formatVertify.vertifyOrderIdFormat(this.orderId)) {
        return;
      }

      if (!formatVertify.vertifyPayDayFormat(this.itemSource[3].paramValue)) {
        return;
      }
      if (!formatVertify.vertifyCompanyPhoneFormat(this.itemSource[5].paramValue)) {
        return;
      }
      
      if (this.btnBottomDisable) {
        return;
      }

      process.getProcessStatus().then(res => {
        if (res == 0 || res == 1) {
          let param = {};
          param.orderId = this.orderId;
          param.purpose = this.selectLoanpurposeIndex + 1;
          param.occupation = this.selectJobIndex + 1;
          param.income = this.selectSalaryIndex + 1;
          param.payDay = this.itemSource[3].paramValue;
          param.companyName = this.itemSource[4].paramValue;
          param.companyPhone = this.itemSource[5].paramValue;
          param.companyAddress = this.itemSource[6].paramValue;

          noorderServiceApi.commitWorkInfo(param).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "/idinfo",
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
    handleChooseOpInfo(key) {
      switch (key) {
        case 1: //贷款目的
          {
            this.showBtmPalForLoanpurpose = true;
          }
          break;
        case 2: //职业
          {
            this.showBtmPalForJob = true;
          }
          break;
        case 3: //月薪
          {
            this.showBtmPalForSalary = true;
          }
          break;
        default:
          break;
      }

      console.log("click " + key);
    },
    //贷款目的
    onLoanpurposeConfirm(value, index) {
      this.itemSource[0].paramValue = value;
      this.selectLoanpurposeIndex = index;
      this.showBtmPalForLoanpurpose = false;

      this.monitorData();
      console.log(value, index);
    },
    //职业
    onJobConfirm(value, index) {
      this.itemSource[1].paramValue = value;
      this.selectJobIndex = index;
      this.showBtmPalForJob = false;

      this.monitorData();
      console.log(value, index);
    },

    //月薪
    onSalaryConfirm(value, index) {
      this.itemSource[2].paramValue = value;
      this.selectSalaryIndex = index;
      this.showBtmPalForSalary = false;

      this.monitorData();
      console.log(value, index);
    },
    //监测数据是否填写
    monitorData() {
      let _index = this.itemSource.findIndex(function(value, index, arr) {
        return value.paramValue == "";
      });

      console.log("index " + _index);

      if (_index < 0) {
        this.btnBottomDisable = false;
      } else {
        this.btnBottomDisable = true;
      }
    },
    //获取工作信息
    getWorkInfo() {
      noorderServiceApi.getWorkInfo().then(res => {
        if (res.code == 0) {
          //贷款目的
          this.defaultLoanpurposeIndex = res.data.purpose - 1;
          this.selectLoanpurposeIndex = res.data.purpose - 1;
          this.itemSource[0].paramValue = this.columnsLoanpurpose[
            res.data.purpose - 1
          ];

          //职业
          this.defaultJobIndex = res.data.occupation- 1;
          this.selectJobIndex = res.data.occupation- 1;
          this.itemSource[1].paramValue = this.columnsJob[res.data.occupation - 1];

          //薪资
          this.defaultSalaryIndex = res.data.income - 1;
          this.selectSalaryIndex = res.data.income - 1;
          this.itemSource[2].paramValue = this.columnsSalary[res.data.income - 1];

          //发薪日
          this.itemSource[3].paramValue = res.data.payDay.toString();

          //公司名称
          this.itemSource[4].paramValue = res.data.companyName;

          //公司电话
          this.itemSource[5].paramValue = res.data.companyPhone;

          //公司地址
          this.itemSource[6].paramValue = res.data.companyAddress;

          this.monitorData();
        }
      });
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId;

    this.getWorkInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.workinfo_page {
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

.workinfo_page {
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
  .van-popup--bottom {
    .van-picker {
      .van-picker__toolbar {
        .van-picker__cancel {
          font-size: 15px;
        }
        .van-picker__confirm {
          font-size: 15px;
        }
      }
      .van-picker__columns {
        .van-picker-column {
          overflow-x: auto;
          overflow-y: hidden;
          font-family: Pingfang SC;
          .van-ellipsis {
            overflow: auto;
            text-overflow: unset;
          }
        }
      }
    }
  }
}
</style>