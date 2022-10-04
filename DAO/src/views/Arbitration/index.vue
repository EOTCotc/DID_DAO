<template>
  <div class="publicity_wrap fullscreen">
    <page-header title="仲裁" />
    <div class="content">
      <div class="main">
        <van-cell title="仲裁员公示"
                  title-class="row-title"
                  is-link
                  to="/user/arbitration/publicity/personnel" />
        <van-cell title="仲裁案公示"
                  title-class="row-title"
                  is-link
                  to="/user/arbitration/publicity/case" />
        <van-cell :title="title"
                  title-class="row-title"
                  is-link
                  to="/user/meetTheConditions" />
        <van-cell title="仲裁案件"
                  title-class="row-title"
                  is-link
                  to="/user/arbitration/case" />
        <van-cell title="仲裁消息"
                  title-class="row-title"
                  is-link
                  to="/arbitrationList" />
      </div>
    </div>
  </div>
</template>
<script>
import PageHeader from '@/components/topBar/pageHeader'
export default {
  name: 'arbitration',
  components: { PageHeader },
  data() {
    return {
      isArbitrate: +localStorage.getItem('isArbitrate'),
      title: '',
    }
  },
  mounted() {
    this.isArbitrate == 0
      ? (this.title = '成为仲裁员')
      : (this.title = '仲裁员身份')
  },
}
</script>

<style scoped lang="scss">
.publicity_wrap {
  .content {
    padding: 30px;
    height: 100vh;
    background: #f3f4f5;
    .main {
      border-radius: 20px;
      overflow: hidden;
      .row-title {
        font-size: 32px;
      }
      .van-cell {
        line-height: 35px;
      }
    }
  }
}
</style>