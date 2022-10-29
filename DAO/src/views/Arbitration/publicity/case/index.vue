<template>
  <van-pull-refresh v-model="list.uploading" @refresh="refresh">
    <div class="case_wrap fullscreen bg-gray">
      <page-header :title="$t('publicity.nav_title')"></page-header>
      <div class="content">
        <ul class="list" v-if="!!list.data.length">
          <li class="item" v-for="item in list.data" :key="item.id">
            <!-- 原被告信息 -->
            <van-row>
              <van-col class="lf" :span="12" @click="
                go('/user/arbitration/case/personnelInfo', {
                  id: item.plaintiffId,
                  type: 1,
                })
              ">
                <div class="user">
                  <div class="identity_wrap">
                    <img v-if="item.status === 2" src="../../../../assets/imgs/huangguan.png" alt="" class="img" />
                    {{ $t("publicity.plaintiff") }}
                  </div>
                  <span class="name">{{ item.plaintiff }}</span>
                </div>
                <div class="num">
                  {{ item.plaintiffNum }}{{ $t("publicity.ticket") }}
                </div>
              </van-col>
              <van-col class="rt" :span="12" @click="
                go('/user/arbitration/case/personnelInfo', {
                  id: item.defendantId,
                  type: 2,
                })
              ">
                <div class="user">
                  <div class="identity_wrap">
                    <img v-if="item.status === 3" src="../../../../assets/imgs/huangguan.png" alt="" class="img" />
                    {{ $t("publicity.defendant") }}
                  </div>
                  <span class="name">{{ item.plaintiff }}</span>
                </div>
                <div class="num">
                  {{ item.plaintiffNum }}{{ $t("publicity.ticket") }}
                </div>
              </van-col>
            </van-row>
            <div class="process_wrap">
              <div class="lt chunk" :style="{
                flex: `0 0 ${(item.plaintiffNum / item.total) * 100}%`,
              }"></div>
              <div class="border"></div>
              <div class="rt chunk"></div>
            </div>
            <div class="row" @click="
              go('/user/arbitration/publicity/case/detail', {
                arbitrateInfoId: item.arbitrateInfoId,
              })
            ">
              <div class="title">{{ $t("publicity.result") }}</div>
              <div class="message">
                <p>
                  {{ $t("publicity.participate") }}{{ item.total
                  }}{{ $t("publicity.evidence") }}{{ item.plaintiffNum
}}{{ $t("publicity.determine") }}
                </p>
                <div class="more">
                  <van-icon name="description" />{{ $t("publicity.detail") }}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <van-empty v-else :image="require('../../../../assets/img/empty.png')" :description="$t('publicity.no_data')" />
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader";
import { caseList } from "@/api/publicity";
export default {
  name: "arbitrationCase",
  components: {
    pageHeader,
  },
  data () {
    return {
      list: {
        uploading: false,
        data: [],
      },
    };
  },
  methods: {
    // 跳转页面
    go (path, query) {
      this.$router.push({ path, query });
    },
    getList () {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: this.$t("publicity.message"),
      });
      caseList()
        .then((res) => {
          const { code, items } = res.data;
          if (code) {
            this.$toast.fail({
              forbidClick: true,
              message: this.$t("publicity.message_fild"),
            });
          } else {
            this.list.data = items.map((item) => ({
              ...item,
              total: item.plaintiffNum + item.defendantNum,
            }));
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: this.$t("publicity.message_fild"),
          });
        })
        .finally(() => {
          loading.clear();
        });
    },
    // 下拉刷新
    refresh () {
      this.getList();
    },
  },
  created () {
    this.getList();
  },
};
</script>

<style scoped lang="scss">
.case_wrap {
  .content {
    padding: 30px;
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
          .identity_wrap {
            border-radius: 0 40px 40px 50px;
            margin-right: 10px;
            background-color: #4ea0f5;
          }
        }

        & .rt {
          text-align: right;

          .identity_wrap {
            border-radius: 40px 0 40px 50px;
            margin-right: 10px;
            background-color: #ec6f66;
          }

          .user {
            justify-content: flex-end;
          }

          .num {
            color: #ec6f66;
          }
        }
        .identity_wrap {
          display: inline-block;
          position: relative;
          font-size: 24px;
          flex: 0 0 90px;
          color: #fff;
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
          margin-bottom: 20px;

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
          color: #4ea0f5;
          font-size: 24px;
        }

        .process_wrap {
          margin-top: 30px;
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