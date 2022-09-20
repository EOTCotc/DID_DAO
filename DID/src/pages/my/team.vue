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
          title="标签 1"
          v-for="item in tab.data"
          :key="item.id"
          :title="item.text"
          :name="item.name"
        >
        </van-tab>
      </van-tabs>
      <ul class="list" v-if="!!list.data.length">
        <li 
          class="item"
          v-for="tabItem in list.data"
          :key="tabItem.uid"
        >
          <div class="user_wrap">
            <div class="avatar">
              <van-image
                round
                width="30"
                height="30"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
              <span class="name">{{tabItem.name}}（{{tabItem.uid}}）</span>
            </div>
            <div class="button_wrap">
              <van-button 
                plain 
                hairline 
                round
                size="mini"
                type="primary"
                color="#247FF6"
              >
                交易用户
              </van-button>
            </div>
          </div>
          <div class="wrap" v-if="!!tabItem.phone">
            手机号码<span class="value">{{tabItem.phone}} <i class="icon-copy icon"></i></span>
          </div>
          <div class="wrap">
            邮箱地址<span class="value">{{tabItem.email}}</span>
          </div>
          <div class="wrap">
            注册日期<span class="value">{{tabItem.regDate}}</span>
          </div>
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
    </div>
  </van-pull-refresh>
</template>

<script>
import { Dialog } from 'vant'
import {list} from "@/api/pagesApi/team"
export default {
  name: "team",
  data() {
    return {
      loading: false,
      teamNumber: 0,
      pushNumber: 0,
      tab: {
        data: [
          {name: 1, text: '全部'},
          {name: 2, text: '已认证'},
          {name: 3, text: '未认证'}
        ],
        active: 1
      },
      list: {
        loading: false,
        status: '',
        data: [],
      }
    }
  },
  methods: {
    onRefresh() {
      this.loading = true
      this.getList()
    },
    // Tab切换
    handleTabClick(name) {
      const handle = {
        1: '',
        2: true,
        3: false
      }
      this.list.status = handle[name]
      this.getList()
    },
    // 获取团队成员
    getList() {
      this.list.loading = true
      list({isAuth: this.list.status}).then(res => {
        const {teamNumber, users, pushNumber} = res.data.items
        this.teamNumber = teamNumber
        this.pushNumber = pushNumber
        this.list.data = users || []
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.list.loading = false
        this.loading = false
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
  .list {
    flex: 1;
    box-sizing: border-box;
    min-height: 0;
    overflow: auto;
    margin-top: 25px;
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
  .link {
    text-align: center;
    font-size: 32px;
    color: #247FF6;
  }
  &::v-deep(.more) {
    display: block;
    width: 100%;
    height: 96px;
  }
}
</style>