<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="community_wrap fullscreen">
      <page-header title="我的社区" theme="dark" />
      <div class="content">
        <van-cell class="title">
          <template slot="title"><div>粒紫社区</div></template>
          <template><i class="icon icon-setting" @click="$router.push('/communitySetting')"></i></template>
        </van-cell>
        <img class="img" :src="require('../../../assets/imgs/01.jpg')" alt="">
        <van-row class="row">
          <van-col class="label" span="16">简介</van-col>
          <van-col class="value desc" span="24">驾驭命运的舵是奋斗。不抱有一丝幻想,不放弃一点机会,不停止一日努力。</van-col>
        </van-row>
        <van-row class="row">
          <van-col class="label" span="8">电报群</van-col>
          <van-col class="value link" span="16">http://t.me/eotca</van-col>
        </van-row>
        <van-row class="row">
          <van-col class="label" span="8">QQ群</van-col>
          <van-col class="value" span="16">1621688688 <i class="icon icon-copy"></i></van-col>
        </van-row>
        <van-row class="row">
          <van-col class="label" span="8">Discord</van-col>
          <van-col class="value" span="16">Dava12899 <i class="icon icon-copy"></i></van-col>
        </van-row>
        <div class="btn" v-show="status === 0" @click="$router.push('/communityCreate')">申请创建社区</div>
        <div class="btn pending" v-show="status === 1">社区创建审核中</div>
        <div class="btn reject" v-show="status === 2">社区创建审核失败</div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader.vue"

export default {
  components: { pageHeader },
  name: "community",
  data() {
    return {
      loading: false,
      status: 0,
    }
  },
  methods: {
    onRefresh() {},
    getList() {},
    handleLoad() {

    },
  }
}
</script>

<style lang="scss" scoped>
.community_wrap {
  position: relative;
  .content {
    padding: 0 32px;
    .title {
      padding: 30px 0;
      font-size: 36px;
      color: #333;
      font-weight: bold;
      border-bottom: 1px solid #EEE;
    }
    .img {
      margin: 20px 0;
      display: block;
      width: 100%;
    }
    .row {
      padding: 30px 0;
      .label {
        color: #333;
        font-size: 32px;
      }
      .value {
        color: #666;
        font-size: 32px;
        .icon {
          color: #999;
          font-size: 24px;
          margin-left: 15px;
        }
        &.desc {
          line-height: 1.5;
          margin-top: 30px;
        }
        &.link {
          color: #237FF8;
        }
      }
    }
    .btn {
      @include posi($b: 30px, $l: 30px, $r: 30px);
      line-height: 96px;
      text-align: center;
      background-color: #247FF6;
      font-size: 32px;
      color: #FFF;
      border-radius: 48px;
      &.pending {
        color: #237FF8;
        background-color: #D3E5FD;
        border: 1px solid #247FF6;
      }
      &.reject {
        color: #FF6343;
        background-color: #FFDFD8;
        border: 1px solid #FF6343;
      }
    }
  }
}
</style>