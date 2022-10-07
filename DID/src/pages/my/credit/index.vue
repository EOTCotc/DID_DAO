<template>
  <div class="content">
    <van-nav-bar
      title="信用评分"
      fixed
      placeholder
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 信用分 -->
    <div class="grade">
      <div class="text">
        <p>
          <countTo
            :startVal="startVal"
            :endVal="endVal"
            :duration="duration"
          ></countTo>
        </p>
        <p>信用评分低</p>
      </div>
      <div class="svgbox">
        <svg class="svg" viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="90"
            r="75"
            stroke="#323E57"
            stroke-width="10"
            fill="none"
            stroke-dasharray="236"
            stroke-dashoffset="-236"
            stroke-linecap="round"
          />
          <circle
            class="square"
            cx="150"
            cy="90"
            r="75"
            stroke="#2E85F8"
            stroke-width="10"
            fill="none"
            stroke-dasharray="236 236"
            stroke-dashoffset="-236"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <img src="@/assets/imgs/bg-footer.png" alt="" />
    </div>
    <van-tabs
      swipeable
      animated
      background="#2C84F5"
      color="#fff"
      title-active-color="#fff"
      title-inactive-color="#96C2FA"
      v-model="active"
      @change="activeNum"
    >
      <van-tab title="加分记录">
        <div class="center">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="!!list.length ? '没有更多了' : ''"
            @load="onLoad"
          >
            <div v-if="!!list.length">
              <div class="every" v-for="(item, index) in list" :key="index">
                <div>
                  <p>{{ item.remarks }}</p>
                  <p>{{ transformUTCDate(item.createDate) }}</p>
                </div>
                <div>+{{ item.fraction }}</div>
              </div>
            </div>
            <van-empty
              v-else
              class="custom-image"
              :image="require('@/assets/imgs/empty.png')"
              description="暂无任何数据"
            />
          </van-list>
        </div>
      </van-tab>
      <van-tab title="扣分记录">
        <div class="center">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="!!list.length ? '没有更多了' : ''"
            @load="onLoad"
          >
            <div v-if="!!list.length">
              <div class="every" v-for="(item2, index2) in list" :key="index2">
                <div>
                  <p>{{ item2.remarks }}</p>
                  <p>{{ transformUTCDate(item2.createDate) }}</p>
                </div>
                <div style="color: #fc7542">-{{ item2.fraction }}</div>
              </div>
            </div>
            <van-empty
              v-else
              class="custom-image"
              :image="require('@/assets/imgs/empty.png')"
              description="暂无任何数据"
            />
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import { transformUTCDate } from "@/utils/utils";
import { getcreditscore } from "@/api/pagesApi/credit";
export default {
  components: {
    countTo,
  },
  data() {
    return {
      // 需要滚动的时间
      duration: 3000,
      // 初始值
      startVal: 0,
      // 最终值
      endVal: 0,
      active: 0,
      req: {
        page: 1,
        itemsPerPage: 20,
        type: 0, //0加分，1减分
      },
      list: [],
      loading: false,
      finished: false,
    };
  },
  mounted() {},
  methods: {
    transformUTCDate,
    // 0为加分记录，1为减分记录
    activeNum() {
      if (this.active == 0) {
        this.req.page = 1;
        this.req.type = 0;
        this.list.length = 0;
        this.onLoad();
      } else {
        this.req.page = 1;
        this.req.type = 1;
        this.list.length = 0;
        this.onLoad();
      }
    },
    // 加载更多
    onLoad() {
      getcreditscore(this.req).then((res) => {
        if (res.data.code == 0) {
          this.req.page += 1;
          let data = res.data.items;
          this.endVal = data.creditScore;
          if (data.items.length != 0) {
            this.list = [...this.list, data.items[0]];
          }
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (data.items.length < this.req.itemsPerPage) {
            this.finished = true;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  :deep(.van-nav-bar) {
    background-color: #1b2945;
    z-index: 10;
  }
  :deep(.van-nav-bar .van-icon) {
    color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep([class*="van-hairline"]::after) {
    border: none;
  }
  .grade {
    background: #1b2945;
    padding: 42px 0;
    display: flex;
    justify-content: center;
    position: relative;
    img {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 300px;
    }
    .text {
      margin: 100px 0;
      text-align: center;
      color: #fff;
      p:first-child {
        font-size: 100px;
        // font-weight: bold;
      }
      p:last-child {
        margin-top: 30px;
        font-size: 28px;
      }
    }
    .svgbox {
      position: absolute;

      width: 540px;
      height: 540px;
      .svg {
        left: 25%;
        width: 100%;
        height: 100%;
        .square {
          animation: anim 3s linear 1;
        }

        @keyframes anim {
          0% {
            stroke-dasharray: 5 480;
          }
          100% {
            stroke-dasharray: 471;
          }
        }
      }
    }
  }
  .center {
    padding: 24px;
    .every {
      padding: 24px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div:first-of-type {
        p:first-of-type {
          font-size: 32px;
          font-weight: bold;
          color: #333;
        }
        p:last-of-type {
          margin-top: 11px;
          font-size: 28px;
          color: #999;
        }
      }
      div:last-of-type {
        font-size: 36px;
        font-weight: bold;
        color: #1d9c3f;
      }
    }
  }
}
</style>