<template>
  <div class="fullscreen bg-gray">
    <header>
      <white :title="title" :name="name"></white>
    </header>
    <main class="home">
      <van-pull-refresh v-model="list.uploading" @refresh="onRefresh">
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
            <van-cell-group
              v-show="pengList.length > 0"
              inset
              v-for="(item, index) in pengList"
              :key="index"
            >
              <van-cell
                v-if="item.type == 0"
                title="BUG反馈"
                :value="item.createDate"
              />
              <van-cell
                v-if="item.type == 1"
                title="功能建议"
                :value="item.createDate"
              />
              <van-cell :title="'提交人:' + item.submitter" :border="false" />
              <van-cell :title="item.describe" :border="false" />
              <van-button
                class="dai"
                round
                size="small"
                type="info"
                @click="chuli(item.workOrderId)"
                >去处理</van-button
              >
            </van-cell-group>
            <van-empty
              v-show="!pengList.length"
              class="custom-image"
              :image="require('./../../assets/img/空态-02.png')"
              description="暂无任何数据"
            />
          </van-tab>
          <!-- 处理中 -->
          <van-tab title="处理中" :name="1">
            <van-cell-group
              inset
              v-show="pengList.length > 0"
              v-for="(item, index) in pengList"
              class="chu"
              :key="index"
            >
              <van-cell
                v-if="item.type == 0"
                title="BUG反馈"
                :value="item.createDate"
              />
              <van-cell
                v-if="item.type == 1"
                title="功能建议"
                :value="item.createDate"
              />
              <van-cell :title="'提交人:' + item.submitter" :border="false" />
              <van-cell :title="item.describe" :border="false" />
              <div class="btn">
                <van-button
                  round
                  size="small"
                  color="#FDE9E9"
                  class="red"
                  @click="cancel(item.workOrderId)"
                  >取消处理</van-button
                >
                <van-button
                  round
                  size="small"
                  color="#E8F2FF"
                  @click="chuli(item.workOrderId)"
                  >更进处理中</van-button
                >
              </div>
            </van-cell-group>
            <van-empty
              v-show="!pengList.length"
              class="custom-image"
              :image="require('./../../assets/img/空态-02.png')"
              description="暂无任何数据"
            />
          </van-tab>
          <!-- 已处理 -->
          <van-tab title="已处理" :name="2">
            <van-cell-group
              class="finish"
              inset
              v-show="pengList.length > 0"
              v-for="(item, index) in pengList"
              :key="index"
            >
              <van-cell
                v-if="item.type == 0"
                title="BUG反馈"
                :value="item.createDate"
              />
              <van-cell
                v-if="item.type == 1"
                title="功能建议"
                :value="item.createDate"
              />
              <van-cell :title="'提交人:' + item.submitter" :border="false" />
              <van-cell :title="item.describe" :border="false" />
              <van-cell
                class="yi"
                title="已完成处理"
                @click="chuli(item.workOrderId)"
              />
            </van-cell-group>
            <van-empty
              v-show="!pengList.length"
              class="custom-image"
              :image="require('./../../assets/img/空态-02.png')"
              description="暂无任何数据"
            />
          </van-tab>
        </van-tabs>
        <van-list
          class="list_wrap"
          v-show="!!pengList.length"
          v-model="list.UpRefreshLoading"
          :finished="!!pengList.length && list.finished"
          finished-text="没有更多了"
          @load="handleUpRefresh"
        />
      </van-pull-refresh>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import white from "../../components/Nav/white.vue";
import { getworkorderlist, updateWork } from "@/api/workOrder";
import { Dialog } from "vant";
export default {
  components: { white },
  data() {
    return {
      title: "工单系统",
      name: "personage",
      activeName: 0,
      active: undefined,
      pengList: [],
      list: {
        uploading: false,
        UpRefreshLoading: false,
        finished: false,
        query: {
          page: 1,
          itemsPerPage: 10,
        },
      },
      type: [
        {
          title: "全部",
          index: undefined,
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
    this.getList();
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.list.uploading = true;
      this.getList();
    },
    // 滚动到底翻页
    handleUpRefresh() {
      this.list.query.page++;
      this.list.UpRefreshLoading = true;
      this.getList();
    },
    chuli(id) {
      this.$router.push({ path: "/order_details", query: { workOrderId: id } });
    },
    changeType(index) {
      console.log(index);
      this.active = index;
      this.list.query.page = 1;
      this.list.finished = false;
      this.pengList = [];
      this.getList();
    },
    tabs() {
      this.list.query.page = 1;
      this.list.finished = false;
      this.pengList = [];
      this.getList();
    },
    //获取列表
    getList() {
      this.$toast.loading("列表加载中…");
      getworkorderlist({
        workOrderStatus: this.activeName,
        workOrderType: this.active,
        ...this.list.query,
      })
        .then((res) => {
          res.data.items.map((item) => {
            item.createDate = this.$dayjs(item.createDate).format(
              "YYYY-MM-DD hh:mm:ss"
            );
          });
          if (this.list.query.page === 1) {
            this.pengList = res.data.items;
            console.log(this.list.finished);
          } else {
            this.pengList.push(...res.data.items);
            console.log(this.list.finished);
          }
          this.list.finished = !res.data.items.length;

          console.log(!res.data.items.length);
        })
        .finally(() => {
          this.$toast.clear();
          this.list.uploading = false;
          this.list.UpRefreshLoading = false;
        });
    },
    cancel(id) {
      Dialog.confirm({
        title: "取消提示",
        confirmButtonColor: "#000",
        message: "确定取消处理该工单？",
        getContainer: ".home",
      })
        .then(() => {
          updateWork({
            workOrderId: id,
            workOrderStatus: 0,
            record: this.message,
          }).then((res) => {
            console.log(res);
            this.getList();
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  flex: 1;
  min-height: 0;
  overflow: auto;
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
  margin-top: 25px;
  display: flex;
  justify-content: space-around;
  .van-tag {
    display: inline-block;
    padding: 6.4px 24px;
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
  margin-top: 16px;
  .van-cell:first-child {
    line-height: 22.4px;
    margin-bottom: 8px;
  }
  .van-cell {
    line-height: 11.2px;
  }
  .dai {
    float: right;
    margin: 8px 11.2px 14.4px 0;
    padding: 0 22.4px;
  }
}
.chu {
  .btn {
    margin: 16px 0 16px;
    display: flex;
    justify-content: space-around;
    .van-button {
      font-size: 14px;
      padding: 3.2px 36.8px;
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
.home ::v-deep .van-dialog__message--has-title {
  color: #f37a4c !important;
}
.custom-image {
  margin-top: 10%;
}
.home::-webkit-scrollbar {
  display: none; //去掉滚动条，不能滚动了；
  width: 0; //可以滚动，且滚动条不显示；
}
</style>