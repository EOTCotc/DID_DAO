<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar>
      <template #left>
        <van-icon
          @click="$router.go(getBackNum)"
          name="arrow-left"
          color="#000"
          size="18"
        />
      </template>
      <template #title>
        <span class="title">账号注销</span>
      </template>
    </van-nav-bar>

    <!-- 内容 -->
    <div class="content">
      <!-- 注销的用户 -->
      <div class="user">
        <img src="../../assets/imgs/zhuxiao.png" />
        <div>
          注销<span>{{ mail }}</span>
        </div>
        <p>所绑定的账户</p>
      </div>
      <!-- 步骤 -->
      <div class="step-box">
        <van-steps :active="getStepNum">
          <!-- 确定信息 -->
          <van-step>
            <span class="step-tit">确定信息</span>
            <!-- 未激活 -->
            <template #inactive-icon>
              <div class="step-icon inactive">1</div>
            </template>
            <!-- 激活 -->
            <template #active-icon>
              <div class="step-icon active">1</div>
            </template>
            <!-- 已完成步骤 -->
            <template #finish-icon>
              <div class="step-icon finish">1</div>
            </template>
          </van-step>
          <!-- 重要提醒 -->
          <van-step>
            <span class="step-tit">重要提醒</span>
            <!-- 未激活 -->
            <template #inactive-icon>
              <div class="step-icon inactive">2</div>
            </template>
            <!-- 激活 -->
            <template #active-icon>
              <div class="step-icon active">2</div>
            </template>
            <!-- 已完成步骤 -->
            <template #finish-icon>
              <div class="step-icon finish">1</div>
            </template>
          </van-step>
          <!-- 注销原因 -->
          <van-step>
            <span class="step-tit">注销原因</span>
            <!-- 未激活 -->
            <template #inactive-icon>
              <div class="step-icon inactive">3</div>
            </template>
            <!-- 激活 -->
            <template #active-icon>
              <div class="step-icon active">3</div>
            </template>
          </van-step>
          <!-- 已完成步骤 -->
          <template #finish-icon>
            <div class="step-icon finish">1</div>
          </template>
        </van-steps>
      </div>
      <!-- 确定信息 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "logout",
  data() {
    return {
      mail: "",
    };
  },
  mounted() {
    this.changeStepNum(0); //修改步骤
    this.changeBackNum(-1); //修改路由返回级数
    this.mail = JSON.parse(this.cookie.get("userInfo")).mail;
  },
  computed: {
    ...mapGetters(["getStepNum", "getBackNum"]),
  },
  methods: {
    ...mapMutations(["changeStepNum", "changeBackNum"]),
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #f3f4f5;
  min-height: 100vh;
}
.title {
  font-size: 36px;
  color: #333;
  font-weight: bold;
}
// 内容
.content {
  padding: 0 30px;
  // 注销的用户
  .user {
    margin: 40px 0;
    text-align: center;
    font-size: 32px;
    color: #333;
    img {
      width: 66px;
      height: 66px;
    }
    div {
      margin-top: 30px;
      span {
        color: #247ff6;
      }
    }
  }
  // 步骤
  :deep(.van-steps) {
    border-radius: 10px;
  }
  .step-box {
    height: 147px;
    background: #fff;
    border-radius: 20px;
    .step-tit {
      font-size: 28px;
    }
    .step-icon {
      width: 32px;
      height: 32px;
      font-size: 24px;
      text-align: center;
      line-height: 32px;
      color: #fff;
      border-radius: 50%;
    }
    .inactive {
      background: #ccc;
    }
    .active,
    .finish {
      background: #fc7542;
    }
  }
}
</style>