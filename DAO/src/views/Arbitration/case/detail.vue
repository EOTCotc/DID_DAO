<template>
  <div class="case-detail_wrap fullscreen">
    <page-header :title="$t('case.nav_detail')"></page-header>
    <div class="content">
      <div class="main">
        <!-- 仲裁已取消 -->
        <van-row v-if="info.isCancel" class="header" type="flex" align="center">
          <van-col :span="24" class="text" style="color: #999">{{
              $t("case.cancel")
          }}</van-col>
        </van-row>
        <!-- 未投票 -->
        <van-row v-else-if="info.time < 0 && !info.voteStatus" class="header" type="flex" align="center">
          <van-col :span="12" class="text" style="color: #999">{{
              $t("case.sentence")
          }}</van-col>
          <van-col v-if="info.voteStatus === 2" :span="12" class="date" style="color: #00b87a">
            +{{ info.eotc }} EOTC
          </van-col>
          <van-col v-else :span="12" class="date" style="color: #fc7542">
            -{{ info.eotc }} EOTC
          </van-col>
        </van-row>
        <template v-else>
          <!-- 举证中 -->
          <van-row v-if="info.status === 0" class="header" type="flex" align="center">
            <van-col :span="12">
              <van-row type="flex" align="center">
                <van-icon class="icon" style="margin-right: 5px" name="underway-o" />
                <div class="text">{{ $t("case.Adduce_evidence") }}</div>
              </van-row>
            </van-col>
          </van-row>
          <!-- 投票中 -->
          <van-row class="header" type="flex" align="center" justify="space-between" v-else-if="info.status === 1">
            <van-col :span="12">
              <van-row>
                <van-row type="flex" align="center">
                  <van-icon class="icon" color="#237DF4" style="margin-right: 5px" name="underway-o" />
                  <van-count-down class="time" :time="info.time || 0" style="color: #237df4" format="DD天HH时mm分" />
                </van-row>
              </van-row>
            </van-col>
            <van-col :span="6" class="date" v-if="!info.hasDelay && info.voteStatus === 0">
              <van-button round plain block size="small" type="primary" color="#237FF8" @click="
                $router.push({
                  path: '/user/arbitration/case/initiateNewProof',
                  query: { id: info.arbitrateInfoId },
                })
              ">
                {{ $t("case.again") }}
              </van-button>
            </van-col>
          </van-row>
          <!-- 是否胜诉 -->
          <van-row class="header" type="flex" align="center" v-else-if="info.status > 1 && info.voteStatus">
            <van-col :span="12">
              <van-row>
                <van-col :span="3">
                  <img :src="info.isVictory ? icon1 : icon2" alt="" class="img" />
                </van-col>
                <van-col class="text" :span="21">
                  {{
                      info.isVictory
                        ? $t("case.Win_lawsuit")
                        : $t("case.Lose_lawsuit")
                  }}
                </van-col>
              </van-row>
            </van-col>
            <van-col :span="12" class="date" :style="{ color: info.isVictory ? '#00B87A' : '#FC7542' }">
              {{ info.isVictory ? "+" : "-" }}{{ info.eotc }} EOTC
            </van-col>
          </van-row>
        </template>
        <van-row class="row">
          <van-col :span="12" class="title" style="color: #333">{{
              $t("case.Originating_time")
          }}</van-col>
          <van-col :span="12" class="value date">{{
              transformUTCDate(info.createDate)
          }}</van-col>
        </van-row>
        <!-- 原被告信息 -->
        <div class="personnel_wrap">
          <div class="item" @click="
            go('/user/arbitration/case/personnelInfo', {
              id: info.plaintiffId,
              type: 'plaintiff',
            })
          ">
            <span class="label">{{ $t("case.plaintiff") }}</span>
            <div class="user_wrap">
              <span class="name">{{ info.plaintiff }}</span>
              <span class="identity">
                {{ order.customer === info.plaintiffUid ? $t("case.Buyer") : $t("case.seller") }}
              </span>
            </div>
          </div>
          <div class="item" @click="
            go('/user/arbitration/case/personnelInfo', {
              id: info.defendantId,
              type: 'plaintiff',
            })
          ">
            <span class="label red">{{ $t("case.defendant") }}</span>
            <div class="user_wrap">
              <span class="name">{{ info.defendant }}</span>
              <span class="identity" v-if="order.customer">
                {{ order.customer === info.defendantUid ? $t("case.Buyer") : $t("case.seller") }}
              </span>
            </div>
          </div>
        </div>
        <div class="remark">
          {{ $t("case.seller_launch") }}{{ getArbitrateInType(info.arbitrateInType) }}
        </div>
        <!-- 仲裁结果 -->
        <div class="result_wrap" v-if="info.status > 1">
          <div class="h3">{{ $t("case.result") }}</div>
          <div class="text">
            {{ $t("case.participate") }}{{ info.total }}{{ $t("case.evidence")
            }}{{ info.plaintiffNum }}{{ $t("case.determine_win") }}
          </div>
          <div class="h3">{{ $t("case.Closing_time") }}</div>
          <div class="text" v-if="info.voteDate">
            {{ transformUTCDate(info.voteDate) }}
          </div>
        </div>
        <!-- 原被告举证 -->
        <div class="evidence_wrap">
          <ul class="list">
            <li class="item" v-for="item in info.adduce" :key="item.adduceListId">
              <span class="label plaintiff" v-if="item.adduceUserId === info.plaintiffId">{{
                  $t("case.plaintiff_evidence")
              }}</span>
              <span class="label defendant" v-else>{{
                  $t("case.defendant_evidence")
              }}</span>
              <van-grid v-if="!!item.images.length" :column-num="1">
                <van-grid-item v-for="img in item.images" :key="img">
                  <van-image class="img" :src="spliceSrc(img)" fit="contain" @click="preview(item.images)" />
                </van-grid-item>
                <div class="message">{{ item.memo }}</div>
              </van-grid>
            </li>
          </ul>
        </div>
        <!-- 订单信息 -->
        <div class="order_wrap">
          <van-collapse v-model="show">
            <van-collapse-item :title="$t('case.order_title')" name="1">
              <van-row class="row">
                <van-col class="title" :span="6">{{ $t("case.order_number") }}</van-col>
                <van-col class="value" :span="18">{{ info.orderId }}</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title" :span="6">{{ $t("case.transaction") }}</van-col>
                <van-col class="value" :span="18">{{ order.amount }} USDT</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title" :span="6">{{ $t("case.price") }}</van-col>
                <van-col class="value" :span="18">￥{{ order.price }}</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title" :span="6">{{ $t("case.Total_price") }}</van-col>
                <van-col class="value" :span="18" style="color: #f37a4c">{{ order.totalPrice }}</van-col>
              </van-row>
              <!-- <van-row class="row">
                <van-col class="title"
                         :span="6">{{
                  $t("case.transaction_time")
                }}</van-col>
                <van-col class="value"
                         :span="18">2022.05.26 15:00:21</van-col>
              </van-row> -->

              <!-- 买家 -->
              <template v-if="!!order.customerAccount">
                <van-row class="row">
                  <van-col class="title payment" :span="24">{{ $t("case.payInformation") }}</van-col>
                </van-row>
                <van-row class="row">
                  <van-col class="title" :span="6">{{ $t("case.name") }}</van-col>
                  <van-col class="value" :span="18">{{ order.customerAccount[0] }}</van-col>
                </van-row>
                <!-- 支付宝 -->
                <van-row class="row" v-if="order.customerAccount[2].includes('支付宝')">
                  <van-col class="title" :span="6">{{ $t("case.alipay") }}</van-col>
                  <van-col class="value" :span="18">{{ order.customerAccount[1] }}</van-col>
                </van-row>
                <!-- 微信 -->
                <van-row class="row" v-else-if="order.customerAccount[2].includes('微信')">
                  <van-col class="title" :span="6">{{ $t("case.wechat") }}</van-col>
                  <van-col class="value" :span="18">{{ order.customerAccount[1] }}</van-col>
                </van-row>
                <!-- 银行卡 -->
                <template v-else-if="order.customerAccount[2].includes('银行')">
                  <van-row class="row">
                    <van-col class="title" :span="6">{{ $t("case.Bank_deposit") }}</van-col>
                    <van-col class="value" :span="18">{{ order.customerAccount[2] }}</van-col>
                  </van-row>
                  <van-row class="row">
                    <van-col class="title" :span="6">{{ $t("case.Bank_No") }}</van-col>
                    <van-col class="value" :span="18">{{ order.customerAccount[1] }}</van-col>
                  </van-row>
                </template>
                <!-- 现金 -->
                <van-row class="row" v-else>
                  <van-col class="title" :span="6">{{ $t("case.money") }}</van-col>
                  <van-col class="value" :span="18">{{ $t("case.money") }}</van-col>
                </van-row>
              </template>
              <!-- 卖家 -->
              <template v-if="!!order.merchantAccount">
                <van-row class="row">
                  <van-col class="title payment" :span="24">{{ $t("case.buyInformation") }}</van-col>
                </van-row>
                <van-row class="row">
                  <van-col class="title" :span="6">{{ $t("case.name") }}</van-col>
                  <van-col class="value" :span="18">{{ order.merchantAccount[0] }}</van-col>
                </van-row>
                <!-- 支付宝 -->
                <van-row class="row" v-if="order.merchantAccount[2].includes('支付宝')">
                  <van-col class="title" :span="6">{{ $t("case.alipay") }}</van-col>
                  <van-col class="value" :span="18">{{ order.merchantAccount[1] }}</van-col>
                </van-row>
                <!-- 微信 -->
                <van-row class="row" v-else-if="order.merchantAccount[2].includes('微信')">
                  <van-col class="title" :span="6">{{ $t("case.wechat") }}</van-col>
                  <van-col class="value" :span="18">{{ order.merchantAccount[1] }}</van-col>
                </van-row>
                <!-- 银行卡 -->
                <template v-else-if="order.merchantAccount[2].includes('银行')">
                  <van-row class="row">
                    <van-col class="title" :span="6">{{ $t("case.Bank_deposit") }}</van-col>
                    <van-col class="value" :span="18">{{ order.merchantAccount[2] }}</van-col>
                  </van-row>
                  <van-row class="row">
                    <van-col class="title" :span="6">{{ $t("case.Bank_No") }}</van-col>
                    <van-col class="value" :span="18">{{ order.merchantAccount[1] }}</van-col>
                  </van-row>
                </template>
                <!-- 现金 -->
                <van-row class="row" v-else>
                  <van-col class="title" :span="6">{{ $t("case.money") }}</van-col>
                  <van-col class="value" :span="18">{{ $t("case.money") }}</van-col>
                </van-row>
              </template>
            </van-collapse-item>

            <van-collapse-item :title="$t('case.public_judgment')" name="2" v-if="info.status > 1">
              <ul class="list sentence_wrap">
                <li class="item" v-for="item in info.votes" :key="item.number">
                  <van-row>
                    <van-col :span="6" class="text name">{{ item.name }}</van-col>
                    <van-col :span="12" class="text phone">{{ item.phone }}</van-col>
                    <van-col :span="6" class="winner icon icon-court"
                      :class="item.voteStatus === 1 ? 'plaintiff' : 'defendant'">
                      {{ item.voteStatus === 1 ? $t("case.defendant_win") : $t("case.defendant_win") }}
                    </van-col>
                  </van-row>
                  <div class="remark" v-if="item.reason">{{ item.reason }}</div>
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </div>
    <van-row class="btn" :gutter="15" v-if="info.status === 1 && !info.voteStatus && info.time > 0">
      <van-col :span="12">
        <van-button block round color="#4EA0F5" @click="sentence(1)">
          {{ $t("case.defendant_win") }}
        </van-button>
      </van-col>
      <van-col :span="12">
        <van-button block round color="#EE786F" @click="sentence(2)">
          {{ $t("case.defendant_win") }}
        </van-button>
      </van-col>
    </van-row>
    <!-- 判定胜诉方 -->
    <popup ref="sentence"
      :title="`${$t('case.reason')}${status === 1 ? $t('case.plaintiff_win') : $t('case.defendant_win')}`">
      <div class="sentence-main" v-show="step === 0">
        <div class="tip">{{ $t("case.security") }}</div>
        <van-field show-word-limit v-model="remark" rows="4" type="textarea"
          style="border: 1px solid #c8cfde; border-radius: 10px" maxlength="100" :placeholder="$t('case.describe')" />
      </div>
      <div class="sentence-main" v-show="step === 1">
        <div class="title">{{ $t("case.explain") }}</div>
        <div class="message">{{ $t("case.according") }}</div>
        <van-checkbox class="check" icon-size="16px" v-model="checked" shape="square">{{ $t("case.confirm") }}
        </van-checkbox>
      </div>
      <van-row class="btn" :gutter="15">
        <van-col :span="12">
          <van-button block round plain @click="hidePopup">
            {{ $t("case.think") }}
          </van-button>
        </van-col>
        <van-col :span="12">
          <van-button block round color="#4EA0F5" :loading-text="$t('case.submitting')" :loading="loading"
            :disabled="loading || !remark || !checked" @click="onSubmit">
            {{ $t("case.true") }}
          </van-button>
        </van-col>
      </van-row>
    </popup>
  </div>
</template>

<script>
import pageHeader from '@/components/topBar/pageHeader'
import Popup from '@/components/popup'
import { detail, sentence as submit } from '@/api/case'
import { spliceSrc, transformUTCDate, getArbitrateInType } from '@/utils/utils'
import icon1 from '@/assets/imgs/victory.png'
import icon2 from '@/assets/imgs/fail.png'
import { orderDetail } from '@/api/order'

export default {
  name: 'arbitrationCaseDetail',
  components: {
    pageHeader,
    Popup,
  },
  data () {
    return {
      icon1,
      icon2,
      loading: false,
      show: [],
      title: '',
      remark: '',
      status: 0,
      checked: false,
      info: {},
      order: {},
      step: 0
    }
  },
  methods: {
    spliceSrc,
    getArbitrateInType,
    transformUTCDate,
    // 跳转页面
    go (path, query) {
      this.$router.push({ path, query })
    },
    getDetail () {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: this.$t('case.message_in'),
      })
      detail(this.$route.query.id)
        .then((res) => {
          const { code, items } = res.data
          if (code) {
            this.$toast.fail({
              forbidClick: true,
              message: this.$t('case.massage_fail'),
            })
          } else {
            if (items.status > 1) {
              // 判断是否胜诉
              items.isVictory =
                (items.status === 2 && items.voteStatus === 1) ||
                (items.status === 3 && items.voteStatus === 2)
            }
            items.total = items.plaintiffNum + items.defendantNum
            items.adduce = items.adduce.map((item) => ({
              ...item,
              images: item.images.split(','),
            }))
            items.time = this.$dayjs(
              items.status === 0 ? items.adduceDate : items.voteDate
            )
              .add('-8', 'hour')
              .diff(this.$dayjs(), 'millisecond')
            this.info = items
            this.getOrder({ orderId: this.info.orderId, uid: this.info.plaintiffUId })
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: this.$t('case.massage_fail'),
          })
        })
        .finally(() => {
          loading.clear()
        })
    },
    // 获取订单信息
    getOrder (params) {
      orderDetail(params).then(res => {
        const data = res.data
        data.customerAccount = data.customerAccount.split('&')
        data.merchantAccount = data.merchantAccount.split('&')
        this.order = data
      }).catch(err => {
        console.log(err)
      })
    },
    // 判决
    sentence (type) {
      const time = this.$dayjs(this.info.status === 0 ? this.info.adduceDate : this.info.voteDate).add('-8', 'hour').diff(this.$dayjs(), 'millisecond')
      if (time > 0) {
        this.status = type
        this.step = 0
        this.$refs.sentence.toggle(true)
      } else {
        this.$toast.fail({
          forbidClick: true,
          message: this.$t('case.exceed'),
        })
      }
    },
    // 隐藏
    hidePopup () {
      this.remark = ''
      this.status = 0
      this.step = 0
      this.checked = false
      this.$refs.sentence.toggle(false)
    },
    // 提交判决
    onSubmit () {
      if (this.next === 1) {
        const loading = this.$toast.loading({
          forbidClick: true,
          message: this.$t('case.submitting'),
        })
        this.loading = true
        submit({
          arbitrateInfoId: this.info.arbitrateInfoId,
          reason: this.remark,
          status: this.status,
        }).then((res) => {
          if (res.data.code) {
            this.$toast.fail({
              forbidClick: true,
              duration: 2000,
              message: res.data.message,
            })
          } else {
            this.$toast.success({
              forbidClick: true,
              message: this.$t('case.become'),
              onClose: () => {
                this.hidePopup()
                this.getDetail()
              },
            })
          }
        }).catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: this.$t('case.fail'),
          })
        }).finally(() => {
          this.loading = false
          loading.clear()
        })
      } else {
        this.step = 1
      }
    },
  },
  created () {
    this.getDetail()
  },
}
</script>

<style scoped lang="scss">
.case-detail_wrap {
  .content {
    flex: 1;

    &>.main {
      min-height: 100%;
      box-sizing: border-box;
      padding: 30px;
      border-radius: 20px;
      background-color: #fff;

      .h3 {
        color: #333;
        font-size: 32px;
        font-weight: bold;
      }

      .text {
        color: #333;
        font-size: 28px;
      }

      .row {
        font-size: 28px;
        margin-bottom: 20px;

        &:last-of-type {
          margin-bottom: 0;
        }

        .title {
          color: #999;

          &.payment {
            color: #333;
            font-size: 32px;
            padding-top: 30px;
            border-top: 1px solid #eee;
            margin-top: 15px;
          }
        }

        .value {
          color: #333;
          text-align: right;

          &.date {
            color: #999;
          }
        }
      }

      .header {
        padding-bottom: 30px;
        border-bottom: 1px solid #eee;
        margin-bottom: 30px;

        .img {
          display: block;
          width: 30px;
        }

        .icon {
          font-size: 35px;
        }

        .text {
          color: #333;
          font-size: 32px;
        }

        .time {
          color: #237ff8;
          font-size: 32px;
        }

        .date {
          color: #999;
          font-size: 28px;
          text-align: right;
        }
      }

      .label {
        display: inline-block;
        color: #fff;
        font-size: 24px;
        padding: 10px 25px;
        background-color: #4ea0f5;
        border-radius: 0 40px 40px 50px;

        &.red {
          background-color: #ec6f66;
        }
      }

      .personnel_wrap {
        font-size: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item {
          position: relative;
          flex: 0 0 48%;
          border-radius: 0 20px 20px 20px;
          box-shadow: 0px 3px 12px 1px rgba(27, 41, 69, 0.1);

          .user_wrap {
            display: flex;
            align-items: center;
            padding: 30px;

            .name {
              color: #333;
              font-size: 28px;
            }

            .identity {
              color: #999;
              font-size: 24px;
            }
          }

          .icon {
            @include posi($r: 10px, $t: 10px);
            font-size: 32px;
            color: #4ea0f5;
          }
        }
      }

      .remark {
        color: #333;
        padding: 24px;
        font-size: 24px;
        margin-top: 30px;
        line-height: 55px;
        background-color: #f3f4f5;
        border-radius: 20px;
      }

      .result_wrap {
        .h3 {
          margin-top: 30px;
        }

        .text {
          margin-top: 20px;
          line-height: 1.3;
        }
      }

      .evidence_wrap {
        font-size: 0;

        .list {
          .item {
            position: relative;
            padding: 80px 30px 30px;
            margin-top: 30px;
            background-color: #f3f4f5;
            border-radius: 20px;

            .plaintiff {
              @include posi($l: 0, $t: 0);
            }

            .defendant {
              @include posi($r: 0, $t: 0);
              border-radius: 40px 0 50px 40px;
              background-color: #ec6f66;
            }

            .message {
              color: #333;
              font-size: 28px;
              margin-top: 30px;
            }
          }
        }
      }

      .order_wrap {
        margin-top: 30px;
      }

      .sentence_wrap {
        .item {
          margin-top: 30px;

          &:first-of-type {
            margin-top: 0;
          }
        }
      }

      .winner {
        font-size: 28px;
        text-align: right;

        &.plaintiff {
          color: #4ea0f5;
        }

        &.defendant {
          color: #ec6f66;
        }
      }
    }
  }

  .btn {
    padding: 30px;
  }

  .sentence-main {
    .tip {
      color: #f37a4c;
      font-size: 32px;
      margin-bottom: 30px;
    }

    .title {
      color: #333;
      font-size: 32px;
      font-weight: bold;
    }

    .message {
      color: #666;
      font-size: 28px;
      margin: 25px 0 100px;
    }

    .check {
      color: #333;
      font-size: 28px;
    }
  }
}
</style>