
<template>
  <div class="">
    <white :title="title"></white>
    <div class="contatiner">
      <van-form class="form_wrap">
        <div class="main steps_wrap">
          <div class="info_wrap step-1">
            <van-field name="name" label="姓名" v-model="name" />
            <van-field name="phoneNum" label="手机号" v-model="phoneNum" />
            <van-field name="code" label="证件号" v-model="code" border />
          </div>
          <div class="upload_wrap step-2">
            <div class="title">身份证</div>
            <div class="example_wrap">
              <img class="img" src="../../assets/img/shen.png" alt="" />
              <img class="img" src="../../assets/img/ju.png" alt="" />
            </div>
          </div>
        </div>
        <div class="btns">
          <!-- <van-button
            block
            round
            class="next btn"
            color="#1B2945"
            type="primary"
            :disabled="disable || form.loading"
            :loading="form.loading"
            :loading-text="step.active < 3 ? '图片上传中…' : '审核信息提交中…'"
            @click="next"
          >
            下一步
          </van-button> -->
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import White from "@/components/Nav/white.vue";
import { getuserinfo } from "@/api/pneumatic";
export default {
  components: {
    White,
  },
  data() {
    return {
      title: "核对身份信息",
      name: "吴敏",
      phoneNum: "1344569****",
      code: "43589615524****",
    };
  },
  created() {
    console.log(this.$route.query.userRiskId);
    let walletAddress = localStorage.getItem("myaddress");
    let otype = localStorage.getItem("netType");
    let sign = localStorage.getItem("mysign");
    let id = this.$route.query.userRiskId;
    getuserinfo({
      walletAddress: walletAddress,
      otype: otype,
      sign: sign,
      userRiskId: id,
    }).then((res) => {
      console.log(res);
    });
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.form_wrap {
  .info_wrap {
    ::v-deep .van-cell__title {
      color: #000;
      font-weight: bold;
    }
  }
  .upload_wrap {
    padding: 10px 16px;
    ::v-deep .title {
      padding: 10px;
      font-size: 26px;
      color: #000;
      font-weight: bold;
    }
    .example_wrap {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      .img {
        width: 332px;
        height: 202px;
      }
    }
  }
}
</style>