<template>
  <div class="bankinfo_page">
    <myheader
      @goback="handleGoBack"
      title="Thông tin công việc"
      style="box-shadow: 0 0 0 0;!important"
    />
    <div class="steparea">
      <md-steps class="step" :steps="steps" :current="3"></md-steps>
    </div>
    <div class="item">
      <inputMiniLabel
        v-for="(item, key) in itemSourceBank"
        :key="key"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChangeBank"
        @childClick="handleChooseOpInfoBank"
      />
    </div>
    <div class="item">
      <div class="title">Người liên hệ chính</div>
      <inputMiniLabel
        v-for="(item, key) in itemSourceMainContact"
        :key="key"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChangeMainContact"
        @childClick="handleChooseOpInfoMainContact"
      />
    </div>

    <div class="item">
      <div class="title">Người liên hệ khác</div>
      <inputMiniLabel
        v-for="(item, key) in itemSourceSecContact"
        :key="key"
        :gKey="item.key"
        :minLabel="item.minLabel"
        :paramValue="item.paramValue"
        :placeHolder="item.placeHolder"
        :readOnly="item.readOnly"
        :showIcon="item.showIcon"
        :gMaxLength="item.maxLength"
        @childInputEvent="handleChildChangeSecContact"
        @childClick="handleChooseOpInfoSecContact"
      />
    </div>
    <van-button
      @click="handleCommitBankInfo()"
      class="btnnext"
      type="default"
      v-bind:class="{'btnBottomDisable': btnBottomDisable}"
    >Tiếp</van-button>

    <!--底部弹框 银行名称-->
    <van-popup v-model="showBtmPalForBankName" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsBankName"
        :default-index="defaultBankNameIndex"
        @confirm="onBankNameConfirm"
        @cancel="showBtmPalForBankName = false"
      />
    </van-popup>

    <!--底部弹框 主要联系人-->
    <van-popup v-model="showBtmPalForMainContact" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsMainContact"
        :default-index="defaultMainContactIndex"
        @confirm="onMainContactConfirm"
        @cancel="showBtmPalForMainContact = false"
      />
    </van-popup>

    <!--底部弹框 次要联系人-->
    <van-popup v-model="showBtmPalForSecContact" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsSecContact"
        :default-index="defaultSecContactIndex"
        @confirm="onSecContactConfirm"
        @cancel="showBtmPalForSecContact = false"
      />
    </van-popup>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import inputMiniLabel from "../../../../components/inputMiniLabel";
import noorderServiceApi from "../../../../services/api/noorder.service";
import formatVertify from "../../../../lib/formatVertify";
import process from "../../../../lib/process";

import { Steps } from "mand-mobile";
export default {
  name: "bankinfo_page",
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
      //银行名称
      showBtmPalForBankName: false,
      columnsBankName: ["银行名称1", "银行名称2"],
      defaultBankNameIndex: 0,
      selectBankNameIndex: "0",
      bankList: [],

      itemSourceBank: [
        {
          key: 1,
          minLabel: "Tên ngân hàng", //银行名称
          paramValue: "",
          placeHolder: "Tên ngân hàng",
          readOnly: true,
          showIcon: true
        },
        {
          key: 2,
          minLabel: "Số tài khoản", //帐号
          paramValue: "",
          placeHolder: "Số tài khoản",
          readOnly: false,
          showIcon: false,
          maxLength: 16
        },
        // {
        //   key: 3,
        //   minLabel: "Chi nhánh",//分行
        //   paramValue: "",
        //   placeHolder: "Chi nhánh",
        //   readOnly: false,
        //   showIcon: false,
        //   maxLength: 100
        // },
        {
          key: 4,
          minLabel: "Tên chủ thẻ", //持卡人姓名
          paramValue: "",
          placeHolder: "Tên chủ thẻ",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        }
      ],

      //主要联系人
      showBtmPalForMainContact: false,
      columnsMainContact: [
        "Bố mẹ",
        "Vợ / chồng",
        "Con cái",
        "Người thân",
        "Bạn bè",
        "Đồng nghiệp",
        "Bạn hợp tác",
        "Bạn học"
      ],
      defaultMainContactIndex: 0,
      selectMainContactIndex: "0",

      itemSourceMainContact: [
        {
          key: 1,
          minLabel: "Họ tên", //全名
          paramValue: "",
          placeHolder: "Họ tên",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 2,
          minLabel: "Quan hệ", //关系
          paramValue: "",
          placeHolder: "Quan hệ",
          readOnly: true,
          showIcon: true
        },
        {
          key: 3,
          minLabel: "Số điện thoại", //电话号码
          paramValue: "",
          placeHolder: "Số điện thoại",
          readOnly: false,
          showIcon: false,
          maxLength: 12
        }
      ],

      //次要联系人
      showBtmPalForSecContact: false,
      columnsSecContact: [
        "Bố mẹ",
        "Vợ / chồng",
        "Con cái",
        "Người thân",
        "Bạn bè",
        "Đồng nghiệp",
        "Bạn hợp tác",
        "Bạn học"
      ],
      defaultSecContactIndex: 0,
      selectSecContactIndex: "0",

      itemSourceSecContact: [
        {
          key: 1,
          minLabel: "Họ tên",
          paramValue: "",
          placeHolder: "Họ tên",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 2,
          minLabel: "Quan hệ",
          paramValue: "",
          placeHolder: "Quan hệ",
          readOnly: true,
          showIcon: true
        },
        {
          key: 3,
          minLabel: "Số điện thoại",
          paramValue: "",
          placeHolder: "Số điện thoại",
          readOnly: false,
          showIcon: false,
          maxLength: 12
        }
      ],

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
      this.$router.push({ path: "/idinfo", query: "" });
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    handleCommitBankInfo() {
      process.getProcessStatus().then(res => {
        if (res == 0 || res == 1) {
          if (!formatVertify.vertifyOrderIdFormat(this.orderId)) {
            return;
          }

          //名字--持卡人
          if (
            !formatVertify.vertifyNameFormat(this.itemSourceBank[2].paramValue)
          ) {
            return;
          }

          //银行账号
          if (
            !formatVertify.vertifyBankAcountNoFormat(
              this.itemSourceBank[1].paramValue
            )
          ) {
            return;
          }

          //名字--主要联系人
          if (
            !formatVertify.vertifyNameFormat(
              this.itemSourceMainContact[0].paramValue
            )
          ) {
            return;
          }
          //电话--主要联系人
          if (
            !formatVertify.vertifyTelFormat(
              this.itemSourceMainContact[2].paramValue
            )
          ) {
            return;
          }

          //名字--次要联系人
          if (
            !formatVertify.vertifyNameFormat(
              this.itemSourceSecContact[0].paramValue
            )
          ) {
            return;
          }
          //电话--次要联系人
          if (
            !formatVertify.vertifyTelFormat(
              this.itemSourceSecContact[2].paramValue
            )
          ) {
            return;
          }

          //两个号码相同校验
          if (
            !formatVertify.vertifySameTelFormat(
              this.itemSourceMainContact[2].paramValue,
              this.itemSourceSecContact[2].paramValue
            )
          ) {
            return;
          }
          if (this.btnBottomDisable) {
            return;
          }

          let param = {};
          param.orderId = this.orderId;
          //银行信息
          param.bankName = this.itemSourceBank[0].paramValue;
          param.bankCode = this.bankList.find(
            p => p.name == param.bankName
          ).code;

          param.bankAccountNo = this.itemSourceBank[1].paramValue;
          //param.branchName = this.itemSourceBank[2].paramValue;
          param.holderName = this.itemSourceBank[2].paramValue;

          //主要联系人
          let contacts = [];
          contacts.push({
            name: this.itemSourceMainContact[0].paramValue,
            phoneNo: this.itemSourceMainContact[2].paramValue,
            relation: this.selectMainContactIndex + 1
          });
          contacts.push({
            name: this.itemSourceSecContact[0].paramValue,
            phoneNo: this.itemSourceSecContact[2].paramValue,
            relation: this.selectSecContactIndex + 1
          });
          param.contacts = contacts;
          param.needAuth = true;

          noorderServiceApi.commitOtherInfo(param).then(res => {
            if (res.code == 0) {
              this.$router.push({
                name: "loandetail"
              });
            }
          });
        } else {
          process.goToProcessPage();
        }
      });
    },
    //子控件值变化回调函数--银行信息********************************
    handleChildChangeBank(val, key) {
      let _index = this.itemSourceBank.findIndex(function(value, index, arr) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSourceBank[_index].paramValue = val;
      this.monitorData();
    },
    //选择控件--银行信息
    handleChooseOpInfoBank(key) {
      switch (key) {
        case 1: //银行名称
          {
            this.showBtmPalForBankName = true;
          }
          break;
          break;
        default:
          break;
      }

      console.log("click " + key);
    },

    //银行名称
    onBankNameConfirm(value, index) {
      this.itemSourceBank[0].paramValue = value;
      this.selectBankNameIndex = index;
      this.showBtmPalForBankName = false;
      console.log(value, index);
      this.monitorData();
    },

    //子控件值变化回调函数--主要联系人********************************
    handleChildChangeMainContact(val, key) {
      let _index = this.itemSourceMainContact.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSourceMainContact[_index].paramValue = val;
      this.monitorData();
    },
    //选择控件--主要联系人
    handleChooseOpInfoMainContact(key) {
      switch (key) {
        case 2: //主要联系人
          {
            this.showBtmPalForMainContact = true;
          }
          break;
        default:
          break;
      }

      console.log("click " + key);
    },

    //主要联系人
    onMainContactConfirm(value, index) {
      this.itemSourceMainContact[1].paramValue = value;
      this.selectMainContactIndex = index;
      this.showBtmPalForMainContact = false;
      console.log(value, index);
      this.monitorData();
    },

    //子控件值变化回调函数--次要联系人********************************
    handleChildChangeSecContact(val, key) {
      let _index = this.itemSourceSecContact.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.key == key;
      });
      console.log("index " + _index);

      this.itemSourceSecContact[_index].paramValue = val;
      this.monitorData();
    },
    //选择控件--次要联系人
    handleChooseOpInfoSecContact(key) {
      switch (key) {
        case 2: //次要联系人
          {
            this.showBtmPalForSecContact = true;
          }
          break;
          break;
        default:
          break;
      }

      console.log("click " + key);
    },

    //主要联系人
    onSecContactConfirm(value, index) {
      this.itemSourceSecContact[1].paramValue = value;
      this.selectSecContactIndex = index;
      this.showBtmPalForSecContact = false;
      console.log(value, index);
      this.monitorData();
    },
    //监测数据是否填写
    monitorData() {
      let _indexBank = this.itemSourceBank.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.paramValue == "";
      });

      let _indexMainCon = this.itemSourceMainContact.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.paramValue == "";
      });

      let _indexSecCon = this.itemSourceSecContact.findIndex(function(
        value,
        index,
        arr
      ) {
        return value.paramValue == "";
      });

      if (_indexBank < 0 && _indexMainCon < 0 && _indexSecCon < 0) {
        this.btnBottomDisable = false;
      } else {
        this.btnBottomDisable = true;
      }
    },
    //获取银行数据
    getBankList() {
      noorderServiceApi.getBankList().then(res => {
        if (res.code == 0) {
          this.bankList = res.data;
          this.columnsBankName = this.bankList.map(n => n.name);
        }
      });
    },

    //获取银行信息
    getBankInfo() {
      noorderServiceApi.getBankAndContact().then(res => {
        console.log(res);
        if (res.code == 0) {
          this.itemSourceBank[0].paramValue = res.data.bankName;
          this.itemSourceBank[1].paramValue = res.data.bankAccountNo;
          //this.itemSourceBank[2].paramValue = res.data.branchName;
          this.itemSourceBank[2].paramValue = res.data.holderName;

          //次要联系人
          this.itemSourceMainContact[0].paramValue = res.data.contacts[0].name;
          this.defaultMainContactIndex = res.data.contacts[0].relation - 1;
          this.selectMainContactIndex = res.data.contacts[0].relation - 1;
          this.itemSourceMainContact[1].paramValue = this.columnsMainContact[
            res.data.contacts[0].relation - 1
          ];
          this.itemSourceMainContact[2].paramValue =
            res.data.contacts[0].phoneNo;

          //主要联系人
          this.itemSourceSecContact[0].paramValue = res.data.contacts[1].name;
          this.defaultSecContactIndex = res.data.contacts[1].relation - 1;
          this.selectSecContactIndex = res.data.contacts[1].relation - 1;
          this.itemSourceSecContact[1].paramValue = this.columnsMainContact[
            res.data.contacts[1].relation - 1
          ];
          this.itemSourceSecContact[2].paramValue =
            res.data.contacts[1].phoneNo;

          this.monitorData();
        }
      });
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId;

    this.getBankList();
    this.getBankInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.bankinfo_page {
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

.bankinfo_page {
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