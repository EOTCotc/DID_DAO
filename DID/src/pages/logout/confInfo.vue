<template>
  <!-- 确定信息 -->
  <div ref="child" class="container-child" :style="`min-height:${height}px;`">
    <div class="title">{{ $t("logout.conf_info") }}</div>
    <div class="asset">
      <span class="asset-title">{{ $t("logout.acc_property") }}</span>
      <van-icon v-show="isIcon" name="warning-o" size="16" color="#FC7542" />
      <van-icon v-show="!isIcon" name="passed" size="16" color="#1D9C3F" />
    </div>
    <p class="tips">{{ $t("logout.conf_tip") }}</p>
    <div class="conf" @click="handleDiscard" :style="`color:${color};`">
      <span>{{ $t("logout.give_up") }}</span>
      <van-icon name="arrow" />
    </div>
    <button
      :disabled="isBtn"
      @click="next"
      :style="isBtn ? '' : 'background:#247FF6;'"
    >
      {{ $t("logout.next") }}
    </button>

    <!-- 弹出层 -->
    <van-popup v-model="showPopup" round>
      <div class="popup">
        <div class="popup-title">{{ $t("logout.acc_dispose") }}</div>
        <p class="popup-explain">
          {{ $t("logout.dis_tip") }}
        </p>
        <div class="popup-btn">
          <div class="popup-btn-one" @click="isHandle">
            {{ $t("public.confirm") }}
          </div>
          <div class="popup-btn-two" @click="showPopup = false">
            {{ $t("logout.think_again") }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "confInfo",
  data() {
    return {
      height: "",
      color: "#247ff6",
      isIcon: true, //确定信息的icon图标
      isBtn: true, //是否禁用按钮
      discard: false, //是否放弃
      showPopup: false, //弹出层
    };
  },
  mounted() {
    // 动态获取高度
    this.height = document.body.clientHeight - 235;
  },
  methods: {
    // 下一步
    next() {
      this.$router.replace("remind");
    },
    // 是否放弃账号资产
    handleDiscard() {
      if (!this.discard) {
        this.showPopup = true;
      }
    },
    // 点击弹出层的确定
    isHandle() {
      this.discard = true; //确定放弃，不能二次点击是否放弃
      this.color = "#999"; //确定放弃，显示灰色
      this.isIcon = false; //放弃和不放弃的icon显示
      this.isBtn = false; //确定放弃账号资产才能点击下一步
      this.showPopup = false; //弹出层的隐藏
    },
  },
};
</script>

<style lang="scss" scoped>
.container-child {
  position: relative;
  padding: 40px;
  margin-top: 24px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #fff;
  .title {
    font-size: 36px;
    font-weight: bold;
    color: #333;
  }
  .asset {
    margin-top: 50px;
    display: flex;
    align-items: center;
    .asset-title {
      margin-right: 12px;
      font-size: 32px;
    }
  }
  .tips {
    margin-top: 20px;
    font-size: 32px;
    color: #999;
    line-height: 54px;
  }
  .conf {
    margin-top: 30px;
    font-size: 32px;
    line-height: 56px;
    display: flex;
    align-items: center;
    span {
      margin-right: 14px;
    }
  }
  button {
    position: absolute;
    bottom: 60px;
    width: 90%;
    height: 88px;
    font-size: 31px;
    color: #fff;
    border: none;
    border-radius: 44px;
    background: #90befa;
  }
  // 弹出层
  .popup {
    width: 630px;
    .popup-title {
      margin-top: 30px;
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      color: #333;
    }
    .popup-explain {
      padding: 0 52px;
      margin-top: 30px;
      text-align: center;
      font-size: 32px;
      line-height: 52px;
      color: #fc7542;
    }
    .popup-btn {
      margin-top: 40px;
      display: flex;
      justify-content: flex-start;
      border-top: 1px solid #f3f4f5;
      .popup-btn-one {
        width: 50%;
        font-size: 32px;
        line-height: 96px;
        text-align: center;
        color: #666;
        border-right: 1px solid #f3f4f5;
      }
      .popup-btn-two {
        width: 50%;
        font-size: 32px;
        font-weight: bold;
        line-height: 96px;
        text-align: center;
        color: #1b2945;
      }
    }
  }
}
</style>