<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar>
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          color="#000"
          size="18"
        />
      </template>
      <template #title>
        <span class="title">修改邮箱地址</span>
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <div class="content">
      <van-form ref="form" validate-trigger="onBlur">
        <!-- 邮箱地址 -->
        <div class="form-item">
          <p>新邮箱地址</p>
          <van-field v-model="form.mail" center placeholder="请输入新邮箱地址">
            <template #button>
              <van-button @click="sendCode" v-show="!isSendCode" size="small"
                ><span :style="form.mail ? 'color:#237FF8;' : ''"
                  >发送验证码</span
                ></van-button
              >
              <span v-show="isSendCode">{{ times }}S</span>
            </template>
          </van-field>
        </div>
        <!-- 邮箱验证码 -->
        <div class="form-item">
          <p>新邮箱验证码</p>
          <van-field
            type="number"
            v-model="form.code"
            center
            :disabled="form.mail ? false : true"
            @input="handleCode"
            placeholder="请输入新邮箱验证码"
          >
          </van-field>
        </div>
      </van-form>
      <!-- 步骤 -->
      <div class="setp">
        <div class="setp-txt-box">
          <div
            class="setp-txt"
            :style="
              isStyle == 1
                ? 'background:#247FF6;'
                : isStyle == 2
                ? 'background:#fff;border:2px solid #00B87A;color:#00B87A;'
                : ''
            "
            @click="btnAuthorization"
          >
            <span>授权</span>
            <div
              :style="
                isStyle == 1
                  ? 'background:#247FF6;'
                  : isStyle == 2
                  ? 'background:#00B87A;'
                  : ''
              "
            >
              1
            </div>
          </div>
          <div
            class="line"
            :style="isStyle == 2 ? 'background:#247FF6;' : ''"
          ></div>
          <div
            class="setp-txt"
            :style="isStyle == 2 ? 'background:#247FF6;' : ''"
            @click="commitChange"
          >
            <span>提交修改</span>
            <div :style="isStyle == 2 ? 'background:#247FF6;' : ''">2</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode } from "@/api/pagesApi/login";
import { changemail } from "@/api/pagesApi/setEmail";
import { loadweb3 } from "@/utils/web3";
export default {
  name: "setEmail",
  data() {
    return {
      active: 0,
      times: 60,
      isSendCode: false, //发送验证码按钮是否隐藏
      isStyle: 0,
      form: {
        mail: "",
        code: "",
      },
    };
  },
  methods: {
    // 验证邮箱是否正确
    mailReg() {
      const regMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      return regMail.test(this.form.mail);
    },
    // 发送验证码
    sendCode() {
      if (this.form.mail != "" && this.mailReg()) {
        this.isSendCode = true;
        if (this.times >= 0) {
          let timer = setInterval(() => {
            this.times--;
            if (this.times == 0) {
              this.isSendCode = false;
              clearInterval(timer);
            }
          }, 1000);
        }
        getCode({ mail: this.form.mail }).then((res) => {
          console.log(res.data, "邮箱验证码");
        });
      } else if (this.form.mail == "") {
        this.$toast("请填写邮箱");
      } else if (!this.mailReg()) {
        this.$toast("请填写正确的邮箱");
      }
    },
    // 验证码是否输入
    handleCode(value) {
      if (value.length == 6) {
        this.isStyle = 1;
      } else {
        this.isStyle = 0;
      }
    },
    // 授权
    btnAuthorization() {
      if (this.form.code != "") {
        localStorage.removeItem("myaddress", "mysign");
        loadweb3(this.handleSet);
      }
    },
    // 授权成功
    handleSet() {
      if (localStorage.getItem("myaddress")) {
        this.isStyle = 2;
      }
    },
    // 提交修改
    commitChange() {
      if (this.isStyle == 2) {
        this.form.walletAddress = localStorage.getItem("myaddress");
        this.form.otype = localStorage.getItem("netType");
        this.form.sign = localStorage.getItem("mysign");
        changemail(this.form).then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            this.$toast.success("修改成功");
            setTimeout(() => {
              this.$router.push("/login");
            }, 500);
          } else {
            this.$toast.fail("修改邮箱失败");
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 36px;
  color: #333;
  font-weight: bold;
}
.content {
  padding: 0 30px;
}
.van-cell {
  padding: 10px 0;
}
:deep(.van-field__body) {
  padding: 0 10px;
  height: 48px;
  border-radius: 16px;
  border: 1px solid #c8cfde;
}
.van-button {
  font-size: 14px;
  color: #999;
  border: none;
  border-left: 1px solid #c8cfde;
}
.form-item {
  margin-top: 40px;
  p {
    margin-bottom: 20px;
    font-size: 28px;
    color: #333;
  }
}
.setp {
  margin-top: 180px;
  .setp-txt-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    .setp-txt {
      position: relative;
      width: 330px;
      height: 96px;
      line-height: 96px;
      text-align: center;
      font-size: 32px;
      color: #fff;
      border-radius: 48px;
      background: #91befa;
      div {
        position: absolute;
        bottom: -78px;
        left: 50%;
        transform: translateX(-50%);
        width: 48px;
        height: 48px;
        line-height: 48px;
        font-size: 28px;
        color: #fff;
        font-weight: bold;
        border-radius: 50%;
        background: #91befa;
      }
    }
    .setp-txt:last-of-type {
      background: #ccc;
      div {
        background: #ccc;
      }
    }
    .line {
      position: absolute;
      bottom: -58px;
      left: 50%;
      transform: translateX(-50%);
      width: 420px;
      height: 2px;
      background: linear-gradient(46deg, #247ff6 0%, #cccccc 100%);
    }
  }
}
</style>