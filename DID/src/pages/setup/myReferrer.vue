<template>
  <div class="container">
    <van-nav-bar title="标题">
      <template #left>
        <van-icon @click="toBack" name="arrow-left" color="#000" size="18" />
      </template>
      <template #title>
        <span class="title">我的推荐人</span>
      </template>
    </van-nav-bar>

    <div class="line"></div>

    <div class="content">
      <div class="ad-img">
        <img src="" alt="" />
      </div>
      <div class="code-title">填写邀请码</div>
      <div class="ipt"><input type="text" placeholder="请输入邀请码" /></div>
      <div class="link">获取邀请码，绑定推荐关系</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myReferrer",
  data() {
    return {};
  },
  mounted() {
    console.log(111);
  },
  methods: {
    // 返回上一页
    toBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
}
.title {
  font-size: 36px;
  color: #333;
  font-weight: bold;
}
.line {
  height: 20px;
  background: #f3f4f5;
}
.content {
  .code-title {
    margin-top: 65px;
    font-size: 32px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
  .ipt {
    margin-top: 30px;
    padding: 0 30px;
    input {
      padding: 0 30px;
      width: 100%;
      height: 100px;
      font-size: 28px;
      color: #999;
      border-radius: 18px;
      box-sizing: border-box;
      border: 2px solid #ccc;
    }
  }
  .link {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;
    color: #237ff8;
  }
}
// 设置电报群
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  color: #fff;
  background-color: #fff;
}
</style>