<template>
  <div class="container">
    <van-nav-bar>
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          color="#fff"
          size="18"
        />
      </template>
      <template #title>
        <span class="bar">{{ $t("setup.settings") }}</span>
      </template>
    </van-nav-bar>

    <div class="content">
      <van-cell title="UID" :value="userInfo.uid">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <span
            class="iconfont"
            style="margin-left: 8px; font-size: 14px"
            @click="copyUid()"
            id="uid"
            :data-clipboard-text="userInfo.uid"
            >&#xe61b;</span
          >
        </template>
      </van-cell>
      <van-cell :title="$t('setup.email')" :value="userInfo.mail" />
      <van-cell
        :title="$t('setup.referrer')"
        :value="userInfo.refUid ? 'UID：' + userInfo.refUid : $t('setup.add')"
        :to="
          userInfo.refUid && riskLevel
            ? {
                path: '/setup/haveMyReferrer',
                query: { refUid: userInfo.refUid },
              }
            : '/myReferrer'
        "
        is-link
      />
      <van-cell
        :title="$t('setup.telegram')"
        @click="
          cookie.get('riskLevel') == 2 && riskLevel ? '' : (showPopup = true)
        "
        :value="userInfo.telegram || $t('setup.set')"
        is-link
      />
      <van-cell
        :title="$t('setup.locality')"
        :value="userInfo.country ? site : $t('setup.tab')"
        :to="riskLevel ? '/locality' : ''"
        is-link
      />
      <van-cell
        :title="$t('setup.change_pass')"
        :to="riskLevel ? '/setup/setPassword' : ''"
        is-link
      />
      <van-cell
        :title="$t('setup.change_email')"
        :to="riskLevel ? '/setup/setEmail' : ''"
        is-link
      />
      <van-cell
        :title="$t('logout.logout')"
        :to="
          userInfo.hasLogout && riskLevel
            ? '/setup/logout/logoutCountdown'
            : '/setup/logout'
        "
        is-link
      />
    </div>

    <!-- 设置电报群 -->
    <van-popup v-model="showPopup">
      <div class="popup">
        <p>{{ $t("setup.setTelegram") }}</p>
        <input
          type="text"
          v-model="telegram"
          :placeholder="$t('setup.input_telegram')"
        />
        <div class="btn-popup">
          <div @click="showPopup = false">{{ $t("public.cancel") }}</div>
          <div @click="setTelegram">{{ $t("public.confirm") }}</div>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="showLogout" round>
      <div class="logout-box">
        <div class="logout-tip">{{ $t("setup.logout_tip") }}</div>
        <p>{{ $t("setup.logout_cont") }}</p>
        <div class="btn-box">
          <button @click="showLogout = false">{{ $t("public.cancel") }}</button>
          <button @click="logout">{{ $t("public.confirm") }}</button>
        </div>
      </div>
    </van-popup>

    <button class="logout-btn" @click="showLogout = true">
      {{ $t("setup.logout") }}
    </button>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { getuserinfo } from "@/api/pagesApi/home";
import { setuserinfo } from "@/api/pagesApi/locality";
export default {
  name: "setup",
  data() {
    return {
      site: "", //所在地
      telegram: "", //电报群
      userInfo: "", //用户信息
      showPopup: false, //设置电报群弹出层
      showLogout: false, //退出登录弹出层
      riskLevel: false, //是否被风控
    };
  },
  mounted() {
    if (this.cookie.get("riskLevel")) {
      if (this.cookie.get("riskLevel") == 2) {
        this.riskLevel = false;
      } else {
        this.riskLevel = true;
      }
    } else {
      this.riskLevel = false;
    }
    this.$toast.loading({
      duration: 15,
      forbidClick: true,
    });
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      getuserinfo().then((res) => {
        if (res.data.code == 0) {
          let info = res.data.items;
          this.userInfo = info;
          this.cookie.set("userInfo", JSON.stringify(info)); //更新用户信息
          if (info.country) {
            let arrCountry = info.country.split("-");
            let arrProvince = info.province.split("-");
            let arrCity = info.province.split("-");
            let arrArea = info.area.split("-");
            // 如果是中国，不显示国家，只显示省市区
            if (arrCountry[0] == "CHN") {
              this.site = `${arrProvince[1] ? arrProvince[1] : ""}
              ${arrCity[1] ? "-" + arrCity[1] : ""}
              ${arrArea[1] ? "-" + arrArea[1] : ""}`;
            } else if (info.province == "-") {
              //外国 没有省 只显示国家
              this.site = arrCountry[1];
            } else if (info.province) {
              //有省就显示  国家-省
              this.site = `${arrCountry[1] ? arrCountry[1] + "-" : ""}
              ${arrProvince[1] ? arrProvince[1] : ""}`;
            }
          }
        }
      });
    },
    // 复制uid
    copyUid() {
      let clipboard = new Clipboard("#uid");
      clipboard.on("success", (e) => {
        this.$toast.success(this.$t("setup.setup_toast1"));
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        this.$toast.fail(this.$t("setup.setup_toast2"));
        clipboard.destroy();
      });
    },
    // 设置电报群
    setTelegram() {
      setuserinfo({ telegram: this.telegram }).then((res) => {
        if (res.data.code == 0) {
          this.$toast.success(this.$t("setup.setup_toast3"));
          this.getUserInfo();
          this.showPopup = false;
        } else {
          this.$toast.fail(this.$t("setup.setup_toast4"));
        }
      });
    },
    // 退出登录
    logout() {
      this.cookie.remove("token");
      this.cookie.remove("userInfo");
      localStorage.clear();
      this.$toast.success(this.$t("setup.setup_toast5"));
      setTimeout(() => {
        this.$router.replace("/login");
      }, 600);
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
  min-height: 48px;
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
// 退出登录弹出层
.logout-box {
  width: 630px;
  height: 260px;
  text-align: center;
  .logout-tip {
    margin-top: 30px;
    font-size: 36px;
    font-weight: bold;
  }
  p {
    margin-top: 30px;
    font-size: 32px;
  }
  .btn-box {
    margin-top: 40px;
    display: flex;
    justify-content: flex-start;
    border-top: 1px solid #f3f4f5;
    button {
      width: 50%;
      height: 96px;
      font-size: 31px;
      color: #1b2945;
      font-weight: bold;
      border: none;
      background: #fff;
    }
    button:first-of-type {
      color: #666;
      font-weight: normal;
      border-right: 1px solid #f3f4f5;
    }
  }
}
// 退出登录按钮
.logout-btn {
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