<template>
  <div class="log-in">
    <van-form ref="form">
      <div class="first-item">
        <p>选择网络</p>
        <van-field
          class="input-border"
          v-model="form.otype"
          placeholder="选择网络"
          :disabled="true"
        />
      </div>
      <div class="from-item">
        <p>钱包地址</p>
        <van-field
          class="input-border"
          v-model="form.walletAddress"
          placeholder="钱包地址"
          :disabled="true"
        />
        <div class="from-item">
          <p>邮箱地址</p>
          <van-field
            class="input-border"
            v-model="form.mail"
            placeholder="邮箱地址"
            :rules="[
              { required: true, message: '请填写邮箱地址' },
              { validator: mailRule, message: '请输入正确的邮箱' },
            ]"
          />
        </div>
        <div class="from-item">
          <p>登录密码</p>
          <van-field
            class="input-border"
            v-model="form.password"
            type="password"
            placeholder="登录密码"
            :rules="[{ required: true, message: '请填写登录密码' }]"
          />
        </div>
      </div>
    </van-form>
    <div class="btn">
      <van-button class="btn-login" type="default" @click="login"
        >登录</van-button
      >
      <div class="tips">
        还没有账户<span class="sign-in" @click="handleBtn">立即注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/pagesApi/login";
import { loadweb3 } from "@/utils/web3";
export default {
  name: "logIn",
  props: {},
  data() {
    return {
      form: {
        otype: "",
        walletAddress: "",
        sign: "",
        refUserId: "",
        mail: "591041326@qq.com",
        code: "",
        password: "jianglin1997",
      },
    };
  },
  mounted() {
    loadweb3();
    this.form.walletAddress = localStorage.getItem("address"); //获取钱包地址
    this.form.otype = localStorage.getItem("netType");
  },
  methods: {
    // 去注册
    handleBtn() {
      this.$emit("btnNum", 2);
    },
    // 邮箱验证规则
    mailRule() {
      const regMail =
        /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      return regMail.test(this.form.mail);
    },
    // 登录
    login() {
      this.$refs.form
        .validate()
        .then(() => {
          login(this.form).then((res) => {
            if(res.data.code==0){
              this.cookie.set('token',res.data.items,60)
              this.$toast.success('登录成功')
              setTimeout(() => {//跳到首页
                this.$router.push('/')
              }, 800);
            }
          });
        })
        .catch(() => {
          this.$toast.fail('请输入正确的邮箱或密码')
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.log-in {
  position: relative;
  margin-top: 89px;
  padding: 0 38px 60px 38px;
  min-height: 1140px;
  overflow: hidden;
}
.first-item {
  margin-top: 96px;
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
:deep(.van-field__error-message) {
  margin-top: 20px;
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