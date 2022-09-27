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
        <div class="menu-every" v-for="item in list" :key="item.id">
          <span>{{item.name}}</span>
          <img src="@/assets/imgs/r_t_arrow.png" alt="" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {},
  data() {
    return {
      showPopup: false,
      list: [
        { id: 0, name: "EOTC官网" },
        { id: 1, name: "去中心化OTC交易所" },
        { id: 2, name: "去中心化币币交易所" },
        { id: 3, name: "去中心化借贷交易所" },
        { id: 4, name: "去中心化合约交易所" },
        { id: 5, name: "链上理财赚币" },
        { id: 6, name: "DID去中心化身份系统" },
        { id: 7, name: "去中心化应用系统" },
        { id: 8, name: "EOTC NFT" },
        { id: 9, name: "EOTC 元宇宙" },
        { id: 10, name: "EOTC DAO" },
      ],
    };
  },
  methods: {
    handleMenu() {
      this.showPopup = !this.showPopup;
    },
    // 去首页
    toHome() {
      this.$router.push("/");
    },
    // 去我的页面
    toMy() {
      this.$router.push("/personage");
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
  height: 88px;
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
    height: 100px;
    font-size: 28px;
    color: #b4b7c2;
    border-bottom: 1px solid #2b374f;
    img {
      margin-left: 50px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>