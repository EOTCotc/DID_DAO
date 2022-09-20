<template>
  <div class="container">
    <van-nav-bar
      :border="false"
      title="选择所在地"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <van-cell
        class="now"
        title="使用当前位置"
        value="当前位置"
        :border="false"
      />
      <van-cell
        class="now"
        title="国家"
        :value="country"
        is-link
        to="/nation"
      />
      <van-cell
        title="省市"
        :value="region"
        is-link
        to="/region"
        :border="false"
      />
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus";
export default {
  name: "site",
  data() {
    return {
      country: "", //国家
      region: "", //省市区
    };
  },
  mounted() {
    this.getNowLocation(); //获取当前位置
    this.getCountry(); //获取选择的国家
  },
  methods: {
    // 获取当前位置
    getNowLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (res) => {
            // console.log(res, "suc");
          },
          (err) => {
            // console.log(err, "err");
          }
        );
      } else {
        this.$toast.fail("地理位置服务不可用");
      }
    },
    // 获取选择的国家
    getCountry() {
      this.country = this.cookie.get("country");
      // bus.$once("country", (data) => {
      //   this.country = data[1];
      //   this.$forceUpdate();
      //   console.log(this.country);
      // });
    },
    // 导航栏返回
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  height: 100vh;
  background: #f3f4f5;
}
:deep(.van-icon) {
  color: #000;
}
.content {
  .now {
    margin-top: 20px;
  }
}
</style>