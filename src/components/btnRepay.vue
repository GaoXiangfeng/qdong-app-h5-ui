<template>
  <div class="btnRepay"  @click="handleClick">
    <div class="leftarea" >
      <img :src="leftIconUrl" alt />
      <div class="leftlabel">{{leftLabel}}</div>
    </div>
    <div class="rightarea">
      <div v-if="showRightLabel" class="rightlabel">{{rightLabel}}</div>
      <img src="../assets/img/common/arrowright.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "btnRepay",
  data() {
    return {
      isMinLabelShow: false
      //curValue: ""
    };
  },
  props: {
    gKey: String,
    leftIconUrl: String,
    leftLabel: String,
    showRightLabel: {
      type: Boolean,
      default: false,
    },
    rightLabel: String,
  },
  methods: {
    handleClick() {
      //this.curValue = event.target.value;
      this.$emit("clickcallback",  this.gKey);
    },
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/style/var.less";
.btnRepay {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 63px;
  border-bottom: 0.5px solid rgba(230, 230, 230, 1);
  .leftarea {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    img {
      display: block;
      width: 26px;
      height: 20px;
    }
    .leftlabel {
      margin-left: 10px;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
    }
  }
  .rightarea {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .rightlabel {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(77, 107, 253, 1);
      line-height: 20px;
    }
    img {
      display: block;
      width: 8px;
      height: 12px;
      padding-left: 10px;
    }
  }
}
</style>