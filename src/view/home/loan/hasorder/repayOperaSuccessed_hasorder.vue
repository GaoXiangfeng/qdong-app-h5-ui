<template>
  <div class="repaySuccessed_page">
    <div class="display">
      <img src="../../../../assets/img/loan/successed.png" alt />
      <div class="discribe">Thanh toán thành công</div>
    </div>
    <div class="other">
      <van-button @click="handleSuccess()" class="btnsuccess" type="default">完成</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "repaySuccessed_page",
  data() {
    return {};
  },
  components: {},
  methods: {
    handleSuccess() {
      
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../../assets/style/var.less";
.repaySuccessed_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  .display {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 182px;
    background: rgba(255, 255, 255, 1);
    img {
      display: block;
      width: 65px;
      height: 65px;
      margin-top: 30px;
    }
    .discribe {
      margin-top: 17px;
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
  }
  .other {
    flex: 1;
    width: 100%;
    background: rgba(245, 245, 245, 1);
    .btnsuccess {
      width: @component-width;
      height: 48px;
      margin: 49px 0 40px 0;
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
  }
}
</style>
<style lang="less">
@import "../../../../assets/style/var.less";
@import "../../../../assets/iconfont/iconfont.css";
</style>