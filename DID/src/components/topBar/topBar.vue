<template>
  <div>
    <div class="heade">
      <div @click="handleMenu">
        <img class="icon_menu" src="@/assets/imgs/icon_menu.png" />
      </div>
      <div @click="toHome">
        <img class="logo" src="@/assets/imgs/logo.png" />
      </div>
      <div @click="toMy">
        <img class="icon_my" src="@/assets/imgs/icon_my.png" />
      </div>
    </div>
    <!-- 菜单 -->
    <van-popup
      v-model="showPopup"
      :style="{ height: '100%', background: '#1b2946', zIndex: '55' }"
      position="left"
    >
      <div class="menu">
        <div
          class="menu-every"
          v-for="item in list"
          @click="toast(item.link)"
          :key="item.id"
        >
          <a :href="item.link">{{ item.name }}</a>
          <img src="@/assets/imgs/r_t_arrow.png" alt="" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showPopup: false,
      list: [
        { id: 0, name: this.$t("topBar.name1"), link: "https://eotc.im" },
        { id: 1, name: this.$t("topBar.name2") },
        { id: 2, name: this.$t("topBar.name3") },
        { id: 3, name: this.$t("topBar.name4") },
        { id: 4, name: this.$t("topBar.name5") },
        { id: 5, name: this.$t("topBar.name6"), link: "https://fi.eotc.im/" },
        { id: 6, name: this.$t("topBar.name7"), link: "https://did.eotc.im/" },
        { id: 7, name: this.$t("topBar.name8") },
        { id: 8, name: "EOTC NFT", link: "https://nft.eotc.im/" },
        { id: 9, name: this.$t("topBar.name9") },
        { id: 10, name: "EOTC DAO", link: "https://dao.eotc.im/" },
      ],
    };
  },
  methods: {
    toast(link) {
      if (!link) {
        this.$toast(this.$t("public.msg1"));
      }
    },
    handleMenu() {
      this.showPopup = !this.showPopup;
    },
    // 去首页
    toHome() {
      this.$router.push("/");
    },
    // 去我的页面
    toMy() {
      this.$router.push("/my");
    },
  },
};
</script>

<style lang='scss' scoped>
.heade {
  position: fixed;
  top: 0;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  background: #1b2945;
  z-index: 9999;
  div {
    width: 100px;
    height: 100%;
    line-height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon_menu {
      width: 32px;
      height: 22px;
    }
    .logo {
      width: 56px;
      height: 56px;
    }
    .icon_my {
      width: 29px;
      height: 32px;
    }
  }
}
// 菜单
.menu {
  margin-top: 88px;
  margin-bottom: 200px;
  .menu-every {
    margin: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    font-size: 32px;
    border-bottom: 1px solid #2b374f;
    a {
      text-decoration: none;
      color: #b4b7c2;
    }
    img {
      margin-left: 50px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>