<template>
  <van-pull-refresh v-model="list.uploading" @refresh="refresh">
    <div class="personnel_wrap fullscreen bg-gray">
      <page-header title="仲裁员公示"></page-header>
      <div class="content">
        <van-list
          v-model="list.btloading"
          :finished="!!list.data.length && list.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ul class="list">
            <li class="item" v-for="item in list.data" :key="item.id">
              <van-cell
                title-class="title name"
                value-class="value"
                :border="false"
                :title="item.name"
                :value="item.id"
              />
              <van-cell
                title-class="title"
                value-class="value"
                title="申请时间"
                :border="false"
                :value="item.date"
              />
              <van-cell
                title-class="title"
                value-class="value"
                title="仲裁次数"
                :border="false"
                :value="item.count"
              />
            </li>
          </ul>
        </van-list>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader";
// import { personnelList } from '@/api/arbitration/publicity'

export default {
  name: "arbitrationPersonnel",
  components: {
    pageHeader,
  },
  data() {
    return {
      list: {
        uploading: false,
        btloading: false,
        finished: true,
        data: [
          {
            id: "459873564223",
            name: "李**",
            date: "2022.05.26",
            count: 2,
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
    // 获取列表
    getList() {
      // personnelList().then((res) => {
      //   if (res.data.code) {
      //   } else {
      //     console.log(res)
      //   }
      // })
    },
    // 下拉刷新
    refresh() {},
    // 翻页
    onLoad() {},
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped lang="scss">
.personnel_wrap {
  .content {
    padding: 30px;
    .list {
      .item {
        padding: 20px;
        border-radius: 20px;
        background-color: #fff;
        margin-bottom: 25px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          color: #999;
          font-size: 28px;
          &.name {
            color: #333;
            font-size: 32px;
            font-weight: bold;
          }
        }
        .value {
          color: #333;
          font-size: 28px;
        }
      }
    }
  }
}
</style>