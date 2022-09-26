<template>
  <!-- 推荐人信息 -->
  <van-overlay
    :show="show"
    :title="referrer.refUser"
    @click="toggle(false)"
  >
    <div class="referrer_wrap" @click.stop>
      <van-cell class="title" :title="referrer.refUser">
        <van-icon name="cross" size="14px" @click.stop="toggle(false)" />
      </van-cell>
      <van-row class="item-row">
        <van-col span="8" class="name">社区名</van-col>
        <van-col span="16" class="value">{{referrer.comName}}</van-col>
      </van-row>
      <van-row class="item-row">
        <van-col span="8" class="name">电话号码</van-col>
        <van-col span="16" class="value">{{referrer.phone}}</van-col>
      </van-row>
      <van-row class="item-row">
        <van-col span="8" class="name">邮箱地址</van-col>
        <van-col span="16" class="value">{{referrer.mail}}</van-col>
      </van-row>
    </div>
  </van-overlay>
</template>

<script>
  import {referrerInfo} from "@/api/approval/community";

  export default {
  data() {
    return {
      loading: false,
      show: false,
      referrer: {}
    }
  },
  methods: {
    toggle(show) {
      this.show = show
    },
    getInfo(data) {
      referrerInfo(data.refUserId).then(res => {
        this.referrer = {
          ...data,
          ...res.data.items
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .referrer_wrap {
    @include centered();
    width: 80%;
    padding-bottom: 30px;
    box-sizing: border-box;
    border-radius: 20px;
    overflow: hidden;
    background-color: #fff;
    .title {
      font-size: 32px;
      color: #333;
      border-bottom: 1px solid #F3F4F5;
    }
    .item-row {
      padding: 0 30px;
      margin-top: 30px;
      .name {
        color: #999;
        font-size: 28px;
      }
      .value {
        color: #333;
        font-size: 28px;
        .icon {
          color: #237FF8;
          font-size: 26px;
          margin-left: 10px;
        }
      }
    }
  }
</style>