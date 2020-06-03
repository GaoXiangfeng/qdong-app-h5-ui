<template>
  <div class="stepLabel">
    <span class="color"></span>
    {{title}}
  </div>
</template>

<script>
export default {
  name: "stepLabel",
  data() {
    return {};
  },
  props: {
    title: {
      type: String
    }
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/style/var.less";
.stepLabel {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: left;
  border-bottom: 0.5px solid #e6e6e6;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 12px;
  .color {
    display: inline-block;
    width: 6px;
    height: 20px;
    margin-right: 8px;
    background: rgba(34, 78, 247, 1);
    border-radius: 1px;
  }
}
</style>