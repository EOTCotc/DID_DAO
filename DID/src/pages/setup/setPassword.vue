<template>
  <div class="content">
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
        <span class="title">{{ $t("setup.set_pwd") }}</span>
      </template>
    </van-nav-bar>

    <div>
      <van-form ref="form">
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
                @click="handleCode"
              >
                <span v-show="showCode" style="font-size: 12px">
                  {{ $t("content.send_code") }}</span
                >
                <span v-show="!showCode" style="color: #999"
                  >{{ seconds }}S</span
                >
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
            {{ $t("setup.new_pwd") }}
            <span class="hint">({{ $t("content.include") }})</span>
          </p>
          <van-field
            v-model="form.newPassWord"
            type="password"
            :placeholder="$t('setup.new_pwd')"
            :rules="[
              { required: true, message: $t('rulesMsg.signin_pwd') },
              { validator: minNumPWD, message: $t('content.include') },
            ]"
          />
        </div>
        <!-- 确认密码 -->
        <div class="from-item">
          <p>{{ $t("setup.conf_pwd") }}</p>
          <van-field
            v-model="confirmpwd"
            type="password"
            :placeholder="$t('setup.conf_pwd')"
            :rules="[
              { required: true, message: $t('rulesMsg.confirm_pass') },
              { validator: isWhether, message: $t('rulesMsg.different_pass') },
            ]"
          />
        </div>
      </van-form>
      <button class="commit" @click="onSubmit">
        {{ $t("setup.cimmit_change") }}
      </button>
    </div>
  </div>
</template>

<script>
import { getCode } from "@/api/pagesApi/login";
import { changepwd } from "@/api/pagesApi/setPassword";
export default {
  name: "setPassword",
  data() {
    return {
      showCode: true, //验证码按钮显示隐藏
      emailBtnColor: "#1B2945", //发送验证码按钮颜色
      seconds: 60, //重新发送验证码倒计时
      confirmpwd: "", //确认密码
      form: {
        mail: "",
        code: "",
        newPassWord: "",
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
      return this.form.newPassWord == this.confirmpwd;
    },
    // 点击发送验证码
    handleCode() {
      if (this.form.mail) {
        this.showCode = false;
        // 更改按钮颜色
        this.emailBtnColor = "#fff";
        getCode({ mail: this.form.mail }).then((res) => {});
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
      }
    },
    // 表单是否通过验证
    onSubmit() {
      this.$refs.form
        .validate()
        .then(() => {
          // 复制一个对象，给密码加密
          let req = Object.assign({}, this.form);
          req.newPassWord = this.$md5(req.newPassWord);
          changepwd(req).then((res) => {
            if (res.data.code == 0) {
              this.$toast.success("修改成功");
              this.cookie.remove("token");
              setTimeout(() => {
                this.$router.replace("/login");
              }, 500);
            } else {
              this.$toast.fail(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$toast.fail(res.data.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 0 30px;
}
.title {
  font-size: 36px;
  color: #333;
  font-weight: bold;
}
:deep(.van-nav-bar__left),
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
.from-item {
  margin-top: 30px;
  .hint {
    font-size: 24px;
    color: #999;
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
}
.commit {
  position: absolute;
  bottom: 60px;
  left: 4%;
  width: 92%;
  height: 96px;
  font-size: 31px;
  color: #fff;
  border-radius: 48px;
  background: #1b2945;
}
</style>