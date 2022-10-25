<template>
  <div class="container">
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
        <span style="font-weight: bold">{{ $t("content.forgotPwd") }}</span>
      </template>
    </van-nav-bar>

    <div class="line"></div>

    <!-- 表单 -->
    <div class="content">
      <van-form @submit="onSubmit" @failed="onFailed">
        <div class="form-item form-code">
          <p>{{ $t("content.email") }}</p>
          <van-field
            v-model="form.mail"
            name="mail"
            :placeholder="$t('rulesMsg.email')"
            :rules="[
              { required: true, message: $t('rulesMsg.email') },
              { validator: mailRule, message: $t('rulesMsg.correct_mail') },
            ]"
          />
          <div class="send-code">
            <van-button
              plain
              type="info"
              :text="codeText"
              size="small"
              native-type="button"
              @click="sendCode"
            />
          </div>
        </div>

        <div class="form-item">
          <p>{{ $t("content.email_code") }}</p>
          <van-field
            v-model="form.code"
            name="code"
            :placeholder="$t('rulesMsg.code')"
            :rules="[{ required: true, message: $t('rulesMsg.code') }]"
          />
        </div>

        <div class="form-item">
          <p>
            {{ $t("setup.new_pwd") }} <span>({{ $t("content.include") }})</span>
          </p>
          <van-field
            type="password"
            v-model="form.newPassWord"
            name="newPassWord"
            type="password"
            :placeholder="$t('rulesMsg.signin_pwd')"
            :rules="[
              { required: true, message: $t('rulesMsg.signin_pwd') },
              { validator: minNumPWD, message: $t('content.include') },
            ]"
          />
        </div>

        <div class="form-item">
          <p>{{ $t("content.confirm_pass") }}</p>
          <van-field
            type="password"
            v-model="form.confirmPwd"
            name="confirmPwd"
            type="password"
            :placeholder="$t('rulesMsg.confirm_pass')"
            :rules="[
              { required: true, message: $t('rulesMsg.confirm_pass') },
              { validator: isWhether, message: $t('rulesMsg.different_pass') },
            ]"
          />
        </div>

        <div class="sub">
          <van-button round block type="info" native-type="submit">{{
            $t("logout.submit")
          }}</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getCode, forgotPwd } from "@/api/pagesApi/login";
export default {
  data() {
    return {
      codeText: this.$t("content.send_code"),
      codeTime: 60,
      isCode: true, //倒计时的时候禁用
      form: {
        mail: "",
        code: "",
        newPassWord: "",
        confirmPwd: "",
      },
    };
  },
  methods: {
    // 邮箱验证规则
    mailRule() {
      const regMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      return regMail.test(this.form.mail);
    },
    // 密码验证规则
    minNumPWD() {
      return /^(?=.*[0-9].*)(?=.*[A-Za-z].*).{8,}$/.test(this.form.newPassWord);
    },
    // 确认密码是否相同
    isWhether() {
      return this.form.newPassWord == this.form.confirmPwd;
    },
    // 发送验证码
    sendCode() {
      if (this.isCode && this.form.mail && this.mailRule()) {
        this.isCode = false;
        this.getCode();
        let timer = setInterval(() => {
          this.codeTime--;
          this.codeText = `${this.codeTime}S`;
          if (this.codeTime <= 0) {
            this.codeTime = 60;
            this.isCode = true;
            this.codeText = this.$t("content.send_code");
            clearInterval(timer);
          }
        }, 1000);
      }
    },
    // 获取验证码
    getCode() {
      getCode({ mail: this.form.mail, type: 1 }).then((res) => {
        console.log(res);
      });
    },
    // 验证通过
    onSubmit() {
      delete this.form.confirmPwd;
      forgotPwd({
        ...this.form,
        newPassWord: this.$md5(this.form.newPassWord + "uEe"),
      }).then((res) => {
        if (res.data.code == 0) {
          this.$toast.success(this.$t("content.success"));
          setTimeout(() => {
            this.$router.back();
          }, 600);
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    },
    // 验证失败
    onFailed(values) {
      this.$toast.fail(values.errors[0].message);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.line {
  height: 20px;
  background: #f3f4f5;
}
.van-cell {
  margin-top: 10px;
  padding: 0;
}
:deep(.van-field__body) {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #c8cfde;
}
.van-button {
  width: 80px;
  border: none;
  border-left: 1px solid #c8cfde;
}
.content {
  position: relative;
  padding: 0 30px 200px 30px;
  flex: 1;
  .form-item {
    margin-top: 30px;
    p {
      font-size: 32px;
      color: #333;
      span {
        font-size: 28px;
        color: #999;
      }
    }
  }
  .form-code {
    position: relative;
    :deep(.van-field__body) {
      padding-right: 90px;
    }
    .send-code {
      position: absolute;
      top: 70px;
      right: 4px;
    }
  }
  .sub {
    position: absolute;
    bottom: 60px;
    width: 92%;
    :deep(.van-button) {
      width: 100%;
    }
  }
}
</style>