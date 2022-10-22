<template>
  <div class="notice-detail_wrap fullscreen">
    <white :title="detail.title"></white>
    <div class="grap"></div>
    <div class="main">
      <p class="text" v-html="detail.content"></p>
      <div class="team">{{ detail.creatorName }}</div>
      <div class="date">{{ transformUTCDate(detail.createDate) }}</div>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white"
import {detail} from "@/api/notice"
import {transformUTCDate} from "@/utils/utils"

export default {
  components: {
    white
  },
  data() {
    return {
      detail: {}
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    transformUTCDate,
    getDetail() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: '加载中…'
      })
      detail(this.$route.query.id).then(res => {
        console.log(res)
        this.detail = res.data.items
      }).finally(() => {
        loading.clear()
      })
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