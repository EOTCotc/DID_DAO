<template>
  <div class="publicity_wrap fullscreen">
    <page-header title="仲裁" />
    <div class="content">
      <div class="main">
        <van-cell
          title="仲裁员公示"
          title-class="row-title"
          is-link
          to="/user/arbitration/personnel"
        />
        <van-cell
          title="仲裁案公示"
          title-class="row-title"
          is-link
          to="/user/arbitration/case"
        />
        <van-cell title="成为仲裁员" title-class="row-title" is-link to="" />
        <van-cell
          title="仲裁案件"
          title-class="row-title"
          is-link
          to="/user/arbitration/case"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
export default {
  name: "arbitration",
  components: { PageHeader },
};
</script>

<style scoped lang="scss">
.publicity_wrap {
  .content {
    padding: 30px;
    .main {
      border-radius: 20px;
      overflow: hidden;
      .row-title {
        font-size: 32px;
      }
    }
  }
}
</style>