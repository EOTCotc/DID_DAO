<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar>
      <template #left>
        <van-icon
          @click="$router.push('/setup')"
          name="arrow-left"
          color="#000"
          size="18"
        />
      </template>
      <template #title>
        <span class="title">账号注销</span>
      </template>
    </van-nav-bar>
    <!-- 隔离条 -->
    <div class="line"></div>
    <div class="content">
      <van-form ref="form">
        <div class="form-item">
          <p class="top-label">邮箱地址</p>
          <van-field v-model="form.mail" disabled placeholder="请输入邮箱">
            <template #button>
              <van-button v-show="isSendCode" size="small" @click="sendCode"
                >发送验证码</van-button
              >
              <span v-show="!isSendCode">{{ second }}S</span>
            </template>
          </van-field>
        </div>

        <div class="form-item">
          <p class="top-label">邮箱验证码</p>
          <van-field
            v-model="form.code"
            @input="haveCode"
            type="number"
            placeholder="请输入邮箱验证码"
            :rules="[{ required: true, message: '请输入邮箱验证码' }]"
          />
        </div>
      </van-form>
      <button
        class="btn"
        :disabled="isBtn"
        @click="showPopup = true"
        :style="isBtn ? '' : 'background:#237FF8;'"
      >
        提交
      </button>
    </div>

    <van-popup v-model="showPopup" round>
      <div class="popup">
        <div class="caution">警告</div>
        <div class="popup-content">
          <p>1、注销提交后，EOTC DAO将在48小时内完成注销核查和处理。</p>
          <p>2、注销后，该账户的所有信息均将清除且无法恢复，请谨慎操作。</p>
          <p>
            3、注销成功后，该邮箱可以重新注册为一个全新的账号，不包含注销前的任何信息。
          </p>
        </div>
        <div class="popup-btn">
          <div @click="showPopup = false">取消</div>
          <div @click="submit">确定</div>
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
  data() {
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
  mounted() {
    this.form.reason = this.$route.params.reason;
    this.form.mail = JSON.parse(this.cookie.get("userInfo")).mail;
  },
  methods: {
    // 发送验证码
    sendCode() {
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
      getCode({ mail: this.form.mail }).then((res) => {
        console.log(res.data, "验证码");
      });
    },
    // 是否填写验证码
    haveCode() {
      if (this.form.code) {
        this.isBtn = false;
      }
    },
    // 确定
    submit() {
      if (this.form.code) {
        logout(this.form).then((res) => {
          console.log(res, "注销");
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
  .form-item + .form-item {
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
    div:last-of-type{
      color: #1B2945;
    }
  }
}
</style>