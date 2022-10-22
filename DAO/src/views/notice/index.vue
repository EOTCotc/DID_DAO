<template>
  <div class="notice_wrap bg-gray fullscreen">
    <white title="公告"></white>
    <div class="list">
      <div class="item" @click="$router.push('/notice/detail')">
        <div class="header">欢庆国庆奖励活动</div>
        <vant-divider :style="{color: '#F5F6F7'}" />
        <div class="text u-line-1">尊敬的EOTC会员:为庆祝EOTCswap聚合币币交易所正式上线，EOTC会员系统给新…</div>
        <div class="flex">
          <div class="team">EOTC技术团队</div>
          <div class="date">2022年12月7日</div>
        </div>
      </div>
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
    }
  }
}
</script>

<style scoped lang="scss">
.notice_wrap {
  .list {
    padding: 0 30px 30px;
    .item {
      padding: 0 30px;
      border-radius: 20px;
      background-color: #FFF;
      margin-top: 30px;
      .header {
        color: #333;
        padding: 30px 0;
        font-size: 32px;
        font-weight: bold;
      }
      .text {
        color: #333;
        padding: 30px 0;
        font-size: 28px;
        line-height: 56px;
      }
      .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 30px;
      }
      .team, .date {
        color: #999;
        font-size: 28px;
      }
    }
  }
}
</style>