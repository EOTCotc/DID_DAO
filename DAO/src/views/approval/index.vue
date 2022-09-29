<template>
  <div class="approval_wrap fullscreen bg-gray">
    <page-header title="审核" />
    <div class="content">
      <div class="main">
        <van-cell
          title="审核节点身份"
          title-class="row-title"
          is-link
          to="/user/approval/auditNode/applicationConditions"
        />
        <van-cell
          title="身份认证审核"
          title-class="row-title"
          is-link
          to="/user/approval/identity"
        />
        <van-cell
          title="申请社区审批"
          title-class="row-title"
          is-link
          to="/user/approval/community"
        />
        <van-cell
          title="团队成员名单申请"
          title-class="row-title"
          is-link
          to="/user/approval/team"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
export default {
  name: "approval",
  components: { PageHeader },
};
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
        .van-icon {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>