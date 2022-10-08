<template>
  <div class='publicity_wrap fullscreen'>
    <white :title='title1'
           :name='name'></white>
    <div class='content'>
      <div class='main'>
        <van-cell title='仲裁员公示'
                  title-class='row-title'
                  is-link
                  to='/user/arbitration/publicity/personnel' />
        <van-cell title='仲裁案公示'
                  title-class='row-title'
                  is-link
                  to='/user/arbitration/publicity/case' />
        <van-cell :title='title'
                  title-class='row-title'
                  is-link
                  to='/user/meetTheConditions' />
        <van-cell title='仲裁案件'
                  title-class='row-title'
                  is-link
                  @click='auth("/user/arbitration/case")' />
        <div class='msg'>
          <van-cell title='仲裁消息'
                    title-class='row-title'
                    is-link
                    to='/arbitrationList' />
          <div class='dot'
               v-show='isDot'></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import white from '@/components/Nav/white.vue'
import { getmessageisopen } from '@/api/viewsApi/Arbitration.js'

export default {
  name: 'arbitration',
  components: { white },
  data() {
    return {
      isArbitrate: +localStorage.getItem('isArbitrate'),
      title: '',
      title1: '仲裁',
      name: 'personage',
      isDot: false,
      user: {},
    }
  },
  mounted() {
    this.isArbitrate == 0
      ? (this.title = '成为仲裁员')
      : (this.title = '仲裁员身份')
    this.getmessageisopen()
  },
  methods: {
    // 获取仲裁员是否有未读消息
    getmessageisopen() {
      getmessageisopen().then((res) => {
        if (res.data.code == 0) {
          this.isDot = res.data.items
        }
      })
    },
    auth(path) {
      if (this.isArbitrate) {
        this.$router.push(path)
      } else {
        this.$dialog
          .confirm({
            title: '提示',
            message: '暂未成为仲裁员',
            confirmButtonText: '前往申请',
          })
          .then(() => {
            this.$router.push('/user/meetTheConditions')
          })
          .catch(() => {})
      }
    },
  },
}
</script>
<style scoped lang='scss'>
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

.van-cell__left-icon,
.van-cell__right-icon {
  line-height: 36px;
}

.msg {
  position: relative;

  .dot {
    position: absolute;
    top: 28px;
    left: 150px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #e52a2a;
  }
}
</style>