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
            <img v-if="userInfo.authType == 2" src="@/assets/imgs/dunpai.png" />
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
          is-link
          :border="false"
          @click="auth('/my/identity/approval', true)"
        >
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="@/assets/imgs/shenhe.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.certification_audit") }}
              <span v-show="show.identity" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 社区审批 -->
        <van-cell
          is-link
          :border="false"
          @click="auth('/my/approval/community', true)"
        >
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="@/assets/imgs/shenpi.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.community_approval") }}
              <span v-show="show.communityApproval" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 身份信息 -->
        <van-cell is-link :border="false" :to="identifyRouter">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="@/assets/imgs/shenfen.png" />
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
        <van-cell is-link :border="false" @click="auth('/my/payment', true)">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="@/assets/imgs/fukuan.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.payment") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 我的社区 -->
        <!-- <van-cell
          is-link
          :border="false"
          @click="auth({ path: '/my/community' })"
        >
          <template #icon>
            <img src="@/assets/imgs/shequ.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.my_comm") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell> -->
        <!-- 我的团队 -->
        <van-cell is-link :border="false" @click="auth('/my/team')">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="@/assets/imgs/tuandui.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.my_team") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 邀请好友 -->
        <van-cell is-link :border="false" @click="auth('/my/invite')">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="@/assets/imgs/haoyou.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.invite_friends") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 各公链绑定地址 -->
        <van-cell is-link :border="false" :to="riskLevel ? '/my/wallets' : ''">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="@/assets/imgs/gonglian.png" />
          </template>
          <template #title>
            <span>
              {{ $t("my.bind_address") }}
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 绑定各项目 -->
        <van-cell is-link :border="false" :to="riskLevel ? '/my/projects' : ''">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="@/assets/imgs/xiangmu.png" />
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
import { list as communityList } from "@/api/pagesApi/approvalCommunity";
import { list as identityList } from "@/api/pagesApi/identity";

export default {
  name: "my",
  components: {
    TopBar,
  },
  data() {
    return {
      userInfo: {},
      form: {},
      headerIcon: require("@/assets/imgs/jin.png"),
      isShow: false,
      show: {
        communityApproval: false,
        identity: false,
      },
      riskLevel: false,
    };
  },
  created() {
    if (this.cookie.get("riskLevel")) {
      if (this.cookie.get("riskLevel") == 2) {
        this.riskLevel = false;
      } else {
        this.riskLevel = true;
      }
    } else {
      this.riskLevel = false;
    }
    this.handleRefresh();
    this.getBadge();
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
    // 获取是否有未处理的审批
    getBadge() {
      communityList(0, { page: 1, itemsPerPage: 10 }).then((res) => {
        this.show.communityApproval = !res.data.code && !!res.data.items.length;
      });
      identityList(0, { page: 1, itemsPerPage: 10 }).then((res) => {
        this.show.identity = !res.data.code && !!res.data.items.length;
      });
    },
    // 去设置
    toSetup() {
      this.$router.push("/setup");
    },
    handleRefresh() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: this.$t("public.loading"),
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
            if (!this.isShow) {
              this.$dialog
                .confirm({
                  message: this.$t("my.my_dialog1_msg"),
                  confirmButtonText: this.$t("my.my_dialog1_text1"),
                  cancelButtonText: this.$t("my.my_dialog1_text2"),
                })
                .then(() => {
                  this.riskLevel
                    ? this.$router.push("/my/community/setting")
                    : "";
                })
                .catch(() => {});
              this.isShow = true;
            }
          }
        })
        .finally(() => loading.clear());
    },
    /**
     * 验证是否有跳转权限
     * path：跳转路径
     * validateAuthType：是否需要验证身份认证通过
     * **/
    auth(path, validateAuthType = false) {
      const { name, phoneNum, idCard } = this.userInfo;
      const options = {
        title: "",
        type: "",
        message: "",
        cb: null,
      };
      if (this.userInfo.refUid) {
        if (validateAuthType) {
          if (this.userInfo.authType === 2 && this.riskLevel) {
            this.$router.push(path);
          } else {
            switch (this.userInfo.authType) {
              case 0:
                options.type = "confirm";
                options.title = this.$t("my.my_index_title1");
                options.message = this.$t("my.my_index_msg1");
                options.cb = () =>
                  this.riskLevel
                    ? this.$router.push({ path: "/my/identity" })
                    : "";
                break;
              case 1:
                options.type = "alert";
                options.title = this.$t("my.my_index_title1");
                options.message = this.$t("my.my_index_msg2");
                options.cb = null;
                break;
              case 3:
                options.type = "confirm";
                options.title = this.$t("my.my_index_title1");
                options.message = this.$t("my.my_index_msg3");
                options.cb = () => {
                  if (this.riskLevel) {
                    this.$router.push({
                        name: "identity",
                        params: { name, phoneNum, idCard },
                      })
                    }
                };
                break;
            }
            this.$dialog[options.type]({
              title: options.title,
              message: options.message,
              confirmButtonText:
                options.type === "confirm"
                  ? this.$t("my.my_index_text1")
                  : this.$t("public.confirm"),
              confirmButtonColor: "#F65F5F",
              cancelButtonText: this.$t("my.my_dialog1_text2"),
              beforeClose: (action, done) => {
                if (action === "confirm") {
                  done();
                  options.cb && options.cb();
                } else {
                  done();
                }
              },
            }).catch(() => {});
          }
        } else {
          this.$router.push(path);
        }
      } else {
        this.$dialog
          .confirm({
            title: this.$t("my.my_index_title2"),
            message: this.$t("my.my_index_msg4"),
            confirmButtonText: this.$t("my.my_index_text2"),
            confirmButtonColor: "#F65F5F",
            cancelButtonText: this.$t("my.my_dialog1_text2"),
            beforeClose: (action, done) => {
              if (action === "confirm") {
                done();
                this.showOverlay = false;
                this.$router.push("/myReferrer");
              } else {
                done();
              }
            },
          })
          .catch(() => {});
      }
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
    padding: 40px 30px 30px 30px;
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
            font-size: 32px;
          }
        }
      }
    }

    .card-bottom {
      margin-top: 30px;
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
          font-size: 32px;
        }

        span:last-of-type {
          margin-left: 16px;
          font-size: 32px;
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
    padding-bottom: 200px;
    img {
      width: 56px;
      height: 56px;
    }
    span {
      position: relative;
      margin-left: 20px;
      color: #fff;
      font-size: 32px;
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