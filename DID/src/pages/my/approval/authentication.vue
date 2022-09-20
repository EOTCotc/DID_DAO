<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="certificationAudit_wrap bg-gray fullscreen">
      <page-header title="认证审核" theme="dark" />
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
              <van-col span="8" class="name">手机号：</van-col>
              <van-col span="16" class="value">{{item.phone}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="8" class="name">证件号：</van-col>
              <van-col span="16" class="value">{{item.email}}</van-col>
            </van-row>
            <van-row class="item-row">
              <van-col span="24" class="name">证件及手持证件照</van-col>
              <van-col span="24" class="value">
                <div class="imgs">
                  <img class="img" :src="require('../../../assets/imgs/01.jpg')" alt="">
                  <img class="img" :src="require('../../../assets/imgs/01.jpg')" alt="">
                </div>
              </van-col>
            </van-row>
            <!-- 流程 -->
            <step :step="item.step" />
            <!-- 打回原因 -->
            <van-row class="item-row reason_wrap">
              <div class="title">打回原因</div>
              <div class="message">信息有误: 手持证件照有误,请重新提交</div>
            </van-row>
            <!-- 操作 -->
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
                  打回
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
                  通过
                </van-button>
              </van-col>
            </van-row>
          </li>
        </ul>
      </van-list>
    </div>
    <!-- 批准 -->
    <referrer ref="referrer" />
    <!-- 拒绝 -->
    <cancel ref="cancel" />
  </van-pull-refresh>
</template>

<script>
import { Dialog } from 'vant'
import pageHeader from "@/components/topBar/pageHeader"
import Step from "@/components/step"
import Referrer from './referrer'
import Cancel from './cancel'

export default {
  name: "authenticationApproval",
  components: {
    pageHeader,
    Step,
    Referrer,
    Cancel
  },
  data() {
    return {
      loading: false,
      tab: {
        data: [
          {id: 1, text: '待审核'},
          {id: 2, text: '已审核'},
          {id: 3, text: '打回'}
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
              {status: '初审', name: '测试', date: '2020-02-02 11:50:12'},
              {status: '初审', name: '测试', date: '2020-02-02 11:50:12'}
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
      this.$refs.cancel.toggle(true)
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
      color: #FC7542;
      margin-top: 16px;
    }
  }
}
</style>