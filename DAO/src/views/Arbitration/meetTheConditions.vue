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
          <div class="right">去考试
            <van-icon name="arrow" />
          </div>
        </div>
      </div>

    </div>
    <footer>
      <van-button round
                  block
                  disabled
                  type="info"
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
    }
  },
  methods: {
    auditing(name) {
      this.$router.push({ name: name })
    },
  },
}
</script>
<style lang="scss" scoped>
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