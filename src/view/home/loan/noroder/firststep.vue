<template>
  <div class="firststep_page">
    <myheader
      @goback="handleGoBack"
      title="Thông tin cơ bản"
      style="box-shadow: 0 0 0 0;!important"
    />
    <div class="steparea">
      <md-steps class="step" :steps="steps" :current="0"></md-steps>
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
      @click="handleCommitBaseInfo()"
      class="btnnext"
      type="default"
      v-bind:class="{'btnBottomDisable': btnBottomDisable}"
    >Tiếp</van-button>
    <!--底部弹框 性别-->
    <van-popup v-model="showBtmPalForSex" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsSex"
        :default-index="defaultSexIndex"
        @confirm="onSexConfirm"
        @cancel="showBtmPalForSex = false"
      />
    </van-popup>

    <!--底部弹框 出生日期-->
    <van-popup v-model="showBtmPalForBirth" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        :min-date="minDate"
        @confirm="onBirthConfirm"
        @cancel="showBtmPalForBirth = false"
        type="date"
      />
    </van-popup>

    <!--底部弹框 学历-->
    <van-popup v-model="showBtmPalForEducation" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsEducation"
        :default-index="defaultEducationIndex"
        @confirm="onEducationConfirm"
        @cancel="showBtmPalForEducation = false"
      />
    </van-popup>

    <!--底部弹框 婚姻-->
    <van-popup v-model="showBtmPalForMarry" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columnsMarry"
        :default-index="defaultMarryIndex"
        @confirm="onMarryConfirm"
        @cancel="showBtmPalForMarry = false"
      />
    </van-popup>

    <!--底部弹框 地址-->
    <van-popup v-model="showBtmPalForAddress" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="columns"
        @change="onChange"
        @cancel="showBtmPalForAddress = false"
        @confirm="onAddressConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import myheader from "../../../../components/header";
import inputMiniLabel from "../../../../components/inputMiniLabel";
import addressData from "../../../../assets/data/addressData";
import moment from "moment";
import noorderServiceApi from "../../../../services/api/noorder.service";
import formatVertify from "../../../../lib/formatVertify";

import { Steps } from "mand-mobile";

export default {
  name: "firststep_page",
  data() {
    return {
      amount: "", //金额
      days: "", //天数

      //性别
      showBtmPalForSex: false,
      columnsSex: ["Nữ", "Nam"],
      defaultSexIndex: 0,
      selectSexIndex: "0",

      //出生日期
      showBtmPalForBirth: false,
      minDate: new Date(1970, 1, 1),
      currentDate: new Date(new Date().getFullYear(), 0, 1),

      //学历
      showBtmPalForEducation: false,
      columnsEducation: [
        "Tiểu học",
        "Trung học phổ thông",
        "Đại học",
        "Thạc sĩ",
        "Tiến sĩ"
      ],
      defaultEducationIndex: 0,
      selectEducationIndex: "0",

      //婚姻
      showBtmPalForMarry: false,
      columnsMarry: ["Chưa kết hôn", "Đã kết hôn", "Ly dị", "Góa"],
      defaultMarryIndex: 0,
      selectMarryIndex: "0",

      //居住地址
      showBtmPalForAddress: false,
      //areaList: addressInfo,
      selectAddressInfo: [],

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
          minLabel: "Họ tên",//全名
          paramValue: "",
          placeHolder: "Họ tên",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        },
        {
          key: 2,
          minLabel: "Giới tính",//性别
          paramValue: "",
          placeHolder: "Giới tính",
          readOnly: true,
          showIcon: true
        },
        {
          key: 3,
          minLabel: "Ngày sinh",//出生日期
          paramValue: "",
          placeHolder: "Ngày sinh",
          readOnly: true,
          showIcon: true
        },
        {
          key: 4,
          minLabel: "Bằng cấp",//学位
          paramValue: "",
          placeHolder: "Bằng cấp",
          readOnly: true,
          showIcon: true
        },
        {
          key: 5,
          minLabel: "Tình trạng hôn nhân",//婚姻状况
          paramValue: "",
          placeHolder: "Tình trạng hôn nhân",
          readOnly: true,
          showIcon: true
        },
        {
          key: 6,
          minLabel: "Địa chỉ nhà",//家庭地址
          paramValue: "",
          placeHolder: "Địa chỉ nhà",
          readOnly: true,
          showIcon: true
        },
        {
          key: 7,
          minLabel: "Địa chỉ chính xác",//详细地址
          paramValue: "",
          placeHolder: "Địa chỉ chính xác",
          readOnly: false,
          showIcon: false,
          maxLength: 100
        },
        {
          key: 8,
          minLabel: "Email",
          paramValue: "",
          placeHolder: "Email",
          readOnly: false,
          showIcon: false,
          maxLength: 60
        }
      ],

      columns: [
        {
          values: Object.keys(addressData),
          className: "column1"
        },
        {
          values: Object.keys(addressData["Tỉnh Vĩnh Long"]),
          className: "column2",
          defaultIndex: 0
        },
        {
          values: addressData["Tỉnh Vĩnh Long"]["Huyện Tam Bình"],
          className: "column3",
          defaultIndex: 0
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
    //回退
    handleGoBack() {
      this.$router.push({ path: "/home/loanmainnoorder", query: "" });
      this.$store.commit("ACTIVE_HOME_PAGE", 0);
    },
    //基础信息提交
    handleCommitBaseInfo() {
      if (!this.amount || !this.days) {
        this.$toast({
          message: "Vui lòng quay lại trang chủ để chọn số lượng và số ngày!"
        });
        return;
      }
      //名字 邮箱校验
      if (!formatVertify.vertifyNameFormat(this.itemSource[0].paramValue)) {
        return;
      }

      if (!formatVertify.vertifyEmailFormat(this.itemSource[7].paramValue)) {
        return;
      }

      if (this.btnBottomDisable) {
        return;
      }

      let param = {};
      param.amount = this.amount;
      param.days = this.days;
      param.name = this.itemSource[0].paramValue;
      param.gender = this.selectSexIndex;
      param.education = this.selectEducationIndex + 1;
      param.birthday = this.itemSource[2].paramValue;
      param.maritalStatus = this.selectMarryIndex + 1;
      param.provinceName = this.selectAddressInfo[0];
      param.cityName = this.selectAddressInfo[1];
      param.distinctName = this.selectAddressInfo[2];
      param.addressDetail = this.itemSource[6].paramValue;
      param.email = this.itemSource[7].paramValue;

      noorderServiceApi.commitBaseInfo(param).then(res => {
        if (res.code == 0) {
          this.$router.push({
            path: "/workinfo",
            query: { orderId: res.data }
          });
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
        case 2: //性别
          {
            this.showBtmPalForSex = true;
          }
          break;
        case 3: //出生日期
          {
            this.showBtmPalForBirth = true;
          }
          break;
        case 4: //学历
          {
            this.showBtmPalForEducation = true;
          }
          break;
        case 5: //婚姻
          {
            this.showBtmPalForMarry = true;
          }
          break;
        case 6: //居住地址
          {
            this.showBtmPalForAddress = true;
          }
          break;
        default:
          break;
      }

      console.log("click " + key);
    },
    //性别确认
    onSexConfirm(value, index) {
      this.itemSource[1].paramValue = value;
      this.selectSexIndex = index;
      this.showBtmPalForSex = false;

      this.monitorData();
      console.log(value, index);
    },
    //出生日期
    onBirthConfirm(value) {
      console.log(moment(value).format("YYYY-MM-DD"));
      this.itemSource[2].paramValue = moment(value).format("YYYY-MM-DD");
      this.showBtmPalForBirth = false;

      this.monitorData();
    },
    //学历
    onEducationConfirm(value, index) {
      this.itemSource[3].paramValue = value;
      this.selectEducationIndex = index;
      this.showBtmPalForEducation = false;

      this.monitorData();
      console.log(value, index);
    },
    //婚姻
    onMarryConfirm(value, index) {
      this.itemSource[4].paramValue = value;
      this.selectMarryIndex = index;
      this.showBtmPalForMarry = false;

      this.monitorData();
      console.log(value, index);
    },
    //地址
    onAddressConfirm(value, index) {
      this.itemSource[5].paramValue = value.map(n => n).join(",");
      this.selectAddressInfo = value;
      this.showBtmPalForAddress = false;

      this.monitorData();
      console.log(value, index);
    },
    //地址三级变化
    onChange(picker, values) {
      //每次设置完一列数据要重新获取values最新值
      let _value = values;

      picker.setColumnValues(1, Object.keys(addressData[values[0]]));
      _value = picker.getValues();

      picker.setColumnValues(2, addressData[_value[0]][_value[1]]);
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
    getBaseInfo() {
      //获取基本信息
      noorderServiceApi.getBaseInfo().then(res => {
        if (res.code == 0) {
          //姓名
          this.itemSource[0].paramValue = res.data.name;
          //性别
          this.defaultSexIndex = res.data.gender;
          this.selectSexIndex = res.data.gender;
          this.itemSource[1].paramValue = this.columnsSex[res.data.gender];
          //出生日期
          this.itemSource[2].paramValue = res.data.birthday;
          this.currentDate = new Date(res.data.birthday);
          //学历
          this.defaultEducationIndex = res.data.education - 1;
          this.selectEducationIndex = res.data.education - 1;
          this.itemSource[3].paramValue = this.columnsEducation[
            res.data.education - 1
          ];
          //婚姻状况
          this.defaultMarryIndex = res.data.maritalStatus - 1;
          this.selectMarryIndex = res.data.maritalStatus - 1;
          this.itemSource[4].paramValue = this.columnsMarry[
            res.data.maritalStatus - 1
          ];
          //现居地址
          this.selectAddressInfo.push(res.data.provinceName);
          this.selectAddressInfo.push(res.data.cityName);
          this.selectAddressInfo.push(res.data.distinctName);
          this.itemSource[5].paramValue =
            res.data.provinceName +
            "," +
            res.data.cityName +
            "," +
            res.data.distinctName;

          //详细地址
          this.itemSource[6].paramValue = res.data.addressDetail;
          //邮箱
          this.itemSource[7].paramValue = res.data.email;

          this.monitorData();
        }
      });
    }
  },
  mounted() {
    let _query = this.$route.query;
    this.amount = _query.amount;
    this.days = _query.days;

    this.getBaseInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.firststep_page {
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

.firststep_page {
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