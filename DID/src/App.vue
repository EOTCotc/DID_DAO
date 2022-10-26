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
/* 思源黑体 */
@font-face {
  font-family: NotoSansHans-Black;
  src: url("./assets/family/NotoSansHans-Black.ttf");
}
@font-face {
  font-family: NotoSansHans-Bold;
  src: url("./assets/family/NotoSansHans-Bold.ttf");
}
@font-face {
  font-family: NotoSansHans-DemiLight;
  src: url("./assets/family/NotoSansHans-DemiLight.ttf");
}
@font-face {
  font-family: NotoSansHans-Light;
  src: url("./assets/family/NotoSansHans-Light.ttf");
}
@font-face {
  font-family: NotoSansHans-Medium;
  src: url("./assets/family/NotoSansHans-Medium.ttf");
}
@font-face {
  font-family: NotoSansHans-Regular;
  src: url("./assets/family/NotoSansHans-Regular.ttf");
}
@font-face {
  font-family: NotoSansHans-Thin-Windows;
  src: url("./assets/family/NotoSansHans-Thin-Windows.ttf");
}
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
