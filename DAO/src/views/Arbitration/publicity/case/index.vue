<template>
  <van-pull-refresh v-model="list.uploading" @refresh="refresh">
    <div class="case_wrap fullscreen bg-gray">
      <page-header title="仲裁案公示"></page-header>
      <div class="content">
        <ul class="list" v-if="!!list.data.length">
          <li class="item"
              v-for="item in list.data"
              :key="item.id"
              @click="$router.push({
                path: '/user/arbitration/publicity/case/detail',
                query: {
                  arbitrateInfoId: item.arbitrateInfoId
                }
              })"
          >
            <van-row>
              <van-col class="lf" :span="12">
                <div class="user_wrap">
                  <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" class="avatar">
                  <span class="name">{{ item.plaintiff }}</span>
                  <span class="identity">（卖家）</span>
                </div>
                <div class="count_wrap">
                  <span class="text">原告</span>
                  <span class="num">{{item.plaintiffNum}}票</span>
                </div>
              </van-col>
              <van-col class="rt" :span="12">
                <div class="user_wrap">
                  <span class="identity">（卖家）</span>
                  <span class="name">{{ item.defendant }}</span>
                  <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" class="avatar">
                </div>
                <div class="count_wrap">
                  <span class="num">{{item.defendantNum}}票</span>
                  <span class="text">被告</span>
                </div>
              </van-col>
            </van-row>
            <div class="process_wrap">
              <div class="lt chunk" :style="{'flex': `0 0 ${item.plaintiffNum / item.total * 100}%`}"></div>
              <div class="border"></div>
              <div class="rt chunk"></div>
            </div>
            <div class="row">
              <div class="title">仲裁结果</div>
              <div class="message">
                <p>本次参与仲裁判决的仲裁员共计{{ item.total }}人，通过双方提交举证，{{ item.plaintiffNum }}位仲裁员判定原告…</p>
                <div class="more"><van-icon name="description" /> 详情</div>
              </div>
            </div>
          </li>
        </ul>
        <van-empty
          v-else
          :image="require('../../../../assets/img/empty.png')"
          description="暂无任何数据"
        />
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader";
import {caseList} from '@/api/publicity'
export default {
  name: "arbitrationCase",
  components: {
    pageHeader
  },
  data() {
    return {
      list: {
        uploading: false,
        data: [],
      }
    }
  },
  methods: {
    getList() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: '加载中…'
      })
      caseList().then(res => {
        const {code, items} = res.data
        if (code) {
          this.$toast.fail({
            forbidClick: true,
            message: "加载失败！"
          })
        } else {
          this.list.data = items.map(item => ({...item, total: item.plaintiffNum + item.defendantNum}))
        }
      }).catch(() => {
        this.$toast.fail({
          forbidClick: true,
          message: "加载失败！"
        })
      }).finally(() => {
        loading.clear()
      })
    },
    // 下拉刷新
    refresh() {
      this.getList()
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.case_wrap {
  .content {
    padding: 30px;
    .list {
      .item {
        padding: 30px;
        border-radius: 20px;
        background-color: #FFF;
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
              background-color: #EC6F66;
            }
            .num {
              color: #EC6F66;
            }
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
            margin-right: 10px;
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
            color: #FFF;
            background-color: #4EA0F5;
          }
          .num {
            color: #4EA0F5;
            font-size: 24px;
          }
        }
        .process_wrap {
          display: flex;
          align-items: center;
          margin-top: 30px;
          background-color: #4EA0F5;
          border-radius: 24px;
          overflow: hidden;
          .border {
            width: 20px;
            height: 24px;
            background-color: #FFF;
            border-radius: 15px 0 0 15px;
          }
          .chunk {
            height: 24px;
            &.rt {
              display: flex;
              align-items: center;
              flex: 1;
              background-color: #EC6F66;
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