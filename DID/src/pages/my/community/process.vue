<template>
  <div class="community_wrap fullscreen bg-gray">
    <page-header title="申请创建社区" />
    <div class="process_wrap">
      
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader.vue"

export default {
  name: "communityCreateSuccess",
  components: {
    PageHeader
  },
}
</script>

<style lang="scss" scoped>
.success_wrap {
  margin: 30% 145px 0;
  text-align: center;
  .icon {
    color: #4DC44C;
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