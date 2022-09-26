<template>
  <div class="home">
    <header>
      <white :title="title"></white>
    </header>
    <main>
      <van-tabs v-model="activeName" @change="tabs">
        <!-- 待处理 -->
        <van-tab title="待处理" :name="0">
          <div class="tag">
            <van-tag
              round
              type="primary"
              v-for="(item, index) in type"
              :key="index"
              :class="active == item.index ? 'after' : 'before'"
              @click="changeType(item.index)"
              >{{ item.title }}</van-tag
            >
          </div>
          <van-cell-group inset v-for="(item, index) in pengList" :key="index">
            <van-cell title="BUG反馈" :value="item.createDate" />
            <van-cell :title="'提交人:' + item.submitter" :border="false" />
            <van-cell :title="item.describe" :border="false" />
            <van-button
              class="dai"
              round
              size="small"
              type="info"
              @click="chuli()"
              >去处理</van-button
            >
          </van-cell-group>
        </van-tab>
        <!-- 处理中 -->
        <van-tab title="处理中" :name="1">
          <van-cell-group
            inset
            v-for="(item, index) in pengList"
            class="chu"
            :key="index"
          >
            <van-cell title="BUG反馈" :value="item.createDate" />
            <van-cell :title="'提交人:' + item.submitter" :border="false" />
            <van-cell :title="item.describe" :border="false" />
            <div class="btn">
              <van-button round size="small" color="#FDE9E9" class="red"
                >取消处理</van-button
              >
              <van-button round size="small" color="#E8F2FF"
                >更进处理中</van-button
              >
            </div>
          </van-cell-group>
        </van-tab>
        <!-- 已处理 -->
        <van-tab title="已处理" :name="2">
          <van-cell-group
            class="finish"
            inset
            v-for="(item, index) in pengList"
            :key="index"
          >
            <van-cell title="BUG反馈" :value="item.createDate" />
            <van-cell :title="'提交人:' + item.submitter" :border="false" />
            <van-cell :title="item.describe" :border="false" />
            <van-cell class="yi" title="已完成处理" />
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import white from "../../components/Nav/white.vue";
import { getworkorderlist } from "@/api/workOrder";
export default {
  components: { white },
  data() {
    return {
      title: "工单系统",
      activeName: 0,
      page: 1,
      itemsPerPage: 10,
      active: 0,
      pengList: [],
      type: [
        {
          title: "全部",
          index: 2,
        },
        {
          title: "BUG反馈",
          index: 0,
        },
        {
          title: "功能建议",
          index: 1,
        },
      ],
    };
  },
  created() {
    this.tabs();
  },
  methods: {
    chuli() {
      this.$router.push("/order_details");
    },
    changeType(index) {
      this.active = index;
      this.tabs();
    },
    tabs() {
      let walletAddress = localStorage.getItem("myaddress");
      let otype = localStorage.getItem("netType");
      let sign = localStorage.getItem("mysign");

      getworkorderlist({
        walletAddress: walletAddress,
        otype: otype,
        sign: sign,
        workOrderStatus: this.activeName,
        workOrderType: this.active,
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      }).then((res) => {
        res.data.items.map((item) => {
          item.createDate = this.$dayjs(item.createDate).format("YYYY-MM-DD");
        });
        console.log(res.data.items);
        this.pengList = res.data.items;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: #f3f4f5;
  height: 100vh;
}

.van-tabs {
  :deep .van-tabs__nav {
    .van-tabs__line {
      background-color: #237df4;
    }
    .van-tab__text {
      color: #000;
      font-weight: bold;
    }
  }
}
.tag {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  .van-tag {
    display: inline-block;
    padding: 0.4rem 1.5rem;
  }
  .after {
    background: #e8f2ff;
    border: 1px solid #247ff7;
    color: #247ff7;
  }
  .before {
    background: #fff;
    color: #000;
    border: 1px solid #fff;
  }
}
.van-cell-group {
  margin-top: 1rem;
  .van-cell:first-child {
    line-height: 1.4rem;
    margin-bottom: 0.5rem;
  }
  .van-cell {
    line-height: 0.7rem;
  }
  .dai {
    float: right;
    margin: 0.5rem 0.7rem 0.9rem 0;
    padding: 0 1.4rem;
  }
}
.chu {
  .btn {
    margin: 1rem 0 1rem;
    display: flex;
    justify-content: space-around;
    .van-button {
      font-size: 14px;
      padding: 0.2rem 2.3rem;
    }
  }
  .red {
    .van-button__text {
      color: #e52a2a;
    }
  }
  .van-button__text {
    color: #237ff8;
  }
}
.finish {
  .yi {
    .van-cell__title {
      color: #00b87a;
      font-weight: bold;
    }
  }
}
</style>