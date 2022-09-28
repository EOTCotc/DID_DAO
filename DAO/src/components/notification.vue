<template>
  <van-overlay :show="show"
               @click="toggle(false)">
    <div class="dialog_wrap">
      <slot name="headerIcon">
        <img class="dialog-header-icon"
             :src="headerIcon"
             alt="" />
      </slot>
      <div class="dialog-title">{{ title }}</div>
      <div class="dialog-message">{{ message }}</div>
      <div class="dialog-btn">
        <van-button round
                    block
                    class="btn"
                    :color="buttonColor"
                    @click.stop="handleButtonClick">
          {{ buttonText }}
        </van-button>
      </div>
      <div class="close">
        <van-icon name="close" />
      </div>
    </div>
  </van-overlay>
</template>

<script>
<<<<<<< HEAD
import { getuserrisklevel } from '@/api/viewsApi/home'
=======
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
export default {
  name: 'notification',
  props: {
    headerIcon: { type: String },
    title: { type: String },
    message: { type: String },
    buttonColor: { type: String },
    buttonText: { type: String },
    closeOnClick: { type: Boolean, default: true },
  },
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    this.getuserrisklevel()
  },
  methods: {
    // 获取风险等级
    getuserrisklevel() {
      getuserrisklevel().then((res) => {
        if (res.data.code == 0) {
          if (res.data.items == 2) {
            this.show = true
          }
        }
      })
    },
    toggle(show) {
      this.show = show
      !show && this.$nextTick().then(() => this.$emit('closed'))
    },
    handleButtonClick() {
      this.$emit('buttonClick')
      this.closeOnClick && this.toggle(false)
    },
  },
}
</script>

<style scoped lang="scss">
.dialog_wrap {
  @include centered();
  top: 40%;
  width: 80%;
  padding: 30px;
  border-radius: 48px;
  box-sizing: border-box;
  background-color: #fff;
  .dialog-header-icon {
    display: block;
    width: 150px;
    margin: -80px auto 0;
  }
  .dialog-title {
    color: #333;
    font-size: 36px;
    font-weight: bold;
    margin-top: 30px;
    text-align: center;
  }
  .dialog-message {
    color: #333;
    font-weight: bold;
    font-size: 30px;
    margin-top: 20px;
    line-height: 1.3;
    text-align: center;
  }
  .dialog-btn {
    width: 60%;
    margin: 40px auto 0;
  }
  .close {
    @include posi($b: -120px, $l: 50%);
    transform: translate(-50%);
    color: #fff;
    font-size: 60px;
  }
}
</style>