<template>
  <div>
    <TopBar />
    <div class="content">
      <van-notice-bar
        v-if="notice"
        :text="notice"
        left-icon="volume-o"
        color="#FFF"
        background="rgba(255, 255, 255, .2)"
        @click="user ? $router.push('/notice') : ''"
      />
      <img class="home-logo" src="@/assets/imgs/home_logo.png" alt="首页logo" />
      <div class="home-title">
        <p>{{ $t("home.text1") }}</p>
        <p>{{ $t("home.text2") }}</p>
      </div>
      <button class="home-btn" @click="user ? $router.push('/Create') : ''">
        {{ $t("home.btn") }}
      </button>
      <!-- 最新提案 -->
      <div class="proposal-list">
        <div class="proposal-title">
          <span class="home-proposal-title">{{ $t("home.title") }}</span>
          <span
            class="home-proposal-more"
            @click="
              user
                ? $router.push({
                    path: '/Bill_list',
                    query: { isProponent: 0, home: 'home' },
                  })
                : ''
            "
            v-if="proposalList.length != 0"
          >
            {{ $t("home.more") }}
            <van-icon name="arrow" color="#fff" />
          </span>
        </div>
        <!-- 最新提案 -->
        <div class="list-box" v-if="proposalList.length != 0">
          <div
            class="list-every"
            v-for="(item, index) in proposalList"
            :key="index"
            @click="
              user
                ? $router.push({
                    path: '/detail',
                    query: {
                      proposalId: item.proposalId,
                      isProponent: 0,
                      state: item.state,
                    },
                  })
                : ''
            "
          >
            <!-- 提案标题 -->
            <div class="every-title">{{ item.title }}</div>
            <!-- 提案状态 -->
            <div class="every-type">
              <span>{{ item.total }}{{ $t("home.company") }}</span>
              <div class="every-status">
                <template v-if="item.state === 0">
                  <span style="background-color: #237ff8"></span>
                  <span>{{ $t("home.status1") }}</span>
                </template>
                <template v-else-if="item.state === 1">
                  <span></span>
                  <span>{{ $t("home.status2") }}</span>
                </template>
                <template v-else-if="item.state === 2">
                  <span style="background-color: #00b87a"></span>
                  <span>{{ $t("home.status3") }}</span>
                </template>
                <template v-else>
                  <span></span>
                  <span>{{ $t("home.status4") }}</span>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="not-data">{{ $t("home.not_data") }}</div>
      </div>
      <!-- 条件 -->
      <div class="condition">{{ $t("home.tip") }}</div>
      <!-- 底部 -->
      <div class="tail">
        <div>
          <img src="@/assets/imgs/c.png" />
          <span> {{ $t("home.copyright") }}</span>
        </div>
        <div @click="handleTabLang">
          <span class="tab-lang">{{ langText }}</span>
          <van-icon :name="iconLang" />
        </div>
      </div>
      <!-- 选择语言 -->
      <van-popup
        v-model="showPopup"
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
    </div>
    <div class="filed" v-show="tanShow" @click="Remove_risk">
      <van-image
        width="30"
        height="30"
        style="margin-right: 5px"
        :src="require('../../assets/img/jin.png')"
      />
      <span>{{ $t("home.remove_risk") }}</span>
    </div>
    <Notification
      ref="notification"
      :title="$t('notification.risk.title')"
      :message="$t('notification.risk.message')"
      :headerIcon="require('../../assets/img/jin.png')"
      buttonColor="#F65F5F"
      :buttonText="$t('notification.risk.btn')"
      :closeOnClick="true"
      @buttonClick="buttonClick"
    />
    <Notification
      closeOnClick
      :headerIcon="require('../../assets/imgs/tongzhi.png')"
      :title="`最近有 ${unhandledArbitration} 件仲裁案待处理`"
      ref="arbitration"
      buttonColor="#237FF8"
      buttonText="前往处理"
      @buttonClick="buttonClickArbitration"
    />
  </div>
</template>
<script>
import TopBar from "@/components/topBar/topBar";
import Notification from "@/components/notification";
import { getproposallist, getuserrisklevel } from "@/api/viewsApi/home";
import { loadweb3 } from "@/utils/web3.js";
import { getdaoinfo } from "@/api/earnings";
import { getmessageopen } from "@/api/case";
import { list } from "@/api/notice";

export default {
  components: {
    TopBar,
    Notification,
  },
  name: "home",
  data() {
    return {
      user: "",
      iconLang: "arrow-down",
      showPopup: false,
      notice: "", // 公告文字
      lang: [
        {
          id: 0,
          text: "简体中文",
          lang: "zh",
        },
        {
          id: 1,
          text: "繁體中文",
          lang: "zhTw",
        },
        {
          id: 2,
          text: "English",
          lang: "en",
        },
        {
          id: 3,
          text: "日本語",
          lang: "ja",
        },
        {
          id: 4,
          text: "한국어", //韩语
          lang: "ko",
        },
        {
          id: 5,
          text: "Deutsch", //德语
          lang: "de",
        },
        {
          id: 6,
          text: "ภาษาไทย", //泰语
          lang: "th",
        },
        {
          id: 7,
          text: "Français", //法语
          lang: "fr",
        },
        {
          id: 8,
          text: "Español", //西班牙语
          lang: "es",
        },
        {
          id: 9,
          text: "Português", //葡萄牙语
          lang: "pt",
        },
        {
          id: 10,
          text: "Русский", //俄语
          lang: "ru",
        },
        {
          id: 11,
          text: "Nederlands", //荷兰语
          lang: "nl",
        },
        {
          id: 12,
          text: "عربي", //阿拉伯语
          lang: "ar",
        },
        {
          id: 13,
          text: "ViệtName", //越南语
          lang: "vi",
        },
        {
          id: 14,
          text: "IndonesiaName", //印尼语
          lang: "id",
        },
      ],
      tanShow: false,
      proposalList: [], //提案列表
      riskShow: this.cookie.get("riskShow"),
      unhandledArbitration: 0,
      langText: "简体中文",
    };
  },
  mounted() {
    if (localStorage.getItem("lang")) {
      this.langText = JSON.parse(localStorage.getItem("lang")).text;
    } else {
      let lang = navigator.language.slice(0, 2);
      switch (lang) {
        case "zh":
          this.langText = "简体中文";
          break;
        case "zhTw":
          this.langText = "繁体中文";
          break;
        case "en":
          this.langText = "English";
          break;
        case "ja":
          this.langText = "日本語";
          break;
        case "ko":
          this.langText = "한국어"; //韩语
          break;
        case "fr":
          this.langText = "Français"; //法语
          break;
        case "ru":
          this.langText = "Русский"; //俄语
          break;
        case "vi":
          this.langText = "ViệtName"; //越南语
          break;
        case "nl":
          this.langText = "Nederlands"; //荷兰语
          break;
        case "ar":
          this.langText = "عربي"; //阿拉伯语
          break;
        case "id":
          this.langText = "IndonesiaName"; //印尼语
          break;
        case "th":
          this.langText = "ภาษาไทย"; //泰语
          break;
        case "de":
          this.langText = "Deutsch"; //德语
          break;
        case "es":
          this.langText = "Español"; //西班牙语
          break;
        case "pt":
          this.langText = "Português"; //葡萄牙语
          break;
        default:
          this.langText = "简体中文";
          break;
      }
    }
    loadweb3(this.handle);
  },
  methods: {
    handle() {
      this.getuserrisklevel();
      this.getProposal();
      this.getLocal();
      this.getUnhandledArbitrationMsg();
      this.getList();
    },
    getList() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: "加载中…",
      });
      list()
        .then((res) => {
          const data = res.data.items;
          this.notice = data.length ? data[0].title : "";
        })
        .finally(() => {
          loading.clear();
        });
    },
    getLocal() {
      // 获取用户信息
      getdaoinfo()
        .then((res) => {
          this.user = res.data.items;
          localStorage.setItem("user", JSON.stringify(res.data.items));
          this.cookie.set("user", JSON.stringify(res.data.items));
          localStorage.setItem("items", res.data.items.daoEOTC);
          localStorage.setItem("uid", res.data.items.uid);
          localStorage.setItem("isArbitrate", res.data.items.isArbitrate);
          localStorage.setItem("isExamine", res.data.items.isExamine);
          localStorage.setItem("authType", res.data.items.authType);
          localStorage.setItem("isEnable", res.data.items.isEnable);
        })
        .catch((err) => {
          this.$toast.fail(this.$t("home.msg_fail"));
        });
    },
    // 获取风险等级
    getuserrisklevel() {
      getuserrisklevel().then((res) => {
        if (res.data.code == 0) {
          this.cookie.set("riskLevel", res.data.items);
          this.cookie.set("riskShow", "false");
          if (res.data.items == 2 && !this.riskShow) {
            this.$nextTick().then(() => {
              this.$refs.notification.toggle(true);
            });
          }
          if (res.data.items == 2 && this.riskShow) {
            this.tanShow = true;
          }
        }
      });
    },
    // 获取是否有仲裁未处理
    getUnhandledArbitrationMsg() {
      getmessageopen(0).then((res) => {
        this.unhandledArbitration = res.data.items.length;
        if (
          this.unhandledArbitration &&
          Number(this.cookie.get("unhandledArbitration")) !==
            this.unhandledArbitration
        ) {
          this.cookie.set("unhandledArbitration", this.unhandledArbitration);
          this.$nextTick(() => this.$refs.arbitration.toggle(true));
        }
      });
    },
    buttonClickArbitration() {
      this.user ? this.$router.push("/user/arbitration/case") : "";
    },
    //弹框点击事件
    buttonClick() {
      this.tanShow = true;
    },
    // 获取最新的十个提案
    getProposal() {
      getproposallist({
        page: 1,
        itemsPerPage: 10,
      }).then((res) => {
        if (res.data.code == 0) {
          this.proposalList = res.data.items;
        }
      });
    },
    //跳转到解除风控
    Remove_risk() {
      this.user ? this.$router.push("/relieve") : "";
    },
    // 选择语言
    handleTabLang() {
      if (this.showPopup) {
        this.iconLang = "arrow-down";
      } else {
        this.iconLang = "arrow-up";
      }
      this.showPopup = !this.showPopup;
    },
    tabLang(item) {
      console.log(item);
      localStorage.setItem("lang", JSON.stringify(item));
      this.$router.go(0);
    },
  },
};
</script>
<style lang='scss' scoped>
.content {
  padding: 88px 0 208px;
  width: 100vw;
  min-height: 100vh;
  text-align: center;
  background: #070a0e;
  overflow: hidden;

  .home-logo {
    margin-top: 60px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 381px;
    height: 403px;
  }

  .home-title {
    margin-top: 77px;
    padding: 0 61px;
    line-height: 64px;
    font-size: 28px;
    color: #fff;
  }

  .home-btn {
    width: 280px;
    height: 88px;
    font-size: 32px;
    color: #fff;
    background: #237ff8;
    border-radius: 44px;
  }
}

// 最新提案
.proposal-list {
  margin: 100px 30px 0;
  color: #fff;

  .proposal-title {
    overflow: hidden;

    .home-proposal-title {
      float: left;
      font-size: 36px;
      line-height: 56px;
    }

    .home-proposal-more {
      float: right;
      font-size: 32px;
      color: #9296a2;
    }
  }

  .list-box {
    margin-top: 37px;
    text-align: left;

    .list-every + .list-every {
      margin-top: 20px;
    }

    .list-every {
      padding: 30px 40px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);

      .every-title {
        line-height: 56px;
        font-size: 32px;
      }

      .every-type {
        margin-top: 37px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28px;
        color: #9296a2;
      }

      .every-status {
        span:first-of-type {
          margin-right: 12px;
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #999;
        }
      }
    }
  }

  .not-data {
    margin-top: 37px;
    width: 100%;
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-size: 28px;
    color: #9296a2;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}

// 条件
.condition {
  margin-top: 44px;
  padding: 0 30px;
  font-size: 28px;
  color: #f9fbff;
}

.tail {
  position: fixed;
  bottom: 0;
  left: 0;
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
      margin-right: 10px;
      width: 28px;
      height: 28px;
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

//固定
.filed {
  line-height: 90px;
  background: #fff;
  font-size: 28px;
  padding: 0 10px;
  color: #f34747;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px 0px 0px 50px;
  position: fixed;
  right: 0px;
  bottom: 20%;
}
</style>