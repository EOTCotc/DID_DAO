<template>
  <van-pull-refresh v-model="list.uploading" @refresh="getList">
    <div class="personnel_wrap bg-gray">
      <page-header :title="$t('personnel.nav_title')"></page-header>
      <div class="content">
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
              :title="$t('personnel.Application_time')"
              :border="false"
              :value="transformUTCDate(item.date)"
            />
            <van-cell
              title-class="title"
              value-class="value"
              :title="$t('personnel.arbitrations')"
              :border="false"
              :value="item.arbitrateNum"
            />
          </li>
        </ul>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader";
import { personnelList } from "@/api/arbitration/publicity";
import { transformUTCDate } from "@/utils/utils"

export default {
  name: "arbitrationPersonnel",
  components: {
    pageHeader,
  },
  data() {
    return {
      list: {
        uploading: false,
        data: []
      },
    };
  },
  methods: {
    transformUTCDate,
    // 获取列表
    getList() {
      personnelList().then((res) => {
        if (res.data.code) {
        } else {
          this.list.data = res.data.items
          this.list.finished = !res.data.items.length
        }
      }).finally(() => {
        this.list.uploading = false
      })
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped lang="scss">
.personnel_wrap {
  min-height: 100vh;
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