<template>
  <!-- 确定信息 -->
  <div ref="child" class="container-child" :style="`min-height:${height}px;`">
    <div class="tille">请选择注销原因</div>
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
        placeholder="请简述其他原因"
      />
    </div>
    <button
      :disabled="isBtn"
      @click="submit"
      :style="isBtn ? '' : 'background:#247FF6;'"
    >
      确定注销
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
        { id: 1, text: "需要解绑邮箱" },
        { id: 2, text: "想要解除当前推荐社区关系" },
        { id: 3, text: "这是多余的账号" },
        { id: 4, text: "其他" },
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
    this.changeBackNum(-3); //修改路由返回级数
  },
  methods: {
    ...mapMutations(["changeStepNum", "changeBackNum"]),
    // 选择原因
    handleRadio(text, id) {
      if (id == 4) {
        //其他原因
        this.showTextArea = true;
        this.handleInput();
      } else {
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
      this.$router.push({
        name: "verifyLogout",
        params: { reason: this.reason },
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