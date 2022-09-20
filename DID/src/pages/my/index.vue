<template>
  <div class="container">
    <TopBar />
    <div class="content">
      <!-- 身份卡 -->
      <div class="identity-card">
        <div class="card-top">
          <div class="card-top-left">
            <img src="../../assets/imgs/logo_two.png" alt="" />
            <div>
              <div>1428378906@qq.com</div>
              <div>UID:3135468</div>
            </div>
          </div>
          <div class="card-icon">
            <van-icon name="setting-o" color="#fff" size="24" />
          </div>
        </div>
        <div class="card-bottom">
          <div>
            <img src="../../assets/imgs/duipai2.png" alt="" />
            <span>身份未认证</span>
          </div>
          <div>
            <span>信用分</span>
            <span>10</span>
          </div>
        </div>
      </div>
      <!-- 菜单栏 -->
      <div class="cell">
        <!-- 认证审核 -->
        <van-cell is-link :border="false">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/shenhe.png" />
          </template>
          <template #title>
            <span>
              认证审核
              <span class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 社区审批 -->
        <van-cell is-link :border="false">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/shenpi.png" />
          </template>
          <template #title>
            <span>
              社区审批
              <span class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 身份信息 -->
        <van-cell is-link :border="false">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/shenfen.png" />
          </template>
          <template #title>
            <span>
              身份信息
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 收付款方式 -->
        <van-cell is-link :border="false">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/fukuan.png" />
          </template>
          <template #title>
            <span>
              收付款方式
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 我的社区 -->
        <van-cell is-link :border="false">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/shequ.png" />
          </template>
          <template #title>
            <span>
              我的社区
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 我的团队 -->
        <van-cell is-link :border="false">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/tuandui.png" />
          </template>
          <template #title>
            <span>
              我的团队
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 邀请好友 -->
        <van-cell is-link :border="false">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/haoyou.png" />
          </template>
          <template #title>
            <span>
              邀请好友
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 各公链绑定地址 -->
        <van-cell is-link :border="false">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/gonglian.png" />
          </template>
          <template #title>
            <span>
              各公链绑定地址
              <span v-show="false" class="badge"></span>
            </span>
          </template>
        </van-cell>
        <!-- 绑定各项目 -->
        <van-cell is-link :border="false">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <img src="../../assets/imgs/xiangmu.png" />
          </template>
          <template #title>
            <span>
              绑定各项目
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
export default {
  name: "my",
  data() {
    return {
      valueColor: "",
      activeNames: ["1"],
      cellList: [
        {
          id: 0,
          title: "认证审核",
          imgUrl: require("../../assets/imgs/shenhe.png"),
        },
        {
          id: 1,
          title: "社区审批",
          imgUrl: require("../../assets/imgs/shenpi.png"),
        },
        {
          id: 2,
          title: "身份信息",
          imgUrl: require("../../assets/imgs/shenfen.png"),
        },
        {
          id: 3,
          title: "收付款方式",
          imgUrl: require("../../assets/imgs/fukuan.png"),
        },
        {
          id: 4,
          title: "我的社区",
          imgUrl: require("../../assets/imgs/shequ.png"),
        },
        {
          id: 5,
          title: "我的团队",
          imgUrl: require("../../assets/imgs/tuandui.png"),
        },
        {
          id: 6,
          title: "邀请好友",
          imgUrl: require("../../assets/imgs/haoyou.png"),
        },
        {
          id: 7,
          title: "各公链绑定地址",
          imgUrl: require("../../assets/imgs/gonglian.png"),
        },
        {
          id: 8,
          title: "绑定各项目",
          imgUrl: require("../../assets/imgs/xiangmu.png"),
        },
      ],
    };
  },
  components: {
    TopBar,
  },
  methods: {},
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
    padding: 30px;
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
    display: flex;
    align-items: center;
    background: none;
  }
  :deep(.van-cell__title) {
    height: 96px;
    line-height: 100px;
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
}
</style>