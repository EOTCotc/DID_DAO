<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* iconfont */
@font-face {
  font-family: "iconfont";
  src: url("@/assets/font/iconfont.woff2?t=1663582623740") format("woff2"),
    url("@/assets/font/iconfont.woff?t=1663582623740") format("woff"),
    url("@/assets/font/iconfont.ttf?t=1663582623740") format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
}
div {
  box-sizing: border-box;
}
</style>
