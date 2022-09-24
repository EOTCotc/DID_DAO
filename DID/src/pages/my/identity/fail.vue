<template>
  <div class="container fullscreen">
    <page-header title="身份认证" theme="dark" />
    <div class="fail_wrap">
      <van-row class="row">
        <van-col :span="8" class="title">姓   名</van-col>
        <van-col :span="16" class="value">{{info.name}}</van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="title">手机号</van-col>
        <van-col :span="16" class="value">{{info.phoneNum}}</van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="title">证件号</van-col>
        <van-col :span="16" class="value">{{info.idCard}}</van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="title">上传身份证</van-col>
        <van-col :span="24">
          <van-row :gutter="20">
            <van-col :span="12"><img :src="info.portraitImage" alt="" class="img"></van-col>
            <van-col :span="12"><img :src="info.nationalImage" alt="" class="img"></van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="title">上传手持证件照</van-col>
        <van-col :span="24"><img :src="info.handHeldImage" alt="" class="img"></van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="title">打回原因</van-col>
        <van-col :span="24"><div class="tip">信息有误: 手持证件照有误,请重新提交</div></van-col>
      </van-row>
      <div class="btn">
        <van-button
            block
            round
            color="#1B2945"
            type="primary"
            @click="$router.push({name: 'identity', params: info})"
        >
          重新提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import pageHeader from "@/components/topBar/pageHeader";
  import {authFail} from "@/api/pagesApi/identity"
  import {spliceSrc} from "@/utils/utils";

  export default {
    name: "fail",
    components: {
      pageHeader
    },
    data() {
      return {
        info: {}
      }
    },
    created() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: "加载中…"
      })
      authFail().then(res => {
        const data = res.data.items
        data.nationalImage = spliceSrc(data.nationalImage)
        data.portraitImage = spliceSrc(data.portraitImage)
        data.handHeldImage = spliceSrc(data.handHeldImage)
        this.info = data
      }).finally(() => loading.clear())
    }
  }
</script>

<style scoped lang="scss">
  .fail_wrap {
    padding: 30px;
    .row {
      padding: 30px;
      border-bottom: 1px solid #F3F4F5;
      .title {
        color: #333;
        font-weight: bold;
        font-size: 28px;
      }
      .value {
        color: #333;
        font-size: 28px;
      }
      .img {
        display: block;
        width: 100%;
        margin-top: 30px;
      }
      .tip {
        color: #FC7542;
        font-size: 28px;
      }
    }
    .btn {
      margin: 30px;
    }
  }
</style>