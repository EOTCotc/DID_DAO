<template>
  <div class="case-detail_wrap fullscreen">
    <page-header title="仲裁案详情"></page-header>
    <div class="content">
      <van-row>
        <van-col class="lf" :span="12">
          <div class="user_wrap">
            <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" class="avatar">
            <span class="name">{{ info.plaintiff }}</span>
            <span class="identity">（卖家）</span>
          </div>
          <div class="count_wrap">
            <span class="text">原告</span>
            <span class="num">{{info.plaintiffNum}}票</span>
          </div>
        </van-col>
        <van-col class="rt" :span="12">
          <div class="user_wrap">
            <span class="name">{{ info.defendant }}</span>
            <span class="identity">（卖家）</span>
            <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" class="avatar">
          </div>
          <div class="count_wrap">
            <span class="num">{{info.defendantNum}}票</span>
            <span class="text">被告</span>
          </div>
        </van-col>
      </van-row>
      <div class="process_wrap">
        <div class="lt chunk" :style="{'flex': `0 0 ${info.plaintiffNum / info.total * 100}%`}"></div>
        <div class="border"></div>
        <div class="rt chunk"></div>
      </div>
      <div class="type">卖家发起仲裁，仲裁事件为账户冻结</div>
      <div class="row">
        <div class="title">仲裁结果</div>
        <div class="message">
          <p>本次参与仲裁判决的仲裁员共计{{ info.total }}人，通过双方提交举证，{{ info.plaintiffNum }}位仲裁员判定原告</p>
        </div>
      </div>
      <div class="row">
        <div class="title">结案时间</div>
        <div class="message">
          <p>{{ transformUTCDate(info.voteDate) }}</p>
        </div>
      </div>
      <div class="row">
        <div class="title">公示判决</div>
        <ul class="list" v-if="!!info.votes">
          <li class="item" v-for="item in info.votes" :key="item.number">
            <span class="name">{{item.name}}</span>
            <span class="id">{{item.number}}</span>
            <span class="identity icon-court" style="color: #999;" v-if="item.voteStatus === 0"> 未投票</span>
            <span class="identity icon-court" style="color: #4EA0F5;" v-else-if="item.voteStatus === 1"> 原告</span>
            <span class="identity icon-court" style="color: #ED7269;" v-else-if="item.voteStatus === 2"> 被告</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader";
import {caseDetail} from "@/api/publicity"
import {transformUTCDate} from '@/utils/utils'

export default {
  name: "arbitrationCaseDetail",
  components: {
    pageHeader
  },
  data() {
    return {
      info: {}
    }
  },
  methods: {
    transformUTCDate,
    getDetail() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: '加载中…'
      })
      caseDetail(this.$route.query.arbitrateInfoId).then(res => {
        const {code, items} = res.data
        if (code) {
          this.$toast.fail({
            forbidClick: true,
            message: "加载失败！"
          })
        } else {
          items.total = items.plaintiffNum + items.defendantNum
          this.info = items
        }
      }).catch(() => {
        this.$toast.fail({
          forbidClick: true,
          message: "加载失败！"
        })
      }).finally(() => {
        loading.clear()
      })
    },
    // 翻页
    onLoad() {}
  },
  created() {
    this.getDetail()
  }
}
</script>

<style scoped lang="scss">
.case-detail_wrap {
  .content {
    padding: 30px;
    border-radius: 20px;
    background-color: #FFF;
    margin-bottom: 25px;
    & .lf .count_wrap .text {
      border-radius: 0 40px 40px 50px;
      margin-right: 10px;
    }
    & .rt {
      text-align: right;
      .user_wrap {
        justify-content: flex-end;
      }
      .count_wrap {
        .text {
          border-radius: 40px 0 40px 50px;
          margin-left: 10px;
          background-color: #EC6F66;
        }
        .num {
          color: #EC6F66;
        }
      }
    }
    .user_wrap {
      display: flex;
      align-items: center;
      .avatar {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .name {
        color: #333;
        font-size: 28px;
      }
      .identity {
        color: #999;
        font-size: 24px;
      }
    }
    .count_wrap {
      margin-top: 15px;
      .text {
        color: #FFF;
        font-size: 24px;
        padding: 15px 25px;
        background-color: #4EA0F5;
      }
      .num {
        color: #4EA0F5;
        font-size: 24px;
      }
    }
    .type {
      color: #333;
      padding: 24px;
      font-size: 28px;
      margin-top: 30px;
      line-height: 1.2;
      background-color: #F3F4F5;
    }
    .process_wrap {
      display: flex;
      align-items: center;
      margin-top: 20px;
      background-color: #4EA0F5;
      border-radius: 24px;
      overflow: hidden;
      .border {
        width: 20px;
        height: 24px;
        background-color: #FFF;
        border-radius: 15px 0 0 15px;
      }
      .chunk {
        height: 24px;
        &.rt {
          display: flex;
          align-items: center;
          flex: 1;
          background-color: #EC6F66;
          border-radius: 24px 0 0 24px;
          margin-left: -13px;
        }
      }
    }
    .row {
      margin-top: 30px;
      .title {
        color: #333;
        font-size: 32px;
        font-weight: bold;
      }
      .message {
        margin-top: 20px;
        p {
          margin: 0;
          color: #333;
          font-size: 28px;
        }
      }
    }
    .list {
      .item {
        display: flex;
        align-items: center;
        color: #333;
        font-size: 28px;
        padding: 20px 0;
        .id {
          flex: 1;
          margin: 0 30px;
        }
      }
    }
  }
}
</style>