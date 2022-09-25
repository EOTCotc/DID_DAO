<template>
  <!-- 确定信息 -->
  <div ref="child" class="container-child" :style="`min-height:${height}px;`">
    <div class="tille">重要提醒</div>
    <p class="parag">
      注销帐号是不可恢复的操作，操作之前，请确认与帐号相关的所有资产均已进行妥善处理。
    </p>
    <p class="parag">
      请谨记:注销帐号，你将无法再使用本帐号或找回你添加或绑定的任何内容或信息(即使你使用相同的邮箱再次注册)，包括但不限于
    </p>
    <p class="parag">(1)你将无法登录、使用本帐号，你的团队关系将不存在。</p>
    <p class="parag">(2)注销微信帐号前，你需妥善处理账户下所有资金问题。</p>
    <p class="parag">
      (3)你通过账号使用，曾获得的奖励、卡牌、盲盒、权益、资格、订单、优惠等视为你自行放弃，将无法继续使用。你理解并同意，EOTC无法协助你重新恢复前述资产。
    </p>
    <p class="parag">(4)与帐号的所有功能或服务都将无法继续使用。</p>
    <p class="parag">
      (5)在帐号注销期间，如果你的帐号正处于仲裁程序中，EOTC、DAO有权终止你帐号的注销而无需另行得到你的同意。
    </p>

    <div class="btn">
      <button @click="$router.push('reason')">我已阅读</button>
      <button @click="$router.go(-2)">再想想</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "remind",
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    // 动态获取高度
    this.height = document.body.clientHeight - 235;
    this.changeStepNum(1); //修改步骤
    this.changeBackNum(-2); //修改路由返回级数
  },
  methods: {
    ...mapMutations(["changeStepNum", "changeBackNum"]),
  },
};
</script>

<style lang="scss" scoped>
.container-child {
  position: relative;
  padding: 40px 40px 60px 40px;
  margin-top: 24px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #fff;
  .title {
    line-height: 56px;
    font-size: 36px;
    font-weight: bold;
    color: #333;
  }
  .parag:first-of-type {
    margin-top: 24px;
  }
  .parag {
    margin-top: 12px;
    font-size: 32px;
    line-height: 60px;
    color: #333;
  }
  .btn {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    button {
      width: 290px;
      height: 88px;
      font-size: 32px;
      border: none;
      border-radius: 44px;
    }
    button:first-of-type {
      color: #333;
      background: #f3f4f5;
    }
    button:last-of-type {
      color: #fff;
      background: #247ff6;
    }
  }
}
</style>