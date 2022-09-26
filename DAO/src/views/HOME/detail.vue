<template>
  <div class="detail">
    <header>
      <white :title="title"></white>
    </header>
    <main class="box">
      <div v-if="personageArr.length > 0">
        <van-row class="title">
          <van-col span="7">收益数量</van-col>
          <van-col span="7">收益来源</van-col>
          <van-col span="10">收益时间</van-col>
        </van-row>
        <van-row v-for="(item, index) in personageArr" :key="index">
          <van-col span="7">{{ item.eotc }}</van-col>
          <van-col span="7">
            <span v-if="item.type == 0">处理工单</span>
            <span v-if="item.type == 1">处理仲裁</span>
            <span v-if="item.type == 2">处理审核</span>
          </van-col>
          <van-col span="10">{{ item.createDate }}</van-col>
        </van-row>
        <div class="record">没有更多记录了</div>
      </div>
      <div class="zan" v-else>暂无记录噢~</div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import white from "../../components/Nav/white.vue";
import { getincome } from "@/api/earnings";
export default {
  components: { white },
  data() {
    return {
      title: "收益详情",
      page: 1,
      itemsPerPage: 10,
      personageArr: [],
    };
  },
  created() {
    let walletAddress = localStorage.getItem("myaddress");
    let otype = localStorage.getItem("netType");
    let sign = localStorage.getItem("mysign");

    getincome(
      {
        walletAddress: walletAddress,
        otype: otype,
        sign: sign,
      },
      this.page,
      this.itemsPerPage
    ).then((res) => {
      this.personageArr = res.data.items;
      console.log(this.personageArr);
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.title {
  color: #999;
  background: #f3f4f5;
  text-align: center;
  line-height: 3rem;
}
.box {
  background: #fff;
  height: 100vh;
  color: #666666;
  text-align: center;
  .van-row {
    line-height: 3rem;
    font-size: 14px;
    border-bottom: 1px solid #f3f4f5;
  }
}
.record {
  margin-top: 3rem;
  color: #999999;
}
.zan {
  height: 400px;

  font-size: 18px;
  padding-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>