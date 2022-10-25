<template>
  <div class="signin">
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
      <van-button class="btn-login" type="default" @click="login">{{
        $t("menu.login")
      }}</van-button>
      <div class="about-account">
        <div @click="$router.push('/forgotPwd')">
          {{ $t("content.forgetPwd") }}
        </div>
        <!-- <div class="sign-in" @click="handleBtn">
          {{ $t("content.register") }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/pagesApi/login";
import { loadweb3 } from "@/utils/web3";
export default {
  name: "logIn",
  props: {
    wallet: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      show: false,
      pwd: "",
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
    // 如果没有钱包地址输入邮箱和密码
    this.show = !!this.form.walletAddress;
    if (localStorage.getItem("myaddress")) {
      this.show = true;
      this.form.walletAddress = localStorage.getItem("myaddress");
      this.form.otype = this.form.walletAddress.length === 34 ? "trx" : "bsc";
      this.form.sign = localStorage.getItem("mysign");
      // 自动登录
      login(this.form).then((res) => {
        if (res.data.code == 0) {
          this.cookie.set("token", res.data.items);
          this.$router.replace("/");
        }
      });
    } else {
      // 获取钱包地址，网络类型...
      loadweb3(() => {
        this.$router.go(0);
      });
    }
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
    // 登录
    login() {
      this.$refs.form
        .validate()
        .then(() => {
          if (this.pwd) {
            this.form.password = this.$md5(this.pwd + "uEe");
          }
          login(this.form).then((res) => {
            if (res.data.code == 0) {
              this.cookie.set("token", res.data.items, { expires: 30 });
              this.$toast.success({
                forbidClick: true,
                message: this.$t("content.login_suc"),
                onClose: () => this.$router.replace("/"),
              });
            } else {
              this.$toast.fail(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$toast.fail(this.$t("content.msg1"));
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.signin {
  position: relative;
  padding: 89px 38px 300px 38px;
  overflow: hidden;
  flex: 1;
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
  .about-account {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28px;
    .sign-in {
      margin-left: 10px;
      color: #2483ff;
    }
  }
}
</style>