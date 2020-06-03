<template>
  <div class="home">
    <div class="maincontent">
      <router-view></router-view>
    </div>
    <div class="bottom"></div>
    <div>
      <van-tabbar v-model="activeHomePage">
        <van-tabbar-item>
          <span>Vay</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? iconLoan.active : iconLoan.normal"
          />
        </van-tabbar-item>
        <van-tabbar-item icon="search">
          <span>Tôi</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? iconMine.active : iconMine.normal"
          />
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import homeServiceApi from "../../services/api/home.service";
import process from '../../lib/process'

const getAndSet = function(name) {
  return {
    // getter
    get: function() {
      return this.$store.state.module.activeHomePage;
    },
    // setter
    set: function(newValue) {
      this.$store.commit("ACTIVE_HOME_PAGE", newValue);
    }
  };
};
export default {
  name: "home",
  data() {
    return {
      orderStatus: -1,
      iconLoan: {
        normal: require("../../assets/img/common/loan.png"),
        active: require("../../assets/img/common/loansel.png")
      },
      iconMine: {
        normal: require("../../assets/img/common/mine.png"),
        active: require("../../assets/img/common/minesel.png")
      }
    };
  },
  methods: {
    selectChange() {
      switch (this.activeHomePage) {
        case 0:
          {
            process.goToProcessPage()
          }
          break;
        case 1:
          {
            this.$router.push({ path: "/home/minemain", query: "" });
          }
          break;
        default:
          break;
      }
    },
    getOrderStatus() {
      homeServiceApi.getOrderProcess().then(res => {
        this.orderStatus = res.data.status
        this.selectChange()
      });
    }
  },
  computed: {
    activeHomePage: getAndSet("activeHomePage")
  },
  watch: {
    activeHomePage: function() {
      this.selectChange();
    },
  },
  created(){
    this.getOrderStatus();
  },
  mounted() {
    //获取订单状态
    this.selectChange();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home {
  height: 100%;
  .maincontent {
    width: 100%;
    height: 100%;
  }
  .bottom {
    height: 150px;
  }
}
</style>
