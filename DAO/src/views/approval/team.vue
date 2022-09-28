<template>
  <van-pull-refresh v-model="list.uploading" @refresh="handleBottomRefresh">
    <div class="certificationAudit_wrap bg-gray fullscreen">
      <page-header title="团队成员名单申请"/>
      <van-tabs
          v-model="tab.active"
          swipeable
          title-inactive-color="#8D94A2"
          @change="handleChangeTab"
      >
        <van-tab
            v-for="item in tab.data"
            :key="item"
            :title="item"
        >
        </van-tab>
      </van-tabs>
      <van-list
          class="list_wrap"
          v-show="!!list.data.length"
          v-model="list.UpRefreshLoading"
          :finished="list.finished"
          finished-text="没有更多了"
          @load="handleUpRefresh"
      >
        <ul class="list">
          <li class="item"
              v-for="item in list.data"
              :key="item.id"
          >
            <img
                class="status"
                v-if="tab.active === 1"
                :src="require(`../../assets/imgs/status_${item.auditType === 1 ? 'confirm' : 'cancel'}.png`)"
                alt=""
            >
            <van-row class="item-row user">
              <van-cell :title="item.user" :value="transformUTCDate(item.createDate)"></van-cell>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">团队人数</van-col>
              <van-col span="16" class="value">{{item.teanNum}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">推荐人</van-col>
              <van-col span="16" class="value">
                {{item.refUser}}
                <i class="icon-service icon" @click="showReferrer(item)"></i>
              </van-col>
            </van-row>
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
                  驳回
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
                  批准
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
          description="暂无任何数据"
      />
    </div>
    <referrer ref="referrer"/>
    <reject
        ref="reject"
        title="驳回原因"
        :types="['未实名认证', '其他']"
        @handleReject="handleReject"
    />
  </van-pull-refresh>
</template>

<script>
  import pageHeader from "@/components/topBar/pageHeader.vue"
  import Reject from '@/components/reject'
  import Referrer from './referrer'
  import {list, approvalConfirm} from "@/api/approval/team";
  import {transformUTCDate} from "@/utils/utils";

  export default {
    name: "approvalCommunity",
    components: {
      pageHeader,
      Referrer,
      Reject
    },
    data() {
      return {
        // 当前选择的列表项的id
        id: null,
        tab: {
          data: ['待处理', '已处理'],
          active: 0
        },
        list: {
          uploading: false,
          UpRefreshLoading: false,
          finished: false,
          query: {
            page: 1,
            itemsPerPage: 10
          },
          data: [],
        },
      }
    },
    methods: {
      handleChangeTab() {
        this.list.query.page = 1
        this.list.finished = false
        this.list.data = []
        this.getList()
      },
      // 下拉刷新
      handleBottomRefresh() {
        this.list.uploading = true
        this.getList()
      },
      // 滚动到底翻页
      handleUpRefresh() {
        this.list.query.page++
        this.list.UpRefreshLoading = true
        this.getList()
      },
      // 获取列表
      getList() {
        const loading = this.$toast.loading({
          forbidClick: true,
          message: "'列表加载中…'"
        })
        list({...this.list.query, type: this.tab.active}).then(res => {
          if (!res.data.code) {
            const data = res.data.items
            if (this.list.query.page === 1) {
              this.list.data = data
            } else {
              this.list.data.push(...data)
            }
            this.list.finished = !data.length
          }
        }).finally(() => {
          loading.clear()
          this.list.uploading = false
          this.list.UpRefreshLoading = false
        })
      },
      showReferrer(data) {
        let dom = this.$refs.referrer
        dom.toggle(true)
        dom.getInfo(data)
        dom = null
      },
      // 批准
      confirm(data) {
        this.handleSubmit("批准提示", "请确保申请人填写信息无误，确定批准申请？", {
          teamAuthId: data.teamAuthId,
          auditType: 1,
          remark: ""
        })
      },
      // 提交信息
      handleSubmit(title, message, params) {
        this.$dialog.confirm({
          title,
          message,
          className: "referrerConfirmDialog",
          cancelButtonColor: "#666",
          confirmButtonColor: "#1B2945",
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              approvalConfirm(params).then(res => {
                done()
                if (res.data.code) {
                  this.$toast({
                    type: "fail",
                    message: "操作失败"
                  })
                } else {
                  this.$toast({
                    type: "success",
                    message: res.data.message
                  })
                  this.getList()
                }
              })
            } else {
              done()
            }
          }
        }).catch(() => {
        })
      },
      // 驳回
      cancel(data) {
        this.$refs.reject.toggle(true)
        this.id = data.teamAuthId
      },
      // 驳回信息提交
      handleReject(data) {
        const {type, remark} = data
        this.handleSubmit("驳回提示", "确定驳回申请？", {
          teamAuthId: this.id,
          auditType: this.getAuditType(type),
          remark
        })
      },
      // 获取审核状态
      getAuditType(type) {
        return ['未审核', '审核通过', '未实名认证', '其他'].indexOf(type)
      },
      // 转换时间格式
      transformUTCDate
    },
    created() {
      this.getList()
    }
  }
</script>

<style lang="scss" scoped>
  .certificationAudit_wrap {
    &::v-deep(.van-tabs__line) {
      background-color: #237DF4;
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
        background: #FFF;
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
        border-bottom: 1px solid #F3F4F5;
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
          color: #237FF8;
          font-size: 26px;
          margin-left: 10px;
        }
      }
    }

    .reason_wrap {
      font-size: 28px;

      .title {
        color: #333;
      }

      .message {
        color: #FC7542;
        margin-top: 16px;
      }
    }
  }
</style>