<template>
  <div>
    <header>
      <white :title="title"></white>
    </header>
    <div class="backgroundPicture">
      <van-image width="100vw"
                 height="8.75rem"
                 src="./IMG/组 255@2x.png" />
      <div class="text">
        <p>成为仲裁员</p>
        <p>维护安全稳定信任的交易环境</p>
      </div>
    </div>
    <div class="applicationConditions">
      <h3>申请条件</h3>
      <div class="conditionsList">
        <div class="list">
          <div class="left">
            <van-icon name="cart-circle-o" />
            <p>DID身份认证</p>
          </div>
          <div class="right">去认证
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
        <div class="list">
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
                 @click="show = false">
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
                      @click="auditing('examination')">开始答题</van-button>
          <van-icon name="close"
                    color="#fff"
                    size="1.8rem"
                    @click="show = false" />
        </div>
      </div>
    </van-overlay>
    <footer>
      <van-button round
                  block
                  disabled
                  color="#1B2945"
                  native-type="submit">立即申请</van-button>
    </footer>
  </div>
</template>
<script>
import white from '@/components/Nav/white.vue'
export default {
  components: { white },
  data() {
    return {
      title: '仲裁员',
      show: false,
    }
  },
  methods: {
    auditing(name) {
      this.$router.push({ name: name })
    },
    ExamTips() {
      this.show = true
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
  width: 18.75rem;
  height: 17rem;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-button:nth-child(1) {
    width: 10.625rem;
    height: 2.81rem;
    border-radius: 5px 5px 20px 20px;
    margin-top: -7px;
    font-size: 18px;
  }
  .van-button:nth-child(2) {
    width: 6.81rem;
    height: 1.875rem;
    margin-top: 1.1rem;
    border-radius: 15px;
    color: #333333;
    font-size: 14px;
  }
  .startBtn {
    width: 11.44rem;
    height: 3rem;
    margin-top: 1.1rem;
    border-radius: 1.5rem;
    font-size: 1rem;
  }
  .van-icon {
    position: absolute;
    bottom: -3rem;
  }
  .middle {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #666666;
    margin-top: 7px;
    width: 100%;
    height: 35%;
    .middleTitle {
      display: flex;
      flex-direction: column;
      align-items: center;
      .p2 {
        color: #333333;
        span {
          font-size: 30px;
          font-weight: bold;
        }
      }
    }
    .line {
      width: 1px;
      height: 45px;
      background-color: #ecebeb;
    }
  }
}
.backgroundPicture {
  position: relative;
  .text {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    p:nth-of-type(1) {
      font-size: 1.9rem;
      font-weight: bold;
      margin: 25px 15px 0;
    }
    p:nth-of-type(2) {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.applicationConditions {
  color: #333333;
  padding: 0 1rem;
  .conditionsList {
    background-color: #f3f4f5;
    min-height: 15.5rem;
    border-radius: 10px;
    padding: 1rem 0;
    box-sizing: border-box;
    .list {
      padding: 2px 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        p {
          font-size: 14px;
          color: #333333;
          margin-left: 10px;
        }
        .examinationColumn {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
        }
      }
      .right {
        color: #999999;
        font-size: 14px;
      }
    }
  }
}
footer {
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  position: fixed;
  bottom: 2rem;
}
</style>