<template>
  <div class="approval_wrap fullscreen bg-gray">
    <white :title="title1"
           :name='name'></white>
    <div class="content">
      <div class="main">
        <van-cell :title="title"
                  title-class="row-title"
                  is-link
                  to="/user/approval/auditNode/applicationConditions" />
        <van-cell title="身份认证审核"
                  title-class="row-title"
                  is-link
                  to="/user/approval/identity" />
        <van-cell title="申请社区审批"
                  title-class="row-title"
                  is-link
                  to="/user/approval/community" />
        <van-cell title="团队成员名单申请"
                  title-class="row-title"
                  is-link
                  to="/user/approval/team" />
      </div>
    </div>
  </div>
</template>

<script>
import white from '../../components/Nav/white.vue'
export default {
  name: 'approval',
  components: { white },
  data() {
    return {
      title1: '审核',
      name: 'personage',
      isExamine: +localStorage.getItem('isExamine'),
      title: '',
    }
  },
  mounted() {
    this.isExamine == 0
      ? (this.title = '成为审核节点')
      : (this.title = '审核节点身份')
  },
}
</script>

<style scoped lang="scss">
.approval_wrap {
  .content {
    padding: 30px;
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