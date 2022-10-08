<template>
  <div class="case-detail_wrap fullscreen">
    <page-header title="仲裁案详情"></page-header>
    <div class="content">
      <div class="main">
        <!-- 举证中 -->
        <van-row
          v-if="info.status === 0"
          class="header"
          type="flex"
          align="center"
        >
          <van-col :span="12">
            <van-row type="flex" align="center">
              <van-icon class="icon" style="margin-right: 5px;" name="underway-o" />
              <div class="text">双方举证中</div>
            </van-row>
          </van-col>
          <van-col :span="12" class="date">{{ transformUTCDate(info.adduceDate) }}</van-col>
        </van-row>
        <!-- 投票中 -->
        <van-row
          class="header"
          type="flex"
          align="center"
          justify='space-between'
          v-else-if="info.status === 1"
        >
          <van-col :span="12">
            <van-row>
              <van-row type="flex" align="center">
                <van-icon class="icon" color="#237DF4" style="margin-right: 5px;" name="underway-o" />
                <van-count-down class='time' :time="info.time" style="color: #237DF4;" format="DD天HH时mm分" />
              </van-row>
            </van-row>
          </van-col>
          <van-col :span="6" class="date" v-if='!info.hasDelay'>
            <van-button
              round
              plain
              block
              size='small'
              type="primary"
              color="#237FF8"
              @click="$router.push({path:'/user/arbitration/case/initiateNewProof', query: { id: info.arbitrateInfoId }})"
            >
              重新举证
            </van-button>
          </van-col>
        </van-row>
        <!-- 未投票 -->
        <van-row
          v-else-if="info.voteStatus === 0"
          class="header"
          type="flex"
          align="center"
        >
          <van-col :span="12" class="text" style="color: #999;">超时未提交判决</van-col>
          <van-col
            v-if="info.voteStatus === 2"
            :span="12"
            class="date"
            style="color: #00B87A;">
            +{{ info.eotc }} EOTC
          </van-col>
          <van-col
            v-else
            :span="12"
            class="date"
            style="color: #FC7542;"
          >
            -{{ info.eotc }} EOTC
          </van-col>
        </van-row>
        <!-- 是否胜诉 -->
        <van-row
          class="header"
          type="flex"
          align="center"
          v-else
        >
          <van-col :span="12">
            <van-row>
              <van-col :span="3">
                <img :src="info.isVictory ? icon1 : icon2" alt="" class="img">
              </van-col>
              <van-col
                class="text"
                :span="21"
              >
                {{ info.isVictory ? '胜诉' : '败诉' }}
              </van-col>
            </van-row>
          </van-col>
          <van-col
            v-if="info.isVictory"
            :span="12"
            class="date"
            style="color: #00B87A;">
            +{{ info.eotc }} EOTC
          </van-col>
          <van-col
            v-else
            :span="12"
            class="date"
            style="color: #FC7542;"
          >
            -{{ info.eotc }} EOTC
          </van-col>
        </van-row>
        <van-row class="row">
          <van-col :span="12" class="title" style="color: #333">仲裁发起时间</van-col>
          <van-col :span="12" class="value date">2022.05.26 12:54</van-col>
        </van-row>
        <!-- 原被告信息 -->
        <div class="personnel_wrap">
          <div class="item" @click="go('/user/arbitration/case/personnelInfo', { id: info.plaintiffId, type: 'plaintiff' })">
            <span class="label">原告</span>
            <div class="user_wrap">
              <span class="name">{{ info.plaintiff }}</span>
              <span class="identity">（卖家）</span>
            </div>
          </div>
          <div class="item" @click="go('/user/arbitration/case/personnelInfo', { id: info.defendantId, type: 'plaintiff' })">
            <span class="label red">被告</span>
            <div class="user_wrap">
              <span class="name">{{ info.defendant }}</span>
              <span class="identity">（卖家）</span>
            </div>
          </div>
        </div>
        <div class="remark">卖家发起仲裁，仲裁事件为{{ getArbitrateInType(info.arbitrateInType) }}</div>
        <!-- 仲裁结果 -->
        <div class="result_wrap" v-if="info.status > 1">
          <div class="h3">仲裁结果</div>
          <div class="text">本次参与仲裁判决的仲裁员共计{{ info.total }}人，通过双方提交举证，{{ info.userVote.voteStatus === 1 ? info.plaintiffNum : info.defendantNum }}位仲裁员判定{{ info.userVote.voteStatus === 1 ? '原告' : '被告'}}胜诉</div>
          <div class="h3">结案时间</div>
          <div class="text">{{ transformUTCDate(info.voteDate) }}</div>
        </div>
        <!-- 原被告举证 -->
        <div class="evidence_wrap">
          <ul class="list">
            <li class="item" v-for="item in info.adduce" :key="item.adduceListId">
              <span class="label plaintiff" v-if="item.adduceUserId === info.plaintiffId">原告举证</span>
              <span class="label defendant" v-else>被告举证</span>
              <van-grid v-if='!!item.images.length' :column-num="1">
                <van-grid-item v-for="img in item.images" :key="img">
                  <van-image
                    class="img"
                    :src="spliceSrc(img)"
                    fit="contain"
                    @click="preview(item.images)"
                  />
                </van-grid-item>
                <div class='message'>{{item.memo}}</div>
              </van-grid>
            </li>
          </ul>
        </div>
        <!-- 订单信息 -->
        <div class="order_wrap" v-if='false'>
          <van-collapse v-model="show">
            <van-collapse-item title="订单详情" name="1">
              <van-row class="row">
                <van-col class="title" :span="6">订单号</van-col>
                <van-col class="value" :span="18">7777781205789</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title" :span="6">交易数量</van-col>
                <van-col class="value" :span="18">997.00000 USDT</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title" :span="6">交易单价</van-col>
                <van-col class="value" :span="18">6.35 CNY</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title" :span="6">交易总价</van-col>
                <van-col class="value" :span="18" style='color: #f37a4c;'>6350.00 CNY</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title" :span="6">交易时间</van-col>
                <van-col class="value" :span="18">2022.05.26 15:00:21</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title payment" :span="24">付款信息</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title" :span="6">姓名</van-col>
                <van-col class="value" :span="18">李牧</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title" :span="6">开户银行</van-col>
                <van-col class="value" :span="18">工商银行</van-col>
              </van-row>
              <van-row class="row">
                <van-col class="title" :span="6">银行卡号</van-col>
                <van-col class="value" :span="18">4005633224656232</van-col>
              </van-row>
            </van-collapse-item>
            <van-collapse-item title="公示判决" name="2" v-if='info.status > 1'>
              <ul class="list sentence_wrap">
                <li class="item" v-for="item in info.votes" :key="item.number">
                  <van-row>
                    <van-col :span="6" class="text name">{{ item.name }}</van-col>
                    <van-col :span="12" class="text phone">{{ item.phone }}</van-col>
                    <van-col v-if="item.voteStatus === 1" :span="6" class="winner icon icon-court plaintiff"> 原告胜</van-col>
                    <van-col v-if="item.voteStatus === 2" :span="6" class="winner icon icon-court defendant"> 被告胜</van-col>
                  </van-row>
                  <div class="remark">{{item.reason}}</div>
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </div>
    <van-row class="btn" :gutter="15" v-if='info.status === 1'>
      <van-col :span="12">
        <van-button
          block
          round
          color="#4EA0F5"
          @click="sentence(1)"
        >
          原告胜
        </van-button>
      </van-col>
      <van-col :span="12">
        <van-button
          block
          round
          color="#EE786F"
          @click="sentence(2)"
        >
          被告胜
        </van-button>
      </van-col>
    </van-row>
    <!-- 判定胜诉方 -->
    <popup
      ref="sentence"
      :title="status === 1 ? '判决该仲裁案原告胜' : '判决原因'"
    >
      <div class="sentence-main" v-show="status === 1">
        <div class="title">判决说明</div>
        <div class="message">根据提交凭证判定当前仲裁案原告胜</div>
        <van-checkbox
          class="check"
          icon-size="16px"
          v-model="checked"
          shape="square"
          >我已确认决议</van-checkbox
        >
      </div>
      <div class="sentence-main" v-show="status === 2">
        <div class="tip">维护安全稳定信任的交易环境</div>
        <van-field
          show-word-limit
          v-model="remark"
          rows="4"
          type="textarea"
          style="border: 1px solid #c8cfde; border-radius: 10px"
          maxlength="100"
          placeholder="请描述做出该判决的说明"
        />
      </div>
      <van-row class="btn" :gutter="15">
        <van-col :span="12">
          <van-button block round plain @click="hidePopup">
            我再想想
          </van-button>
        </van-col>
        <van-col :span="12">
          <van-button
            block
            round
            color="#4EA0F5"
            loading-text="提交中…"
            :loading="loading"
            :disabled="loading || (status === 2 ? !remark : !checked)"
            @click="onSubmit"
          >
            确定
          </van-button>
        </van-col>
      </van-row>
    </popup>
  </div>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader";
import Popup from "@/components/popup";
import { detail, sentence as submit } from '@/api/case'
import {
  transformUTCDate,
  spliceSrc,
  getArbitrateInType
} from '@/utils/utils'
import icon1 from '@/assets/imgs/victory.png'
import icon2 from '@/assets/imgs/fail.png'

export default {
  name: "arbitrationCaseDetail",
  components: {
    pageHeader,
    Popup,
  },
  data() {
    return {
      icon1,
      icon2,
      loading: false,
      show: [],
      title: "",
      remark: "",
      status: 0,
      checked: false,
      info: {},
    };
  },
  methods: {
    spliceSrc,
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
      detail(this.$route.query.id).then(res => {
        const {code, items} = res.data
        if (code) {
          this.$toast.fail({
            forbidClick: true,
            message: "加载失败！"
          })
        } else {
          items.total = items.plaintiffNum + items.defendantNum
          items.adduce = items.adduce.map(item => ({...item, images: item.images.split(',')}))
          items.time = this.$dayjs(items.status === 0 ? items.adduceDate : items.voteDate).diff(this.$dayjs(), 'millisecond')
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
    // 判决
    sentence(type) {
      this.status = type;
      this.$refs.sentence.toggle(true);
    },
    // 隐藏
    hidePopup() {
      this.remark = "";
      this.status = 0;
      this.checked = false;
      this.$refs.sentence.toggle(false);
    },
    // 提交判决
    onSubmit() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: "提交中…"
      })
      this.loading = true
      submit({
        arbitrateInfoId: this.info.arbitrateInfoId,
        reason: this.remark,
        status: this.status
      }).then(res => {
        if (res.data.code) {
          this.$toast.fail({
            forbidClick: true,
            duration: 2000,
            message: res.data.message,
          })
        } else {
          this.$toast.success({
            forbidClick: true,
            message: '判决成功',
            onClose: () => {
              this.hidePopup()
              this.getDetail()
            }
          })
        }
      }).catch(() => {
        this.$toast.fail({
          forbidClick: true,
          message: '判决失败',
        })
      }).finally(() => {
        this.loading = false
        loading.clear()
      })
    }
  },
  created() {
    this.getDetail()
  }
};
</script>

<style scoped lang="scss">
.case-detail_wrap {
  .content {
    flex: 1;
    & > .main {
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
        border-bottom: 1px solid #EEE;
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
          color: #237FF8;
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
        font-size: 28px;
        margin-top: 30px;
        line-height: 1.2;
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
              background-color: #EC6F66;
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
          color: #EC6F66;
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