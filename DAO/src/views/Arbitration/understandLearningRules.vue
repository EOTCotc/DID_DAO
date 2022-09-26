<template>
  <div>
    <header>
      <white :title="title"></white>
    </header>
    <div>
      <div class="rulesBox">
        <h3>基本规则</h3>
        <div>
          ⑴打款不能备注买U、USDT、BTC、ETH等任何区块链相关信息，否则判定为作恶交易，打出款项会被冻结，质押代币全部罚没，连坐扣分。
        </div>
        <div>
          ⑵打款必须使用DID实名的同名账户打款，仲裁DAO不支持异名打款仲裁。
        </div>
        <div>
          ⑶系统根据信用评分，默认收款点击后24-48小时放币，卖家放币时间提前，由此引发的损失自行承担。
        </div>
        <div>

        </div>
      </div>
      <div class="rulesBox">
        <h3>扣分规则</h3>
      </div>
    </div>
    <footer>
      <van-button round
                  block
                  disabled
                  color="#1B2945"
                  native-type="submit">我已完成学习</van-button>
    </footer>
  </div>
</template>
<script>
import white from '@/components/Nav/white.vue'
export default {
  components: { white },
  data() {
    return {
      title: '了解学习相关规则',
    }
  },
}
</script>
<style lang="scss" scoped>
</style>