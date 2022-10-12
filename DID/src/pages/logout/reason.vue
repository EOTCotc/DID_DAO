<template>
  <!-- 确定信息 -->
  <div ref="child" class="container-child" :style="`min-height:${height}px;`">
    <div class="title">{{ $t("logout.reason") }}</div>
    <div class="radio-box">
      <van-radio-group v-model="radio">
        <van-radio
          v-for="item in radioList"
          :key="item.id"
          :name="item.id"
          @click="handleRadio(item.text, item.id)"
          icon-size="14"
          checked-color="#FC7542"
          >{{ item.text }}</van-radio
        >
      </van-radio-group>
    </div>
    <div class="rests" v-show="showTextArea">
      <van-field
        v-model="cause"
        @input="handleInput"
        rows="3"
        autosize
        type="textarea"
        :placeholder="$t('logout.rests')"
      />
    </div>
    <button
      :disabled="isBtn"
      @click="submit"
      :style="isBtn ? '' : 'background:#247FF6;'"
    >
      {{ $t("logout.conf_off") }}
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "reason",
  data() {
    return {
      height: 0,
      radio: 0,
      radioList: [
        { id: 1, text: this.$t('logout.reason_text1') },
        { id: 2, text: this.$t('logout.reason_text2') },
        { id: 3, text: this.$t('logout.reason_text3') },
        { id: 4, text: this.$t('logout.reason_text4') },
      ],
      showTextArea: false,
      isBtn: true,
      cause: "", //textarea的输入内容
      reason: "", //注销原因
    };
  },
  mounted() {
    // 动态获取高度
    this.height = document.body.clientHeight - 235;
    this.changeStepNum(2); //修改步骤
    this.changeBackNum(-2); //修改路由返回级数
  },
  methods: {
    ...mapMutations(["changeStepNum","changeBackNum"]),
    // 选择原因
    handleRadio(text, id) {
      if (id == 4) {
        //其他原因
        this.showTextArea = true;
        this.handleInput();
      } else {
        this.showTextArea = false;
        this.reason = text;
      }
      if (this.reason) {
        this.isBtn = false;
      } else {
        this.isBtn = true;
      }
    },
    //其他原因
    handleInput() {
      this.reason = this.cause;
      if (this.reason) {
        this.isBtn = false;
      } else {
        this.isBtn = true;
      }
    },
    submit() {
      this.$router.replace({
        path: "/setup/logout/verifyLogout",
        query: { reason: this.reason },
      });
    },
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
  .radio-box {
    margin-top: 20px;
  }
  .van-radio {
    margin-top: 20px;
    font-size: 16px;
  }
  .rests {
    margin-top: 30px;
  }
  .van-cell {
    border-radius: 10px;
    background: #f3f4f5;
  }
  button {
    position: absolute;
    bottom: 67px;
    width: 90%;
    height: 88px;
    font-size: 32px;
    color: #fff;
    border: none;
    border-radius: 44px;
    background: #90befa;
  }
}
</style>