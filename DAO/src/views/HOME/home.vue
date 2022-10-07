<template>
  <div>
    <TopBar />

    <div class="content">
      <img class="home-logo" src="@/assets/imgs/home_logo.png" alt="首页logo" />
      <div class="home-title">
        <p>{{ $t("home.text1") }}</p>
        <p>{{ $t("home.text2") }}</p>
      </div>
      <button class="home-btn" @click="$router.push('/Create')">
        {{ $t("home.btn") }}
      </button>
      <!-- 最新提案 -->
      <div class="proposal-list">
        <div class="proposal-title">
          <span class="home-proposal-title">{{ $t("home.title") }}</span>
          <span
            class="home-proposal-more"
            @click="
              $router.push({
                path: '/Bill_list',
                query: { isProponent: 0, home: 'home' },
              })
            "
          >
            {{ $t("home.more") }}
            <van-icon name="arrow" color="#fff" />
          </span>
        </div>
        <div class="list-box" v-if="proposalList.length != 0">
          <div
            class="list-every"
            v-for="(item, index) in proposalList"
            :key="index"
            @click="
              $router.push({
                path: '/detail',
                query: { proposalId: item.proposalId },
              })
            "
          >
            <div class="every-title">{{ item.title }}</div>
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
        <div v-else class="not-data">暂无任何提案信息</div>
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
          <span class="tab-lang">{{ $t("home.language") }}</span>
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
          <div class="menu-every" v-for="item in lang" :key="item.id">
            <span>{{ item.text }}</span>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="filed" v-show="tanShow == true" @click="Remove_risk">
      <van-image
        width="30"
        height="30"
        style="margin-right: 5px"
        :src="require('../../assets/img/jin.png')"
      />
      <span>解除风控</span>
    </div>
    <Notification
      ref="notification"
      title="系统检测您的账号存在异常"
      message="暂无法使用该系统，请根据提示解除风控"
      :headerIcon="require('../../assets/img/jin.png')"
      buttonColor="#F65F5F"
      buttonText="解除风控"
      :closeOnClick="true"
      @buttonClick="buttonClick"
    />
  </div>
</template>

<script>
import TopBar from "@/components/topBar/topBar";
import Notification from "@/components/notification";
import { getproposallist, getuserrisklevel } from "@/api/viewsApi/home";
import { loadweb3 } from "@/utils/web3.js";

export default {
  components: { TopBar, Notification },
  name: "home",
  data() {
    return {
      iconLang: "arrow-down",
      showPopup: false,
      lang: [
        { id: 0, text: "简体中文", lang: "zh" },
        { id: 1, text: "English", lang: "en" },
      ],
      tanShow: false,
      proposalList: [], //提案列表
    };
  },
  mounted() {
    loadweb3(this.handle);
  },
  methods: {
    handle() {
      this.getuserrisklevel();
      this.getProposal();
    },
    // 获取风险等级
    getuserrisklevel() {
      getuserrisklevel().then((res) => {
        if (res.data.code == 0) {
          this.cookie.set("riskLevel", res.data.items);
          if (res.data.items == 2) {
            this.$nextTick().then(() => {
              this.$refs.notification.toggle(true);
            });
          }
        }
      });
    },
    buttonClick() {
      this.tanShow = true;
    },
    // 获取最新的十个提案
    getProposal() {
      getproposallist({ page: 1, itemsPerPage: 10 }).then((res) => {
        if (res.data.code == 0) {
          this.proposalList = res.data.items;
        }
      });
    },
    //跳转到解除风控
    Remove_risk() {
      this.$router.push("/relieve");
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
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 88px 30px 208px 30px;
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
  margin-top: 100px;
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
  width: 200px;
  line-height: 90px;
  background: #fff;
  font-size: 28px;
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