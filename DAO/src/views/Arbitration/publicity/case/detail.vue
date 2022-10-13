<template>
  <div class="case-detail_wrap fullscreen">
    <page-header :title="$t('publicity.nav_detail')"></page-header>
    <div class="content">
      <!-- 原被告信息 -->
      <van-row>
        <van-col class="lf"
                 :span="12"
                 @click="
            go('/user/arbitration/case/personnelInfo', {
              id: info.plaintiffId,
              type: 1,
            })
          ">
          <div class="identity_wrap">
            <img v-if="info.status === 2"
                 src="../../../../assets/imgs/huangguan.png"
                 alt=""
                 class="img" />
            {{ $t("publicity.plaintiff") }}
          </div>
          <div class="user">
            <span class="name">{{ info.plaintiff }}</span>
            <span class="text"> {{ $t("publicity.seller") }}</span>
          </div>
          <div class="num">
            {{ info.plaintiffNum }}{{ $t("publicity.ticket") }}
          </div>
        </van-col>
        <van-col class="rt"
                 :span="12"
                 @click="
            go('/user/arbitration/case/personnelInfo', {
              id: info.defendantId,
              type: 2,
            })
          ">
          <div class="identity_wrap">
            <img v-if="info.status === 3"
                 src="../../../../assets/imgs/huangguan.png"
                 alt=""
                 class="img" />
            {{ $t("publicity.defendant") }}
          </div>
          <div class="user">
            <span class="text"> {{ $t("publicity.Buyer") }}</span>
            <span class="name">{{ info.plaintiff }}</span>
          </div>
          <div class="num">
            {{ info.plaintiffNum }}{{ $t("publicity.ticket") }}
          </div>
        </van-col>
      </van-row>
      <div class="process_wrap">
        <van-progress stroke-width="12"
                      :percentage="info.plaintiffNum / info.total * 100 || 0"
                      :show-pivot="false"
                      color="#4EA0F5"
                      track-color="#EC6F66" />
      </div>
      <div class="remark">
        {{ $t("publicity.launch")
        }}{{ getArbitrateInType(info.arbitrateInType) }}
      </div>
      <div class="row">
        <div class="title">{{ $t("publicity.result") }}</div>
        <div class="message">
          <p>
            {{ $t("publicity.participate") }}{{ info.total
            }}{{ $t("publicity.evidence") }}{{ info.plaintiffNum
            }}{{ $t("publicity.determine") }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="title">{{ $t("publicity.Closing_time") }}</div>
        <div class="message">
          <p>{{ transformUTCDate(info.voteDate) }}</p>
        </div>
      </div>
      <div class="row">
        <div class="title">{{ $t("publicity.judgment") }}</div>
        <ul class="list"
            v-if="!!info.votes">
          <li class="item"
              v-for="item in info.votes"
              :key="item.number">
            <span class="name">{{ item.name }}</span>
            <span class="id">{{ item.number }}</span>
            <span class="identity icon-court"
                  style="color: #999"
                  v-if="item.voteStatus === 0">
              {{ $t("publicity.no_vote") }}</span>
            <span class="identity icon-court"
                  style="color: #4ea0f5"
                  v-else-if="item.voteStatus === 1">
              {{ $t("publicity.plaintiff") }}</span>
            <span class="identity icon-court"
                  style="color: #ed7269"
                  v-else-if="item.voteStatus === 2">
              {{ $t("publicity.defendant") }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import pageHeader from '@/components/topBar/pageHeader'
import { caseDetail } from '@/api/publicity'
import { transformUTCDate, getArbitrateInType } from '@/utils/utils'

export default {
  name: 'arbitrationCaseDetail',
  components: {
    pageHeader,
  },
  data() {
    return {
      info: {},
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
        message: this.$t('publicity.message'),
      })
      caseDetail(this.$route.query.arbitrateInfoId)
        .then((res) => {
          const { code, items } = res.data
          if (code) {
            this.$toast.fail({
              forbidClick: true,
              message: this.$t('publicity.message_fild'),
            })
          } else {
            items.total = items.plaintiffNum + items.defendantNum
            this.info = items
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: this.$t('publicity.message_fild'),
          })
        })
        .finally(() => {
          loading.clear()
        })
    },
    // 翻页
    onLoad() {},
  },
  created() {
    this.getDetail()
  },
}
</script>

<style scoped lang="scss">
.case-detail_wrap {
  .content {
    padding: 30px;
    border-radius: 20px;
    background-color: #fff;
    margin-bottom: 25px;
    & .lf {
      .identity_wrap {
        border-radius: 0 40px 40px 50px;
        margin-right: 10px;
        background-color: #4ea0f5;
      }
    }
    & .rt {
      text-align: right;
      .identity_wrap {
        border-radius: 40px 0 40px 50px;
        margin-left: 10px;
        background-color: #ec6f66;
      }
      .user {
        justify-content: flex-end;
        margin: 20px 0;
      }
      .num {
        color: #ec6f66;
      }
    }
    .identity_wrap {
      display: inline-block;
      position: relative;
      font-size: 24px;
      flex: 0 0 90px;
      color: #fff;
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
      color: #4ea0f5;
      font-size: 24px;
    }
    .type {
      color: #333;
      padding: 24px;
      font-size: 28px;
      margin-top: 30px;
      line-height: 1.2;
      background-color: #f3f4f5;
    }
    .process_wrap {
      margin-top: 20px;
    }
    .remark {
      margin-top: 25px;
      line-height: 60px;
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
          line-height: 42px;
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