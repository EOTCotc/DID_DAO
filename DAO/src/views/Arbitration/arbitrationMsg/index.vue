<template>
  <div>
    <page-header title="仲裁案动态" />
    <div class="content">
      <ul>
        <li @click="toArbitrationMsg">
          <img :src="shen_qing" alt="" />
          <div class="details">
            <div>
              <span>申请延期</span>
              <span>1分钟前</span>
            </div>
            <p>核实信息还在审核中</p>
          </div>
        </li>
        <li>
          <img :src="tong_zhi" alt="" />
          <div class="details">
            <div>
              <span>通知</span>
              <span>06:30</span>
            </div>
            <p>卖家追加举证</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
export default {
  name: "arbitrationList",
  data() {
    return {
      shen_qing: require("@/assets/imgs/shenqing.png"),
      tong_zhi: require("@/assets/imgs/tongzhi.png"),
    };
  },
  components: {
    PageHeader,
  },
  methods: {
    // 去消息详情
    toArbitrationMsg() {
      this.$router.push({ name: "arbitrationMsg", params: 1 });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 0 30px;
  li {
    margin-top: 43px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    img {
      margin-right: 16px;
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
    .details {
      width: 100%;
      div {
        display: flex;
        justify-content: space-between;
        font-size: 32px;
        color: #333;
        span:last-of-type {
          font-size: 24px;
          color: #999;
        }
      }
      p {
        margin-top: 5px;
        font-size: 28px;
        color: #999;
      }
    }
  }
}
</style>