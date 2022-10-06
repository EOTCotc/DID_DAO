<template>
  <div>
    <!-- 头部 -->
    <TopBar />
    <!-- 内容 -->
    <div class="content">
      <!-- 名称 -->
      <div class="project_name">
        <img src="../../assets/imgs/project_name.png" />
      </div>
      <!-- 背景图 -->
      <div class="big_bg_logo">
        <img src="../../assets/imgs/big_bg_logo.png" />
      </div>
      <!-- 身份证图片 -->
      <div class="identity_card">
        <img src="../../assets/imgs/identity_card.png" alt="" />
      </div>
      <!-- 认证按钮 -->
      <div
        class="btn"
        :style="userInfo.authType == 2 ? 'background:#102E59;border:2px solid #237FF8;' : '' "
      >
        <div class="btn-box" @click='identifyRouter'>
          <template v-if='userInfo.authType === 0'>
            <span>开始认证</span>
            <div class="icon_down"><van-icon color="#fff" name="down" /></div>
          </template>
          <template v-else-if='userInfo.authType === 1'>
            <img class="dunpai" src="@/assets/imgs/dunpai.png" alt="" />
            <span>认证中</span>
          </template>
          <template v-else-if='userInfo.authType === 2'>
            <img class="dunpai" src="@/assets/imgs/dunpai.png" alt="" />
            <span>身份已认证</span>
          </template>
          <template v-else>
            <img class="dunpai" src="@/assets/imgs/dunpai.png" alt="" />
            <span>身份认证失败</span>
            <div class="icon_down"><van-icon color="#fff" name="down" /></div>
          </template>
        </div>
      </div>
      <!-- 系统简介 -->
      <div class="title-summarize">
        <span>系统简介</span>
      </div>
      <!-- 简介 -->
      <p class="text-p">
        DID属于统一资源标识符URI的一种，是一个永久不可变的字符串，它存在的意义有两点，第一，标记任何目标对象(DID
        Subject)，可以是一个人、一件商品、一台机器或者一只动物等等；第二，DID是通过DID
        URL关联到描述目标对象的文件（DID Document,简称DID
        Doc）唯一标识符，即通过DID能够在数据库中搜索到具体的DID Doc。
      </p>
      <p class="text-p">
        创建一个DID Document的过程是Production,而将创建的这条Document引用至该DID
        Subject其他DID创建过程则是Consumption。在验证过程中，每个DID对应的DID
        Document是独立的，相当于对每个DID做了信息隔离。在验证过程中，DID持有人可以根据需要对不同DID授权，验证人只能阅读到被授权的DID
        Doc，而无法获得更多信息，从而达到DID Subject的信息保护目的。
      </p>
    </div>
    <!-- 底部 -->
    <div class="tail">
      <div>
        <img src="../../assets/imgs/c.png" />
        <span> 2022年EOTC版权所有。</span>
      </div>
      <div @click="handleTabLang">
        <span class="tab-lang">简体中文</span>
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
        <div class="menu-every" v-for="item in lang" :key="item.id">
          <span>{{ item.text }}</span>
        </div>
      </div>
    </van-popup>
    <!-- 遮罩层 -->
    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <img src="../../assets/imgs/lingdang.png" />
          <div class="tips">检测到您暂无推荐关系，为了账户</div>
          <div class="tips">安全性请前往绑定推荐关系</div>
          <div class="block-bot">
            <div @click="showOverlay = false">取消</div>
            <div @click="toSite">确定</div>
          </div>
        </div>
      </div>
    </van-overlay>
    <notification
      ref="notification"
      title="系统检测您的账号存在异常"
      message="暂无法使用该系统，请根据提示解除风控"
      button-text="解除风控"
      button-color="#F65F5F"
      :header-icon="headerIcon"
      @closed="handleClosed"
      @buttonClick="() => $router.push('/risk')"
    />
    <div class="risk_mask_wrap" v-show="show" @click="$router.push('/risk')">
      <img src="../../assets/imgs/jin.png" alt="" class="img">
      <div class="text">解除风控</div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/notification'
import headerIcon from "@/assets/imgs/jin.png"
import TopBar from "@/components/topBar/topBar";
import { getuserinfo, getcomselect } from "@/api/pagesApi/home";
import { login } from "@/api/pagesApi/login";
import { loadweb3 } from "@/utils/web3";
import {risklevel} from '@/api/risk'
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
      ],
    };
  },
  components: {
    TopBar,
    Notification
  },
  created() {
    risklevel().then((res) => {
      const {code, items: level} = res.data
      if (code === 0) {
        if (level === 2) {
          this.cookie.set('riskLevel', level)
          this.$nextTick().then(() => {
            this.$refs.notification.toggle(true)
          })
        }
      }
    });
  },
  mounted() {
    if (this.cookie.get("token")) {
      //有token没用户信息
      this.getInfo();
    } else if (!localStorage.getItem("myaddress")) {
      //钱包地址为空
      loadweb3(this.login);
    } else if (!this.cookie.get("token")) {
      //没有token
      this.$router.replace("/login");
    }
  },
  methods: {
    // 关闭风险弹窗
    handleClosed() {
      this.show = true
    },
    // 身份信息跳转
    identifyRouter() {
      if (this.userInfo.authType === 0) {
        this.$router.push('/my/identity')
      } else if (this.userInfo.authType === 2) {
        this.$router.push('/my/identity/success')
      } else if (this.userInfo.authType === 3) {
        this.$router.push('/my/identity/fail')
      } else {
        console.log(this.userInfo.authType)
      }
    },
    // 根据钱包、签名、网络登录，如果不行就跳登录页
    login() {
      let walletAddress = localStorage.getItem("myaddress");
      let otype = localStorage.getItem("netType");
      let sign = localStorage.getItem("mysign");
      let reqObj = {
        walletAddress,
        otype,
        sign,
      };
      login(reqObj)
        .then((res) => {
          if (res.data.code == 0) {
            this.cookie.set("token", res.data.items, { expires: 30 });
            this.getInfo(); //获取用户信息
          } else if (res.data.code == 2) {
            this.$router.replace("/login"); //邮箱未注册
          } else {
            this.$router.push("/login");
          }
        })
        .catch(() => {
          this.$router.replace("/login");
        });
    },
    // 获取用户信息
    getInfo() {
      getuserinfo()
        .then((res) => {
          if (res.data.code == 0) {
            this.userInfo = res.data.items;
            // 用户信息存到cookie
            this.cookie.set("userInfo", JSON.stringify(res.data.items));
            if (!res.data.items.refUserId) {
              //没有邀请码
              this.showOverlay = true;
            }
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
    // 前往选择所在地
    toSite() {
      // 判断有没有选位置，有就直接调到社区
      // 没有就跳到选择已有的社区页面
      getcomselect().then((res) => {
        if (!res.data.items.country) {
          this.showOverlay = false;
          this.$router.push("/bindRelation");
        } else {
          this.$router.push({name: "bindCommunity",});
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
    img {
      width: 657px;
      height: 236px;
    }
  }
  // 大的背景图
  .big_bg_logo {
    margin-top: -40px;
    img {
      width: 882px;
      height: 858px;
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
  background-color: #FFF;
  padding: 20px;
  border-radius: 100px 0 0 100px;
  .img {
    display: block;
    width: 60px;
  }
  .text {
    flex: 1;
    color: #F34747;
    margin-left: 20px;
    font-size: 28px;
  }
}
.block {
  position: relative;
  width: 590px;
  height: 354px;
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