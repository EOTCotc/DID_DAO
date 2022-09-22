<template>
  <van-pull-refresh v-model="list.uploading" @refresh="handleBottomRefresh">
    <div class="certificationAudit_wrap bg-gray fullscreen">
      <page-header title="社区审批" theme="dark"/>
      <van-tabs
          v-model="tab.active"
          swipeable
          background="#1b2945"
          title-active-color="#FFF"
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
          v-model="list.btloading"
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
                v-if="!!tab.active"
                :src="require(`../../../assets/imgs/status_${tab.active === 1 ? 'confirm' : 'cancel'}.png`)"
                alt=""
            >
            <van-row class="item-row user">
              <van-cell :title="item.name" :value="item.date"></van-cell>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">社区名</van-col>
              <van-col span="16" class="value">{{item.comName}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">电话号码</van-col>
              <van-col span="16" class="value">{{item.phone}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">邮箱地址</van-col>
              <van-col span="16" class="value">{{item.mail}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">质押数量</van-col>
              <van-col span="16" class="value">{{item.zysl}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">社区地址</van-col>
              <van-col span="16" class="value">{{item.address}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">有无办公室</van-col>
              <van-col span="16" class="value">{{item.hasOffice ? '有' : "无"}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">是否建群</van-col>
              <van-col span="16" class="value">{{item.hasGroup ? "是" : "否"}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">推荐人</van-col>
              <van-col span="16" class="value">
                {{item.refName}}
                <i class="icon-service icon" @click="showReferrer(item)"></i>
              </van-col>
            </van-row>
            <van-steps
                v-if="tab.active > 0"
                :active="3"
                direction="vertical"
                active-color="#227AEE"
            >
              <van-step v-for="step in item.auths" :key="step.id">
                <template slot="active-icon">
                  <van-icon v-if="!!step.status" name="checked" color="#227AEE"/>
                  <van-icon v-else name="clear" color="#227AEE"/>
                </template>
                <template slot="inactive-icon">
                  <van-icon v-if="!!step.status" name="checked" color="#227AEE"/>
                  <van-icon v-else name="clear" color="#227AEE"/>
                </template>
                <van-row class="main">
                  <van-col :span="12" class="title">{{getAuditStep(item.auditStep)}}:{{step.name}}</van-col>
                  <van-col :span="12" class="date" style="font-size: 12px;color: #999;text-align: right;">
                    {{transformUTCDate(step.authDate)}}
                  </van-col>
                </van-row>
              </van-step>
            </van-steps>
            <van-row class="item-row reason_wrap" v-if="tab.active === 2  ">
              <div class="title">打回原因</div>
              <div class="message">信息有误: 手持证件照有误,请重新提交</div>
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
          :image="require('../../../assets/imgs/empty.png')"
          description="暂无任何数据"
      />
    </div>
    <referrer ref="referrer"/>
    <cancel ref="cancel" title="驳回原因" @handleReject="handleReject" />
  </van-pull-refresh>
</template>

<script>
  import pageHeader from "@/components/topBar/pageHeader.vue"
  import Referrer from './referrer'
  import Cancel from './cancel'
  import {list, auditCommunity} from "@/api/pagesApi/approvalCommunity";
  import {transformUTCDate} from "@/utils/utils";

  export default {
    name: "approvalCommunity",
    components: {
      pageHeader,
      Referrer,
      Cancel
    },
    data() {
      return {
        // 当前选择的列表项的id
        id: null,
        tab: {
          data: ['待审批', '已审批', '驳回'],
          active: 0
        },
        list: {
          uploading: false,
          btloading: false,
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
        this.list.btloading = true
        this.getList()
      },
      // 获取列表
      getList() {
        this.$toast.loading('列表加载中…')
        list(this.tab.active, this.list.query).then(res => {
          const data = res.data.items
          if (this.list.query.page === 1) {
            this.list.data = data
          } else {
            this.list.data.push(...data)
          }
          this.list.finished = !data.length
        }).finally(() => {
          this.$toast.clear()
          this.list.uploading = false
          this.list.btloading = false
        })
      },
      showReferrer(data) {
        let dom = this.$refs.referrer
        dom.toggle(true)
        dom.getInfo({refUId: data.refUId, refName: data.refName, refCommunityName: data.refCommunityName})
        dom = null
      },
      // 批准
      confirm(data) {
        this.handleSubmit("批准提示", "请确保申请人填写信息无误，确定批准申请？", {
          communityId: data.communityId,
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
              auditCommunity(params).then(res => {
                done()
                this.$toast({
                  type: "success",
                  message: res.data.message
                })
                this.getList()
              }).catch(() => {
                done()
                this.$toast({
                  type: "fail",
                  message: "操作失败"
                })
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
        this.$refs.cancel.toggle(true)
        this.id = data.communityId
      },
      // 驳回信息提交
      handleReject(data) {
        const {type, remark} = data
        this.handleSubmit("驳回提示", "确定驳回申请？", {
          communityId: this.id,
          auditType: this.getAuditType(type),
          remark
        })
      },
      // 获取审核步骤
      getAuditStep(step) {
        const arr = ['初审', '二审', '抽审', 'Dao']
        return arr[step]
      },
      // 获取审核状态
      getAuditType(type) {
        const arr = ['未审核', '审核通过', '信息不全', '信息有误', '证件照片有误', '证件照片不清晰']
        return arr.indexOf(type)
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