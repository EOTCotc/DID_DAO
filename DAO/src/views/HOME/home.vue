<template>
  <div>
    <TopBar />
    <div class="content">
      <img class="home-logo"
           src="@/assets/imgs/home_logo.png"
           alt="首页logo" />
      <div class="home-title">
        <p>围绕EOTC所有去中去化业务建立的团队</p>
        <p>允许任何成员做出决定，参加治理</p>
      </div>
      <button class="home-btn"
              @click="$router.push('/Create')">
        创建提案
      </button>
      <!-- 最新提案 -->
      <div class="proposal-list">
        <div class="proposal-title">
          <span>最新提案</span>
          <span @click="$router.push('/Bill_list')">
            查看更多
            <van-icon name="arrow"
                      color="#fff" />
          </span>
        </div>
        <div class="list-box">
          <<<<<<< HEAD
                  <div
                  class="list-every"
                  v-for="(item, index) in proposalList"
                  :key="index"
                  @click="
              $router.push({
                path: '/detail',
                query: { proposalId: item.proposalId },
              })
            ">
            =======
            <div class="list-every"
                 v-for="(item, index) in proposalList"
                 :key="index"
                 @click="$router.push({ path: '/detail', query: {proposalId:item.proposalId,state:item.state} })">
              >>>>>>> 528a50cfa7962824f74a118808176be3c5c263e7
              <div class="every-title">{{ item.title }}</div>
              <div class="every-type">
                <span>{{ item.total }}票</span>
                <div class="every-status">
                  <span :style="
                    item.state == 0
                      ? 'background:#237FF8;'
                      : item.state == 1
                      ? ''
                      : item.state == 2
                      ? 'background:#00B87A;'
                      : ''
                  "></span>
                  <span>{{
                  item.state == 0
                    ? "进行中"
                    : item.state == 1
                    ? "未通过"
                    : item.state == 2
                    ? "已通过"
                    : "已终止"
                }}</span>
                </div>
              </div>
            </div>
        </div>
      </div>
      <!-- 条件 -->
      <div class="condition">提交提案最低门槛为持有10000EOTC</div>
      <!-- 底部 -->
      <div class="tail">
        <div>
          <img src="@/assets/imgs/c.png" />
          <span> 2022年EOTC版权所有。</span>
        </div>
        <div @click="handleTabLang">
          <span class="tab-lang">简体中文</span>
          <van-icon :name="iconLang" />
        </div>
      </div>
      <!-- 选择语言 -->
      <van-popup v-model="showPopup"
                 :style="{ height: '100%', background: '#1b2946', zIndex: '55' }"
                 position="right">
        <div class="menu">
          <div class="menu-every"
               v-for="item in lang"
               :key="item.id">
            <span>{{ item.text }}</span>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="filed"
         v-show="tanShow == true"
         @click="Remove_risk">
      <van-image width="30"
                 height="30"
                 style="margin-right: 5px"
                 :src="require('../../assets/img/jin.png')" />
      <span>解除风控</span>
    </div>
    <Notification ref="notification"
                  title="系统检测您的账号存在异常"
                  message="暂无法使用该系统，请根据提示解除风控"
                  :headerIcon="require('../../assets/img/jin.png')"
                  buttonColor="#F65F5F"
                  buttonText="解除风控"
                  :closeOnClick="true"
                  @buttonClick="buttonClick" />
  </div>
</template>

<script>
<<<<<<< HEAD
import TopBar from "@/components/topBar/topBar";
import Notification from "@/components/notification";
import { getproposallist, getuserrisklevel } from "@/api/viewsApi/home";
import { loadweb3 } from "@/utils/web3.js";
=======
import TopBar from '@/components/topBar/topBar'
import Notification from '@/components/notification'
import { getproposallist, getuserrisklevel } from '@/api/viewsApi/home'
>>>>>>> 528a50cfa7962824f74a118808176be3c5c263e7

export default {
  components: { TopBar, Notification },
  name: 'home',
  data() {
    return {
      iconLang: 'arrow-down',
      showPopup: false,
      lang: [
        { id: 0, text: '简体中文', lang: 'zh' },
        { id: 1, text: 'English', lang: 'en' },
      ],
      tanShow: false,
      proposalList: [], //提案列表
    }
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
      this.tanShow = true
    },
    // 获取最新的十个提案
    getProposal() {
      getproposallist({ page: 1, itemsPerPage: 10 }).then((res) => {
        if (res.data.code == 0) {
          this.proposalList = res.data.items
        }
      })
    },
    //跳转到解除风控
    Remove_risk() {
      this.$router.push('/relieve')
    },
    // 选择语言
    handleTabLang() {
      if (this.showPopup) {
        this.iconLang = 'arrow-down'
      } else {
        this.iconLang = 'arrow-up'
      }
      this.showPopup = !this.showPopup
    },
  },
}
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:first-of-type {
      font-size: 36px;
      line-height: 56px;
    }
    span:last-of-type {
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