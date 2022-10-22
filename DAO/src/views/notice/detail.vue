<template>
  <div class="notice-detail_wrap fullscreen">
    <white :title="title"></white>
    <div class="grap"></div>
    <div class="main">
      <p class="text">
        尊敬的EOTC会员：
        为庆祝EOTC swap聚合币币交易所正式上线，EOTC会员系统给新注册用户、老用户增加质押、新用户第一次质押惊喜奖励。
        1、新用户注册，给予用户和推荐人各空投150枚EOTC代币
        2、新用户首次质押，给予额外赠送30% EOTC代币
        3、老用户增加质押，给予额外赠送30% EOTC代币
        4、本次活动从2022年10月8日00：00开始至2022年10月24日23：59结束
        以上奖励方案系统自动执行。
      </p>
      <div class="team">EOTC技术团队</div>
      <div class="date">2022年10月7日</div>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white"

export default {
  components: {
    white
  },
  data() {
    return {
      title: '欢庆国庆奖励活动'
    }
  }
}
</script>

<style scoped lang="scss">
.notice-detail_wrap {
  background-color: #FFF;
  min-height: 100vh;
  .grap {
    height: 30px;
    background-color: #f5f6f7;
  }
  .main {
    padding: 30px;
    color: #333;
    font-size: 28px;
    line-height: 56px;
    .team {
      text-align: right;
      margin-top: 40px;
    }
    .date {
      text-align: right;
      margin-top: 20px;
    }
  }
}
</style>