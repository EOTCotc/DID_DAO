<template>
  <div class="plaintiff_wrap fullscreen bg-gray">
    <page-header :title="pageHeaderTitle"></page-header>
    <div class="content">
      <van-row class="row border">
        <van-col class="title" :span="6">{{ $t("publicity.name") }}</van-col>
        <van-col class="value" :span="18">{{ info.name }}</van-col>
      </van-row>
      <van-row class="row border">
        <van-col class="title" :span="6">{{ $t("publicity.phone") }}</van-col>
        <van-col class="value" :span="18">{{ info.phoneNum }}</van-col>
      </van-row>
      <van-row class="row border">
        <van-col class="title" :span="6">{{ $t("publicity.card") }}</van-col>
        <van-col class="value" :span="18">{{ info.idCard }}</van-col>
      </van-row>
      <van-row class="row" v-if="info.portraitImage || info.nationalImage">
        <van-col class="title" :span="24">{{
          $t("publicity.identity")
        }}</van-col>
        <van-col class="value" :span="24">
          <van-row :gutter="20">
            <van-col :span="12">
              <img :src="info.portraitImage" alt="" class="img" />
            </van-col>
            <van-col :span="12">
              <img :src="info.nationalImage" alt="" class="img" />
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="row" v-if="info.handHeldImage">
        <van-col class="title" :span="24">{{
          $t("publicity.card_photo")
        }}</van-col>
        <van-col class="value" :span="24">
          <img :src="info.handHeldImage" alt="" class="img" />
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
import { personnelInfo } from "@/api/case";
import { getImg } from "@/api/approval/identity";

export default {
  name: "plaintiff",
  components: { PageHeader },
  data() {
    return {
      pageHeaderTitle: "",
      info: {},
    };
  },
  methods: {
    async getWatermarkImg(src) {
      const res = await getImg(src);
      const blob = new window.Blob([res.data], { type: res.type });
      const url = window.URL.createObjectURL(blob);
      return url;
    },
    getPersonnelInfo() {
      const loading = this.$toast.loading(this.$t("publicity.message"));
      personnelInfo(this.$route.query.id)
        .then((res) => {
          const { code, items } = res.data;
          if (code) {
            this.$toast.fail(this.$t("publicity.message_fild"));
          } else {
            this.getWatermarkImg(items.portraitImage)
              .then((res) => {
                items.portraitImage = res;
              })
              .then(() => {
                this.getWatermarkImg(items.nationalImage).then((res) => {
                  items.nationalImage = res;
                });
              })
              .then(() => {
                this.getWatermarkImg(items.handHeldImage).then((res) => {
                  items.handHeldImage = res;
                });
              });
            this.info = items;
            this.pageHeaderTitle = `${
              this.$route.query.type == 1
                ? this.$t("publicity.plaintiff")
                : this.$t("publicity.defendant")
            } ${items.name}`;
          }
        })
        .catch(() => {
          this.$toast.fail(this.$t("publicity.message_fild"));
        })
        .finally(() => {
          loading.clear();
        });
    },
  },
  created() {
    this.getPersonnelInfo();
  },
};
</script>

<style scoped lang="scss">
.plaintiff_wrap {
  .content {
    flex: 1;
    padding: 0 30px;
    background-color: #fff;
    .row {
      color: #333;
      font-size: 28px;
      padding: 30px 0;
      &.border {
        border-bottom: 1px solid #eee;
      }
      .title {
        font-weight: bold;
      }
      .img {
        display: block;
        width: 100%;
        margin-top: 30px;
      }
    }
  }
}
</style>