<template>
  <div class="community_wrap fullscreen">
    <page-header title="我的社区" theme="dark" />
    <div class="content">
      <van-cell class="title" v-if="userInfo.communityId">
        <template #title><div>{{community.comName}}</div></template>
        <i class="icon icon-setting" v-if="userInfo.authType === 2" @click="$router.push('/my/community/setting')"></i>
      </van-cell>
      <img class="img" :src="community.image" alt="">
      <van-row class="row">
        <van-col class="label" span="16">简介</van-col>
        <van-col class="value desc" span="24">{{community.describe}}</van-col>
      </van-row>
      <van-row class="row">
        <van-col class="label" span="8">电报群</van-col>
        <van-col class="value" span="16" v-if="community.telegram">
          <a class="link" :href="community.telegram">{{community.telegram}}</a>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col class="label" span="8">QQ群</van-col>
        <van-col class="value" span="16" v-if="community.qq">{{community.qq}} <i class="icon icon-copy" @click="copy(community.qq)"></i></van-col>
      </van-row>
      <van-row class="row">
        <van-col class="label" span="8">Discord</van-col>
        <van-col class="value" span="16" v-if="community.discord">{{community.discord}} <i class="icon icon-copy" @click="copy(community.discord)"></i></van-col>
      </van-row>
      <div class="btn" v-if="!userInfo.applyCommunityId" @click="applyCreateCommunity">申请创建社区</div>
      <div class="btn pending" v-else-if="userInfo.authType === 1">社区创建审核中</div>
      <div class="btn reject" v-else-if="userInfo.authType === 3" @click="$router.push('/my/community/process')">社区创建审核失败</div>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader.vue"
import defaultImg from "@/assets/imgs/community_default.png"
import {search, allowCreateCommunity} from "@/api/pagesApi/community";
import {copy} from "@/utils/utils";

export default {
  components: { pageHeader },
  name: "community",
  data() {
    return {
      loading: false,
      status: 0,
      community: {},
      communityStatus: {},
      defaultImg, // 默认简介图片
      userInfo: {}
    }
  },
  methods: {
    onRefresh() {
      const wallet = localStorage.getItem("myaddress")
      const otype = localStorage.getItem("netType")
      const sign = localStorage.getItem("mysign")
      this.$toast.loading("加载中…")
      allowCreateCommunity(`wallet=${wallet}&otyp=${otype}&sign=${sign}`).then(res => {
        this.communityStatus = res.data
      })
      this.getCommunity()
    },
    // 获取社区信息
    getCommunity() {
      search().then(res => {
        if (!res.data.code) {
          const data = res.data.items || {}
          this.community = {
            ...data,
            image: data.image ? `http://192.168.2.110:5555/${data.image}` : this.defaultImg
          }
        } else {
          this.$toast.fail({
            forbidClick: true,
            message: res.data.message
          })
        }
      }).finally(() => {
        this.$toast.clear()
      })
    },
    applyCreateCommunity() {
      if (this.communityStatus.giftEotc < 5000) {
        this.$router.push('/my/community/create')
      } else {
        this.$toast({
          message: '您必须持有5000EOTC才能申请',
          position: 'bottom',
        });
      }
    },
    copy
  },
  created() {
    const userInfo = this.cookie.get('userInfo')
    this.userInfo = !!userInfo ? JSON.parse(userInfo) : {}
    this.onRefresh()
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
        .link {
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