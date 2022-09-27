<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="team_wrap bg-gray fullscreen">
      <van-nav-bar
        class="nav-bar"
        title="我的团队"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <ul class="peopleNumb_wrap blue">
        <li class="item">
          <div class="title">团队人数</div>
          <div class="num">{{teamNumber}}</div>
        </li>
        <li class="item">
          <div class="title">直推人数</div>
          <div class="num">{{pushNumber}}</div>
        </li>
      </ul>
      <van-tabs 
        v-model="tab.active" 
        swipeable
        @click="handleTabClick"
      >
        <van-tab
          v-for="item in tab.data"
          :key="item"
          :title="item"
        >
        </van-tab>
      </van-tabs>
      <van-list
          class="list_wrap"
          v-show="!!list.data.length"
          v-model="list.UpRefreshLoading"
          :finished="list.finished"
          finished-text="没有更多了"
          @load="handleUpRefresh"
      >
        <ul class="list" v-if="!!list.data.length">
          <li
              class="item"
              v-for="item in list.data"
          >
            <div class="user_wrap">
              <div class="avatar">
                <van-image
                    round
                    width="30"
                    height="30"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                />
                <span class="name" v-if="item.name">{{item.name}}（{{item.uid}}）</span>
                <span class="name" v-else><span class="link">未认证</span>（{{item.uid}}）</span>
              </div>
              <div class="button_wrap">
                <van-tag
                    round
                    plain
                    color="#247FF6"
                    text-color="#247FF6"
                >
                  {{getLevel(item.grade)}}
                </van-tag>
              </div>
            </div>
            <van-row class="wrap">
              <van-col :span="6">手机号码</van-col>
              <van-col :span="18" v-if="item.phone">{{item.phone}} <i class="icon-copy icon" @click="copy(item.phone)"></i></van-col>
            </van-row>
            <van-row class="wrap">
              <van-col :span="6">邮箱地址</van-col>
              <van-col :span="18">{{item.mail}} </van-col>
            </van-row>
            <van-row class="wrap">
              <van-col :span="6">注册日期</van-col>
              <van-col :span="18">{{transformUTCDate(item.regDate)}}</van-col>
            </van-row>
          </li>
          <van-button
              class="more"
              color="#1B2945"
              type="primary"
              @click="getMore"
          >
            更多团队成员
          </van-button>
        </ul>
        <van-empty
            v-else
            class="custom-image"
            :image="require('../../assets/imgs/empty.png')"
            description="暂无任何数据"
        >
          <div class="link">去邀请<van-icon name="arrow" /></div>
        </van-empty>
      </van-list>
    </div>
  </van-pull-refresh>
</template>

<script>
import { Dialog } from 'vant'
import {list} from "@/api/pagesApi/team"
import {transformUTCDate, copy} from "@/utils/utils";

export default {
  name: "team",
  data() {
    return {
      loading: false,
      teamNumber: 0,
      pushNumber: 0,
      tab: {
        data: ['全部', '已认证', '未认证'],
        active: 0
      },
      list: {
        loading: false,
        status: '',
        UpRefreshLoading: false,
        finished: false,
        data: [],
        query: {
          page: 1,
          itemsPerPage: 10
        }
      }
    }
  },
  methods: {
    copy,
    transformUTCDate,
    onRefresh() {
      this.loading = true
      this.getList()
    },
    // Tab切换
    handleTabClick(tab) {
      const handle = {
        0: '',
        1: true,
        2: false
      }
      this.list.status = handle[tab]
      this.getList()
    },
    // 滚动到底翻页
    handleUpRefresh() {
      this.list.query.page++
      this.list.UpRefreshLoading = true
      this.getList()
    },
    // 获取团队成员
    getList() {
      const query = {...this.list.query}
      const loading = this.$toast.loading({
        forbidClick: true,
        message: "加载中…"
      })
      if (this.tab.active > 0) {
        query.isAuth = this.list.status
      }
      this.list.loading = true
      list(query).then(res => {
        if (!res.data.code) {
          const {teamNumber, users, pushNumber} = res.data.items
          this.teamNumber = teamNumber
          this.pushNumber = pushNumber
          if (query.page > 1) {
            this.list.data.push(...users)
          } else {
            this.list.data = users || []
          }
          this.list.finished = !users.length
        } else {
          this.$toast.fail({
            forbidClick: true,
            message: res.data.message
          })
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.loading = false
        this.list.loading = false
        this.list.UpRefreshLoading = false
        loading.clear()
      })
    },
    // 查看更多团队人员
    getMore() {
      Dialog.confirm({
        title: "温馨提示",
        message: "查看团队更多成员需要向DAO提出申请，申请通过后成员名单将发送至您的邮箱",
        confirmButtonText: "提交申请",
        cancelButtonText: "稍后联系",
        beforeClose: (action, done) => {
          if (action === "confirm") {
            this.$toast.success('申请成功！');
            done()
          } else {
            done()
          }
        }
      })
    },
    getLevel(level) {
      const arr = ['交易用户', '信用节点', '实时节点', '中级节点', '高级节点']
      return arr[level]
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.team_wrap {
  .peopleNumb_wrap {
    position: relative;
    display: flex;
    padding: 50px 0;
    &::after {
      @include centered();
      display: block;
      content: "";
      width: 0;
      height: 80px;
      opacity: 0.2;
      box-sizing: border-box;
      border-right: 1px solid #F3F4F5;
      transform: scaleX(0.5) translate(-50%, -50%);
    }
    .item {
      flex: 1;
      text-align: center;
      .title {
        color: rgba($color: #FFF, $alpha: 0.3);
        font-size: 28px;
      }
      .num {
        color: #fff;
        font-size: 48px;
        margin-top: 27px;
      }
    }
  }
  &::v-deep(.van-tabs__nav) {
    background: none;
  }
  .list_wrap {
    flex: 1;
    min-height: 0;
    margin-top: 25px;
    overflow: auto;
    .list {
      padding-bottom: 44PX;
      box-sizing: border-box;
      .item {
        background: #FFFFFF;
        border-radius: 20px;
        padding: 30px;
        margin: 25px;
        border-radius: 20px;
        overflow: hidden;
        &:first-of-type {
          margin-top: 0;
        }
        .user_wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 30px;
          border-bottom: 1px solid #F3F4F5;
          .avatar {
            display: flex;
            align-items: center;
            .name {
              flex: 1;
              font-size: 36px;
              color: #333;
              margin: 0 15px;
            }
          }
        }
        .wrap {
          display: flex;
          align-items: center;
          margin-top: 30px;
          font-size: 32px;
          color: #999999;
          .value {
            flex: 1;
            margin-left: 24px;
            color: #333333;
            .icon {
              color: #999;
              font-size: 19px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .link {
    text-align: center;
    font-size: 32px;
    color: #247FF6;
  }
  .more {
    @include posi($p: fixed, $b: 0, $l: 0, $r: 0);
  }
}
</style>