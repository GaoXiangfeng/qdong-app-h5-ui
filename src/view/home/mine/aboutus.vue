<template>
  <div class="aboutus_page">
    <myheader @goback="handleGoBack" title="Giới thiệu sản phẩm" />
    <div class="content">
      <img class="logo" src="../../../assets/img/logo.png" alt />
      <div class="packagename">Creditdong V1.0</div>
      <div class="title">
        <a href="#" class="round" style="font-size:20px;color:#4D77FD">●</a>
        Giới thiệu sản phẩm
      </div>
      <div class="discribe">Creditdong là ứng dụng cho vay tiền online, người vay chỉ phải điền thông tin theo yêu cầu là có thể đăng ký vay tiền.</div>
      <div class="title">
        <a href="#" class="round" style="font-size:20px;color:#4D77FD">●</a>       	
        Đặc điểm của sản phẩm
      </div>
      <div class="discribe">
        <div>
          <a href="#" class="round" style="font-size:13px;color:rgba(102,102,102,1);">●</a>
        </div>
        <div>1. Đặc điểm sản phẩm : Có thể vay thấp nhất 1.000.000VNĐ, sau 7 ngày thanh toán, phí thấp, đáp ứng đủ nhu cầu gấp của người vay</div>
      </div>
      <div class="discribe">
        <div>
          <a href="#" class="round" style="font-size:13px;color:rgba(102,102,102,1);">●</a>
        </div>
        <div>2. Vay tín dụng : Không cần thế chấp, vay nhanh chóng chỉ với chỉ 4 bước  đơn giản</div>
      </div>
       <div class="discribe">
        <div>
          <a href="#" class="round" style="font-size:13px;color:rgba(102,102,102,1);">●</a>
        </div>
        <div>3. Cho vay nhanh : Xét duyệt và nhận tiền trong ngày</div>
      </div>
       <div class="discribe">
        <div>
          <a href="#" class="round" style="font-size:13px;color:rgba(102,102,102,1);">●</a>
        </div>
        <div>4. Phục vụ có tâm :  Nhắc nhở đúng ngày, không lo quên thanh toán khoản vay.</div>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "../../../components/header";

export default {
  name: "aboutus_page",
  data() {
    return {};
  },
  components: {
    myheader
  },
  methods: {
    handleGoBack() {
      this.$router.push({ path: "/home/minemain", query: "" });
      this.$store.commit('ACTIVE_HOME_PAGE', 1)
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.aboutus_page {
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .logo {
      display: block;
      width: 70px;
      height: 70px;
      margin-top: 45px;
    }
    .packagename {
      margin-top: 10px;
      font-size: 13px;
      font-family: PingFangSC-Light, PingFang SC;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
      line-height: 18px;
      text-align: center;
    }
    .title {
      width: 320px;
      text-align: left;
      margin: 30px 0 5px 0;
    }
    .discribe {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 320px;
      font-size: 12px;
      font-family: LucidaGrande;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      text-align: left;
      .round{
          margin: 0 5px;
      }
    }
  }
}
</style>
<style lang="less">
@import "../../../assets/style/var.less";
@import "../../../assets/iconfont/iconfont.css";
</style>