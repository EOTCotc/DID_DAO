<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="certificationAudit_wrap bg-gray fullscreen">
      <page-header title="社区审批" theme="dark" />
      <van-tabs 
        v-model="tab.active" 
        swipeable
        background="#1b2945"
        title-active-color="#FFF"
        title-inactive-color="#8D94A2"
      >
        <van-tab 
          v-for="item in tab.data"
          :key="item.id"
          :title="item.text"
        >
        </van-tab>
      </van-tabs>
      <van-list
        class="list_wrap"
        v-model="list.loading"
        :finished="!list.loading"
        finished-text="没有更多了"
        @load="handleLoad"
      >
        <ul class="list">
          <li class="item"
            v-for="item in list.data"
            :key="item.id"
          >
            <img class="status" :src="require('../../../assets/imgs/status_cancel.png')" alt="">
            <van-row class="item-row user">
              <van-cell :title="item.name" :value="item.date"></van-cell>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">社区名</van-col>
              <van-col span="16" class="value">{{item.sqm}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">电话号码</van-col>
              <van-col span="16" class="value">{{item.phone}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">邮箱地址</van-col>
              <van-col span="16" class="value">{{item.email}}</van-col>
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
              <van-col span="16" class="value">{{item.ywbgs}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">是否建群</van-col>
              <van-col span="16" class="value">{{item.sfjq}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">推荐人</van-col>
              <van-col span="16" class="value">{{item.tjr}}<i class="icon-service icon" @click="showReferrer"></i></van-col>
            </van-row>
            <van-steps direction="vertical" active-color="#227AEE" :active="3">
              <van-step v-for="step in item.step" :key="step.id">
                <template slot="active-icon">
                  <van-icon v-if="!!step.status" name="checked" color="#227AEE" />
                  <van-icon v-else name="clear" color="#227AEE" />
                </template>
                <template slot="inactive-icon">
                  <van-icon v-if="!!step.status" name="checked" color="#227AEE" />
                  <van-icon v-else name="clear" color="#227AEE" />
                </template>
                <van-row class="main">
                  <van-col :span="12" class="title">{{step.title}}</van-col>
                  <van-col :span="12" class="date" style="font-size: 12px;color: #999;text-align: right;">{{step.date}}</van-col>
                </van-row>
              </van-step>
            </van-steps>
            <van-row class="item-row reason_wrap">
              <div class="title">打回原因</div>
              <div class="message">信息有误: 手持证件照有误,请重新提交</div>
            </van-row>
            <van-row class="item-row" gutter="20">
              <van-col span="12">
                <van-button
                  class="more"
                  color="#237FF8"
                  round
                  plain
                  block
                  type="primary"
                  @click="cancel"
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
                  @click="confirm"
                >
                  批准
                </van-button>
              </van-col>
            </van-row>
          </li>
        </ul>
      </van-list>
    </div>
    <referrer ref="referrer" />
    <cancel ref="cancel" />
  </van-pull-refresh>
</template>

<script>
import { Dialog } from 'vant'
import pageHeader from "@/components/topBar/pageHeader.vue"
import Referrer from './referrer'
import Cancel from './cancel'

export default {
  name: "communityApproval",
  components: {
    pageHeader,
    Referrer,
    Cancel
  },
  data() {
    return {
      loading: false,
      tab: {
        data: [
          {id: 1, text: '全部'},
          {id: 2, text: '已认证'},
          {id: 3, text: '未认证'}
        ],
        active: 0
      },
      list: {
        data: [
          {
            id: 4,
            name: "陈粒 (314587)",
            sqm: '粒紫',
            phone: '15678998699',
            email: '1652987089@qq.com',
            zysl: '88888 EOTC',
            address: '湖南省-长沙-天心区',
            ywbgs: '有',
            sfjq: '是',
            tjr: '李弥(314587)',
            date: "2022-05-20",
            step: [
              {status: 1, title: '初审:测试', date: '2020-02-02 11:50:12'},
              {status: 1, title: '初审:测试', date: '2020-02-02 11:50:12'}
            ],
          }
        ],
        loading: false,
        page: 1,
        pageSize: 10
      },
    }
  },
  methods: {
    onRefresh() {},
    getList() {},
    handleLoad() {

    },
    showReferrer() {
      this.$refs.referrer.toggle(true)
    },
    // 批准
    confirm() {
      Dialog.confirm({
        title: "批准提示",
        className: "referrerConfirmDialog",
        message: "请确保申请人填写信息无误，确定批准申请？",
        cancelButtonColor: "#666",
        confirmButtonColor: "#1B2945",
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            done()
          } else {
            done()
          }
        }
      })
    },
    // 驳回
    cancel() {

    }
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