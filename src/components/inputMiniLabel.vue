<template>
  <div class="inputMiniLabel" ref="child" @click="$emit('childClick',gKey)" @focus="handleFocus">
  <!-- <div class="inputMiniLabel" ref="child"  @focus="handleFocus"> -->
    <div class="leftarea">
      <div v-if="isMinLabelShow" class="minlabel">{{minLabel}}</div>
      <!-- <input class="content" :value="childValue" type="text" v-on:input="$emit('childInputEvent', $event.target.value)" name id /> -->
      <input
        class="content"
        :placeholder="placeHolder"
        :readonly="readOnly"
        :value="paramValue"
        :maxlength="gMaxLength"
        type="text"
        @focus="handleFocus"
        @blur="handleBlur"
        v-on:input="handleInput($event)"
        name
        id
      />
    </div>
    <div v-if="showIcon" class="righticon">
      <img src="../assets/img/common/arrowright.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "inputMiniLabel",
  data() {
    return {
      isMinLabelShow: false,
      //curValue: ""
    };
  },
  props: {
    gKey: Number,
    minLabel: String,
    paramValue: String,
    placeHolder: String,
    readOnly: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    gMaxLength:{
      type: Number,
      default: 100
    },
  },
  watch: {
    // curValue: function(val) {
    //   if (val == '') {
    //     this.isMinLabelShow = false;
    //   } else {
    //     this.isMinLabelShow = true;
    //   }
    // },
    paramValue: function(val) {
      if (val == '') {
        this.isMinLabelShow = false;
      } else {
        this.isMinLabelShow = true;
      }
    },
  },
  methods: {
    handleInput(event) {
      //this.curValue = event.target.value;
      this.$emit("childInputEvent", event.target.value,this.gKey);
    },
    handleFocus(){
      //document.getElementsByClassName('inputMiniLabel')[0].style.borderBottom= ".5px solid rgba(55,107,255,1)"
      this.$refs.child.style.borderBottom= ".5px solid rgba(55,107,255,1)"
    },
    handleBlur(){
      this.$refs.child.style.borderBottom= ".5px solid rgba(230,230,230,1)"
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/style/var.less";
.inputMiniLabel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 63px;
  border-bottom: .5px solid rgba(230,230,230,1);
  .leftarea {
    flex: 1;
    .minlabel {
      height: 14px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(55, 107, 255, 1);
      line-height: 14px;
      text-align: left;
    }
    .content {
      width: 100%;
      margin: 0;
      padding: 0;
      border-width: 0;
      overflow: auto;
      font-family: PingFang SC;
    }
    .content:focus{
      //border-bottom: 1px solid rgba(55,107,255,1);
    }
  }
  .righticon {
    img {
      display: block;
      width: 8px;
      height: 12px;
      padding-left: 10px;
    }
  }
}
</style>