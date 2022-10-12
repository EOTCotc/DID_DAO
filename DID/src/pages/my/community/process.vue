<template>
  <van-pull-refresh v-model="loading" @refresh="getProcess">
    <div class="community_wrap fullscreen bg-gray">
      <page-header :title="$t('community.tags3')" />
      <div class="process_wrap">
        <div class="content">
          <div class="title">{{ $t("process.tags1") }}</div>
          <van-steps
            direction="vertical"
            active-icon="checked"
            active-color="#227AEE"
            inactive-icon="clear"
            inactive-color=""
            :active="3"
          >
            <van-step v-for="item in step" :key="item.id">
              <template slot="active-icon">
                <van-icon
                  v-if="!!item.status"
                  size="16px"
                  style="background-color: #fff"
                  name="checked"
                  color="#227AEE"
                />
                <van-icon
                  v-else
                  name="clear"
                  size="16px"
                  style="background-color: #fff"
                  color="#227AEE"
                />
              </template>
              <template slot="inactive-icon">
                <van-icon
                  v-if="!!item.status"
                  size="16px"
                  style="background-color: #fff"
                  name="checked"
                  color="#227AEE"
                />
                <van-icon
                  v-else
                  name="clear"
                  size="16px"
                  style="background-color: #fff"
                  color="#227AEE"
                />
              </template>
              <van-row class="main">
                <van-col :span="!!item.authDate ? 12 : 24" class="title">{{
                  item.name
                }}</van-col>
                <van-col :span="12" class="date">{{ item.authDate }}</van-col>
                <van-col :span="24" class="reason_wrap" v-if="!!item.remark">
                  <div class="title">
                    {{ $t("process.tags2") }}
                  </div>
                  <div class="title">{{ $t("process.tags3") }}：</div>
                  <div class="message">{{ item.remark }}</div>
                </van-col>
              </van-row>
            </van-step>
          </van-steps>
        </div>
        <van-button
          class="btn"
          round
          block
          color="#237FF8"
          type="primary"
          @click="$router.replace('/my/community/create')"
        >
          {{ $t("process.tags4") }}
        </van-button>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader.vue";
import { applyProcess } from "@/api/pagesApi/community";
import { transformUTCDate } from "@/utils/utils";

export default {
  name: "communityProcess",
  components: {
    PageHeader,
  },
  data() {
    return {
      id: null,
      loading: false,
      step: [],
    };
  },
  methods: {
    getProcess() {
      const loading = this.$toast.loading({
        message: this.$t("public.loading"),
        forbidClick: true,
      });
      this.loading = true;
      applyProcess(this.id)
        .then((res) => {
          if (!res.data.code) {
            this.step = res.data.items.map((item) => ({
              ...item,
              authDate: transformUTCDate(item.authDate),
            }));
          } else {
            this.$toast.fail({
              forbidClick: true,
              message: res.data.message,
            });
          }
        })
        .finally(() => {
          loading.clear();
          this.loading = false;
        });
    },
  },
  created() {
    const userInfo = JSON.parse(this.cookie.get("userInfo"));
    this.id = userInfo.applyCommunityId;
    this.getProcess();
  },
};
</script>

<style lang="scss" scoped>
.process_wrap {
  flex: 1;
  padding: 30px;
  margin-top: 20px;
  background-color: #fff;
  .content {
    min-height: 100%;
    padding-bottom: 44px;
    & > .title {
      color: #333;
      font-size: 32px;
      font-weight: bold;
    }
    .date {
      color: #999;
      font-size: 32px;
      text-align: right;
    }
    .reason_wrap {
      font-size: 32px;
      .title {
        color: #333;
        margin: 20px 0;
      }
      .message {
        color: #ff6343;
        line-height: 1.4;
      }
    }
  }
  .btn {
    margin-top: -44px;
  }
}
</style>