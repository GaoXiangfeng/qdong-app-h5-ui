<template>
  <div class="myheader">
    <img
      v-if="showTitle"
      class="leftarrow"
      v-on:click="$emit('goback')"
      src="../assets/img/common/leftarrow.png"
      alt
    />
    <div>{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "myheader",
  data() {
    return {};
  },
  props: {
    title: String,
    showTitle:{
      type: Boolean,
      default: true
    }
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/style/var.less";
.myheader {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: @header-height;
  box-shadow: 0px 3px 3px 0px rgba(63, 100, 240, 0.06);
  font-size: 17px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  .leftarrow {
    position: absolute;
    top: 3px;
    left: 10px;
    display: block;
    width: 10px;
    height: 17px;
    padding: 10px 10px;
  }
}
</style>