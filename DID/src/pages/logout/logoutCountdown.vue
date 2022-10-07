<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar>
      <template #left>
        <van-icon
          @click="$router.replace('/setup')"
          name="arrow-left"
          color="#000"
          size="18"
        />
      </template>
      <template #title>
        <span class="title">{{$t('logout.logout')}}</span>
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <div class="content">
      <img src="../../assets/imgs/zhuxiao2.png" />
      <div class="info">
        <p>{{ email }}</p>
        <p>{{$t('logout.title')}}</p>
      </div>
      <div class="countdown">
        {{ `${hours}:${minute}:${second}` }}<span>{{$t('logout.count_down')}}</span>
      </div>
      <button @click="waiveLogout">{{$t('logout.waive')}}</button>
    </div>
  </div>
</template>

<script>
import { getlogoutdate, cancellogout } from "@/api/pagesApi/logout";
export default {
  name: "logoutCountdown",
  data() {
    return {
      email: "",
      hours: 0,
      minute: 0,
      second: 0,
    };
  },
  mounted() {
    this.email = JSON.parse(this.cookie.get("userInfo")).mail;
    this.getCountdown();
  },
  methods: {
    // 获取注销时间
    getCountdown() {
      getlogoutdate().then((res) => {
        console.log(res.data, "注销时间");
        // 注销的时间
        this.handleTime(res.data.items);
      });
    },
    // 处理时间
    handleTime(date) {
      setInterval(() => {
        let logoutTime = new Date(date).getTime() + 172800000;
        let now = new Date().getTime();
        let timestamp = logoutTime - now;
        let hours = Math.floor(timestamp / 3600000);
        this.hours = hours >= 10 ? hours : "0" + hours;
        let minute = Math.floor((timestamp % 3600000) / 60000);
        this.minute = minute >= 10 ? minute : "0" + minute;
        let second = Math.floor(((timestamp % 3600000) % 60000) / 1000);
        this.second = second >= 10 ? second : "0" + second;
      }, 1000);
    },
    // 放弃注销
    waiveLogout() {
      cancellogout().then((res) => {
        if (res.data.code == 0) {
          this.$toast.success("取消注销成功");
          setTimeout(() => {
            this.$router.replace("/setup");
          }, 600);
        } else {
          this.$toast.fail("取消注销失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f3f4f5;
}
.content {
  padding: 0 30px;
  text-align: center;
  img {
    margin-top: 150px;
    width: 130px;
    height: 130px;
  }
  .info {
    margin-top: 60px;
    font-size: 32px;
    color: #999;
    line-height: 56px;
  }
  .countdown {
    margin-top: 60px;
    font-size: 48px;
    font-weight: bold;
    color: #fc7542;
    span {
      margin-left: 17px;
      font-size: 32px;
      font-weight: normal;
      color: #333;
    }
  }
  button {
    margin-top: 190px;
    width: 258px;
    height: 88px;
    font-size: 32px;
    color: #fff;
    border: none;
    border-radius: 48px;
    background: #247ff6;
  }
}
</style>