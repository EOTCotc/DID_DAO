<template>
  <div class="personage">
    <header>
      <TopBar />
    </header>
    <main>
      <div class="identity-card">
        <div class="card-top">
          <div class="card-top-left">
            <img src="../../assets/img/logo_two.png" alt="" />
            <div>
              <div>{{ user.mail }}</div>
              <div>UID:{{ user.uid }}</div>
            </div>
          </div>
        </div>
        <div class="eotc">
          <div class="sum">总收益(EOTC)</div>
          <div class="ming">
            <span style="font-size: 28px">{{ daoInfo.daoEOTC }}</span
            ><span @click="detail">收益明细</span>
          </div>
        </div>
      </div>
      <List></List>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import TopBar from "@/components/topBar/topBar";
import List from "../../components/Nav/List.vue";
import { getdaoinfo } from "@/api/earnings";
export default {
  components: { TopBar, List },
  data() {
    return {
      total: 0,
      user: {},
    };
  },
  created() {
    // 获取用户信息
    getdaoinfo().then((res) => {
      this.user = res.data.items;
      this.total = res.data.items.daoEOTC;
      localStorage.setItem("items", res.data.items.daoEOTC);
      localStorage.setItem("isArbitrate", res.data.items.isArbitrate);
      localStorage.setItem("isExamine", res.data.items.isExamine);
      localStorage.setItem("authType", res.data.items.authType);
    });
  },
  methods: {
    // 去往详情页
    detail() {
      this.$router.push("/Home_detail");
    },
  },
};
</script>

<style lang="scss" scoped>
.personage {
  padding-top: 88px;
  width: 100wh;
  background: #000;
  min-height: 100vh;
  color: #000;
}

.identity-card {
  padding: 30px;
  border-radius: 20px;
  margin: 40px 25px 30px;
  background: linear-gradient(134deg, #2a86ff 0%, #54dcff 100%);
  .card-top {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    .card-top-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 96px;
        height: 96px;
      }
      div {
        margin-left: 30px;
        color: #fff;
        div {
          margin-left: 0;
        }
        div:first-of-type {
          font-size: 36px;
        }
        div:last-of-type {
          margin-top: 8px;
          font-size: 28px;
        }
      }
    }
  }
  .eotc {
    color: #fff;
    margin-top: 10px;
    font-size: 30px;
    line-height: 48px;
    .sum {
      color: #9acdff;
      font-size: 26px;
    }
    .ming {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>