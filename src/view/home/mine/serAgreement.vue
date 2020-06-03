<template>
  <div class="serAgreement_page">
    <myheader @goback="handleGoBack" title="Thỏa thuận" />
    <div
      class="content"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</div>
  </div>
</template>

<script>
import myheader from "../../../components/header";
export default {
  name: "serAgreement_page",
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
.serAgreement_page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  .content {
    padding: 32px 28px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(127, 127, 127, 1);
    line-height: 22px;
    text-align: left;
  }
}
</style>
<style lang="less">
@import "../../../assets/style/var.less";
@import "../../../assets/iconfont/iconfont.css";
</style>