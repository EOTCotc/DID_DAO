<template>
  <div class="case-detail_wrap fullscreen">
    <page-header title="仲裁案详情"></page-header>
    <div class="content">
      <div class="main">
        <div class="header">
          <div class="status">
            <van-icon name="underway-o" />
            <span class="text">双方举证中</span>
          </div>
          <van-button
              round
              plain
              size="mini"
              color="#4EA0F5"
          >
            重新举证
          </van-button>
        </div>
        <van-row class="row">
          <van-col :span="12" class="title" style="color: #333;">仲裁发起时间</van-col>
          <van-col :span="12" class="value date">2022.05.26 12:54</van-col>
        </van-row>
        <div class="personnel_wrap">
          <div class="item">
            <span class="label">原告</span>
            <div class="user_wrap">
              <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" class="avatar">
              <span class="name">{{ info.plaintiffName }}</span>
              <span class="identity">（卖家）</span>
            </div>
          </div>
          <div class="item">
            <span class="label red">被告</span>
            <div class="user_wrap">
              <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" class="avatar">
              <span class="name">{{ info.plaintiffName }}</span>
              <span class="identity">（卖家）</span>
            </div>
          </div>
        </div>
        <div class="remark">卖家发起仲裁，仲裁事件为账户冻结</div>
        <div class="evidence_wrap">
          <span class="label">原告举证</span>
          <div class="main">
            <img src="../../../assets/imgs/empty.png" alt="" class="img">
            <div class="message">交易过程中账户被冻结，无法正常交易。核实电子回单查询密码: 12254</div>
          </div>
        </div>
        <div class="order_wrap">
          <div class="header" @click="show = !show">
            <div class="status">订单详情</div>
            <van-icon class="icon" :name="show ? 'arrow-down' : 'arrow'" />
          </div>
          <div class="main" v-show="show">
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
              <van-col class="value" :span="18">6350.00 CNY</van-col>
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
          </div>
        </div>
        <div class="order_wrap">
          <div class="header">
            <div class="status">你的判决</div>
            <div class="date" style="color: #4EA0F5;">
              <i class="icon icon-court" style="color: #4EA0F5;"></i> 原告胜
            </div>
          </div>
          <div class="remark">卖家发起仲裁，仲裁事件为账户冻结</div>
        </div>
      </div>
    </div>
    <van-row class="btn" :gutter="15">
      <van-col :span="12">
        <van-button
            block
            round
            color="#4EA0F5"
            @click="sentence('plaintiff')"
        >
          原告胜
        </van-button>
      </van-col>
      <van-col :span="12">
        <van-button
            block
            round
            color="#EE786F"
            @click="sentence('defendant')"
        >
          被告胜
        </van-button>
      </van-col>
    </van-row>
    <popup ref="sentence" :title="winner === 'plaintiff' ? '判决该仲裁案原告胜' : '判决原因'">
      <div class="sentence-main" v-show="winner === 'defendant'">
        <div class="tip">维护安全稳定信任的交易环境</div>
        <van-field
            show-word-limit
            v-model="remark"
            rows="4"
            type="textarea"
            style="border: 1px solid #C8CFDE;border-radius: 10px;"
            maxlength="100"
            placeholder="请描述做出该判决的说明"
        />
      </div>
      <div class="sentence-main" v-show="winner === 'plaintiff'">
        <div class="title">判决说明</div>
        <div class="message">根据提交凭证判定当前仲裁案原告胜</div>
        <van-checkbox class="check" icon-size="16px" v-model="checked" shape="square">我已确认决议</van-checkbox>
      </div>
      <van-row class="btn" :gutter="15">
        <van-col :span="12">
          <van-button
              block
              round
              plain
              @click="hidePopup"
          >
            我再想想
          </van-button>
        </van-col>
        <van-col :span="12">
          <van-button
              block
              round
              color="#4EA0F5"
              :disabled="winner === 'defendant' ? !remark : !checked"
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
export default {
  name: "arbitrationCaseDetail",
  components: {
    pageHeader,
    Popup
  },
  data() {
    return {
      loading: false,
      show: false,
      title: "",
      remark: "",
      winner: "",
      checked: false,
      info: {
        plaintiffName: "吴敏",
        defendantName: "王晓雷",
      }
    }
  },
  methods: {
    getList() {},
    // 下拉刷新
    refresh() {},
    // 翻页
    onLoad() {},
    // 判决
    sentence(type) {
      this.winner = type
      this.$refs.sentence.toggle(true)
    },
    // 隐藏
    hidePopup() {
      this.remark = ''
      this.checked = false
      this.$refs.sentence.toggle(false)
    }
  }
}
</script>

<style scoped lang="scss">
.case-detail_wrap {
  .content {
    flex: 1;
    & > .main {
      min-height: 100%;
      box-sizing: border-box;
      padding: 30px 30px 0;
      border-radius: 20px;
      background-color: #FFF;
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
            border-top: 1px solid #EEE;
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 30px;
        border-bottom: 1px solid #EEE;
        margin-bottom: 30px;
        .status {
          color: #333;
          font-size: 32px;
          .text {
            margin-left: 10px;
            font-weight: bold;
          }
        }
        .icon,
        .date {
          color: #999;
          font-size: 28px;
          text-align: right;
        }
        .icon {
          transition: all .3s;
        }
      }
      .label {
        display: inline-block;
        color: #FFF;
        font-size: 24px;
        padding: 10px 25px;
        background-color: #4EA0F5;
        border-radius: 0 40px 40px 50px;
        &.red {
          background-color: #EC6F66;
        }
      }
      .personnel_wrap {
        font-size: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          flex: 0 0 48%;
          border-radius: 0 20px 20px 20px;
          box-shadow: 0px 3px 12px 1px rgba(27,41,69,0.1);
          .user_wrap {
            display: flex;
            align-items: center;
            padding: 30px;
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
        }
      }
      .remark {
        color: #333;
        padding: 24px;
        font-size: 28px;
        margin-top: 30px;
        line-height: 1.2;
        background-color: #F3F4F5;
      }
      .evidence_wrap {
        font-size: 0;
        margin-top: 30px;
        background-color: #F3F4F5;
        .main {
          padding: 30px;
          margin-top: 30px;
          .img {
            display: block;
            width: 100%;
          }
          .message {
            color: #333;
            font-size: 28px;
            margin-top: 30px;
          }
        }
      }
      .order_wrap {
        margin-top: 30px;
        .header {
          padding: 0;
          margin: 0;
          border: none;
        }
        .main {
          margin-top: 30px;
          border-top: 1px solid #EEE;
          padding-top: 30px;
        }
      }
    }
  }
  .btn {
    padding: 30px;
  }
  .sentence-main {
    .tip {
      color: #F37A4C;
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