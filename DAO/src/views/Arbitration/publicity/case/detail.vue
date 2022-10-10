<template>
  <div class="case-detail_wrap fullscreen">
    <page-header title="仲裁案详情"></page-header>
    <div class="content">
      <!-- 原被告信息 -->
      <van-row>
        <van-col class="lf" :span="12" @click="go('/user/arbitration/case/personnelInfo', { id: info.plaintiffId, type: 1 })">
          <div class="identity_wrap">
            <img v-if="info.status === 2" src="../../../../assets/imgs/huangguan.png" alt="" class="img">
            原告
          </div>
          <div class="user">
            <span class="name">{{ info.plaintiff }}</span>
            <span class="text">（卖家）</span>
          </div>
          <div class="num">{{info.plaintiffNum}}票</div>
        </van-col>
        <van-col class="rt" :span="12" @click="go('/user/arbitration/case/personnelInfo', { id: info.defendantId, type: 2 })">
          <div class="identity_wrap">
            <img v-if="info.status === 3" src="../../../../assets/imgs/huangguan.png" alt="" class="img">
            被告
          </div>
          <div class="user">
            <span class="text">（卖家）</span>
            <span class="name">{{ info.plaintiff }}</span>
          </div>
          <div class="num">{{info.plaintiffNum}}票</div>
        </van-col>
      </van-row>
      <div class="process_wrap">
        <div class="lt chunk" :style="{'flex': `0 0 ${info.plaintiffNum / info.total * 100}%`}"></div>
        <div class="border"></div>
        <div class="rt chunk"></div>
      </div>
      <div class="remark">卖家发起仲裁，仲裁事件为{{ getArbitrateInType(info.arbitrateInType) }}</div>
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
import {transformUTCDate, getArbitrateInType} from '@/utils/utils'

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
    getArbitrateInType,
    transformUTCDate,
    // 跳转页面
    go(path, query) {
      this.$router.push({ path, query })
    },
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
    & .lf {
      .identity_wrap {
        border-radius: 0 40px 40px 50px;
        margin-right: 10px;
        background-color: #4EA0F5;
      }
    }
    & .rt {
      text-align: right;
      .identity_wrap {
        border-radius: 40px 0 40px 50px;
        margin-left: 10px;
        background-color: #EC6F66;
      }
      .user {
        justify-content: flex-end;
        margin: 20px 0;
      }
      .num {
        color: #EC6F66;
      }
    }
    .identity_wrap {
      display: inline-block;
      position: relative;
      font-size: 24px;
      flex: 0 0 90px;
      color: #FFF;
      padding: 10px 15px;
      .img {
        @include posi($t: -20px, $l: 50%);
        display: block;
        width: 30px;
        margin-left: -15px;
      }
    }
    .user {
      display: flex;
      align-items: center;
      margin: 20px 0;
      .name {
        color: #333;
        font-size: 28px;
      }
      .text {
        color: #999;
        font-size: 24px;
      }
    }
    .num {
      margin-top: 15px;
      color: #4EA0F5;
      font-size: 24px;
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