<template>
  <van-pull-refresh v-model="list.uploading" @refresh="handleBottomRefresh">
    <div class="certificationAudit_wrap bg-gray fullscreen">
      <page-header :title="$t('my.community_approval')" theme="dark" />
      <van-tabs
        v-model="tab.active"
        swipeable
        background="#1b2945"
        title-active-color="#FFF"
        title-inactive-color="#8D94A2"
        @change="handleChangeTab"
      >
        <van-tab v-for="item in tab.data" :key="item" :title="item"> </van-tab>
      </van-tabs>
      <van-list
        class="list_wrap"
        v-show="!!list.data.length"
        v-model="list.UpRefreshLoading"
        :finished="!!list.data.length && list.finished"
        :finished-text="$t('bindRelation.not_more')"
        @load="handleUpRefresh"
      >
        <ul class="list">
          <li class="item" v-for="item in list.data" :key="item.id">
            <img
              class="status"
              v-if="tab.active === 1"
              :src="
                require(`../../../assets/imgs/status_${
                  item.status === 1 ? 'confirm' : 'cancel'
                }.png`)
              "
              alt=""
            />
            <img
              class="status"
              v-if="tab.active === 2"
              :src="require(`../../../assets/imgs/status_cancel.png`)"
              alt=""
            />
            <van-row class="item-row user">
              <van-cell
                :title="item.comName"
                :value="transformUTCDate(item.createDate)"
              ></van-cell>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">{{
                $t("community.tags8")
              }}</van-col>
              <van-col span="16" class="value">{{ item.comName }}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">{{
                $t("approval.tags6")
              }}</van-col>
              <van-col span="16" class="value">{{ item.phone }}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">{{ $t("content.email") }}</van-col>
              <van-col span="16" class="value">{{ item.mail }}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">{{
                $t("approval.tags7")
              }}</van-col>
              <van-col span="16" class="value">{{ item.zysl }}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">{{
                $t("community.tags10")
              }}</van-col>
              <van-col span="16" class="value">{{ item.address }}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">{{
                $t("community.tags15")
              }}</van-col>
              <van-col span="16" class="value">{{
                item.hasOffice ? $t("community.tags16") : $t("community.tags17")
              }}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">{{
                $t("community.tags18")
              }}</van-col>
              <van-col span="16" class="value">{{
                item.hasGroup ? $t("community.tags19") : $t("community.tags20")
              }}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">{{
                $t("setup.referrer")
              }}</van-col>
              <van-col span="16" class="value">
                {{ item.refName }}
                <i class="icon-service icon" @click="showReferrer(item)"></i>
              </van-col>
            </van-row>
            <van-steps
              v-if="tab.active > 0 && !!item.auths.length"
              :active="3"
              direction="vertical"
              active-color="#227AEE"
            >
              <van-step v-for="step in item.auths" :key="step.id">
                <template slot="active-icon">
                  <van-icon
                    v-if="step.auditType === 1"
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
                    v-if="step.auditType === 1"
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
                  <van-col :span="12" class="title"
                    >{{ step.isDao ? "Dao" : getAuditStep(step.auditStep) }}:{{
                      step.name
                    }}</van-col
                  >
                  <van-col
                    :span="12"
                    class="date"
                    style="font-size: 13px; color: #999; text-align: right"
                  >
                    {{ transformUTCDate(step.authDate) }}
                  </van-col>
                  <van-col
                    :span="24"
                    class="item-row reason_wrap"
                    v-if="!!step.remark"
                  >
                    <div class="title">{{ $t("fail.tags2") }}</div>
                    <div class="message">{{ step.remark }}</div>
                  </van-col>
                </van-row>
              </van-step>
            </van-steps>
            <van-row class="item-row" gutter="20" v-if="tab.active === 0">
              <van-col span="12">
                <van-button
                  class="more"
                  color="#237FF8"
                  round
                  plain
                  block
                  type="primary"
                  @click="cancel(item)"
                >
                  {{ $t("approval.data3") }}
                </van-button>
              </van-col>
              <van-col span="12">
                <van-button
                  class="more"
                  round
                  block
                  color="#237FF8"
                  type="primary"
                  @click="confirm(item)"
                >
                  {{ $t("approval.tags8") }}
                </van-button>
              </van-col>
            </van-row>
          </li>
        </ul>
      </van-list>
      <van-empty
        v-show="!list.data.length"
        class="custom-image"
        :image="require('../../../assets/imgs/empty.png')"
        :description="$t('public.not_data')"
      />
    </div>
    <referrer ref="referrer" />
    <reject
      ref="reject"
      :title="$t('approval.tags9')"
      @handleReject="handleReject"
    />
  </van-pull-refresh>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader.vue";
import Reject from "@/components/reject";
import Referrer from "./referrer";
import { list, auditCommunity } from "@/api/pagesApi/approvalCommunity";
import { transformUTCDate, getAuditStep } from "@/utils/utils";

export default {
  name: "approvalCommunity",
  components: {
    pageHeader,
    Referrer,
    Reject,
  },
  data() {
    return {
      // 当前选择的列表项的id
      id: null,
      tab: {
        data: [
          this.$t("approval.data1"),
          this.$t("approval.data2"),
          this.$t("approval.data3"),
        ],
        active: 0,
      },
      list: {
        uploading: false,
        UpRefreshLoading: false,
        finished: false,
        query: {
          page: 1,
          itemsPerPage: 10,
        },
        data: [],
      },
    };
  },
  methods: {
    handleChangeTab() {
      this.list.query.page = 1;
      this.list.finished = false;
      this.list.data = [];
      this.getList();
    },
    // 下拉刷新
    handleBottomRefresh() {
      this.list.uploading = true;
      this.getList();
    },
    // 滚动到底翻页
    handleUpRefresh() {
      this.list.query.page++;
      this.list.UpRefreshLoading = true;
      this.getList();
    },
    // 获取列表
    getList() {
      const userInfo = JSON.parse(this.cookie.get("userInfo"));
      this.$toast.loading(this.$t("approval.data4"));
      list(this.tab.active, this.list.query)
        .then((res) => {
          if (!res.data.code) {
            const data = res.data.items.map((item) => {
              const auths = [...item.auths];
              if (this.tab.active === 1) {
                item.auths = auths.slice(
                  0,
                  auths.findIndex(
                    (auth) => auth.uId === userInfo.uid && !!auth.auditType
                  ) + 1
                );
                item.status = item.auths[item.auths.length - 1].auditType;
              }
              return item;
            });
            if (this.list.query.page === 1) {
              this.list.data = data;
            } else {
              this.list.data.push(...data);
            }
            this.list.finished = data.length < 10;
          } else {
            this.$toast.fail({
              forbidClick: true,
              message: res.data.message,
            });
          }
        })
        .finally(() => {
          this.$toast.clear();
          this.list.uploading = false;
          this.list.UpRefreshLoading = false;
        });
    },
    showReferrer(data) {
      let dom = this.$refs.referrer;
      dom.toggle(true);
      dom.getInfo({
        refUId: data.refUId,
        refName: data.refName,
        refCommunityName: data.refCommunityName,
      });
      dom = null;
    },
    // 批准
    confirm(data) {
      this.handleSubmit(this.$t("approval.data5"), this.$t("approval.data6"), {
        communityId: data.communityId,
        auditType: 1,
        remark: "",
      });
    },
    // 提交信息
    handleSubmit(title, message, params) {
      this.$dialog
        .confirm({
          title,
          message,
          className: "referrerConfirmDialog",
          cancelButtonColor: "#666",
          confirmButtonColor: "#1B2945",
          beforeClose: (action, done) => {
            if (action === "confirm") {
              auditCommunity(params).then((res) => {
                done();
                if (res.data.code) {
                  this.$toast({
                    type: "fail",
                    message: this.$t("projects.projects_msg2"),
                  });
                } else {
                  this.$toast({
                    type: "success",
                    message: res.data.message,
                  });
                  this.tab.active = 1;
                  this.getList();
                }
              });
            } else {
              done();
            }
          },
        })
        .catch(() => {});
    },
    // 驳回
    cancel(data) {
      this.$refs.reject.toggle(true);
      this.id = data.communityId;
    },
    // 驳回信息提交
    handleReject(data) {
      const { type, remark } = data;
      this.handleSubmit(this.$t("approval.data7"), this.$t("approval.data8"), {
        communityId: this.id,
        auditType: this.getAuditType(type),
        remark,
      });
    },
    // 获取审核步骤
    getAuditStep,
    // 获取审核状态
    getAuditType(type) {
      const arr = [
        this.$t("approval.data9"),
        this.$t("approval.data10"),
        this.$t("approval.data11"),
        this.$t("approval.data12"),
      ];
      return arr.indexOf(type);
    },
    // 转换时间格式
    transformUTCDate,
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.certificationAudit_wrap {
  &::v-deep(.van-tabs__line) {
    background-color: #237df4;
  }

  .list_wrap {
    flex: 1;
    box-sizing: border-box;
    min-height: 0;
    overflow: auto;

    .item {
      position: relative;
      padding: 0 30px 30px;
      margin: 25px 25px 0;
      border-radius: 20px;
      background: #fff;
      overflow: hidden;

      .status {
        @include posi($t: 120px, $r: 40px);
        display: block;
        width: 140px;
      }
    }
  }

  .item-row {
    margin-top: 30px;

    &.user {
      border-bottom: 1px solid #f3f4f5;
    }

    &::v-deep(.van-cell) {
      padding: 0;
    }

    .name {
      color: #999;
      font-size: 32px;
    }

    .value {
      color: #333;
      font-size: 32px;

      .icon {
        color: #237ff8;
        font-size: 32px;
        margin-left: 10px;
      }
    }
  }

  .reason_wrap {
    font-size: 32px;

    .title {
      color: #333;
    }

    .message {
      color: #fc7542;
      margin-top: 16px;
    }
  }
}
</style>