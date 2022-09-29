<template>
  <van-pull-refresh v-model="list.uploading" @refresh="handleBottomRefresh">
    <div class="certificationAudit_wrap bg-gray fullscreen">
      <page-header title="仲裁案件" />
      <van-tabs
        v-model="tab.active"
        swipeable
        title-inactive-color="#8D94A2"
        @change="handleChangeTab"
      >
        <van-tab v-for="item in tab.data" :key="item" :title="item"> </van-tab>
      </van-tabs>
      <van-list
        class="list_wrap"
        v-show="!!list.data.length"
        v-model="list.UpRefreshLoading"
        :finished="!!list.data.length && list.finished"
        finished-text="没有更多了"
        @load="handleUpRefresh"
      >
        <ul class="list">
          <li
            class="item"
            v-for="item in list.data"
            :key="item.id"
            @click="
              $router.push({
                path: '/user/arbitration/case/detail',
                query: { id: item.id },
              })
            "
          >
            <van-row class="header" type="flex" align="center">
              <van-col :span="12">
                <div class="status">
                  <van-icon name="underway-o" />
                  <span class="text">双方举证中</span>
                </div>
              </van-col>
              <van-col :span="12" class="date">2022.05.26 12:54</van-col>
            </van-row>
            <van-row>
              <van-col class="lf" :span="12">
                <div class="user_wrap">
                  <img
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    alt=""
                    class="avatar"
                  />
                  <span class="name">{{ item.plaintiffName }}</span>
                  <span class="identity">（卖家）</span>
                </div>
                <div class="count_wrap">
                  <span class="text">原告</span>
                  <span class="num">{{ item.plaintiffCount }}票</span>
                </div>
              </van-col>
              <van-col class="rt" :span="12">
                <div class="user_wrap">
                  <span class="identity">（卖家）</span>
                  <span class="name">{{ item.defendantName }}</span>
                  <img
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    alt=""
                    class="avatar"
                  />
                </div>
                <div class="count_wrap">
                  <span class="num">{{ item.defendantCount }}票</span>
                  <span class="text">被告</span>
                </div>
              </van-col>
            </van-row>
            <div class="process_wrap">
              <div
                class="lt chunk"
                :style="{
                  flex: `0 0 ${(item.plaintiffCount / item.total) * 100}%`,
                }"
              ></div>
              <div class="border"></div>
              <div class="rt chunk"></div>
            </div>
            <div class="row">
              <div class="message">
                <div class="more" style="text-align: left; color: #237ff8">
                  <van-icon name="description" /> 详情
                </div>
                <div class="more"><van-icon name="arrow" /></div>
              </div>
            </div>
            <div class="row">
              <div class="title">仲裁结果</div>
              <div class="message">
                <p>
                  本次参与仲裁判决的仲裁员共计11人，通过双方提交举证，10位仲裁员判定原告…
                </p>
                <div class="more"><van-icon name="description" /> 详情</div>
              </div>
            </div>
            <van-row class="row" gutter="20" v-if="tab.active === 0">
              <van-col span="12">
                <van-button
                  class="more"
                  color="#237FF8"
                  round
                  plain
                  block
                  type="primary"
                  @click.stop="
                    $router.push({
                      path: '/user/arbitration/case/initiateNewProof',
                    })
                  "
                >
                  重新举证
                </van-button>
              </van-col>
              <van-col span="12">
                <van-button
                  class="more"
                  round
                  block
                  color="#237FF8"
                  type="primary"
                  @click.stop="
                    $router.push({ path: '/user/arbitration/case/detail' })
                  "
                >
                  <i class="icon icon-court"></i> 去判决
                </van-button>
              </van-col>
            </van-row>
          </li>
        </ul>
      </van-list>
      <van-empty
        v-show="!list.data.length"
        class="custom-image"
        :image="require('../../../assets/imgs/empty.png')"
        description="暂无任何数据"
      />
    </div>
  </van-pull-refresh>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader.vue";
import { transformUTCDate } from "@/utils/utils";
export default {
  name: "approvalCommunity",
  components: {
    pageHeader,
  },
  data() {
    return {
      // 当前选择项列表的id
      id: null,
      tab: {
        data: ["待仲裁", "已结案"],
        active: 0,
      },
      list: {
        uploading: false,
        UpRefreshLoading: false,
        finished: false,
        query: {
          page: 1,
          itemsPerPage: 10,
        },
        data: [
          {
            id: 1,
            plaintiffName: "吴敏",
            plaintiffCount: 11,
            defendantName: "王晓雷",
            defendantCount: 2,
            total: 13,
          },
        ],
      },
    };
  },
  methods: {
    handleChangeTab() {
      this.list.query.page = 1;
      this.list.finished = false;
      this.list.data = [];
      this.getList();
    },
    // 下拉刷新
    handleBottomRefresh() {
      this.list.uploading = true;
      this.getList();
    },
    // 滚动到底翻页
    handleUpRefresh() {
      this.list.query.page++;
      this.list.UpRefreshLoading = true;
      this.getList();
    },
    // 获取列表
    getList() {
      // this.$toast.loading('列表加载中…')
      // list(this.tab.active, this.list.query).then(res => {
      //   if (!res.data.code) {
      //     const data = res.data.items
      //     if (this.list.query.page === 1) {
      //       this.list.data = data
      //     } else {
      //       this.list.data.push(...data)
      //     }
      //     this.list.finished = !data.length
      //   } else {
      //     this.$toast.fail({
      //       forbidClick: true,
      //       message: res.data.message
      //     })
      //   }
      // }).finally(() => {
      //   this.$toast.clear()
      //   this.list.uploading = false
      //   this.list.UpRefreshLoading = false
      // })
    },
    // 转换时间格式
    transformUTCDate,
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.certificationAudit_wrap {
  &::v-deep(.van-tabs__line) {
    background-color: #237df4;
  }

  .list_wrap {
    flex: 1;
    box-sizing: border-box;
    min-height: 0;
    overflow: auto;

    .list {
      .item {
        padding: 30px;
        border-radius: 20px;
        background-color: #fff;
        margin-bottom: 25px;
        &:last-of-type {
          margin-bottom: 0;
        }
        & .lf {
          .user_wrap {
            .avatar {
              margin-right: 10px;
            }
          }
          .count_wrap {
            .text {
              border-radius: 0 40px 40px 50px;
              margin-right: 10px;
            }
          }
        }
        & .rt {
          text-align: right;
          .user_wrap {
            justify-content: flex-end;
            .avatar {
              margin-left: 10px;
            }
          }
          .count_wrap {
            .text {
              border-radius: 40px 0 40px 50px;
              margin-left: 10px;
              background-color: #ec6f66;
            }
            .num {
              color: #ec6f66;
            }
          }
        }
        .header {
          padding-bottom: 30px;
          border-bottom: 1px solid #eee;
          margin-bottom: 30px;
          .status {
            color: #333;
            font-size: 32px;
            .text {
              font-size: 30px;
              margin-left: 10px;
            }
          }
          .date {
            color: #999;
            font-size: 28px;
            text-align: right;
          }
        }
        .user_wrap {
          display: flex;
          align-items: center;
          .avatar {
            display: block;
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
          .name {
            color: #333;
            font-size: 28px;
          }
          .identity {
            color: #999;
            font-size: 24px;
          }
        }
        .count_wrap {
          margin-top: 15px;
          .text {
            font-size: 24px;
            padding: 15px 25px;
            color: #fff;
            background-color: #4ea0f5;
          }
          .num {
            color: #4ea0f5;
            font-size: 24px;
          }
        }
        .process_wrap {
          display: flex;
          align-items: center;
          margin-top: 30px;
          background-color: #4ea0f5;
          border-radius: 24px;
          overflow: hidden;
          .border {
            width: 20px;
            height: 24px;
            background-color: #fff;
            border-radius: 15px 0 0 15px;
          }
          .chunk {
            height: 24px;
            &.rt {
              display: flex;
              align-items: center;
              flex: 1;
              background-color: #ec6f66;
              border-radius: 24px 0 0 24px;
              margin-left: -13px;
            }
          }
        }
        .row {
          margin-top: 30px;
          .title {
            color: #333;
            font-size: 32px;
            font-weight: bold;
          }
          .message {
            display: flex;
            align-items: flex-end;
            margin-top: 20px;
            p {
              @include ellipsis($line: 2);
              margin: 0;
              color: #333;
              line-height: 1.2;
              font-size: 28px;
            }
            .more {
              flex: 200px;
              color: #333;
              font-size: 28px;
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>