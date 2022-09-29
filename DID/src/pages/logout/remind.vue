<template>
  <!-- 确定信息 -->
  <div ref="child" class="container-child" :style="`min-height:${height}px;`">
    <div class="tille">{{ $t("logout.imp_reminder") }}</div>
    <p class="parag">
      {{ $t("logout.parag1") }}
    </p>
    <p class="parag">
      {{ $t("logout.parag2") }}
    </p>
    <p class="parag">{{ $t("logout.parag3") }}</p>
    <p class="parag">{{ $t("logout.parag4") }}</p>
    <p class="parag">{{ $t("logout.parag5") }}</p>
    <p class="parag">{{ $t("logout.parag6") }}</p>
    <p class="parag">{{ $t("logout.parag7") }}</p>

    <div class="btn">
      <button @click="$router.push('reason')">{{ $t("logout.have_read") }}</button>
      <button @click="$router.go(-2)">{{ $t("logout.think_again") }}</button>
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