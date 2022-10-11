<template>
  <van-pull-refresh v-model="list.uploading" @refresh="handleBottomRefresh">
    <div class="certificationAudit_wrap bg-gray fullscreen">
      <page-header title="仲裁案件" />
      <van-tabs
        class="tab_wrap"
        v-model="tab.active"
        swipeable
        title-inactive-color="#8D94A2"
        @change="handleChangeTab"
      >
        <van-tab
          v-for="item in tab.data"
          :key="item"
          :title="item"
        >
        </van-tab>
      </van-tabs>
      <div class="content">
        <ul class="list"
            v-if="!!list.data.length">
          <li class="item"
              v-for="item in list.data"
              :key="item.id"
              @click="go('/user/arbitration/case/detail', { id: item.arbitrateInfoId })"
          >
            <!-- 仲裁已取消 -->
            <van-row
              v-if='item.isCancel'
              class="header"
              type="flex"
              align="center"
            >
              <van-col :span="24" class="text" style="color: #999;">仲裁已取消</van-col>
            </van-row>
            <!-- 未投票 -->
            <van-row
              v-else-if="item.time < 0 && !item.voteStatus"
              class="header"
              type="flex"
              align="center"
            >
              <van-col :span="12" class="text" style="color: #999;">超时未提交判决</van-col>
              <van-col
                v-if="item.voteStatus === 2"
                :span="12"
                class="date"
                style="color: #00B87A;">
                +{{ item.eotc }} EOTC
              </van-col>
              <van-col
                v-else
                :span="12"
                class="date"
                style="color: #FC7542;"
              >
                -{{ item.eotc }} EOTC
              </van-col>
            </van-row>
            <!-- 举证中 | 投票中 -->
            <template v-else>
              <van-row
                v-if="item.status < 2"
                class="header"
                type="flex"
                align="center"
                justify='space-between'
              >
                <van-col>
                  <!-- 举证中 -->
                  <van-row type="flex" align="center" v-if='item.status === 0'>
                    <van-icon class="icon" style="margin-right: 5px;" name="underway-o" />
                    <div class="text">双方举证中</div>
                  </van-row>
                  <!-- 投票中 -->
                  <van-row type="flex" align="center" v-else-if='item.status === 1'>
                    <van-icon class="icon" color="#237DF4" style="margin-right: 5px;" name="underway-o" />
                    <van-count-down class='countDown' :time="item.time" format="DD天HH时mm分" />
                  </van-row>
                </van-col>
                <van-col :span="12" class="date">{{ transformUTCDate(item.status === 0 ? item.adduceDate : item.voteDate) }}</van-col>
              </van-row>
              <!-- 是否胜诉 -->
              <van-row
                class="header"
                type="flex"
                align="center"
                v-else-if='item.status > 1 && !!item.voteStatus'
              >
                <van-col :span="12">
                  <van-row>
                    <van-col :span="3">
                      <img :src="item.isVictory ? icon1 : icon2" alt="" class="img">
                    </van-col>
                    <van-col
                      class="text"
                      :span="21"
                    >
                      {{ item.isVictory ? '胜诉' : '败诉' }}
                    </van-col>
                  </van-row>
                </van-col>
                <van-col
                  :span="12"
                  class="date"
                  :style="{'color': item.isVictory ? '#00B87A' : '#FC7542'}">
                  {{ item.isVictory ? '+' : '-' }}{{ item.eotc }} EOTC
                </van-col>
              </van-row>
            </template>
            <!-- 原被告信息 -->
            <van-row>
              <van-col class="lf" :span="12">
                <div class="identity_wrap">
                  <img v-if="item.status === 2" src="../../../assets/imgs/huangguan.png" alt="" class="img">
                  原告
                </div>
                <div class="user">
                  <span class="name">{{ item.plaintiff }}</span>
                  <span class="text">（卖家）</span>
                </div>
                <div class="num" v-if="item.status > 0">{{item.plaintiffNum}}票</div>
              </van-col>
              <van-col class="rt" :span="12">
                <div class="identity_wrap">
                  <img v-if="item.status === 3" src="../../../assets/imgs/huangguan.png" alt="" class="img">
                  被告
                </div>
                <div class="user">
                  <span class="text">（卖家）</span>
                  <span class="name">{{ item.plaintiff }}</span>
                </div>
                <div class="num" v-if="item.status > 0">{{item.defendantNum}}票</div>
              </van-col>
            </van-row>
            <div class="process_wrap" v-if="item.status > 0">
<!--              <div class="lt chunk" :style="{'flex': `0 0 ${item.plaintiffNum / item.total * 100}%`}"></div>-->
<!--              <div class="border" v-if="item.plaintiffNum && !!item.defendantNum"></div>-->
<!--              <div class="rt chunk"></div>-->
              <van-progress
                v-if="item.status > 1"
                stroke-width="12"
                :percentage="item.plaintiffNum / item.total * 100 || 0"
                :show-pivot="false"
                color="#4EA0F5"
                track-color="#EC6F66"
              />
            </div>
            <div class="remark">
              原告卖家发起仲裁，仲裁事件为{{ getArbitrateInType(item.arbitrateInType) }}
            </div>
            <div class="row">
              <div class="message">
                <div class="more" style="text-align: left;color: #237FF8;">
                  <van-icon name="description" /> 仲裁详情
                </div>
                <div class="more"><van-icon name="arrow" /></div>
              </div>
            </div>
            <!-- 仲裁结果 -->
            <div class="row" v-if="tab.active === 1 && item.status > 1">
              <div class="title">仲裁结果</div>
              <div class="message">
                <p v-if="item.status === 1">本次参与仲裁判决的仲裁员共计{{ item.total }}人，通过双方提交举证，{{ item.plaintiffNum }}位仲裁员判定原告…</p>
                <p v-else-if="item.status === 2">本次参与仲裁判决的仲裁员共计{{ item.total }}人，通过双方提交举证，{{ item.defendantNum }}位仲裁员判定被告…</p>
                <div class="more"><van-icon name="description" /> 详情</div>
              </div>
            </div>
            <van-row
              v-if="tab.active === 0 && item.status === 1"
              class="row"
              :gutter="item.hasDelay ? 0 : 20"
            >
              <van-col span="12" v-if="item.status === 1 && !item.hasDelay">
                <van-button
                  class="more"
                  color="#237FF8"
                  round
                  plain
                  block
                  type="primary"
                  @click.stop="go('/user/arbitration/case/initiateNewProof', { id: item.arbitrateInfoId })"
                >
                  重新举证
                </van-button>
              </van-col>
              <van-col :span="item.hasDelay ? 24 : 12">
                <van-button
                  class="more"
                  round
                  block
                  color="#237FF8"
                  type="primary"
                >
                  <i class="icon icon-court"></i> 去判决
                </van-button>
              </van-col>
            </van-row>
          </li>
        </ul>
        <van-empty
          v-else
          class="custom-image"
          :image="require('../../../assets/imgs/empty.png')"
          description="暂无任何数据"
        />
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader.vue"
import {list} from "@/api/case"
import {getArbitrateInType, transformUTCDate} from "@/utils/utils";
import icon1 from "@/assets/imgs/victory.png" // 胜诉
import icon2 from "@/assets/imgs/fail.png" // 败诉

export default {
  name: "approvalCommunity",
  components: {
    pageHeader
  },
  data() {
    return {
      // 当前选择的列表项的id
      id: null,
      icon1,
      icon2,
      tab: {
        data: ['待仲裁', '已仲裁'],
        active: 0
      },
      list: {
        uploading: false,
        data: [],
      },
    }
  },
  methods: {
    getArbitrateInType,
    // 转换时间格式
    transformUTCDate,
    // 跳转页面
    go(path, query) {
      this.$router.push({ path, query })
    },
    handleChangeTab() {
      this.list.data = []
      this.getList()
    },
    // 下拉刷新
    handleBottomRefresh() {
      this.list.uploading = true
      this.getList()
    },
    // 获取列表
    getList() {
      const loading = this.$toast.loading('列表加载中…')
      list(this.tab.active).then(res => {
        if (!res.data.code) {
          const now = this.$dayjs()
          const data = res.data.items.map(item => {
            if (item.status > 1) {
              // 判断是否胜诉
              item.isVictory = (item.status === 2 && item.voteStatus === 1) || (item.status === 3 && item.voteStatus === 2)
            }
            item.total = item.defendantNum + item.plaintiffNum
            item.time = this.$dayjs(item.status === 0 ? item.adduceDate : item.voteDate).add('-8', 'hour').diff(now, 'millisecond')
            return item
          })
          this.list.data = data
        } else {
          this.$toast.fail({
            forbidClick: true,
            message: res.data.message
          })
        }
      }).catch(err => {
        this.$toast.fail({
          forbidClick: true,
          message: err.data.message
        })
      }).finally(() => {
        loading.clear()
        this.list.uploading = false
        this.list.UpRefreshLoading = false
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.certificationAudit_wrap {
  &::v-deep(.van-tabs__line) {
    background-color: #237DF4;
  }
  .tab_wrap {
    margin-bottom: 30px;
  }
  .content {
    padding: 0 30px 30px;
    flex: 1;
    box-sizing: border-box;
    overflow: auto;
    .list {
      flex: 1;
      box-sizing: border-box;
      min-height: 0;
      overflow: auto;
      .item {
        padding: 30px;
        border-radius: 20px;
        background-color: #FFF;
        margin-bottom: 25px;
        &:last-of-type {
          margin-bottom: 0;
        }
        & .lf {
          .identity_wrap {
            border-radius: 0 40px 40px 50px;
            margin-right: 10px;
            background-color: #4EA0F5;
          }
        }
        & .rt {
          text-align: right;
          .identity_wrap {
            border-radius: 40px 0 40px 50px;
            margin-left: 10px;
            background-color: #EC6F66;
          }
          .user {
            justify-content: flex-end;
            margin: 20px 0;
          }
          .num {
            color: #EC6F66;
          }
        }
        .header {
          padding-bottom: 30px;
          border-bottom: 1px solid #EEE;
          margin-bottom: 30px;
          .img {
            display: block;
            width: 30px;
          }
          .icon {
            font-size: 35px;
          }
          .text {
            color: #333;
            font-size: 32px;
          }
          .countDown {
            color: #237DF4;
            font-size: 32px;
          }
          .date {
            color: #999;
            font-size: 28px;
            text-align: right;
          }
        }
        .identity_wrap {
          display: inline-block;
          position: relative;
          font-size: 24px;
          flex: 0 0 90px;
          color: #FFF;
          padding: 10px 15px;
          .img {
            @include posi($t: -20px, $l: 50%);
            display: block;
            width: 30px;
            margin-left: -15px;
          }
        }
        .user {
          display: flex;
          align-items: center;
          margin: 20px 0;
          .name {
            color: #333;
            font-size: 28px;
          }
          .text {
            color: #999;
            font-size: 24px;
          }
        }
        .num {
          margin-top: 15px;
          color: #4EA0F5;
          font-size: 24px;
        }
        .process_wrap {
          margin-top: 30px;
        }
        .remark {
          color: #333;
          padding: 20px;
          font-size: 28px;
          margin-top: 30px;
          background-color: #F3F4F5;
          border-radius: 20px;
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