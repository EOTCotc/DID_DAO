<template>
  <van-popup
      v-model="show"
      position="bottom"
      :close-on-click-overlay="false"
  >
    <div class="popup_wrap">
      <van-row class="header_wrap" type="flex" align="center">
        <van-col :span="22" class="title">{{title}}</van-col>
        <van-col :span="2" class="close"><van-icon name="cross" @click="toggle(false)" /></van-col>
      </van-row>
      <slot></slot>
    </div>
  </van-popup>
</template>

<script>
  export default {
    name: "popup",
    props: {
      title: {type: String}
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      toggle(show) {
        this.show = show
      }
    }
  }
</script>

<style scoped lang="scss">
  .popup_wrap {
    padding: 30px;
    .header_wrap {
      margin-bottom: 30px;
      .title {
        color: #1B2945;
        font-size: 36px;
        font-weight: bold;
      }
      .close {
        text-align: right;
      }
    }
  }
</style>