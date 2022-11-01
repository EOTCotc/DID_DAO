<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="team_wrap bg-gray fullscreen">
      <van-nav-bar class="nav-bar" :title="$t('my.my_team')" left-arrow @click-left="$router.go(-1)" />
      <ul class="peopleNumb_wrap blue">
        <li class="item">
          <div class="title">{{ $t("my_team.tags1") }}</div>
          <div class="num">{{ teamNumber }}</div>
        </li>
        <li class="item">
          <div class="title">{{ $t("my_team.tags2") }}</div>
          <div class="num">{{ pushNumber }}</div>
        </li>
      </ul>
      <van-tabs v-model="tab.active" swipeable color="#237DF4" @click="handleTabClick">
        <van-tab v-for="item in tab.data" :key="item" :title="item"> </van-tab>
      </van-tabs>
      <van-list class="list_wrap" v-if="!!list.data.length" v-model="list.UpRefreshLoading"
        :finished="!!list.data.length && list.finished" :finished-text="$t('bindRelation.not_more')"
        @load="handleUpRefresh">
        <ul class="list">
          <li class="item" v-for="item in list.data" :key="`${tab.active}${item.uid}`">
            <div class="user_wrap">
              <div class="avatar">
                <span class="name" v-if="item.name">{{ item.name }}（{{ item.uid }}）</span>
                <span class="name" v-else><span class="link">{{ $t("my.identity_unver") }}</span>（{{ item.uid }}）</span>
              </div>
              <div class="button_wrap">
                <van-tag round plain color="#247FF6" text-color="#247FF6">
                  {{ getLevel(item.userNode) }}
                </van-tag>
              </div>
            </div>
            <van-row class="wrap">
              <van-col :span="6">{{ $t("my_team.tags3") }}</van-col>
              <van-col :span="18" v-if="item.phone">{{ item.phone }}
                <i class="icon-copy icon" @click="copy(item.phone)"></i>
              </van-col>
            </van-row>
            <van-row class="wrap">
              <van-col :span="6">{{ $t("content.email") }}</van-col>
              <van-col :span="18">{{ item.mail }} </van-col>
            </van-row>
            <van-row class="wrap">
              <van-col :span="6">{{ $t("my_team.tags4") }}</van-col>
              <van-col :span="18">{{ transformUTCDate(item.regDate) }}</van-col>
            </van-row>
          </li>
          <van-button block class="more" color="#1B2945" type="primary" :loading="moreLoading" :disabled="moreLoading"
            :loading-text="$t('my_team.tags5')" @click="getMore">
            {{ $t("my_team.tags6") }}
          </van-button>
        </ul>
      </van-list>
      <van-empty v-else class="custom-image" :image="require('@/assets/imgs/empty.png')"
        :description="$t('public.not_data')">
        <div class="link" @click="$router.push('/my/invite')">
          {{ $t("my_team.tags7") }}
          <van-icon name="arrow" />
        </div>
      </van-empty>
    </div>
  </van-pull-refresh>
</template>

<script>
import { Dialog } from "vant";
import { list, morePersonnel } from "@/api/pagesApi/team";
import { transformUTCDate, copy } from "@/utils/utils";

export default {
  name: "team",
  data () {
    return {
      loading: false,
      teamNumber: 0,
      pushNumber: 0,
      moreLoading: false,
      tab: {
        data: [
          this.$t("my_team.team_data1"),
          this.$t("my_team.team_data2"),
          this.$t("my_team.team_data3"),
        ],
        active: 0,
      },
      list: {
        loading: false,
        status: "",
        UpRefreshLoading: false,
        finished: false,
        data: [],
        query: {
          page: 1,
          itemsPerPage: 10,
        },
      },
    };
  },
  methods: {
    copy,
    transformUTCDate,
    onRefresh () {
      this.loading = true;
      this.list.query.page = 1;
      this.list.data = [];
      this.getList();
    },
    // Tab切换
    handleTabClick (tab) {
      const handle = {
        0: "",
        1: true,
        2: false,
      };
      this.list.data = []
      this.list.status = handle[tab];
      this.list.query.page = 1
      this.list.UpRefreshLoading = false
      this.getList();
    },
    // 滚动到底翻页
    handleUpRefresh () {
      this.list.query.page++;
      this.list.UpRefreshLoading = true;
      this.getList();
    },
    // 获取团队成员
    getList () {
      const query = { ...this.list.query };
      const loading = this.$toast.loading({
        forbidClick: true,
        message: this.$t("public.loading"),
      });
      if (this.tab.active > 0) {
        query.isAuth = this.list.status;
      }
      this.list.loading = true;
      list(query)
        .then((res) => {
          if (!res.data.code) {
            const { teamNumber, users, pushNumber } = res.data.items;
            this.teamNumber = teamNumber;
            this.pushNumber = pushNumber;
            if (query.page > 1) {
              this.list.data.push(...users);
            } else {
              this.list.data = users || [];
            }
            this.list.finished = users.length < this.list.query.itemsPerPage;
          } else {
            this.$toast.fail({
              forbidClick: true,
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
          this.list.loading = false;
          this.list.UpRefreshLoading = false;
          loading.clear();
        });
    },
    // 查看更多团队人员
    getMore () {
      Dialog.confirm({
        title: this.$t("my_team.team_title1"),
        message: this.$t("my_team.team_msg1"),
        confirmButtonText: this.$t("my_team.team_text1"),
        cancelButtonText: this.$t("my_team.team_text2"),
        beforeClose: (action, done) => {
          if (action === "confirm") {
            this.moreLoading = true;
            morePersonnel()
              .then((res) => {
                if (res.data.code) {
                  this.$toast.fail(res.data.message);
                } else {
                  this.$toast.success(this.$t("my_team.team_msg2"));
                }
              })
              .finally(() => (this.moreLoading = false));
            done();
          } else {
            done();
          }
        },
      });
    },
    getLevel (level) {
      const arr = [
        this.$t("my_team.team_data4"),
        this.$t("my_team.team_data5"),
        this.$t("my_team.team_data6"),
        this.$t("my_team.team_data7"),
        this.$t("my_team.team_data8"),
        this.$t("my_team.team_data9"),
      ];
      return arr[level];
    },
  },
  created () {
    this.getList();
  },
};
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
      border-right: 1px solid #f3f4f5;
      transform: scaleX(0.5) translate(-50%, -50%);
    }

    .item {
      flex: 1;
      text-align: center;

      .title {
        color: rgba($color: #fff, $alpha: 0.3);
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
    padding-bottom: 80px;
    box-sizing: border-box;

    .list {
      .item {
        background: #ffffff;
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
          border-bottom: 1px solid #f3f4f5;

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
    color: #247ff6;
  }

  .more {
    @include posi($p: fixed, $b: 0, $l: 0, $r: 0);
  }
}
</style>