<template>
  <div class="container fullscreen">
    <page-header title="身份信息" theme="dark" />
    <div class="fail_wrap">
      <van-row class="row" type='flex' align='center'>
        <van-col :span="6" class="title">姓   名</van-col>
        <van-col :span="18" class="value">{{ info.name }}</van-col>
      </van-row>
      <van-row class="row" type='flex' align='center'>
        <van-col :span="6" class="title">手机号</van-col>
        <van-col :span="18" class="value">{{ info.phoneNum }}</van-col>
      </van-row>
      <van-row class="row" type='flex' align='center'>
        <van-col :span="6" class="title">证件号</van-col>
        <van-col :span="18" class="value">{{ info.idCard }}</van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="6" class="title">审核节点</van-col>
        <van-col :span="24" class="value" style='margin-top: 15px;' v-if="!!(info.auths && info.auths.length)">
          <van-steps direction="vertical" :active="2" active-color="#227AEE" inactive-color="#227AEE">
            <van-step class='row-step' v-for="item in info.auths" :key="item.uId">
              <template slot='active-icon'>
                <van-icon v-if='item.auditType === 1' size='16px' name='checked' color='#227AEE' style='background-color: #FFF;' />
                <van-icon v-else name='clear' size='16px' color='#227AEE' style='background-color: #FFF;' />
              </template>
              <template slot='inactive-icon'>
                <van-icon v-if='item.auditType === 1' size='16px' name='checked' color='#227AEE' style='background-color: #FFF;' />
                <van-icon v-else name='clear' size='16px' color='#227AEE' style='background-color: #FFF;' />
              </template>
              <van-row>
                <van-col class="title step-title" :span="12">{{item.isDao ? 'Dao' : getAuditStep(item.auditStep)}}:{{item.name}}</van-col>
                <van-col class="date" :span="12">{{transformUTCDate(item.authDate)}}</van-col>
                <van-col class="remark" :span="24" v-if="item.remark">{{item.remark}}</van-col>
              </van-row>
            </van-step>
          </van-steps>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import pageHeader from "@/components/topBar/pageHeader";
  import {authSuccess} from "@/api/pagesApi/identity";
  import {transformUTCDate, getAuditStep} from "@/utils/utils";

  export default {
    name: "identityApprovalSuccess",
    data() {
      return {
        info: {}
      }
    },
    components: {
      pageHeader
    },
    methods: {
      transformUTCDate,
      getAuditStep
    },
    created() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: "加载中…"
      })
      authSuccess().then(res => {
        if (!res.data.code) {
          this.info = res.data.items
        } else {
          this.$toast.fail({
            forbidClick: true,
            message: res.data.message
          })
        }
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
        font-size: 32px;
      }
      .value {
        color: #333;
        font-size: 28px;
      }
      .date {
        color: #999;
        font-size: 28px;
        text-align: right;
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
      .remark {
        font-size: 28px;
        line-height: 1.4;
        color: #888;
      }
      .step-title {
        font-weight: inherit;
      }
    }
  }
</style>