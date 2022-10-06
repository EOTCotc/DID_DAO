<template>
  <div class="log-in" :style="`min-height:${height}px;`">
    <van-form ref="form" validate-trigger="onSubmit">
      <!-- 选择网络 -->
      <div class="title">{{ $t("content.signin_title") }}</div>
      <div class="from-item" v-if="form.walletAddress">
        <p class="from-item">{{ $t("content.select_network") }}</p>
        <van-field
          v-model="form.otype"
          :disabled="true"
          :placeholder="$t('content.select_network')"
        />
      </div>
      <!-- 钱包地址 -->
      <div class="from-item" v-if="form.walletAddress">
        <p>{{ $t("content.wallet_address") }}</p>
        <van-field
          v-model="form.walletAddress"
          :disabled="true"
          :placeholder="$t('content.wallet_address')"
        />
      </div>
      <!-- 邮箱地址 -->
      <div class="from-item code">
        <p>{{ $t("content.email") }}</p>
        <van-field
          v-model="form.mail"
          :placeholder="$t('content.email')"
          :rules="[
            { required: true, message: $t('rulesMsg.email') },
            { validator: mailRule, message: $t('rulesMsg.correct_mail') },
          ]"
          ><template #button>
            <van-button
              size="small"
              :color="emailBtnColor"
              type="primary"
              native-type="button"
              @click="handleCode"
            >
              <span v-show="showCode" style="font-size: 12px">{{
                $t("content.send_code")
              }}</span>
              <span v-show="!showCode" style="color: #999">{{ seconds }}S</span>
            </van-button>
          </template>
        </van-field>
      </div>
      <!-- 邮箱验证码 -->
      <div class="from-item">
        <p>{{ $t("content.email_code") }}</p>
        <van-field
          v-model="form.code"
          type="number"
          :placeholder="$t('content.email_code')"
          :rules="[{ required: true, message: $t('rulesMsg.code') }]"
        />
      </div>
      <!-- 密码 -->
      <div class="from-item">
        <p>
          {{ $t("content.signin_pwd") }}
          <span class="hint">({{ $t("content.include") }})</span>
        </p>
        <van-field
          v-model="form.password"
          type="password"
          :placeholder="$t('content.signin_pwd')"
          :rules="[
            { required: true, message: $t('rulesMsg.signin_pwd') },
            { validator: minNumPWD, message: $t('content.include') },
          ]"
        />
      </div>
      <!-- 确认密码 -->
      <div class="from-item">
        <p>{{ $t("content.confirm_pass") }}</p>
        <van-field
          v-model="confirmpwd"
          type="password"
          :placeholder="$t('content.confirm_pass')"
          :rules="[
            { required: true, message: $t('rulesMsg.confirm_pass') },
            { validator: isWhether, message: $t('rulesMsg.different_pass') },
          ]"
        />
      </div>
      <!-- 邀请地址 -->
      <div class="from-item">
        <p>
          {{ $t("content.invitation_code") }}
          <span class="hint">({{ $t("content.not_required") }})</span>
        </p>
        <van-field
          v-model="form.refUserId"
          type="text"
          :placeholder="$t('rulesMsg.invited_address')"
        />
      </div>
      <!-- 协议 -->
      <div class="protocol" @click="handleRadio">
        <van-checkbox
          icon-size="16px"
          shape="square"
          checked-color="#1B2945"
          v-model="checked"
        >
          <span class="">
            {{ $t("content.read_agree") }}
            <span style="color: #2483ff"
              >《{{ $t("content.user_agreement") }}》</span
            >
          </span>
        </van-checkbox>
      </div>
    </van-form>
    <div class="signin-box">
      <van-button
        class="btn-login"
        type="info"
        native-type="submit"
        @click="onSubmit"
        >{{ $t("content.registration") }}</van-button
      >
      <div class="tips">
        {{ $t("content.have_account") }}
        <span class="sign-in" @click="handleBtn">
          {{ $t("content.to_login") }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, register } from "@/api/pagesApi/login";
export default {
  name: "logIn",
  data() {
    return {
      height: 0,
      showCode: true, //验证码按钮显示隐藏
      emailBtnColor: "#1B2945", //发送验证码按钮颜色
      seconds: 60, //重新发送验证码倒计时
      confirmpwd: "", //确认密码
      checked: false, //是否勾选协议
      form: {
        otype: "", //网络
        walletAddress: "", //钱包地址
        mail: "", //邮箱地址
        code: "", //验证码
        password: "", //密码
        refUserId: "", //邀请地址
        sign: "", //空
      },
    };
  },
  mounted() {
    this.form.refUserId = this.$route.query.code || "";
    this.height = document.body.scrollHeight - 152;
    this.form.walletAddress = localStorage.getItem("myaddress");
    this.form.otype = localStorage.getItem("netType");
    this.form.sign = localStorage.getItem("mysign");
  },
  methods: {
    // 点击去登录
    handleBtn() {
      this.$emit("btnNum", 1);
    },
    // 点击发送验证码
    handleCode() {
      this.showCode = false;
      // 更改按钮颜色
      this.emailBtnColor = "#fff";
      getCode({ mail: this.form.mail }).then((res) => {
        console.log(res.data, "code");
      });
      if (0 < this.seconds) {
        //重新发送验证码倒计时
        let timer = setInterval(() => {
          this.seconds--;
          if (this.seconds == 0) {
            //清除定时器并初始化
            this.emailBtnColor = "#1B2945";
            this.showCode = true;
            this.seconds = 60;
            clearInterval(timer);
          }
        }, 1000);
      }
    },
    // 邮箱验证规则
    mailRule() {
      const regMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      return regMail.test(this.form.mail);
    },
    // 密码验证规则
    minNumPWD() {
      return /^(?=.*[0-9].*)(?=.*[A-Za-z].*).{8,}$/.test(this.form.password);
    },
    // 确认密码是否相同
    isWhether() {
      return this.form.password == this.confirmpwd;
    },
    // 是否选择协议
    handleRadio() {
      this.checked = !this.checked;
    },
    // 表单是否通过验证
    onSubmit() {
      // 因为是否勾选协议不在form里面，所以要先判断
      if (this.checked) {
        this.$refs.form
          .validate()
          .then(() => {
            let newForm = Object.assign({}, this.form);
            newForm.password = this.$md5(newForm.password);
            // 注册请求
            register(newForm).then((res) => {
              if (res.data.code == 0) {
                this.$toast.success("注册成功！");
                setTimeout(() => {
                  //延迟一点时间
                  this.$emit("btnNum", 1); //成功跳登录页
                }, 500);
              } else {
                this.$toast.fail(res.data.message);
              }
            });
          })
          .catch(() => {
            this.$toast.fail("注册失败");
          });
      } else {
        this.$toast.fail("请勾选协议");
      }
    },
  },
  created() {
    this.form.refUserId = location.href.split("?code=")[1] || "";
  },
};
</script>

<style lang='scss' scoped>
// 修改vant样式
.van-cell {
  padding: 0;
}
:deep(.van-field__body) {
  margin-top: 10px;
  padding: 8px 10px;
  font-size: 14px;
  color: #666;
  border: 1px solid #c8cfde;
  border-radius: 16px;
}
.code {
  :deep(.van-field__body) {
    padding: 8px 10px;
  }
}
// 普通样式
.log-in {
  position: relative;
  margin-top: 89px;
  padding: 89px 38px 300px 38px;
  overflow: hidden;
}
.from-item {
  margin-top: 30px;
  .hint {
    font-size: 24px;
    color: #999;
  }
}
p,
.title {
  font-size: 28px;
}
.protocol {
  margin-top: 60px;
  display: flex;
  align-items: center;
  span {
    font-size: 28px;
  }
}
:deep(.van-checkbox__label) {
  font-size: 28px;
}
:deep(.van-button--info){
  border: none;
}
.signin-box {
  position: absolute;
  bottom: 60px;
  width: 90%;
  .btn-login {
    margin-left: 50%;
    margin-top: 40px;
    transform: translateX(-50%);
    text-align: center;
    width: 100%;
    height: 96px;
    color: #fff;
    background: #1b2945;
    border-radius: 48px;
  }
  .tips {
    margin-top: 40px;
    font-size: 28px;
    text-align: center;
  }
  .sign-in {
    margin-left: 10px;
    color: #2483ff;
  }
}
</style>