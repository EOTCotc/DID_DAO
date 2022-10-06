<template>
  <div class="personage">
    <header>
      <TopBar />
    </header>
    <main>
      <van-cell-group inset
                      :border="false">
        <van-cell :title="$t('user.total')"
                  :border="false"
                  :value="$t('user.detailed')"
                  @click="detail" />
        <van-cell :title="total"
                  style="font-size: 25px"
                  :border="false" />
      </van-cell-group>
      <List></List>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import TopBar from '@/components/topBar/topBar'
import List from '../../components/Nav/List.vue'
import { getdaoinfo } from '@/api/earnings'
export default {
  components: { TopBar, List },
  data() {
    return {
      total: 0,
    }
  },
  created() {
    getdaoinfo().then((res) => {
      this.total = res.data.items.daoEOTC
      localStorage.setItem('items', res.data.items.daoEOTC)
      localStorage.setItem('isArbitrate', res.data.items.isArbitrate)
      localStorage.setItem('isExamine', res.data.items.isExamine)
      localStorage.setItem('authType', res.data.items.authType)
    })
  },
  methods: {
    detail() {
      this.$router.push('/Home_detail')
    },
  },
}
</script>

<style lang="scss" scoped>
.personage {
  padding-top: 88px;
  width: 100wh;
  background: #070a0e;
  min-height: 100vh;
  color: #000;
}
.van-cell-group {
  margin: 16px;
  .van-cell {
    background: linear-gradient(to left, #54dcff, #2a86ff);
    line-height: 40px;
    color: #fff;
  }
  .van-cell__value {
    color: #fff;
  }
}
</style>