<template>
  <div class="notice_wrap bg-gray fullscreen">
    <white title="公告"></white>
    <div class="list">
      <div class="item"
           v-for="item in list"
           :key="item.noticeId"
           @click="$router.push({name: 'noticeDetail', query: {id: item.noticeId}})">
        <div class="header">{{ item.title }}</div>
        <div class="flex">
          <div class="team">{{ item.creatorName }}</div>
          <div class="date">{{ transformUTCDate(item.createDate) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white"
import {list} from "@/api/notice"
import {transformUTCDate} from "@/utils/utils"

export default {
  components: {
    white
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    transformUTCDate,
    getList() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: '加载中…'
      })
      list().then(res => {
        this.list = res.data.items
      }).finally(() => {
        loading.clear()
      })
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
        border-bottom: 1px solid #f5f6f7;
        margin-bottom: 30px;
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