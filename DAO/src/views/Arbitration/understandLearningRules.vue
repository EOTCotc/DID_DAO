<template>
  <div>
    <header>
      <white :title="title"></white>
    </header>
    <div class="rulesBox" ref="rulesBox">
      <div class="BasicRules">
        <h3>基本规则</h3>
        <div>
          ⑴
          打款不能备注买U、USDT、BTC、ETH等任何区块链相关信息，否则判定为作恶交易，打出款项会被冻结，质押代币全部罚没，连坐扣分。
        </div>
        <div>
          ⑵ 打款必须使用DID实名的同名账户打款，仲裁DAO不支持异名打款仲裁。
        </div>
        <div>
          ⑶
          系统根据信用评分，默认收款点击后24-48小时放币，卖家放币时间提前，由此引发的损失自行承担。
        </div>
        <div>
          (4)
          卖家在收款后6个月内都可以发起黑钱仲裁，仲裁举证需要准备银行或相关单位的冻结通知。
        </div>
        <div>
          (5)
          买家申请已打款仲裁，需要提供具有法律效力的打款举证，银行可以保存电子回单，微信搜索账单，找到转账记录，申请电子回单。
        </div>
        <div>
          (6)
          超时放币30分钟内无需仲裁，系统自动扣分。超时60分钟以上可以申请仲裁放币。
        </div>
      </div>
      <div class="DeductionRules">
        <h3>扣分规则</h3>
        <div>
          (1) 非恶意交易失败
          <div>
            ① 用户扣3分 ② 推荐人扣1分
            ③节点、推荐人上3代，用户下6代扣0.5分（根据仲裁概率自动调节扣分数）
          </div>
        </div>
        <div>
          ⑵ 超时放币
          <div>
            ① 超时30-60分钟: ① 用户扣3分 ② 推荐人扣1分 ③
            节点、推荐人上3代、用户下6代扣0.5分(根据仲裁概率自动调节扣分数)
          </div>
          <div>
            ① 超时60分钟以上: ① 用户每超时60分钟扣6分 ② 推荐人每超时60分钟扣3分
            ③
            节点、推荐人上3代、用户下6代每超时6O分钟扣1分（根据仲裁概率自动调节扣分数）
          </div>
        </div>
        <div>
          ⑶ 交易作恶、洗黑钱
          <div>
            ①
            用户扣120分并冻结全部质押的EOTc代币，妥善处理后可申请仲裁解封，仲裁可进行部分或全部的代币罚没，罚没代币打入黑洞。②
            推荐人扣12分③节点、推荐人上3代、用户下6代:扣6分（根据仲裁概率自动调节扣分数）
          </div>
        </div>
      </div>
    </div>
    <footer>
      <van-button
        round
        block
        color="#1B2945"
        :disabled="flag"
        @click="completeLearning"
        >我已完成学习</van-button
      >
    </footer>
  </div>
</template>
<script>
import white from "@/components/Nav/white.vue";
export default {
  components: { white },
  data() {
    return {
      title: "了解学习相关规则",
      qualificationPassed3: true,
      flag: true,
    };
  },
  // 滚动监听
  mounted() {
    this.$refs.rulesBox.addEventListener("scroll", this.rulesScroll); // 监听页面滚动
  },
  methods: {
    completeLearning() {
      this.$router.replace({
        name: "meetTheConditions",
        params: {
          qualificationPassed3: this.qualificationPassed3,
        },
      });
    },
    rulesScroll(e) {
      if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight)
        this.flag = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.rulesBox {
  color: #333333;
  background-color: #fff;
  padding: 0 25px;
  height: 82vh;
  overflow: auto;
  .BasicRules,
  .DeductionRules {
    h3 {
      font-size: 35px;
      padding: 20px 0;
    }
    div {
      font-size: 27px;
      margin-bottom: 20px;
    }
  }
  .BasicRules {
    div {
      line-height: 50px;
    }
  }
  .DeductionRules {
    div {
      line-height: 50px;
      div {
        line-height: 50px;
      }
    }
  }
}
footer {
  width: 100%;
  box-sizing: border-box;
  padding: 50px 28px;
  position: fixed;
  bottom: 0;
}
</style>