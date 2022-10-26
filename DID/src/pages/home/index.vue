<template>
  <div>
    <!-- 头部 -->
    <TopBar />
    <!-- 内容 -->
    <div class="content">
      <!-- 名称 -->
      <div class="project_name">
        <p class="text bold">{{ $t("home.title[0]") }}</p>
        <p class="text">{{ $t("home.title[1]") }}</p>
      </div>
      <!-- 背景图 -->
      <div class="big_bg_logo">
        <img src="@/assets/imgs/big_bg_logo.png" />
      </div>
      <!-- 身份证图片 -->
      <div class="identity_card">
        <img src="@/assets/imgs/identity_card.png" alt="" />
      </div>
      <!-- 认证按钮 -->
      <div
        class="btn"
        :style="
          userInfo.authType == 2
            ? 'background:#102E59;border:2px solid #237FF8;'
            : ''
        "
      >
        <div class="btn-box" @click="identifyRouter">
          <template v-if="userInfo.authType === 1">
            <img class="dunpai" src="@/assets/imgs/dunpai.png" alt="" />
            <span>{{ $t("home.tags1") }}</span>
          </template>
          <template v-else-if="userInfo.authType === 2">
            <img class="dunpai" src="@/assets/imgs/dunpai.png" alt="" />
            <span>{{ $t("home.authenticated") }}</span>
          </template>
          <template v-else-if="userInfo.authType === 3">
            <img class="dunpai" src="@/assets/imgs/dunpai.png" alt="" />
            <span>{{ $t("home.tags2") }}</span>
            <div class="icon_down"><van-icon color="#fff" name="down" /></div>
          </template>
          <template v-else>
            <span>{{ $t("home.start_attestation") }}</span>
            <div class="icon_down"><van-icon color="#fff" name="down" /></div>
          </template>
        </div>
      </div>
      <!-- 系统简介 -->
      <div class="title-summarize">
        <span>{{ $t("home.system_introduction") }}</span>
      </div>
      <!-- 简介 -->
      <p class="text-p">
        {{ $t("home.tags3") }}
      </p>
      <p class="text-p">
        {{ $t("home.tags4") }}
      </p>
    </div>
    <!-- 底部 -->
    <div class="tail">
      <div>
        <img src="@/assets/imgs/c.png" />
        <span>{{ $t("home.tags5") }}</span>
      </div>
      <div @click="handleTabLang">
        <span class="tab-lang">{{ textLang }}</span>
        <van-icon :name="iconLang" />
      </div>
    </div>
    <!-- 选择语言 -->
    <van-popup
      v-model="showPopup2"
      :style="{ height: '100%', background: '#1b2946', zIndex: '55' }"
      position="right"
    >
      <div class="menu">
        <div
          class="menu-every"
          v-for="item in lang"
          @click="tabLang(item)"
          :key="item.id"
        >
          <span>{{ item.text }}</span>
        </div>
      </div>
    </van-popup>
    <!-- 遮罩层 -->
    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <img src="../../assets/imgs/lingdang.png" />
          <div class="tips">{{ $t("home.tags6") }}</div>
          <div class="tips">{{ $t("home.tags7") }}</div>
          <div class="block-bot">
            <div @click="showOverlay = false">{{ $t("public.cancel") }}</div>
            <div @click="toSite">{{ $t("public.confirm") }}</div>
          </div>
        </div>
      </div>
    </van-overlay>
    <notification
      ref="notification"
      :title="$t('home.title1')"
      :message="$t('home.title2')"
      :button-text="$t('home.title3')"
      button-color="#F65F5F"
      :header-icon="headerIcon"
      @closed="handleClosed"
      @buttonClick="() => $router.push('/risk')"
    />
    <div class="risk_mask_wrap" v-show="show" @click="$router.push('/risk')">
      <img src="@/assets/imgs/jin.png" class="img" />
      <div class="text">{{ $t("home.title3") }}</div>
    </div>
  </div>
</template>

<script>
import Notification from "@/components/notification";
import headerIcon from "@/assets/imgs/jin.png";
import TopBar from "@/components/topBar/topBar";
import { getuserinfo, getcomselect } from "@/api/pagesApi/home";
import { risklevel } from "@/api/risk";
export default {
  data() {
    return {
      headerIcon,
      show: false,
      iconLang: "arrow-down", //语言的箭头
      showPopup2: false, //选择语言
      showOverlay: false, //遮罩层
      userInfo: "", //用户信息
      lang: [
        { id: 1, text: "简体中文", lang: "zh" },
        { id: 2, text: "English", lang: "en" },
        { id: 3, text: "繁體中文", lang: "zhTw" },
        { id: 4, text: "日本語", lang: "ja" },
        { id: 5, text: "한국어", lang: "ko" }, //韩语
        { id: 6, text: "русский язык", lang: "ru" }, //俄语
        { id: 7, text: "Français", lang: "fr" }, //法语
        { id: 8, text: "ภาษาไทย", lang: "th" }, //泰语
      ],
      textLang: "",
    };
  },
  components: {
    TopBar,
    Notification,
  },
  mounted() {
    if (!this.cookie.get("userInfo") && !this.cookie.get("token")) {
      this.$router.replace("/login");
    } else {
      this.getInfo();
    }
    // 当前的语言
    if (localStorage.getItem("lang")) {
      this.textLang = JSON.parse(localStorage.getItem("lang")).text;
    } else {
      let langText = navigator.language.slice(0, 2);
      switch (langText) {
        case "zh":
          this.textLang = "简体中文";
          break;
        case "en":
          this.textLang = "English";
          break;
        case "zhTw":
          this.textLang = "繁体中文";
          break;
        case "ja":
          this.textLang = "日本語";
          break;
        case "ko":
          this.textLang = "한국어"; //韩语
          break;
        case "ru":
          this.textLang = "русский язык"; //俄语
          break;
        case "fr":
          this.textLang = "Français"; //法语
          break;
        case "th":
          this.textLang = "ภาษาไทย"; //泰语
          break;
      }
    }
    // 自动登录(有钱包地址)
    let req = {};
    const token = this.cookie.get("token")
    req.walletAddress = localStorage.getItem("myaddress");
    req.otype = localStorage.getItem("netType");
    req.sign = localStorage.getItem("mysign");
    if (req.walletAddress && req.otype && req.sign) {
      this.login(req);
    } else if (!token) {
      this.$router.replace("/login");
    } else if (!!token) {
      this.getInfo();
    }
  },
  methods: {
    // 关闭风险弹窗
    handleClosed() {
      this.show = true;
    },
    // 身份信息跳转
    identifyRouter() {
      if (this.cookie.get("riskLevel") != 2) {
        if (this.userInfo.authType === 0) {
          this.$router.push("/my/identity");
        } else if (this.userInfo.authType === 2) {
          this.$router.push("/my/identity/success");
        } else if (this.userInfo.authType === 3) {
          this.$router.push("/my/identity/fail");
        } else {
          console.log(this.userInfo.authType);
        }
      }
    },
    // 风控等级
    getrisklevel() {
      risklevel().then((res) => {
        const { code, items: level } = res.data;
        if (code === 0) {
          this.cookie.set("riskLevel", level);
          if (level === 2) {
            this.$nextTick().then(() => {
              this.$refs.notification.toggle(true);
            });
          }
        }
      });
    },
    // 获取用户信息
    getInfo() {
      getuserinfo()
        .then((res) => {
          if (res.data.code == 0) {
            this.userInfo = res.data.items;
            // 用户信息存到cookie
            this.cookie.set("userInfo", JSON.stringify(this.userInfo));
            this.cookie.set("country", this.userInfo.country);
            this.getrisklevel();
            if (!res.data.items.refUserId) {
              //没有邀请码
              this.showOverlay = true;
            }
          } else {
            this.$toast.fail({
              message: res.data.message,
              onClose: () => {
                this.$router.replace("/login");
              },
            });
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            //未登录
            this.$router.replace("/login");
          }
        });
    },
    // 选择语言更换图标
    handleTabLang() {
      this.showPopup2 = !this.showPopup2;
      if (this.showPopup2) {
        this.iconLang = "arrow-up";
      } else {
        this.iconLang = "arrow-down";
      }
    },
    tabLang(item) {
      localStorage.setItem("lang", JSON.stringify(item));
      this.textLang = item.text;
      this.$router.go(0);
    },
    // 前往选择所在地
    toSite() {
      // 判断有没有选位置，有就直接调到社区
      // 没有就跳到选择已有的社区页面
      getcomselect().then((res) => {
        if (!res.data.items.country) {
          this.showOverlay = false;
          this.$router.push("/bindRelation");
        } else {
          this.$router.push("/bindRelation/bindCommunity");
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.content {
  position: relative;
  margin-top: 88px;
  padding-bottom: 120px;
  background: linear-gradient(174deg, #172d5a 0%, #06070a 100%);
  overflow: hidden;
  // 名称
  .project_name {
    margin-top: 100px;
    text-align: center;
    .text {
      color: #fff;
      font-size: 60px;
      font-weight: bold;
      letter-spacing: 4px;
      &.bold {
        font-size: 60px;
        margin-bottom: 30px;
      }
    }
  }
  // 大的背景图
  .big_bg_logo {
    margin-top: -40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 身份证背景图
  .identity_card {
    position: absolute;
    top: 550px;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 578px;
      height: 315px;
    }
  }
  // 按钮
  .btn {
    position: relative;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 468px;
    height: 88px;
    border-radius: 16px;
    background: #237ff8;
    .btn-box {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 32px;
        color: #fff;
      }
      .dunpai {
        margin-right: 20px;
        width: 32px;
        height: 38px;
      }
      .icon_down {
        position: absolute;
        top: 33px;
        right: 14%;
        display: inline-block;
        width: 30px;
        height: 24px;
        line-height: 88px;
        transform: rotate(-90deg);
      }
    }
  }
  // 简介
  .title-summarize {
    margin-top: 140px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 160px;
    text-align: center;
    background-image: url("../../assets/imgs/introduction_bg.png");
    background-size: 160px 20px;
    background-repeat: no-repeat;
    background-position: 0 30px;
    span {
      font-size: 36px;
      color: #fff;
    }
  }
  // 简介
  .text-p:first-of-type {
    margin-top: 41px;
  }
  .text-p {
    padding: 0 40px;
    line-height: 60px;
    font-size: 28px;
    color: #b9b9b9;
    text-indent: 2em;
  }
}
.tail {
  position: fixed;
  bottom: 0;
  padding: 0 40px;
  width: 100%;
  height: 96px;
  font-size: 24px;
  background: #111a2d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  div:first-of-type {
    display: flex;
    align-items: center;
    color: #dcdcdc;
    img {
      margin-right: 14px;
      width: 36px;
      height: 36px;
    }
  }
  div:last-of-type {
    color: #fff;
    span {
      margin-right: 10px;
    }
  }
}
// 语言
.menu {
  margin-top: 88px;
  margin-bottom: 200px;
  .menu-every {
    margin: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    font-size: 32px;
    color: #b4b7c2;
    border-bottom: 1px solid #2b374f;
    img {
      margin-left: 50px;
      width: 40px;
      height: 40px;
    }
  }
}
// 遮罩层
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.risk_mask_wrap {
  @include posi($p: fixed, $r: 0, $b: 20%);
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 100px 0 0 100px;
  .img {
    display: block;
    width: 60px;
  }
  .text {
    flex: 1;
    color: #f34747;
    margin-left: 20px;
    font-size: 28px;
  }
}
.block {
  position: relative;
  width: 590px;
  background-color: #fff;
  border-radius: 20px;
  img {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 200px;
  }
  .tips {
    padding: 0 40px;
    line-height: 50px;
    text-align: center;
    font-size: 32px;
  }
  .tips:first-of-type {
    margin-top: 110px;
  }
  .block-bot {
    margin-top: 30px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-start;
    div {
      width: 50%;
      height: 112px;
      font-size: 32px;
      line-height: 112px;
      text-align: center;
    }
    div:first-of-type {
      color: #666;
      border-right: 1px solid #f0f0f0;
    }
    div:last-of-type {
      color: #1b2945;
    }
  }
}
</style>