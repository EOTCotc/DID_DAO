<template>
  <div class="container">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="18" />
      </template>
      <template #title>
        <span class="bar">账号设置</span>
      </template>
    </van-nav-bar>

    <div class="content">
      <van-cell title="UID" :value="userInfo.uid">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <span class="iconfont" style="margin-left: 8px; font-size: 14px"
            >&#xe61b;</span
          >
        </template>
      </van-cell>
      <van-cell title="邮箱" :value="userInfo.mail" />
      <van-cell
        title="推荐人"
        :value="userInfo.userId || '添加'"
        to="/myReferrer"
        is-link
      />
      <van-cell
        title="电报群"
        @click="showPopup = true"
        :value="userInfo.telegram || '设置'"
        is-link
      />
      <van-cell
        title="所在地"
        :value="userInfo.province ? site : '选择'"
        is-link
      />
      <van-cell title="修改密码" is-link />
      <van-cell title="修改邮箱" is-link />
      <van-cell title="账号注销" is-link />
    </div>

    <!-- 设置电报群 -->
    <van-popup v-model="showPopup">
      <div class="popup">
        <p>设置电报群</p>
        <input type="text" placeholder="请输入电报地址" />
        <div class="btn-popup">
          <div @click="showPopup = false">取消</div>
          <div>确定</div>
        </div>
      </div>
    </van-popup>

    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
  name: "setup",
  data() {
    return {
      site: "", //所在地
      userInfo: "",
      showPopup: false,
    };
  },
  mounted() {
    this.getUserInfo();
  }, 
  methods: {
    // 获取用户信息
    getUserInfo() {
      let userInfo = JSON.parse(this.cookie.get("userInfo"));
      this.userInfo = userInfo;
      this.site = `${userInfo.province}-${userInfo.city}-${userInfo.area}`;
    },
    // 推出登录
    logout() {
      this.cookie.remove("token");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  position: relative;
}
:deep(.van-nav-bar) {
  background: #1b2945;
}
:deep(.van-cell) {
  height: 48px;
}
.bar {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
}
.content {
  margin-top: 20px;
}
// 设置电报群
:deep(.van-popup--center) {
  border-radius: 10px;
}
.popup {
  width: 670px;
  height: 372px;
  border-radius: 20px;
  p {
    margin-top: 26px;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
  }
  input {
    margin-top: 40px;
    margin-left: 24px;
    padding: 0 32px;
    width: 622px;
    height: 100px;
    font-size: 28px;
    color: #999;
    border-radius: 16px;
    border: 0.5px solid #c8cfde;
    box-sizing: border-box;
  }
  .btn-popup {
    margin-top: 60px;
    border-top: 1px solid #f3f4f5;
    display: flex;
    justify-content: flex-start;
    div {
      width: 50%;
      height: 96px;
      line-height: 96px;
      text-align: center;
      font-size: 31px;
    }
    div:first-of-type {
      color: #666;
      border-right: 0.5px solid #f3f4f5;
    }
    div:last-of-type {
      color: #1b2945;
      font-weight: bold;
    }
  }
}

button {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  color: #333;
  background: #fff;
  border: none;
}
</style>