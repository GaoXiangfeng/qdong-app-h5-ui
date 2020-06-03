<template>
  <div class="camera">
    <van-button type="info" @click="test" style="border-radius: 10px;">启用摄像头</van-button>
    <!--相册-->
    <input id="filePhoto" type="file" value="点我"  accept="image/*" />
    <!--相机-->
    <!-- <input id="fileCamera" type="file" value="点我"  capture="camera"/> -->

    <input id="fileC" type="file" value="点我" accept="image/*"  capture="camera"/>

    <van-icon class="iconfont" class-prefix="my-icon" name="xitong" />

    
  </div>
</template>

<script>
export default {
  name: "camera",
  data() {
    return {};
  },
  methods: {
    test() {
      
    },
    init(){
      let file = document.querySelector("input");
      if (this.getIos()) {
        file.removeAttribute("capture");
      }
    },
    getIos() {
      if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.camera {
  font-size: 20px;
  #fileBtn {
    width: 200px;
    height: 200px;
    // opacity:0;
  }
  #img {
    width: 200px;
    height: 200px;
  }
}
</style>
