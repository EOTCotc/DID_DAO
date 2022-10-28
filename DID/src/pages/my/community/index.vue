<template>
  <div class="community_wrap fullscreen">
    <page-header :title="$t('my.my_comm')" theme="dark" />
    <div class="content">
      <van-cell class="title" v-if="userInfo.communityId">
        <template #title
          ><div>{{ community.comName }}</div></template
        >
        <i
          class="icon icon-setting"
          v-if="userInfo.applyCommunityId === community.communityId"
          @click="$router.push('/my/community/setting')"
        ></i>
      </van-cell>
      <img class="img" :src="community.image" alt="" />
      <van-row class="row">
        <van-col class="label" span="16">{{ $t("community.tags1") }}</van-col>
        <van-col class="value desc" span="24">{{ community.describe }}</van-col>
      </van-row>
      <van-row class="row">
        <van-col class="label" span="8">{{ $t("setup.telegram") }}</van-col>
        <van-col class="value" span="16" v-if="community.telegram">
          <a class="link" :href="community.telegram">{{
            community.telegram
          }}</a>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col class="label" span="8">{{ $t("community.tags2") }}</van-col>
        <van-col class="value" span="16" v-if="community.qq"
          >{{ community.qq }}
          <i class="icon icon-copy" @click="copy(community.qq)"></i
        ></van-col>
      </van-row>
      <van-row class="row">
        <van-col class="label" span="8">Discord</van-col>
        <van-col class="value" span="16" v-if="community.discord"
          >{{ community.discord }}
          <i class="icon icon-copy" @click="copy(community.discord)"></i
        ></van-col>
      </van-row>
      <div
        class="btn"
        v-if="!userInfo.applyCommunityId"
        @click="applyCreateCommunity"
      >
        {{ $t("community.tags3") }}
      </div>
      <div class="btn pending" v-else-if="userInfo.comAuditType === 1">
        {{ $t("community.tags4") }}
      </div>
      <div
        class="btn reject"
        v-else-if="userInfo.comAuditType === 3"
        @click="$router.push('/my/community/process')"
      >
        {{ $t("community.tags5") }}
      </div>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader.vue";
import defaultImg from "@/assets/imgs/community_default.png";
import {
  search,
  allowCreateCommunity,
  getUserEotc,
} from "@/api/pagesApi/community";
import { copy } from "@/utils/utils";
import { getuserinfo } from "@/api/pagesApi/home";

export default {
  components: { pageHeader },
  name: "community",
  data() {
    return {
      loading: false,
      status: 0,
      eotc: 0,
      community: {},
      communityStatus: {},
      defaultImg, // 默认简介图片
      userInfo: {},
    };
  },
  methods: {
    onRefresh() {
      const wallet = localStorage.getItem("myaddress");
      const otype = localStorage.getItem("netType");
      const sign = localStorage.getItem("mysign");
      this.$toast.loading(this.$t("public.loading"));
      allowCreateCommunity(`wallet=${wallet}&otyp=${otype}&sign=${sign}`).then(
        (res) => {
          this.communityStatus = res.data;
        }
      );
      this.getCommunity();
    },
    // 获取社区信息
    getCommunity() {
      search()
        .then((res) => {
          if (!res.data.code) {
            const data = res.data.items || {};
            this.community = {
              ...data,
              image: data.image
                ? `${process.env.VUE_APP_LOCATION}${data.image}`
                : this.defaultImg,
            };
          } else {
            this.$toast.fail({
              forbidClick: true,
              message: res.data.message,
            });
          }
        })
        .finally(() => {
          this.$toast.clear();
        });
      getUserEotc().then((res) => {
        this.eotc = res.data.items;
      });
    },
    applyCreateCommunity() {
      if (this.eotc > 5000) {
        this.$router.push("/my/community/create");
      } else {
        this.$toast({
          message: this.$t("community.msg1"),
          position: "bottom",
        });
      }
    },
    copy,
  },
  created() {
    this.onRefresh();
    const loading = this.$toast.loading({
      forbidClick: true,
      message: this.$t("public.loading"),
    });
    getuserinfo()
      .then((res) => {
        this.userInfo = res.data.items;
        this.cookie.set("userInfo", JSON.stringify(this.userInfo));
      })
      .finally(() => loading.clear());
  },
};
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
      border-bottom: 1px solid #eee;
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
          color: #237ff8;
        }
      }
    }
    .btn {
      @include posi($b: 30px, $l: 30px, $r: 30px);
      line-height: 96px;
      text-align: center;
      background-color: #247ff6;
      font-size: 32px;
      color: #fff;
      border-radius: 48px;
      &.pending {
        color: #237ff8;
        background-color: #d3e5fd;
        border: 1px solid #247ff6;
      }
      &.reject {
        color: #ff6343;
        background-color: #ffdfd8;
        border: 1px solid #ff6343;
      }
    }
  }
}
</style>