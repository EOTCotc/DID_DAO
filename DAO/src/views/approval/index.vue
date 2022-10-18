<template>
  <div class='approval_wrap fullscreen bg-gray'>
    <white :title="$t('audit.title1')"
           :name='name'></white>
    <div class='content'>
      <div class='main'>
        <van-cell :title='title'
                  title-class='row-title'
                  is-link
                  to='/user/approval/auditNode/applicationConditions' />
        <van-cell :title="$t('audit.title4')"
                  title-class='row-title'
                  is-link
                  @click='auth("/user/approval/identity")' />
        <van-cell :title="$t('audit.title5')"
                  title-class='row-title'
                  is-link
                  @click='auth("/user/approval/community")' />
        <van-cell :title="$t('audit.title6')"
                  title-class='row-title'
                  is-link
                  @click='auth("/user/approval/team")' />
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
      name: 'personage',
      isExamine: +localStorage.getItem('isExamine'),
      title: '',
    }
  },
  mounted() {
    this.title =
      this.isExamine == 0 ? this.$t('audit.title2') : this.$t('audit.title3')
  },
  methods: {
    auth(path) {
      if (this.isExamine) {
        this.$router.push(path)
      } else {
        this.$dialog
          .confirm({
            title: this.$t('audit.dialogtitle'),
            message: this.$t('audit.dialogmessage'),
            confirmButtonText: this.$t('exam.Text1'),
            cancelButtonText: this.$t('exam.Text2'),
          })
          .then(() => {
            this.$router.push('/user/approval/auditNode/applicationConditions')
          })
          .catch(() => {})
      }
    },
  },
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