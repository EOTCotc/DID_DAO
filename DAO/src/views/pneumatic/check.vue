
<template>
  <div class="meun">
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
          <div class="upload_wrap step-2">
            <div class="title">手持证件照</div>
            <div class="example_zheng">
              <img class="img" src="../../assets/img/zheng.png" alt="" />
            </div>
          </div>
        </div>
        <div class="btns">
          <van-button
            round
            size="small"
            color="#E8F2FF"
            class="frist"
            @click="check(item.userRiskId)"
            >核对身份异常</van-button
          >
          <van-button round size="small" color="#237FF8" @click="success"
            >身份核对成功</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import White from "@/components/Nav/white.vue";
import { getuserinfo } from "@/api/pneumatic";
import { Dialog } from "vant";
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
  methods: {
    success() {
      Dialog.confirm({
        title: "核对信息",
        message: "请确保已进行视频身份核对，身份信息确认无误!",
        className: "dialog__message",
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.meun {
  background: #f3f4f5;
}
.form_wrap {
  margin-top: 16px;
  background: #fff;
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
    .example_zheng {
      margin-top: 10px;
      margin-left: 10px;
      .img {
        width: 695px;
        height: 385px;
        display: flex;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
    .van-button {
      width: 180px;
      height: 45px;
    }
    .frist ::v-deep .van-button__text {
      color: #237ff8;
      font-weight: bold;
    }
  }
}
.dialog__message {
  .van-dialog__message--has-title {
    color: #f37a4c !important;
  }
}
</style>