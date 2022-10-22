<template>
  <van-pull-refresh v-model="list.uploading"
                    @refresh="handleBottomRefresh">
    <div class="certificationAudit_wrap bg-gray fullscreen">
      <page-header :title="$t('cApproval.title')" />
      <van-tabs v-model="tab.active"
                swipeable
                background="#1b2945"
                title-active-color="#FFF"
                title-inactive-color="#8D94A2"
                @change="handleChangeTab">
        <van-tab v-for="item in tab.data"
                 :key="item"
                 :title="item">
        </van-tab>
      </van-tabs>
      <van-list class="list_wrap"
                v-show="!!list.data.length"
                v-model="list.UpRefreshLoading"
                :finished="!!list.data.length && list.finished"
                :finished-text="$t('cApproval.nomore')"
                @load="handleUpRefresh">
        <ul class="list">
          <li class="item"
              v-for="item in list.data"
              :key="item.id">
            <img class="status"
                 v-if="tab.active === 1"
                 :src="require(`../../assets/imgs/status_${tab.status === 1 ? 'confirm' : 'cancel'}.png`)"
                 alt="">
            <img class="status"
                 v-else-if="tab.active === 2"
                 :src="require(`../../assets/imgs/status_cancel.png`)"
                 alt="">
            <van-row class="item-row user">
              <van-cell :title="`${item.comName} (${item.refUId})`"
                        :value="transformUTCDate(item.createDate)"></van-cell>
            </van-row>
            <van-row class="item-row">
              <van-col span="8"
                       class="name">{{$t('cApproval.name')}}</van-col>
              <van-col span="16"
                       class="value">{{item.comName}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8"
                       class="name">{{$t('cApproval.number')}}</van-col>
              <van-col span="16"
                       class="value">{{item.phone}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8"
                       class="name">{{$t('cApproval.email')}}</van-col>
              <van-col span="16"
                       class="value">{{item.mail}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8"
                       class="name">{{$t('cApproval.EOTCnum')}}</van-col>
              <van-col span="16"
                       class="value">{{item.eotc}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8"
                       class="name">{{$t('cApproval.address')}}</van-col>
              <van-col span="16"
                       class="value">{{item.addressName}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8"
                       class="name">{{$t('cApproval.hasOffice')}}</van-col>
              <van-col span="16"
                       class="value">{{item.hasOffice ? '有' : "无"}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8"
                       class="name">{{$t('cApproval.hasGroup')}}</van-col>
              <van-col span="16"
                       class="value">{{item.hasGroup ? "是" : "否"}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8"
                       class="name">{{$t('cApproval.referrer')}}</van-col>
              <van-col span="16"
                       class="value">
                {{item.refName}}
                <i class="icon-service icon"
                   @click="showReferrer(item)"></i>
              </van-col>
            </van-row>
            <van-steps v-if="tab.active > 0"
                       :active="3"
                       direction="vertical"
                       active-color="#227AEE">
              <van-step v-for="step in item.auths"
                        :key="step.id">
                <template slot="active-icon">
                  <van-icon v-if="!!step.auditType"
                            size='14px'
                            style='background-color: #FFF;'
                            name="checked"
                            color="#227AEE" />
                  <van-icon v-else
                            name="clear"
                            size='14px'
                            style='background-color: #FFF;'
                            color="#227AEE" />
                </template>
                <template slot="inactive-icon">
                  <van-icon v-if="!!step.auditType"
                            size='14px'
                            style='background-color: #FFF;'
                            name="checked"
                            color="#227AEE" />
                  <van-icon v-else
                            name="clear"
                            size='14px'
                            style='background-color: #FFF;'
                            color="#227AEE" />
                </template>
                <van-row class="main">
                  <van-col :span="12"
                           class="title">{{step.isDao ? 'Dao' : getAuditStep(step.auditStep)}}:{{step.name}}</van-col>
                  <van-col :span="12"
                           class="date"
                           style="font-size: 12px;color: #999;text-align: right;">
                    {{transformUTCDate(step.authDate)}}
                  </van-col>
                </van-row>
              </van-step>
            </van-steps>
            <van-row class="item-row reason_wrap"
                     v-if="tab.active === 2 && item.remark">
              <div class="title">{{$t('cApproval.remark')}}</div>
              <div class="message">{{item.remark}}</div>
            </van-row>
            <van-row class="item-row"
                     gutter="20"
                     v-if="tab.active === 0">
              <van-col span="12">
                <van-button class="more"
                            color="#237FF8"
                            round
                            plain
                            block
                            type="primary"
                            @click="cancel(item)">
                  {{$t('cApproval.cancel')}}
                </van-button>
              </van-col>
              <van-col span="12">
                <van-button class="more"
                            round
                            block
                            color="#237FF8"
                            type="primary"
                            @click="confirm(item)">
                  {{$t('cApproval.ratify')}}
                </van-button>
              </van-col>
            </van-row>
          </li>
        </ul>
      </van-list>
      <van-empty v-show="!list.data.length"
                 class="custom-image"
                 :image="require('../../assets/imgs/empty.png')"
                 :description="$t('cApproval.Nodata')" />
    </div>
    <referrer ref="referrer" />
    <reject ref="reject"
            :title="$t('cApproval.cause')"
            @handleReject="handleReject" />
  </van-pull-refresh>
</template>

<script>
import pageHeader from '@/components/topBar/pageHeader.vue'
import Reject from '@/components/reject'
import Referrer from './referrer'
import { communityList, auditCommunity } from '@/api/approval/community'
import { transformUTCDate, getAuditStep, getAuditType } from '@/utils/utils'

export default {
  name: 'approvalCommunity',
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
        data: this.$t('cApproval.data'),
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
      const userInfo = this.cookie.get('userInfo')
      const loading = this.$toast.loading(this.$t('cApproval.load'))
      communityList(this.tab.active, this.list.query)
        .then((res) => {
          if (!res.data.code) {
            const data = res.data.items.map((item) => {
              const auths = [...item.auths]
              if (this.tab.active === 1) {
                item.auths = auths.slice(
                  0,
                  auths.findIndex(
                    (auth) => auth.uId === userInfo.uid && !!auth.auditType
                  ) + 1
                )
                item.status = item.auths[item.auths.length - 1].auditType
              }
              return item
            })
            if (this.list.query.page === 1) {
              this.list.data = data
            } else {
              this.list.data.push(...data)
            }
            this.list.finished = !data.length
          }
        })
        .finally(() => {
          loading.clear()
          this.list.uploading = false
          this.list.UpRefreshLoading = false
        })
    },
    showReferrer(data) {
      let dom = this.$refs.referrer
      dom.toggle(true)
      dom.getInfo({
        refUserId: data.refUserId,
        refName: data.refName,
        refCommunityName: data.refCommunityName,
      })
      dom = null
    },
    // 批准
    confirm(data) {
      this.handleSubmit(
        this.$t('cApproval.Approvalprompt'),
        this.$t('cApproval.Approvalmesg'),
        {
          communityId: data.communityId,
          auditType: 1,
          remark: '',
        }
      )
    },
    // 提交信息
    handleSubmit(title, message, params) {
      this.$dialog
        .confirm({
          title,
          message,
          className: 'referrerConfirmDialog',
          cancelButtonColor: '#666',
          confirmButtonColor: '#1B2945',
          confirmButtonText: this.$t('exam.Text1'),
          cancelButtonText: this.$t('exam.Text2'),
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              auditCommunity(params).then((res) => {
                done()
                if (res.data.code) {
                  this.$toast({
                    type: 'fail',
                    message: this.$t('cApproval.failure'),
                  })
                } else {
                  this.$toast({
                    type: 'success',
                    message: res.data.message,
                  })
                  this.tab.active = 1
                  this.getList()
                }
              })
            } else {
              done()
            }
          },
        })
        .catch(() => {})
    },
    // 驳回
    cancel(data) {
      this.$refs.reject.toggle(true)
      this.id = data.communityId
    },
    // 驳回信息提交
    handleReject(data) {
      const { type, remark } = data
      this.handleSubmit(
        this.$t('cApproval.Dismiss'),
        this.$t('cApproval.Dismissmesg'),
        {
          communityId: this.id,
          auditType: this.getAuditType(type),
          remark,
        }
      )
    },
    // 获取审核步骤
    getAuditStep,
    // 获取审核状态
    getAuditType,
    // 转换时间格式
    transformUTCDate,
  },
  created() {
    this.getList()
  },
}
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