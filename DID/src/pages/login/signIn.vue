<template>
  <div class="log-in">
    <van-form ref="form">
      <!-- 选择网络 -->
      <div class="first-item">
        <div class="title">EOTC采用严格的邀请注册制</div>
        <p class="from-item">选择网络</p>
        <van-field
          v-model="form.otype"
          :disabled="true"
          placeholder="选择网络"
        />
      </div>
      <!-- 钱包地址 -->
      <div class="from-item">
        <p>钱包地址</p>
        <van-field
          v-model="form.walletAddress"
          :disabled="true"
          placeholder="钱包地址"
        />
      </div>
      <!-- 邮箱地址 -->
      <div class="from-item code">
        <p>邮箱地址</p>
        <van-field
          v-model="form.mail"
          placeholder="邮箱地址"
          :rules="[
            { required: true, message: '请输入邮箱' },
            { validator: mailRule, message: '请输入正确的邮箱' },
          ]"
          ><template #button>
            <van-button
              size="small"
              :color="emailBtnColor"
              type="primary"
              @click="handleCode"
            >
              <span v-show="showCode" style="font-size: 12px">发送验证码</span>
              <span v-show="!showCode" style="color: #999">{{ seconds }}S</span>
            </van-button>
          </template>
        </van-field>
      </div>
      <!-- 邮箱验证码 -->
      <div class="from-item">
        <p>邮箱验证码</p>
        <van-field
          v-model="form.code"
          type="number"
          placeholder="邮箱验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
        />
      </div>
      <!-- 密码 -->
      <div class="from-item">
        <p>密码 <span class="hint">(包含字母、数字 最少8位)</span></p>
        <van-field
          v-model="form.password"
          type="password"
          placeholder="密码"
          :rules="[
            { required: true, message: '请填写密码' },
            { validator: minNumPWD, message: '包含字母、数字 最少8位' },
          ]"
        />
      </div>
      <!-- 确认密码 -->
      <div class="from-item">
        <p>确认密码</p>
        <van-field
          v-model="confirmpwd"
          type="password"
          placeholder="确认密码"
          :rules="[
            { required: true, message: '请确认密码' },
            { validator: isWhether, message: '密码不相同' },
          ]"
        />
      </div>
      <!-- 邀请地址 -->
      <div class="from-item">
        <p>邀请码<span class="hint">(非必填)</span></p>
        <van-field
          v-model="form.refUserId"
          type="text"
          placeholder="请输入邀请地址"
        />
      </div>
      <!-- 协议 -->
      <div class="protocol" @click="handleRadio">
        <van-checkbox
          icon-size="16px"
          shape="square"
          checked-color="#1B2945"
          v-model="checked"
          :rules="[{ required: checked, message: '请勾选协议' }]"
        >
          <span class="">
            我已阅读并同意<span style="color: #2483ff">《用户协议》</span>
          </span>
        </van-checkbox>
      </div>
    </van-form>
    <van-button
      class="btn-login"
      type="info"
      native-type="submit"
      @click="onSubmit"
      >确定注册</van-button
    >
    <div class="tips">
      已账户<span class="sign-in" @click="handleBtn">去登录</span>
    </div>
  </div>
</template>

<script>
import { getCode, register } from "@/api/pagesApi/login";
export default {
  name: "logIn",
  data() {
    return {
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
        console.log(res, "code");
      });
      if (0 < this.seconds) {
        //重新发送验证码倒计时
        let timer = setInterval(() => {
          this.seconds--;
          if (this.seconds == 0) {
            //清除定时器并初始化
            this.emailBtnColor = "#1B2945";
            this.showCode = true;
            this.seconds = 10;
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
            console.log(newForm);
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
:deep(.van-field__error-message) {
  margin-top: 20px;
}
// 普通样式
.log-in {
  position: relative;
  margin-top: 89px;
  padding: 0 38px 60px 38px;
  min-height: 1140px;
  overflow: hidden;
}
.first-item {
  margin-top: 88px;
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
</style>