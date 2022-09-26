<template>
  <div class="create_wrap bg-gray fullscreen">
    <page-header title="添加收付款账号"></page-header>
    <div class="content">
      <van-form>
        <van-field
            clearable
            label="姓 名"
            name="name"
            placeholder="请输入真实姓名"
            v-model="form.data.name"
            :rules="[{required: true, message: '请输入真实姓名'}]"
        />
        <template v-if="form.data.type === 1">
          <van-field
              clearable
              label="银行卡"
              name="bank"
              placeholder="请输入开户银行"
              v-model="form.data.bank"
              :rules="[{required: true, message: '请输入真实姓名'}]"
          />
          <van-field
              clearable
              label=" "
              name="cardNum"
              placeholder="请输入银行卡账号"
              v-model="form.data.cardNum"
              :rules="[{required: true, message: '请输入银行卡账号'}]"
          />
          <van-field
              clearable
              label="交易密码"
              name="passWord"
              placeholder="请输入交易密码"
              type="password"
              v-model="form.data.passWord"
              :rules="[{required: true, message: '请输入交易密码'}]"
          />
        </template>
        <van-field
            clearable
            name="cardNum"
            type="cardNum"
            v-else
            v-model="form.data.cardNum"
            :label="`${columns[form.data.type]}账号`"
            :placeholder="`请输入${columns[form.data.type]}账号`"
            :rules="[{required: true, message: `请输入${columns[form.data.type]}账号`}]"
        />
        <div class="btn">
          <van-button
              round
              block
              type="info"
              color="#1B2945"
              :loading="form.loading"
              @click="$refs.tipPopup.toggle(true)"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <popup title="温馨提示" ref="tipPopup">
      <div class="tip">收付款信息涉及交易，请核对信息无误之后再进行提交</div>
      <van-button
          round
          block
          class="btn"
          type="info"
          color="#1B2945"
          @click="showCheckPopup"
      >
        好的
      </van-button>
    </popup>
    <popup title="核对信息" ref="checkPopup">
      <div class="tip">请确认当前信息无误</div>
      <van-row class="row" style="margin-top: 20px;">
        <van-col class="label" :span="6">姓名</van-col>
        <van-col class="value" :span="18">{{form.data.name}}</van-col>
      </van-row>
      <template v-if="form.data.type === 1">
        <van-row class="row">
          <van-col class="label" :span="6">开户银行</van-col>
          <van-col class="value" :span="18">{{form.data.bank}}</van-col>
        </van-row>
        <van-row class="row">
          <van-col class="label" :span="6">银行账号</van-col>
          <van-col class="value" :span="18">{{form.data.cardNum}}</van-col>
        </van-row>
      </template>
      <van-row class="row" v-else>
        <van-col class="label" :span="6">{{columns[form.data.type]}}</van-col>
        <van-col class="value" :span="18">{{form.data.cardNum}}</van-col>
      </van-row>
      <van-button
          round
          block
          class="btn"
          type="info"
          color="#1B2945"
          @click="showCodePopup"
      >
        好的
      </van-button>
    </popup>
    <popup title="邮箱验证码" ref="codePopup">
      <div class="tip">验证码会发送至您的邮箱</div>
      <password ref="password" @handleChange="handleChange" />
      <div class="tip" style="margin-top: 10px;" v-show="validateCode">验证码错误!</div>
      <div class="getCode" :class="{'disable': !!code.timer}" @click="getVerifyCode">
        重新发送
        <span class="time" v-show="code.timer">{{code.time}}s</span>
      </div>
      <van-button
          round
          block
          class="btn"
          type="info"
          color="#1B2945"
          @click="handleSubmit"
          :disabled="form.data.code.length < 6 || validateCode"
      >
        确定提交
      </van-button>
    </popup>
  </div>
</template>

<script>
  import PageHeader from "@/components/topBar/pageHeader";
  import Popup from '@/components/popup'
  import Password from '@/components/password'
  import {code, addPayment} from "@/api/pagesApi/payment";

  export default {
    name: "create",
    components: {PageHeader, Popup, Password},
    data() {
      return {
        columns: ['现金支付', '银行账号', '支付宝', '微信'],
        form: {
          loading: false,
          data: {
            type: "",
            name: '',
            bank: '',
            cardNum: '',
            passWord: '',
            code: "",
            mail: ""
          }
        },
        code: {
          data: "",
          time: 59,
          timer: null
        }
      }
    },
    computed: {
      disabled() {
        return Object.values(this.form.data).includes('')
      },
      // 验证码是否正确
      validateCode() {
        return this.form.data.code.length === 6 ? this.code.data !== this.form.data.code : false
      }
    },
    methods: {
      showCheckPopup() {
        this.$refs.tipPopup.toggle(false)
        this.$refs.checkPopup.toggle(true)
      },
      showCodePopup() {
        this.$refs.checkPopup.toggle(false)
        this.$refs.codePopup.toggle(true)
        this.getVerifyCode()
      },
      // 获取验证码
      getVerifyCode() {
        if (!this.code.timer) {
          const userInfo = JSON.parse(this.cookie.get('userInfo'))
          this.form.data.mail = userInfo.mail
          code(userInfo.mail).then(res => {
            if (!res.data.code) {
              this.code.data = res.data.message
              this.countDown()
              this.$refs.password.focus()
            } else {
              this.$toast.fail({
                forbidClick: true,
                message: "获取失败"
              })
            }
          })
        }
      },
      // 倒计时
      countDown() {
        this.code.timer = setInterval(() => {
          this.code.time --
          if (this.code.time === 0) {
            this.code.time = 59
            clearInterval(this.code.timer)
            this.code.timer = null
          }
        }, 1000)
      },
      // 验证码输入
      handleChange(val) {
        this.form.data.code = val
      },
        handleSubmit() {
        const loading = this.$toast.loading({
          forbidClick: true,
          message: "提交中…"
        })
        addPayment(this.form.data).then(res => {
          if (!!res.data.code) {
            this.$toast.fail({
              forbidClick: true,
              message: res.data.message === 1 ? '验证码错误' : "提交失败"
            })
          } else {
            this.$toast.success({
              forbidClick: true,
              message: "创建成功",
              onClose: () => this.$router.replace('/my/payment')
            })
          }
        }).finally(() => loading.clear())
      }
    },
    created() {
      this.form.data.type = this.$route.query.type * 1
    }
  }
</script>

<style scoped lang="scss">
  .create_wrap {
    .content {
      flex: 1;
      margin-top: 30px;
      background-color: #FFF;
      .btn {
        @include posi($b: 30px, $l: 30px, $r: 30px);
        margin: 0;
      }
    }
  }
  .tip {
    color: #FC7542;
    font-size: 28px;
  }
  .row {
    padding: 20px 0;
    .label {
      color: #333;
      font-size: 28px;
      font-weight: bold;
    }
    .value {
      color: #333;
      font-size: 28px;
      text-align: right;
    }

  }
  .getCode {
    color: #237FF8;
    font-size: 28px;
    text-align: center;
    margin-top: 80px;
    &.disable {
      color: #999999;
    }
  }
  .btn {
    margin-top: 80px;
  }
</style>