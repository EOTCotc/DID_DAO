<template>
  <div class='approval_wrap fullscreen bg-gray'>
    <white
      title='审核'
      :name='name'
    ></white>
    <div class='content'>
      <div class='main'>
        <van-cell
          :title='title'
          title-class='row-title'
          is-link
          to='/user/approval/auditNode/applicationConditions' />
        <van-cell
          title='身份认证审核'
          title-class='row-title'
          is-link
          @click='auth("/user/approval/identity")'
        />
        <van-cell
          title='申请社区审批'
          title-class='row-title'
          is-link
          @click='auth("/user/approval/community")'
        />
        <van-cell
          title='团队成员名单申请'
          title-class='row-title'
          is-link
          @click='auth("/user/approval/team")'
        />
      </div>
    </div>
  </div>
</template>
<script>
import white from '../../components/Nav/white.vue'

export default {
  name: 'approval',
  components: {white},
  data() {
    return {
      name: 'personage',
      isExamine: +localStorage.getItem('isExamine'),
      title: ''
    }
  },
  mounted() {
    this.title = this.isExamine == 0 ? '成为审核节点' : '审核节点身份'
  },
  methods: {
    auth(path) {
      if (this.isExamine) {
        this.$router.push(path)
      } else {
        this.$dialog.confirm({
          title: '提示',
          message: '暂未成为审核节点',
          confirmButtonText: '前往申请'
        }).then(() => {
          this.$router.push('/user/approval/auditNode/applicationConditions')
        }).catch(() => {})
      }
    }
  }
}
</script>
<style scoped lang='scss'>
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

.van-cell__left-icon,
.van-cell__right-icon {
  line-height: 36px;
}
</style>