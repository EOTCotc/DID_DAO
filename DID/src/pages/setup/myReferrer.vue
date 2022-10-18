<template>
  <div class="container">
    <van-nav-bar>
      <template #left>
        <van-icon @click="$router.back()" name="arrow-left" color="#000" size="18" />
      </template>
      <template #title>
        <span class="title">{{ $t("setup.my_referrer") }}</span>
      </template>
    </van-nav-bar>

    <div class="line"></div>

    <div class="content">
      <div class="ad-img">
        <img src="@/assets/imgs/yaoqingma.png" />
      </div>
      <div class="code-title">{{ $t("setup.code") }}</div>
      <div class="ipt">
        <input
          type="text"
          v-model="refUserId"
          :placeholder="$t('setup.input_mail_code')"
        />
      </div>
      <div class="confirm" @click="confirm">{{ $t("public.confirm") }}</div>
      <div class="link" @click="getRefUserId">
        {{ $t("setup.get_code") }}
      </div>
    </div>
  </div>
</template>

<script>
import { getcomselect } from "@/api/pagesApi/home";
import { setuserinfo } from "@/api/pagesApi/locality";
export default {
  name: "myReferrer",
  data() {
    return {
      refUserId: "", //邀请码
    };
  },
  mounted() {},
  methods: {
    // 确定
    confirm() {
      if (this.refUserId != "") {
        setuserinfo({ refUserId: this.refUserId }).then((res) => {
          if (res.data.code == 0) {
            this.$toast.success(this.$t('setup.referrer_toast1'));
            setTimeout(() => {
              this.$router.back();
            }, 500);
          } else {
            this.$toast.fail(res.data.message);
          }
        });
      } else {
        this.$toast.fail(this.$t('setup.referrer_toast2'));
      }
    },
    // 获取邀请码
    getRefUserId() {
      // 判断有没有选位置，有就直接调到社区
      // 没有就跳到选择已有的社区页面
      getcomselect().then((res) => {
        if (res.data.items == null) {
          this.showOverlay = false;
          this.$router.push("/bindRelation");
        } else {
          this.$router.push({
            name: "bindCommunity",
            params: { site: JSON.stringify(res.data.items), home: "home" },
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
}
.title {
  font-size: 36px;
  color: #333;
  font-weight: bold;
}
.line {
  height: 20px;
  background: #f3f4f5;
}
.content {
  .ad-img {
    margin-top: 80px;
    margin-left: 50%;
    width: 303px;
    height: 310px;
    transform: translateX(-50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .code-title {
    margin-top: 65px;
    font-size: 32px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
  .ipt {
    margin-top: 30px;
    padding: 0 30px;
    input {
      padding: 0 30px;
      width: 100%;
      height: 100px;
      font-size: 28px;
      color: #999;
      border-radius: 18px;
      box-sizing: border-box;
      border: 2px solid #ccc;
    }
  }
  .confirm {
    margin-top: 40px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 167px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 32px;
    color: #fff;
    border-radius: 18px;
    background: #247ff6;
  }
  .link {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;
    color: #237ff8;
  }
}
// 设置电报群
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  color: #fff;
  background-color: #fff;
}
</style>