<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar>
      <template #left>
        <van-icon @click="$router.replace('/setup')" name="arrow-left" color="#000" size="18" />
      </template>
      <template #title>
        <span class="title">{{ $t("logout.logout") }}</span>
      </template>
    </van-nav-bar>
    <!-- 隔离条 -->
    <div class="line"></div>
    <div class="content">
      <van-form ref="form">
        <div class="form-item">
          <p class="top-label">{{ $t("content.email") }}</p>
          <van-field v-model="form.mail" disabled :placeholder="$t('rulesMsg.email')">
            <template #button>
              <van-button v-show="isSendCode" size="small" @click="sendCode">{{
                  $t("content.send_code")
              }}</van-button>
              <span v-show="!isSendCode">{{ second }}S</span>
            </template>
          </van-field>
        </div>

        <div class="form-item">
          <p class="top-label">{{ $t("content.email_code") }}</p>
          <van-field v-model="form.code" @input="haveCode" type="number" :placeholder="$t('rulesMsg.code')"
            :rules="[{ required: true, message: $t('rulesMsg.code') }]" />
        </div>
      </van-form>
      <button class="btn" :disabled="isBtn" @click="showPopup = true" :style="isBtn ? '' : 'background:#237FF8;'">
        {{ $t("logout.submit") }}
      </button>
    </div>

    <van-popup v-model="showPopup" round>
      <div class="popup">
        <div class="caution">{{ $t("logout.warn") }}</div>
        <div class="popup-content">
          <p>{{ $t("logout.warn1") }}</p>
          <p>{{ $t("logout.warn2") }}</p>
          <p>
            {{ $t("logout.warn3") }}
          </p>
        </div>
        <div class="popup-btn">
          <div @click="showPopup = false">{{ $t("public.cancel") }}</div>
          <div @click="submit">{{ $t("public.confirm") }}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getCode } from "@/api/pagesApi/login";
import { logout } from "@/api/pagesApi/logout";
export default {
  name: "verifyLogout",
  data () {
    return {
      isBtn: true, //禁用按钮
      isSendCode: true, //是否发送验证码
      second: 60,
      showPopup: false, //是否显示弹出层
      form: {
        reason: "",
        mail: "",
        code: "",
      },
    };
  },
  mounted () {
    this.form.reason = this.$route.query.reason;
    this.form.mail = JSON.parse(this.cookie.get("userInfo")).mail;
  },
  methods: {
    // 发送验证码
    sendCode () {
      this.isSendCode = false;
      // 再次获取验证码倒计时
      let timer = setInterval(() => {
        this.second--;
        if (this.second == 0) {
          this.isSendCode = true;
          this.second = 60;
          clearInterval(timer);
        }
      }, 1000);
      getCode({ mail: this.form.mail, type: 1 }).then((res) => {
        console.log(res.data, "验证码");
      });
    },
    // 是否填写验证码
    haveCode () {
      if (this.form.code) {
        this.isBtn = false;
      }
    },
    // 确定
    submit () {
      if (this.form.code) {
        logout(this.form).then((res) => {
          if (res.data.code == 0) {
            this.$toast.success(res.data.message);
            this.$router.replace("/setup/logout/logoutCountdown");
          } else if (res.data.code == 1) {
            this.$toast.fail(res.data.message);
          } else {
            this.$toast.fail(res.data.message);
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

.line {
  height: 20px;
  background: #f3f4f5;
}

.van-cell {
  padding: 0;
}

.van-button {
  border: none;
  color: #237ff8;
  border-left: 1px solid #c8cfde;
}

:deep(.van-field__body) {
  padding: 0 10px;
  margin-top: 10px;
  height: 48px;
  border: 1px solid #c8cfde;
  border-radius: 10px;
}

.content {
  padding: 30px 30px 0 30px;

  .form-item+.form-item {
    margin-top: 30px;
  }

  .form-item {
    p {
      font-size: 32px;
      color: #333;
    }
  }

  .btn {
    position: absolute;
    bottom: 67px;
    width: 92%;
    height: 88px;
    font-size: 32px;
    color: #fff;
    border: none;
    border-radius: 44px;
    background: #90befa;
  }
}

.popup {
  width: 630px;
  height: 590px;

  .caution {
    margin-top: 30px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: #fc7542;
  }

  .popup-content {
    margin-top: 30px;
    padding: 0 52px;
    line-height: 52px;
    font-size: 32px;
    color: #333;
  }

  .popup-btn {
    margin-top: 40px;
    border-top: 1px solid #f3f4f5;
    display: flex;
    justify-content: flex-start;

    div {
      width: 50%;
      height: 96px;
      text-align: center;
      line-height: 96px;
      font-size: 31px;
    }

    div:first-of-type {
      color: #666;
      border-right: 1px solid #f3f4f5;
    }

    div:last-of-type {
      color: #1b2945;
      font-weight: bold;
    }
  }
}
</style>