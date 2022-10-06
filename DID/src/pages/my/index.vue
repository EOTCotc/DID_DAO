<template>
  <div class="container">
    <TopBar />
    <div class="content">
      <!-- 身份卡 -->
      <div class="identity-card">
        <div class="card-top">
          <div class="card-top-left">
            <img src="@/assets/imgs/logo_two.png" alt="" />
            <div>
              <div>{{ userInfo.mail }}</div>
              <div>UID:{{ userInfo.uid }}</div>
            </div>
          </div>
          <div class="card-icon">
            <van-icon
              @click="toSetup"
              name="setting-o"
              color="#fff"
              size="24"
            />
          </div>
        </div>
        <div class="card-bottom">
          <div>
            <img
              v-if="userInfo.authType == 2"
              src="../../assets/imgs/dunpai.png"
            />
            <img v-else src="../../assets/imgs/dunpai2.png" />
            <span v-if="userInfo.authType == 2">{{
              $t("home.authenticated")
            }}</span>
            <span v-else>{{ $t("my.unverified") }}</span>
          </div>
          <div @click="$router.push('/my/credit')">
            <span>{{ $t("my.credit_core") }}</span>
            <span>{{ userInfo.creditScore }}</span>
          </div>
        </div>
      </div>
      <!-- 菜单栏 -->
      <div class="cell">
        <!-- 认证审核 -->
        <van-cell
          v-if="userInfo.authType == 2"
          is-link
          :border="false"
          :to="userInfo.refUid ? '/my/identity/approval' : ''"
        >
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/shenhe.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.certification_audit") }}
              <span v-show="userInfo.hasAuth" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 社区审批 -->
        <van-cell
          v-if="userInfo.authType == 2"
          is-link
          :border="false"
          to="/my/approval/community"
        >
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/shenpi.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.community_approval") }}
              <span v-show="userInfo.hasAuth" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 身份信息 -->
        <van-cell is-link :border="false" :to="identifyRouter">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/shenfen.png" />
          </template>
          <template #title>
            <span> {{ $t("my.identity_info") }} </span>
          </template>
          <template #default>
            <span
              class="identity-apply_status not"
              v-if="userInfo.authType == 0"
              >{{ $t("my.identity_unver") }}</span
            >
            <span
              class="identity-apply_status pending"
              v-if="userInfo.authType == 1"
              >{{ $t("my.under_review") }}</span
            >
            <span
              class="identity-apply_status fail"
              v-else-if="userInfo.authType == 3"
              >{{ $t("my.audit_failure") }}</span
            >
          </template>
        </van-cell>
        <!-- 收付款方式 -->
        <van-cell is-link :border="false" to="/my/payment">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/fukuan.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.payment") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 我的社区 -->
        <van-cell is-link :border="false" to="/my/community">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/shequ.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.my_comm") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 我的团队 -->
        <van-cell is-link :border="false" to="/my/team">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/tuandui.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.my_team") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 邀请好友 -->
        <van-cell is-link :border="false" to="/my/invite">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/haoyou.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.invite_friends") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 各公链绑定地址 -->
        <van-cell is-link :border="false" to="/my/wallets">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/gonglian.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.bind_address") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 绑定各项目 -->
        <van-cell is-link :border="false" to="/my/projects">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/xiangmu.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.each_item") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/topBar/topBar";
import { getuserinfo } from "@/api/pagesApi/home";
export default {
  name: "my",
  components: {
    TopBar,
  },
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.handleRefresh();
  },
  computed: {
    // 身份信息跳转
    identifyRouter() {
      if (this.userInfo.authType === 0) {
        return "/my/identity";
      } else if (this.userInfo.authType === 2) {
        return "/my/identity/success";
      } else if (this.userInfo.authType === 3) {
        return "/my/identity/fail";
      }
    },
  },
  methods: {
    // 去设置
    toSetup() {
      this.$router.push("/setup");
    },
    handleRefresh() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: "加载中…",
      });
      getuserinfo()
        .then((res) => {
          this.userInfo = res.data.items;
          this.cookie.set("userInfo", JSON.stringify(this.userInfo));
          if (
            this.userInfo &&
            this.userInfo.comAuditType === 2 &&
            !this.userInfo.isImprove
          ) {
            this.$dialog
              .confirm({
                message: "社区申请已批准，请及时完善社区信息，是否现在前往？",
                confirmButtonText: "确定前往",
                cancelButtonText: "稍后前往",
              })
              .then(() => {
                this.$router.push("/my/community/setting");
              })
              .catch((err) => {});
          }
        })
        .finally(() => loading.clear());
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  min-height: 100vh;
  background: #0d162b;
  box-sizing: border-box;
}
.content {
  margin: 0 auto;
  padding-top: 88px;
  width: 94%;
  min-height: 100vh;
  // 身份卡
  .identity-card {
    margin-top: 40px;
    padding: 40px;
    border-radius: 20px;
    background: linear-gradient(134deg, #2a86ff 0%, #54dcff 100%);
    .card-top {
      display: flex;
      justify-content: space-between;
      .card-top-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 96px;
          height: 96px;
        }
        div {
          margin-left: 30px;
          color: #fff;
          div {
            margin-left: 0;
          }
          div:first-of-type {
            font-size: 36px;
          }
          div:last-of-type {
            margin-top: 8px;
            font-size: 28px;
          }
        }
      }
    }
    .card-bottom {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div:first-of-type {
        display: flex;
        align-items: center;
        img {
          width: 32px;
          height: 38px;
        }
        span {
          margin-left: 12px;
          font-size: 32px;
          color: #9bcfff;
        }
      }
      div:last-of-type {
        width: 260px;
        height: 80px;
        text-align: center;
        border-radius: 40px;
        background: #fff;
        span {
          line-height: 80px;
          color: #3aa7ff;
        }
        span:first-of-type {
          font-size: 28px;
        }
        span:last-of-type {
          margin-left: 16px;
          font-size: 36px;
          font-weight: bold;
        }
      }
    }
  }
  // 菜单栏
  :deep(.van-cell) {
    padding: 30px 0 0 0;
    display: flex;
    align-items: center;
    background: none;
  }
  .cell {
    img {
      width: 48px;
      height: 48px;
    }
    span {
      position: relative;
      margin-left: 20px;
      color: #fff;
      font-size: 36px;
      .badge {
        position: absolute;
        top: -8px;
        right: -8px;
        display: block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: red;
      }
    }
  }
  .identity-apply_status {
    font-size: 28px;
    &.not {
      color: #999;
    }
    &.pending {
      color: #237ff8;
    }
    &.fail {
      color: #ff6343;
    }
  }
}
</style>