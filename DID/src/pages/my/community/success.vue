<template>
  <div class="community_wrap fullscreen bg-gray">
    <page-header :title="$t('community.tags3')" :hasLeftArrow="false" />
    <div class="success_wrap">
      <van-icon class="icon" name="passed" />
      <div class="title">{{ $t("setting.title6") }}</div>
      <div class="message">{{ $t("setting.title7") }}</div>
      <div style="margin: 25px 15px 0">
        <van-button
          round
          block
          type="info"
          @click="$router.replace('/my/community')"
          >{{ $t("setting.tags3") }}</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader.vue";

export default {
  name: "communityCreateSuccess",
  components: {
    PageHeader,
  },
};
</script>

<style lang="scss" scoped>
.success_wrap {
  margin: 30% 145px 0;
  text-align: center;
  .icon {
    color: #4dc44c;
    font-size: 160px;
  }
  .title {
    color: #333;
    font-size: 36px;
    margin-top: 40px;
  }
  .message {
    color: #999;
    font-size: 28px;
    margin-top: 48px;
  }
}
</style>