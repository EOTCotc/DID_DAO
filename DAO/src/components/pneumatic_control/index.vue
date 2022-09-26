<template>
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
          @click="check(item.userRiskId)"
          >核对身份信息</van-button
        >
        <van-button round size="small" color="#F3F4F5" class="jie" disabled
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
        <van-button round size="small" color="#237FF8">解除风控</van-button>
      </div>
    </van-cell-group>
    <van-empty
      v-show="!maticList.length"
      class="custom-image"
      :image="require('./../../assets/img/empty.png')"
      description="暂无任何数据"
    />
  </div>
</template>

<script>
import { getUserrisk } from "@/api/pneumatic";
export default {
  data() {
    return {
      maticList: [],
    };
  },
  created() {
    let walletAddress = localStorage.getItem("myaddress");
    let otype = localStorage.getItem("netType");
    let sign = localStorage.getItem("mysign");
    getUserrisk({
      walletAddress: walletAddress,
      otype: otype,
      sign: sign,
    }).then((res) => {
      console.log(res);
      this.maticList = res.data.items;
    });
  },
  methods: {
    check(id) {
      this.$router.push({ path: "/check", query: { userRiskId: id } });
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
</style>
