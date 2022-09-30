
<template>
  <div class="">
    <white :title="title"></white>
    <div class="contatiner">
      <div class="top">
        <div class="content">
          <van-cell-group
            inset
            class="chu"
            v-for="(item, index) in maticList"
            :key="index"
            v-show="maticList.length > 0"
          >
            <van-cell :title="item.name" :value="item.createDate" />
            <van-cell :title="item.reason" :border="false" />
            <div class="btn" v-show="item.authStatus == 0">
              <van-button
                round
                size="small"
                color="#237FF8"
                @click="check(item.userRiskId, item.authStatus)"
                >核对身份信息</van-button
              >
              <van-button
                round
                size="small"
                color="#F3F4F5"
                class="jie"
                disabled
                >解除风控</van-button
              >
            </div>
            <div class="btn" v-show="item.authStatus == 1">
              <van-button round size="small" color="#00B87A" plain
                ><van-icon
                  name="passed"
                  style="margin-right: 5px"
                />已核对身份</van-button
              >
              <van-button
                round
                size="small"
                color="#237FF8"
                @click="relieve(item.userRiskId)"
                >解除风控</van-button
              >
            </div>
            <div class="btn" v-show="item.authStatus == 2">
              <van-button
                round
                size="small"
                color="#F34747"
                plain
                @click="check(item.userRiskId, item.authStatus)"
                >核对身份异常</van-button
              >
              <van-button
                round
                size="small"
                color="#F3F4F5"
                class="jie"
                disabled
                >解除风控</van-button
              >
            </div>
          </van-cell-group>
          <van-empty
            v-show="!maticList.length"
            class="custom-image"
            :image="require('./../../assets/img/empty.png')"
            description="暂无任何数据"
          />
          <van-overlay :show="over_show">
            <div class="dialog_wrap">
              <slot name="headerIcon">
                <img
                  class="dialog-header-icon"
                  src="../../assets/img/gou.png"
                  alt=""
                />
              </slot>
              <div class="dialog-title">身份核对成功</div>
              <div class="dialog-message">解除风控后即可</div>
              <div class="dialog-zhi" @click="close">知道了</div>
            </div>
          </van-overlay>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import White from "@/components/Nav/white.vue";
import { getUserrisk, removerisk } from "@/api/pneumatic";
import { Toast } from "vant";
export default {
  components: { White },
  data() {
    return {
      maticList: [],
      title: "风控",
      over_show: false,
      status: "",
    };
  },
  created() {
    console.log(this.$route.params);
    this.getUser();
  },
  mounted() {
    this.status = this.$route.params.authStatus;
    if (this.status == "1") {
      this.over_show = true;
    }
  },
  methods: {
    close() {
      this.over_show = false;
    },
    getUser() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: "加载中…",
      });
      getUserrisk()
        .then((res) => {
          const { code, items } = res.data;
          if (code) {
            this.$toast.fail({
              forbidClick: true,
              message: "加载失败！",
            });
          } else {
            items.map((item) => {
              item.createDate = this.$dayjs(item.createDate).format(
                "YYYY-MM-DD"
              );
            });
            this.maticList = items;
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: "加载失败！",
          });
        })
        .finally(() => {
          loading.clear();
        });
    },

    check(id, status) {
      this.$router.push({
        path: "/check",
        query: { userRiskId: id, authStatus: status },
      });
    },
    relieve(id) {
      removerisk({
        userRiskId: id,
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          Toast("解除风控");
          this.getUser();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: #f3f4f5;
  height: 100vh;
  border: 1px solid #f3f4f5;
}
.van-cell-group {
  margin: 16px 16px;

  padding: 0 0 30px;
  .van-cell {
    line-height: 35px;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;

    .van-button {
      height: 40px;
      width: 140px;
      margin: 0 20px;
      font-size: 14px;
    }
    .jie ::v-deep .van-button__text {
      color: #999;
    }
  }
}
.dialog_wrap {
  @include centered();
  top: 40%;
  width: 70%;
  padding: 20px;
  border-radius: 48px;
  box-sizing: border-box;
  background-color: #fff;
  .dialog-header-icon {
    display: block;
    width: 150px;
    margin: -80px auto 0;
  }
  .dialog-title {
    color: #333;
    font-size: 30px;
    font-weight: bold;
    margin-top: 30px;
    text-align: center;
  }
  .dialog-message {
    color: #333;
    font-weight: bold;
    font-size: 25px;
    margin-top: 20px;
    line-height: 1.3;
    text-align: center;
  }
  .dialog-zhi {
    border-top: 0.5px solid #f3f4f5;
    text-align: center;
    margin-top: 30px;
    font-size: 30px;
    font-weight: bold;
    padding: 15px 0;
  }
}
</style>
