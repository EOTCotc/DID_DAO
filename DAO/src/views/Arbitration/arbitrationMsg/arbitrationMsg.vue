<template>
  <div>
    <PageHeader title="申请延期" />
    <div class="top-line"></div>
    <!-- 内容 -->
    <div class="content">
      <div class="title">
        <span>仲裁案</span>
        <span>-100EOTC</span>
      </div>
      <div class="user-box">
        <div class="user-top">
          <!-- 原告 -->
          <div class="user-left">
            <div class="left-via-name">
              <img
                class="victory-via"
                src="@/assets/imgs/shenglikuang.png"
                alt=""
              />
              <img class="via-l" src="" />
              <span>吴敏<span>(卖家)</span></span>
            </div>
            <div class="left-tag-box">
              <div class="left-user-tag">原告</div>
              <span>7票</span>
            </div>
          </div>
          <!-- 被告 -->
          <div class="user-right">
            <div class="right-via-name">
              <img
                class="victory-via"
                src="@/assets/imgs/shenglikuang.png"
                alt=""
              />
              <span><span>(买家)</span>王晓雷</span>
              <img class="via-r" src="" />
            </div>
            <div class="right-tag-box">
              <span>4票</span>
              <div class="right-user-tag">原告</div>
            </div>
          </div>
        </div>
        <!-- 其他消息 -->
        <div v-if="false">
          <div class="user-content">原告卖家发起仲裁，仲裁事件为账户冻结</div>
          <div class="user-detail">
            <span>
              <van-icon name="orders-o" />
              仲裁详情
            </span>
            <van-icon name="arrow" size="14" color="#999" />
          </div>
        </div>
        <!-- 结案通知 -->
        <div class="final-notice">
          <div class="process_wrap">
            <div
              class="lt chunk"
              :style="{
                flex: `0 0 ${(7 / 11) * 100}%`,
              }"
            ></div>
            <div class="border"></div>
            <div class="rt chunk"></div>
          </div>
          <div class="notice-title">仲裁结果</div>
          <div class="notice-bot">
            <p>
              本次参与仲裁事件的仲裁员共计11人，通过双方提交举证，10位仲裁员判定被告dsads
            </p>
            <div class="notice-bot-r">
              <van-icon name="orders-o" />
              <span>详情</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 延期内容 -->
      <div class="postpone" v-if="false">
        <div class="postpone-every">
          <div>申请人</div>
          <p>原告: 吴敏</p>
        </div>
        <div class="postpone-every">
          <div>申请原因</div>
          <p>核实信息还在审核中</p>
        </div>
        <div class="postpone-every">
          <div>申请延期说明</div>
          <p>卖家银行电子回单还再进一步审查中，还在审核中</p>
        </div>
        <div class="postpone-every">
          <div>申请延期时间</div>
          <p>1天</p>
        </div>
        <div class="postpone-btn">
          <button>不同意</button>
          <button>同意</button>
        </div>
      </div>
      <!-- 取消原因 -->
      <div class="cancel" v-if="false">
        <div>取消原因</div>
        <p>单方面败诉</p>
      </div>
      <!-- 追加举证 -->
      <div class="add-to" v-if="false">
        <div class="add-to-title">原告举证</div>
        <div class="add-to-content">
          <div>追加举证</div>
          <p>银行卡号:465676466135664</p>
        </div>
      </div>
      <!-- 发起重新举证 -->
      <div class="postpone" v-if="false">
        <div class="postpone-every">
          <div>发起人</div>
          <p>陈** 编号: 01562022052301</p>
        </div>
        <div class="postpone-every">
          <div>申请原因</div>
          <p>部分举证不全</p>
        </div>
        <div class="postpone-every">
          <div>申请延期说明</div>
          <p>部分举证不全，无法判断是否真实，发起重新举证</p>
        </div>
        <div class="postpone-btn">
          <button>不同意</button>
          <button>同意</button>
        </div>
      </div>
      <!-- 结案通知 -->
      <div class="close">
        <div>说明</div>
        <p>
          该仲裁案已结案，败诉扣除您100 EOTC
          如有异议可在结案后七日内进入详情申请再仲裁，注意逾期将无法队此案进行再仲裁
        </p>
        <button>申请再次仲裁</button>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
export default {
  name: "arbitrationMsg",
  data() {
    return {
      styleVictory: {
        border: ":4px solid #FFEF16;",
      },
    };
  },
  components: {
    PageHeader,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.top-line {
  height: 20px;
  background: #f3f4f5;
}
// 内容
.content {
  padding: 0 30px;
  .title {
    margin-top: 30px;
    font-size: 32px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    span:last-of-type {
      color: #fc7542;
    }
  }
  .user-box {
    margin-top: 20px;
    padding: 32px;
    box-shadow: 0px 3px 12px 1px rgba(27, 41, 69, 0.1);
    border-radius: 20px;
    .user-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    // 原告
    .user-left {
      .left-via-name {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .victory-via {
          position: absolute;
          top: -16px;
          left: -4px;
          width: 68px;
          height: 79px;
        }
        .via-l {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: red;
        }
        span {
          margin-left: 12px;
          font-size: 28px;
          span {
            font-size: 24px;
            color: #999;
          }
        }
      }
      .left-tag-box {
        margin-top: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .left-user-tag {
          width: 93px;
          height: 48px;
          text-align: center;
          line-height: 48px;
          font-size: 24px;
          font-weight: bold;
          color: #fff;
          background: #4ea0f5;
          border-radius: 0px 24px 24px 24px;
        }
        span {
          margin-left: 12px;
          font-size: 24px;
          color: #4ea0f5;
        }
      }
    }
    // 被告
    .user-right {
      .right-via-name {
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .victory-via {
          position: absolute;
          top: -16px;
          right: -4px;
          width: 68px;
          height: 79px;
        }
        .via-r {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        span {
          margin-right: 12px;
          font-size: 28px;
          span {
            font-size: 24px;
            color: #999;
          }
        }
      }
      .right-tag-box {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span {
          margin-right: 12px;
          font-size: 24px;
          color: #ec6f66;
        }
        .right-user-tag {
          // float: right;
          width: 93px;
          height: 48px;
          text-align: center;
          line-height: 48px;
          font-size: 24px;
          font-weight: bold;
          color: #fff;
          background: #ec6f66;
          border-radius: 24px 0 24px 24px;
        }
      }
    }
  }
  // 其他消息
  .user-content {
    margin-top: 30px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 28px;
    color: #333;
    background: #f3f4f5;
    border-radius: 0px 20px 20px 20px;
  }
  .user-detail {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    span {
      margin-left: 10px;
      font-size: 28px;
      color: #237ff8;
    }
  }
  // 结案通知
  .final-notice {
    margin-top: 20px;
    .process_wrap {
      display: flex;
      align-items: center;
      margin-top: 30px;
      background-color: #4ea0f5;
      border-radius: 24px;
      overflow: hidden;
      .border {
        width: 20px;
        height: 24px;
        background-color: #fff;
        border-radius: 15px 0 0 15px;
      }
      .chunk {
        height: 24px;
        &.rt {
          display: flex;
          align-items: center;
          flex: 1;
          background-color: #ec6f66;
          border-radius: 24px 0 0 24px;
          margin-left: -13px;
        }
      }
    }
    .notice-title {
      margin-top: 32px;
      font-size: 32px;
      font-weight: bold;
      color: #333;
    }
    // 详情
    .notice-bot {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      height: 92px;
      p {
        @include ellipsis($line: 2);
        margin-right: 24px;
        height: 92px;
        font-size: 28px;
        line-height: 46px;
      }
      .notice-bot-r {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 28px;
        font-weight: bold;
        span {
          margin-left: 8px;
          width: 56px;
        }
      }
    }
  }
}
// 延期内容和发起重新举证公用css
.postpone {
  position: relative;
  padding-bottom: 250px;
  .postpone-every {
    margin-top: 40px;
    color: #333;
    div {
      font-size: 32px;
      font-weight: bold;
    }
    p {
      margin-top: 24px;
      font-size: 28px;
    }
  }
  .postpone-btn {
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      width: 328px;
      height: 96px;
      border-radius: 48px;
    }
    button:first-of-type {
      font-size: 32px;
      color: #666;
      border: 2px solid #eee;
      background: #fff;
    }
    button:last-of-type {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
      background: #1b2945;
    }
  }
}
// 取消原因
.cancel {
  color: #333;
  div {
    margin-top: 40px;
    font-size: 32px;
    font-weight: bold;
  }
  p {
    margin-top: 20px;
    font-size: 28px;
  }
}
// 追加举证
.add-to {
  margin-top: 45px;
  background: #f3f4f5;
  border-radius: 0px 20px 20px 20px;
  .add-to-title {
    width: 180px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    background: #4ea0f5;
    border-radius: 0px 30px 30px 30px;
  }
  .add-to-content {
    margin-top: 32px;
    padding: 0 33px 40px 33px;
    color: #333;
    div {
      font-size: 32px;
      font-weight: bold;
    }
    p {
      margin-top: 20px;
      font-size: 28px;
    }
  }
}
// 结案通知
.close {
  margin-top: 40px;
  color: #333;
  div {
    font-size: 32px;
  }
  p {
    margin-top: 20px;
    font-size: 28px;
    line-height: 46px;
  }
  button {
    position: absolute;
    bottom: 60px;
    left: 5%;
    width: 90%;
    height: 96px;
    font-size: 32px;
    font-weight: bold;
    color: #fff;
    border-radius: 48px;
    background: #1b2945;
  }
}
</style>