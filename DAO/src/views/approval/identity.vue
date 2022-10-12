<template>
  <van-pull-refresh v-model="list.uploading" @refresh="handleBottomRefresh">
    <div class="certificationAudit_wrap bg-gray fullscreen">
      <page-header :title="$t('Autionaudit.title')" />
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
        :finished-text="$t('cApproval.nomore')"
        @load="handleUpRefresh"
      >
        <ul class="list">
          <li class="item" v-for="item in list.data" :key="item.id">
            <img
              class="status"
              v-if="!!tab.active"
              :src="
                require(`../../assets/imgs/status_${
                  tab.active === 1 ? 'confirm' : 'cancel'
                }.png`)
              "
              alt=""
            />
            <van-row class="item-row user">
              <van-cell
                :title="item.name"
                :value="transformUTCDate(item.createDate)"
              ></van-cell>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">{{
                $t("Autionaudit.phoneNum")
              }}</van-col>
              <van-col span="16" class="value">{{ item.phoneNum }}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">{{
                $t("Autionaudit.idCard")
              }}</van-col>
              <van-col span="16" class="value">{{ item.idCard }}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="24" class="name">{{
                $t("Autionaudit.portraitImage")
              }}</van-col>
              <van-col span="24" class="value">
                <div class="imgs">
                  <img
                    class="img"
                    :src="item.portraitImage"
                    alt=""
                    @click="preview(item.portraitImage)"
                  />
                  <img
                    class="img"
                    :src="item.nationalImage"
                    alt=""
                    @click="preview(item.nationalImage)"
                  />
                </div>
              </van-col>
            </van-row>
            <!-- 流程 -->
            <van-steps
              v-if="tab.active > 0"
              :active="3"
              direction="vertical"
              active-color="#227AEE"
            >
              <van-step v-for="step in item.auths" :key="step.id">
                <template slot="active-icon">
                  <van-icon
                    v-if="!!step.status"
                    name="checked"
                    color="#227AEE"
                  />
                  <van-icon v-else name="clear" color="#227AEE" />
                </template>
                <template slot="inactive-icon">
                  <van-icon
                    v-if="!!step.status"
                    name="checked"
                    color="#227AEE"
                  />
                  <van-icon v-else name="clear" color="#227AEE" />
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
                    style="font-size: 12px; color: #999; text-align: right"
                  >
                    {{ transformUTCDate(step.authDate) }}
                  </van-col>
                  <van-col
                    :span="24"
                    class="remark"
                    style="font-size: 12px; color: #999; margin-top: 15px"
                  >
                    <!-- 打回原因 -->
                    <van-row
                      class="reason_wrap"
                      v-if="tab.active === 2 && !!step.remark"
                    >
                      <div class="title">{{ $t("cApproval.remark") }}</div>
                      <div class="message">{{ step.remark }}</div>
                    </van-row>
                  </van-col>
                </van-row>
              </van-step>
            </van-steps>
            <!-- 操作 -->
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
                  {{ $t("Autionaudit.cancel") }}
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
                  {{ $t("Autionaudit.ratify") }}
                </van-button>
              </van-col>
            </van-row>
          </li>
        </ul>
      </van-list>
      <van-empty
        v-show="!list.data.length"
        class="custom-image"
        :image="require('../../assets/imgs/empty.png')"
        :description="$t('cApproval.Nodata')"
      />
    </div>
    <!-- 拒绝 -->
    <reject
      ref="reject"
      :title="$t('cApproval.remark')"
      @handleReject="handleReject"
    />
    <!--  图片预览  -->
    <van-image-preview v-model="imgPreview.show" :images="imgPreview.images" />
  </van-pull-refresh>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader";
import Reject from "@/components/reject";
import { approval, list, getImg } from "@/api/approval/identity";
import { transformUTCDate, getAuditStep } from "@/utils/utils";

export default {
  name: "authenticationApproval",
  components: {
    pageHeader,
    Reject,
  },
  data() {
    return {
      // 当前选择的列表项的id
      id: null,
      tab: {
        data: this.$t("cApproval.data"),
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
      imgPreview: {
        show: false,
        images: [],
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
    async getWatermarkImg(src) {
      const res = await getImg(src);
      const blob = new window.Blob([res.data], { type: res.type });
      const url = window.URL.createObjectURL(blob);
      return url;
    },
    // 获取列表
    getList() {
      const uid = localStorage.getItem("uid");
      this.$toast.loading(this.$t("cApproval.load"));
      list(this.tab.active, this.list.query)
        .then((res) => {
          if (!res.data.code) {
            const data = res.data.items.map((item) => {
              const auths = [...item.auths];
              this.getWatermarkImg(item.portraitImage)
                .then((res) => {
                  item.portraitImage = res;
                })
                .then(() => {
                  this.getWatermarkImg(item.nationalImage).then((res) => {
                    item.nationalImage = res;
                  });
                });
              if (this.tab.active === 1) {
                item.auths = auths.slice(
                  0,
                  auths.findIndex((auth) => auth.uId === uid) + 1
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
            this.list.finished = !data.length;
          }
        })
        .finally(() => {
          this.$toast.clear();
          this.list.uploading = false;
          this.list.UpRefreshLoading = false;
        });
    },
    // 批准
    confirm(data) {
      this.handleSubmit(
        this.$t("cApproval.Approvalprompt"),
        this.$t("cApproval.Approvalmesg"),
        {
          userAuthInfoId: data.userAuthInfoId,
          auditType: 1,
          remark: "",
        }
      );
    },
    // 提交信息
    handleSubmit(title, message, params) {
      console.log(params);
      this.$dialog
        .confirm({
          title,
          message,
          className: "referrerConfirmDialog",
          cancelButtonColor: "#666",
          confirmButtonColor: "#1B2945",
          beforeClose: (action, done) => {
            if (action === "confirm") {
              approval(params).then((res) => {
                done();
                if (res.data.code) {
                  this.$toast({
                    type: "fail",
                    message: this.$t("cApproval.failure"),
                  });
                } else {
                  this.$toast({
                    type: "success",
                    message: res.data.message,
                  });
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
      this.id = data.userAuthInfoId;
    },
    // 驳回信息提交
    handleReject(data) {
      const { type, remark } = data;
      this.handleSubmit(
        this.$t("cApproval.Dismiss"),
        this.$t("cApproval.Dismissmesg"),
        {
          userAuthInfoId: this.id,
          auditType: this.getAuditType(type),
          remark,
        }
      );
    },
    // 获取审核步骤
    getAuditStep,
    // 获取审核状态
    getAuditType(type) {
      const arr = this.$t("Autionaudit.arr");
      return arr.indexOf(type);
    },
    // 预览图片
    preview(src) {
      this.imgPreview.show = true;
      this.$set(this.imgPreview.images, 0, src);
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
      font-size: 28px;
    }
    .value {
      color: #333;
      font-size: 28px;
      .icon {
        color: #237ff8;
        font-size: 26px;
        margin-left: 10px;
      }
    }
    .imgs {
      display: flex;
      align-items: flex-start;
      margin-top: 30px;
      .img {
        display: block;
        width: calc((100% - 20px) / 2);
        &:first-of-type {
          margin-right: 20px;
        }
      }
    }
  }
  .reason_wrap {
    font-size: 28px;
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