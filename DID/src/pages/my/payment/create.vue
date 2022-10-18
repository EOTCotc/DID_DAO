<template>
  <div class="create_wrap bg-gray fullscreen">
    <page-header :title="$t('create.title1')"></page-header>
    <div class="content">
      <van-form>
        <van-field
          clearable
          :label="$t('create.text1')"
          name="name"
          :placeholder="$t('create.text2')"
          v-model="form.data.name"
          :rules="[{ required: true, message: $t('create.text2') }]"
        />
        <template v-if="form.data.type === 1">
          <van-field
            clearable
            :label="$t('create.text3')"
            name="bank"
            :placeholder="$t('create.text4')"
            v-model="form.data.bank"
            :rules="[{ required: true, message: $t('create.text4') }]"
          />
          <van-field
            clearable
            label=" "
            name="cardNum"
            :placeholder="$t('create.text5')"
            v-model="form.data.cardNum"
            :rules="[{ required: true, message: $t('create.text5') }]"
          />
          <van-field
            clearable
            :label="$t('create.text6')"
            name="passWord"
            :placeholder="$t('create.text7')"
            type="password"
            v-model="form.data.passWord"
            :rules="[{ required: true, message: $t('create.text7') }]"
          />
        </template>
        <van-field
          clearable
          name="cardNum"
          type="cardNum"
          v-else
          v-model="form.data.cardNum"
          :label="`${columns[form.data.type]}${$t('create.text9')}`"
          :placeholder="`${$t('create.text8')}${columns[form.data.type]}${$t(
            'create.text9'
          )}`"
          :rules="[
            {
              required: true,
              message: `${$t('create.text8')}${columns[form.data.type]}${$t(
                'create.text9'
              )}`,
            },
          ]"
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
            {{ $t("logout.submit") }}
          </van-button>
        </div>
      </van-form>
    </div>
    <popup :title="$t('create.title2')" ref="tipPopup">
      <div class="tip">{{ $t("create.tags1") }}</div>
      <van-button
        round
        block
        class="btn"
        type="info"
        color="#1B2945"
        @click="showCheckPopup"
      >
        {{ $t("create.tags2") }}
      </van-button>
    </popup>
    <popup :title="$t('create.title3')" ref="checkPopup">
      <div class="tip">{{ $t("create.tags3") }}</div>
      <van-row class="row" style="margin-top: 20px">
        <van-col class="label" :span="6">{{ $t("create.tags4") }}</van-col>
        <van-col class="value" :span="18">{{ form.data.name }}</van-col>
      </van-row>
      <template v-if="form.data.type === 1">
        <van-row class="row">
          <van-col class="label" :span="6">{{ $t("create.tags5") }}</van-col>
          <van-col class="value" :span="18">{{ form.data.bank }}</van-col>
        </van-row>
        <van-row class="row">
          <van-col class="label" :span="6">{{ $t("create.tags6") }}</van-col>
          <van-col class="value" :span="18">{{ form.data.cardNum }}</van-col>
        </van-row>
      </template>
      <van-row class="row" v-else>
        <van-col class="label" :span="6">{{ columns[form.data.type] }}</van-col>
        <van-col class="value" :span="18">{{ form.data.cardNum }}</van-col>
      </van-row>
      <van-button
        round
        block
        class="btn"
        type="info"
        color="#1B2945"
        @click="showCodePopup"
      >
        {{ $t("create.tags2") }}
      </van-button>
    </popup>
    <popup :title="$t('content.email_code')" ref="codePopup">
      <div class="tip">{{ $t("create.tags7") }}</div>
      <password ref="password" @handleChange="handleChange" />
      <div class="tip" style="margin-top: 10px" v-show="validateCode">
        {{ $t("create.tags8") }}
      </div>
      <div
        class="getCode"
        :class="{ disable: !!code.timer }"
        @click="getVerifyCode"
      >
        {{ $t("create.tags9") }}
        <span class="time" v-show="code.timer">{{ code.time }}s</span>
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
        {{ $t("create.tags10") }}
      </van-button>
    </popup>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
import Popup from "@/components/popup";
import Password from "@/components/password";
import { code, addPayment } from "@/api/pagesApi/payment";

export default {
  name: "create",
  components: { PageHeader, Popup, Password },
  data() {
    return {
      columns: [
        this.$t("payment.data4"),
        this.$t("create.data1"),
        this.$t("payment.data2"),
        this.$t("payment.data3"),
      ],
      form: {
        loading: false,
        data: {
          type: "",
          name: "",
          bank: "",
          cardNum: "",
          passWord: "",
          code: "",
          mail: "",
        },
      },
      code: {
        data: "",
        time: 59,
        timer: null,
      },
    };
  },
  computed: {
    disabled() {
      return Object.values(this.form.data).includes("");
    },
    // 验证码是否正确
    validateCode() {
      return this.form.data.code.length === 6
        ? this.code.data !== this.form.data.code
        : false;
    },
  },
  methods: {
    showCheckPopup() {
      this.$refs.tipPopup.toggle(false);
      this.$refs.checkPopup.toggle(true);
    },
    showCodePopup() {
      this.$refs.checkPopup.toggle(false);
      this.$refs.codePopup.toggle(true);
      this.getVerifyCode();
    },
    // 获取验证码
    getVerifyCode() {
      if (!this.code.timer) {
        const userInfo = JSON.parse(this.cookie.get("userInfo"));
        this.form.data.mail = userInfo.mail;
        code(userInfo.mail).then((res) => {
          if (!res.data.code) {
            this.code.data = res.data.message;
            this.countDown();
            this.$refs.password.focus();
          } else {
            this.$toast.fail({
              forbidClick: true,
              message: this.$t("create.data2"),
            });
          }
        });
      }
    },
    // 倒计时
    countDown() {
      this.code.timer = setInterval(() => {
        this.code.time--;
        if (this.code.time === 0) {
          this.code.time = 59;
          clearInterval(this.code.timer);
          this.code.timer = null;
        }
      }, 1000);
    },
    // 验证码输入
    handleChange(val) {
      this.form.data.code = val;
    },
    handleSubmit() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: this.$t("create.msg1"),
      });
      addPayment(this.form.data)
        .then((res) => {
          if (!!res.data.code) {
            this.$toast.fail({
              forbidClick: true,
              message:
                res.data.message === 1
                  ? this.$t("create.tags8")
                  : this.$t("create.mag2"),
            });
          } else {
            this.$toast.success({
              forbidClick: true,
              message: this.$t("payment.msg4"),
              onClose: () => this.$router.replace("/my/payment"),
            });
          }
        })
        .finally(() => loading.clear());
    },
  },
  created() {
    this.form.data.type = this.$route.query.type * 1;
  },
};
</script>

<style scoped lang="scss">
  .create_wrap {
    .content {
      flex: 1;
      margin-top: 20px;
      background-color: #FFF;
      .btn {
        @include posi($b: 30px, $l: 30px, $r: 30px);
        margin: 0;
      }
    }
  }

.tip {
  color: #fc7542;
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
  color: #237ff8;
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