<template>
  <div class="container fullscreen">
    <page-header :title="$t('my.my_index_title1')" theme="dark" />
    <div class="fail_wrap">
      <van-row class="row">
        <van-col :span="8" class="title">{{ $t("create.text1") }}</van-col>
        <van-col :span="16" class="value">{{ info.name }}</van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="title">{{
          $t("setup.referrer_phone")
        }}</van-col>
        <van-col :span="16" class="value">{{ info.phoneNum }}</van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="title">{{ $t("identity.text2") }}</van-col>
        <van-col :span="16" class="value">{{ info.idCard }}</van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="title">{{ $t("fail.tags1") }}</van-col>
        <van-col :span="24">
          <van-row :gutter="20">
            <van-col :span="12"
              ><img :src="info.portraitImage" alt="" class="img"
            /></van-col>
            <van-col :span="12"
              ><img :src="info.nationalImage" alt="" class="img"
            /></van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="title">{{ $t("identity.tags10") }}</van-col>
        <van-col :span="24"
          ><img :src="info.handHeldImage" alt="" class="img"
        /></van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="title">{{ $t("fail.tags2") }}</van-col>
        <van-col :span="24"
          ><div class="tip">{{ $t("fail.tags3") }}</div></van-col
        >
      </van-row>
      <div class="btn">
        <van-button
          block
          round
          color="#1B2945"
          type="primary"
          @click="$router.replace({ name: 'identity', params: info })"
        >
          {{ $t("fail.tags4") }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader";
import { authFail } from "@/api/pagesApi/identity";
import { spliceSrc } from "@/utils/utils";

export default {
  name: "fail",
  components: {
    pageHeader,
  },
  data() {
    return {
      info: {},
    };
  },
  created() {
    const loading = this.$toast.loading({
      forbidClick: true,
      message: this.$t("public.loading"),
    });
    authFail()
      .then((res) => {
        if (!res.data.code) {
          const data = res.data.items;
          data.nationalImage = spliceSrc(data.nationalImage);
          data.portraitImage = spliceSrc(data.portraitImage);
          data.handHeldImage = spliceSrc(data.handHeldImage);
          this.info = data;
        } else {
          this.$toast.fail({
            forbidClick: true,
            message: res.data.message,
          });
        }
      })
      .finally(() => loading.clear());
  },
};
</script>

<style scoped lang="scss">
.fail_wrap {
  padding: 30px;
  .row {
    padding: 30px;
    border-bottom: 1px solid #f3f4f5;
    .title {
      color: #333;
      font-weight: bold;
      font-size: 28px;
    }
    .value {
      color: #333;
      font-size: 28px;
    }
    .img {
      display: block;
      width: 100%;
      margin-top: 30px;
    }
    .tip {
      color: #fc7542;
      font-size: 28px;
    }
  }
  .btn {
    margin: 30px;
  }
}
</style>