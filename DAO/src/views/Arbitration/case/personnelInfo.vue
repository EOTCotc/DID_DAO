<template>
<div class="plaintiff_wrap fullscreen bg-gray">
  <page-header :title="pageHeaderTitle"></page-header>
  <div class="content">
    <van-row class="row border">
      <van-col class="title" :span="6">姓   名</van-col>
      <van-col class="value" :span="18">{{ info.name }}</van-col>
    </van-row>
    <van-row class="row border">
      <van-col class="title" :span="6">手机号</van-col>
      <van-col class="value" :span="18">{{ info.phoneNum }}</van-col>
    </van-row>
    <van-row class="row border">
      <van-col class="title" :span="6">证件号</van-col>
      <van-col class="value" :span="18">{{ info.idCard }}</van-col>
    </van-row>
    <van-row class="row">
      <van-col class="title" :span="24">身份证</van-col>
      <van-col class="value" :span="24">
        <van-row :gutter="20">
          <van-col :span="12">
            <img :src="spliceSrc(info.portraitImage)" alt="" class="img">
          </van-col>
          <van-col :span="12">
            <img :src="spliceSrc(info.nationalImage)" alt="" class="img">
          </van-col>
        </van-row>
      </van-col>
    </van-row>
    <van-row class="row">
      <van-col class="title" :span="24">手持证件照</van-col>
      <van-col class="value" :span="24">
        <img :src="spliceSrc(info.handHeldImage)" alt="" class="img">
      </van-col>
    </van-row>
  </div>
</div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
import {personnelInfo} from "@/api/case"
import {spliceSrc} from '@/utils/utils'

export default {
  name: "plaintiff",
  components: {PageHeader},
  data() {
    return {
      pageHeaderTitle: "",
      info: {}
    }
  },
  methods: {
    spliceSrc,
    getPersonnelInfo() {
      const loading = this.$toast.loading('加载中…')
      personnelInfo(this.$route.query.id).then(res => {
        const {code, items} = res.data
        if (code) {
          this.$toast.fail('获取失败')
        } else {
          this.info = items
          this.pageHeaderTitle = `${this.$route.query.type === 1 ? '原告' : '被告'} ${items.name}`
          console.log(items)
        }
      }).catch(() => {
        this.$toast.fail('获取失败')
      }).finally(() => {
        loading.clear()
      })
    }
  },
  created() {
    this.getPersonnelInfo()
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