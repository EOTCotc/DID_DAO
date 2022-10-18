<template>
  <div class="container fullscreen">
    <page-header :title="$t('my.identity_info')" theme="dark" />
    <div class="fail_wrap">
      <van-row class="row" type="flex" align="center">
        <van-col :span="6" class="title">{{ $t("create.text1") }}</van-col>
        <van-col :span="18" class="value">{{ info.name }}</van-col>
      </van-row>
      <van-row class="row" type="flex" align="center">
        <van-col :span="6" class="title">{{
          $t("setup.referrer_phone")
        }}</van-col>
        <van-col :span="18" class="value">{{ info.phoneNum }}</van-col>
      </van-row>
      <van-row class="row" type="flex" align="center">
        <van-col :span="6" class="title">{{ $t("identity.text2") }}</van-col>
        <van-col :span="18" class="value">{{ info.idCard }}</van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="6" class="title">{{ $t("success.tags1") }}</van-col>
        <van-col
          :span="24"
          class="value"
          style="margin-top: 15px"
          v-if="!!(info.auths && info.auths.length)"
        >
          <van-steps
            direction="vertical"
            :active="2"
            active-color="#227AEE"
            inactive-color="#227AEE"
          >
            <van-step
              class="row-step"
              v-for="item in info.auths"
              :key="item.uId"
            >
              <template slot="active-icon">
                <van-icon
                  v-if="item.auditType === 1"
                  size="16px"
                  name="checked"
                  color="#227AEE"
                  style="background-color: #fff"
                />
                <van-icon
                  v-else
                  name="clear"
                  size="16px"
                  color="#227AEE"
                  style="background-color: #fff"
                />
              </template>
              <template slot="inactive-icon">
                <van-icon
                  v-if="item.auditType === 1"
                  size="16px"
                  name="checked"
                  color="#227AEE"
                  style="background-color: #fff"
                />
                <van-icon
                  v-else
                  name="clear"
                  size="16px"
                  color="#227AEE"
                  style="background-color: #fff"
                />
              </template>
              <van-row>
                <van-col class="title step-title" :span="12"
                  >{{ item.isDao ? "Dao" : getAuditStep(item.auditStep) }}:{{
                    item.name
                  }}</van-col
                >
                <van-col class="date" :span="12">{{
                  transformUTCDate(item.authDate)
                }}</van-col>
                <van-col class="remark" :span="24" v-if="item.remark">{{
                  item.remark
                }}</van-col>
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
import { authSuccess } from "@/api/pagesApi/identity";
import { transformUTCDate, getAuditStep } from "@/utils/utils";

export default {
  name: "identityApprovalSuccess",
  data() {
    return {
      info: {},
    };
  },
  components: {
    pageHeader,
  },
  methods: {
    transformUTCDate,
    getAuditStep,
  },
  created() {
    const loading = this.$toast.loading({
      forbidClick: true,
      message:this.$t('public.loading'),
    });
    authSuccess()
      .then((res) => {
        if (!res.data.code) {
          this.info = res.data.items;
        } else {
          this.$toast.fail({
            forbidClick: true,
            message: res.data.message,
          });
        }
      })
      .finally(() => loading.clear());
  },
};
</script>

<style scoped lang="scss">
.fail_wrap {
  padding: 30px;
  .row {
    padding: 30px;
    border-bottom: 1px solid #f3f4f5;
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
      color: #fc7542;
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