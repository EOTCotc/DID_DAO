<template>
  <div :style="`min-height:${height}px;`" class="signin">
    <van-form ref="form">
      <div class="from-item" v-if="show">
        <p>{{ $t("content.select_network") }}</p>
        <van-field
          class="input-border"
          v-model="form.otype"
          :placeholder="$t('content.select_network')"
          :disabled="true"
        />
      </div>
      <div class="from-item" v-if="show">
        <p>{{ $t("content.wallet_address") }}</p>
        <van-field
          class="input-border"
          v-model="form.walletAddress"
          :placeholder="$t('content.wallet_address')"
          :disabled="true"
        />
      </div>
      <div class="from-item">
        <p>{{ $t("content.email") }}</p>
        <van-field
          class="input-border"
          v-model="form.mail"
          :placeholder="$t('content.email')"
          :rules="[
            { required: true, message: $t('rulesMsg.email') },
            { validator: mailRule, message: $t('rulesMsg.correct_mail') },
          ]"
        />
      </div>
      <div class="from-item">
        <p>{{ $t("content.pwd") }}</p>
        <van-field
          class="input-border"
          v-model="pwd"
          type="password"
          :placeholder="$t('content.pwd')"
          :rules="[{ required: true, message: $t('rulesMsg.pwd') }]"
        />
      </div>
    </van-form>
    <div class="btn">
      <van-button class="btn-login" type="default" @click="login">
        {{ $t("menu.login") }}
      </van-button>
      <div class="tips">
        {{ $t("content.not_account") }}
        <span class="sign-in" @click="handleBtn">
          {{ $t("content.register") }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/pagesApi/login";
export default {
  name: "logIn",
  props: {
    wallet: {type: Object, default: () => ({})}
  },
  data() {
    return {
      show: false,
      pwd: "",
      height: 0,
      form: {
        otype: "",
        walletAddress: "",
        sign: "",
        refUserId: "",
        mail: "",
        code: "",
        password: "",
      },
    };
  },
  mounted() {
    this.height = document.body.scrollHeight - 152;
    // 如果没有钱包地址输入邮箱和密码
    this.show = !!this.form.walletAddress;
  },
  methods: {
    // 去注册
    handleBtn() {
      this.$emit("btnNum", 2);
    },
    // 邮箱验证规则
    mailRule() {
      const regMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      return regMail.test(this.form.mail);
    },
    getWallet(data) {
      const {oType, myaddress, sign} = data
      if (oType && myaddress && sign) {
        console.log(2)
        this.form.otype = oType
        this.form.walletAddress = myaddress
        this.form.sign = sign
        this.show = true
      }
    },
    // 登录
    login() {
      this.$refs.form
        .validate()
        .then(() => {
          if (this.pwd) {
            this.form.password = this.$md5(this.pwd);
          }
          login(this.form).then((res) => {
            if (res.data.code == 0) {
              this.cookie.set("token", res.data.items, { expires: 30 });
              this.$toast.success("登录成功");
              setTimeout(() => {
                //跳到首页
                this.$router.push("/");
              }, 800);
            } else {
              this.$toast.fail(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$toast.fail("请输入正确的邮箱或密码");
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.signin {
  position: relative;
  margin-top: 89px;
  padding: 89px 38px 300px 38px;
  overflow: hidden;
}
.from-item {
  margin-top: 30px;
}
p {
  font-size: 28px;
}
.van-cell {
  padding: 0;
}
:deep(.van-field__body) {
  margin-top: 20px;
  padding: 5px 10px;
  font-size: 14px;
  color: #666;
  border: 1px solid #c8cfde;
  border-radius: 16px;
}
.btn {
  position: absolute;
  bottom: 60px;
  width: 92%;
  .btn-login {
    margin-left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 100%;
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