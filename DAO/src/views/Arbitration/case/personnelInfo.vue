<template>
<div class="plaintiff_wrap fullscreen bg-gray">
  <page-header :title="pageHeaderTitle"></page-header>
  <div class="content">
    <van-row class="row border">
      <van-col class="title" :span="6">姓   名</van-col>
      <van-col class="value" :span="18">吴敏</van-col>
    </van-row>
    <van-row class="row border">
      <van-col class="title" :span="6">手机号</van-col>
      <van-col class="value" :span="18">1344569****</van-col>
    </van-row>
    <van-row class="row border">
      <van-col class="title" :span="6">证件号</van-col>
      <van-col class="value" :span="18">43589615524****</van-col>
    </van-row>
    <van-row class="row">
      <van-col class="title" :span="24">身份证</van-col>
      <van-col class="value" :span="24">
        <van-row :gutter="20">
          <van-col :span="12">
            <img src="../../../assets/imgs/example-1.png" alt="" class="img">
          </van-col>
          <van-col :span="12">
            <img src="../../../assets/imgs/example-2.png" alt="" class="img">
          </van-col>
        </van-row>
      </van-col>
    </van-row>
    <van-row class="row">
      <van-col class="title" :span="24">手持证件照</van-col>
      <van-col class="value" :span="24">
        <img src="../../../assets/imgs/example-3.png" alt="" class="img">
      </van-col>
    </van-row>
  </div>
</div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
export default {
  name: "plaintiff",
  components: {PageHeader},
  data() {
    return {
      pageHeaderTitle: "原告 吴敏"
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.plaintiff_wrap {
  .content {
    flex: 1;
    padding: 0 30px;
    background-color: #FFF;
    .row {
      color: #333;
      font-size: 28px;
      padding: 30px 0;
      &.border {
        border-bottom: 1px solid #EEE;
      }
      .title {
        font-weight: bold;
      }
      .img {
        display: block;
        width: 100%;
        margin-top: 30px;
      }
    }
  }
}
</style>