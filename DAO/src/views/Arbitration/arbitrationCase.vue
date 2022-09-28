<template>
  <van-pull-refresh v-model="list.uploading" @refresh="refresh">
    <header>
      <white :title="title"></white>
    </header>
    <van-tabs v-model="activeName" sticky color="#237DF4">
      <van-tab title="待仲裁" name="a">
        <div class="body">
          <!-- <van-list v-model="list.btloading"
                    :finished="list.finished"
                    finished-text="没有更多了"
                    @load="onLoad"> -->
          <div class="content" v-for="item in list.data" :key="item.id">
            <div class="aim">
              <div class="left" v-if="item.title == '仲裁中'">
                <van-icon name="aim" />
                <van-count-down :time="time" format="DD 天 HH 时 mm 分" />
              </div>
              <div class="left leftaim" v-else>
                <van-icon name="aim" />
                <div>等待仲裁结果</div>
              </div>
              <div class="right">2022.05.26 12:54</div>
            </div>
            <div class="contactAvatar">
              <div class="headPortrait left">
                <div class="vanimage">
                  <van-image
                    width="30"
                    round
                    height="30"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                  />
                  <div class="name2">
                    <span>{{ item.plaintiffName }}</span
                    >(卖家)
                  </div>
                </div>
                <div class="litigation2">原告</div>
              </div>
              <div class="headPortrait right">
                <div class="vanimage">
                  <div class="name" v-if="item.title == '仲裁中'">
                    <span class="span1">(买家)</span
                    ><span class="span2">{{ item.defendantName }}</span>
                  </div>
                  <div v-else>
                    (买家)<span>{{ item.defendantName }}</span>
                  </div>
                  <van-image
                    width="30"
                    round
                    height="30"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                  />
                </div>
                <div class="litigation">
                  <div>原告</div>
                </div>
              </div>
            </div>
            <div class="describe">原告卖家发起仲裁，仲裁事件为账号冻结</div>
            <div class="btn" v-if="item.title == '仲裁中'">
              <van-button plain type="info">申请延期</van-button>
              <van-button icon="description" type="info">仲裁详情</van-button>
            </div>
            <div class="DetailsOfArbitration" v-else>
              <div class="left">
                <van-icon name="description" />
                <span>仲裁详情</span>
              </div>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="bottomMessage">
          <van-button type="default" icon="envelop-o">消息</van-button>
        </div>
      </van-tab>
      <van-tab title="已结案" name="b" style="color: #999999">已结案</van-tab>
    </van-tabs>
  </van-pull-refresh>
</template>
<script>
import white from "@/components/Nav/white.vue";
export default {
  components: { white },
  data() {
    return {
      title: "仲裁案件",
      activeName: "a",
      time: 30 * 60 * 60 * 1000,
      list: {
        uploading: false,
        btloading: false,
        finished: true,
        data: [
          {
            id: 1,
            title: "仲裁中",
            plaintiffName: "我",
            defendantName: "王晓雷",
          },
          {
            id: 2,
            title: "等待仲裁结果",
            plaintiffName: "我",
            defendantName: "王晓雷",
          },
        ],
        query: {
          page: 1,
          itemsPerPage: 10,
        },
      },
    };
  },
  methods: {
    showArbitrationList() {},
    getList() {},
    // 下拉刷新
    refresh() {},
    // 翻页
    onLoad() {},
  },
};
</script>
<style lang="scss" scoped>
::v-deep .van-tab {
  font-size: 16px;
  font-weight: bold;
}
.body {
  background-color: #f3f4f5;
  height: 86.8vh;
  padding: 30px;
  .content {
    border-radius: 25px;
    padding: 25px;
    background-color: #fff;
    margin-bottom: 30px;
    .aim {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #cccccc;
      padding: 5px 0 25px 0;

      .left {
        display: flex;
        justify-content: space-between;
        .van-icon {
          font-size: 16px;
          color: #237ff8;
          font-weight: bold;
        }
        .van-count-down {
          font-size: 16px;
          font-weight: bold;
          color: #237ff8;
          margin-left: 5px;
        }
      }
      .leftaim {
        div {
          font-size: 29px;
          font-weight: bold;
          color: #333333;
          margin-left: 9px;
        }
        .van-icon {
          margin-top: 4px;
          font-size: 16px;
          color: #333333;
          font-weight: bold;
        }
      }
      .right {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  .contactAvatar {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .headPortrait {
      .vanimage {
        display: flex;
        align-items: center;
        .name {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-right: 8px;
          .span2 {
            text-align: left;
          }
          .span1 {
            font-size: 12px;
            font-weight: bold;
            color: #999999;
            padding: 0 50px;
            text-align: right;
            // margin-top: 15px;
          }
        }
        .name2 {
          margin-left: 8px;
        }
        div {
          font-size: 12px;
          color: #999999;
          span {
            display: inline-block;
            margin: 0 4px;
            font-size: 14px;
            color: #333333;
          }
        }
      }
      .litigation2 {
        margin-top: 15px;
        border-radius: 0 12px 12px 12px;
        width: 84px;
        height: 45px;
        font-size: 12px;
        color: #fff;
        background-color: #4ea0f5;
        text-align: center;
        line-height: 45px;
      }
      .litigation {
        margin-top: 15px;
        display: flex;
        justify-content: flex-end;
        margin-right: 0px;
        div {
          border-radius: 12px 0 12px 12px;
          width: 84px;
          height: 45px;
          font-size: 12px;
          color: #fff;
          background-color: #ec6f66;
          line-height: 45px;
          text-align: center;
        }
      }
    }
  }
  .describe {
    padding: 0 15px;
    border-radius: 20px;
    height: 80px;
    font-size: 25px;
    background-color: #f3f4f5;
    line-height: 80px;
    margin-top: 10px;
  }
  .btn {
    padding: 30px 0 20px 0;
    display: flex;
    justify-content: space-between;
    .van-button {
      width: 152px;
      height: 40px;
      border-radius: 20px;
    }
  }
  .DetailsOfArbitration {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0 10px 0;
    .left {
      span {
        font-size: 26px;
        color: #237ff8;
        margin-left: 5px;
      }
      .van-icon {
        font-size: 17px;
        color: #237ff8;
      }
    }
    .van-icon {
      font-size: 17px;
      color: #999999;
      margin-top: 1px;
    }
  }
}
.bottomMessage {
  position: absolute;
  right: 0;
  bottom: 100px;
  .van-button {
    border-radius: 24px 0 0 24px;
    color: #237ff8;
    font-size: 14px;
  }
}
</style>