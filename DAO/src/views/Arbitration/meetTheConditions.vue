<template>
  <div>
    <header>
      <white :title="title"></white>
    </header>
    <div class="backgroundPicture">
      <van-image width="100vw"
                 height="140px"
                 :src="require('./IMG/bg.png')" />
      <div class="text">
        <p>成为仲裁员</p>
        <p>维护安全稳定信任的交易环境</p>
      </div>
    </div>
    <div class="applicationConditions">
      <h4>申请条件</h4>
      <div class="conditionsList">
        <div class="list list1">
          <div class="left">
            <van-icon name="cart-circle-o" />
            <p>DID身份认证</p>
          </div>
          <div class="right"
               @click="auditing('arbitrationCase') ">去认证
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="list">
          <div class="left">
            <van-icon name="cart-circle-o" />
            <p>质押5000 EOTC以上</p>
          </div>
          <div class="right">去质押
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="list">
          <div class="left">
            <van-icon name="cart-circle-o" />
            <p>了解学习仲裁规则</p>
          </div>
          <div class="right"
               @click="auditing('understandLearningRules')">去学习
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="list listn">
          <div class="left">
            <van-icon name="cart-circle-o" />
            <div class="examinationColumn"><span>通过考试</span><span style="color:#999999;font-size:12px ">考试成绩达到90分以上</span></div>
          </div>
          <div class="right"
               @click="ExamTips">去考试
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="show"
                 @click="toggle2">
      <div class="wrapper"
           @click.stop>
        <div class="block">
          <van-button color="linear-gradient(to right, #3EBDFF, #006BF8)"
                      size="large ">
            考试说明
          </van-button>
          <van-button color="#F3F4F5 "
                      style="color:#333333 ">90分即通过</van-button>
          <div class="middle">
            <div class="middleTitle">
              <p>题目数量</p>
              <p class="p2"><span>12</span>题</p>
            </div>
            <div class="line"></div>
            <div class="middleTitle">
              <p>考试时长</p>
              <p class="p2"><span>30</span>分钟</p>
            </div>
          </div>
          <van-button color="#237FF8"
                      class="startBtn"
                      @click="auditing('examination') ">开始答题</van-button>
          <van-icon name="close"
                    color="#fff"
                    size="29"
                    @click="show = false" />
        </div>
      </div>
    </van-overlay>
    <notification ref="notification"
                  :buttonText="buttonText"
                  :buttonColor="buttonColor"
                  :headerIcon="headerIcon"
                  :title="title1"
                  :message="message"
                  :closeOnClick="closeOnClick"></notification>
    <footer>
      <van-button round
                  block
                  type="info"
                  color="#1B2945"
                  @click="applyNow">立即申请</van-button>
    </footer>
  </div>
</template>
<script>
import white from '@/components/Nav/white.vue'
import notification from '@/components/notification.vue'
import icon1 from './IMG/icon.png'
import icon2 from './IMG/icon2.png'
import icon3 from './IMG/icon3.png'

export default {
  components: { white, notification },
  data() {
    return {
      title: '仲裁员',
      show: false,
      showFraction: false,
      applynow: false,
      headerIcon: '',
      title1: 91.5,
      message: '恭喜通过仲裁考试',
      buttonColor: '#237FF8',
      buttonText: '知道了',
      closeOnClick: true,
    }
  },
  mounted() {
    this.showFraction = this.$route.query.showFraction
    if (this.title1 > 90) {
      this.headerIcon = icon1
      this.messag = '恭喜通过仲裁考试'
    } else {
      this.headerIcon = icon2
      this.messag = '很遗憾未通过仲裁考试'
    }
    this.message.length &&
      this.$nextTick().then(() => {
        this.$refs.notification.toggle(true)
      })
  },

  methods: {
    auditing(name) {
      this.$router.push({
        name: name,
      })
    },
    toggle2() {
      console.log(false)
    },
    ExamTips() {
      this.show = true
    },
    applyNow() {
      this.$refs.notification.toggle(true)
      this.headerIcon = icon3
      this.title1 = '申请成功'
      this.message = '成为仲裁员后平台会给您委派仲裁案'
      this.buttonColor = '#237FF8'
      this.buttonText = '好的'
      this.closeOnClick = true
    },
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  position: relative;
  width: 545px;
  height: 490px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-button:nth-child(1) {
    width: 170px;
    height: 45px;
    border-radius: 5px 5px 20px 20px;
    margin-top: -7px;
    font-size: 18px;
  }
  .van-button:nth-child(2) {
    width: 109px;
    height: 30px;
    margin-top: 17px;
    border-radius: 15px;
    color: #333333;
    font-size: 14px;
  }
  .startBtn {
    width: 310px;
    height: 88px;
    margin-top: 28px;
    border-radius: 44px;
    font-size: 34px;
  }
  .van-icon {
    position: absolute;
    bottom: -48px;
  }
  .middle {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #666666;
    margin-top: 10px;
    width: 100%;
    height: 35%;
    .middleTitle {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 31px;
      .p2 {
        color: #333333;
        span {
          font-size: 45px;
          font-weight: bold;
        }
      }
    }
    .line {
      width: 1px;
      height: 80px;
      background-color: #ecebeb;
    }
  }
}
.backgroundPicture {
  position: relative;
  .text {
    color: #fff;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    p:nth-of-type(1) {
      font-size: 50px;
      margin: 42px 25px 0;
    }
    p:nth-of-type(2) {
      font-size: 27px;
    }
  }
}
.applicationConditions {
  color: #333333;
  padding: 0 30px;
  h4 {
    font-size: 28px;
  }
  .conditionsList {
    background-color: #f3f4f5;
    height: 448px;
    border-radius: 10px;
    padding: 16px 0;
    box-sizing: border-box;
    .list1 {
      margin-top: 20px;
    }

    .list {
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        p {
          font-size: 23px;
          color: #333333;
          margin-left: 15px;
        }
        .examinationColumn {
          font-size: 23px;
          display: flex;
          flex-direction: column;
          margin-left: 15px;
        }
      }
      .right {
        color: #999999;
        font-size: 18px;
      }
    }
  }
}
footer {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  position: fixed;
  bottom: 32px;
}
</style>