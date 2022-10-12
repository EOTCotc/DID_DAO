<template>
  <div class="detail">
    <header>
      <white :title="title"></white>
    </header>
    <main class="box">
      <van-pull-refresh v-model="list.uploading" @refresh="onRefresh">
        <div v-if="personageArr.length > 0">
          <van-row class="title">
            <van-col span="8">{{ $t("detail.num") }}</van-col>
            <van-col span="7">{{ $t("detail.earnings") }}</van-col>
            <van-col span="8">{{ $t("detail.time") }}</van-col>
          </van-row>
          <van-row v-for="(item, index) in personageArr" :key="index">
            <van-col span="8">{{ item.eotc }} EOTC</van-col>
            <van-col span="7">
              <span v-if="item.type == 0">{{ $t("detail.type_zoer") }}</span>
              <span v-if="item.type == 1">{{ $t("detail.type_one") }}</span>
              <span v-if="item.type == 2">{{ $t("detail.type_two") }}</span>
            </van-col>
            <van-col span="8">{{ item.createDate }}</van-col>
          </van-row>
          <van-list
            class="list_wrap"
            v-show="!!personageArr.length"
            v-model="list.UpRefreshLoading"
            :finished="!!personageArr.length && list.finished"
            :finished-text="$t('detail.finished_text')"
            @load="handleUpRefresh"
          />
        </div>
        <div class="zan" v-else>
          <van-empty
            class="custom-image"
            :image="require('./../../assets/img/空态-02.png')"
            :description="$t('detail.description')"
          />
        </div>
      </van-pull-refresh>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import white from "../../components/Nav/white.vue";
import { getincome } from "@/api/earnings";
export default {
  components: { white },
  data() {
    return {
      title: this.$t("detail.nav_title"),
      page: 1,
      itemsPerPage: 10,
      personageArr: [],
      list: {
        uploading: false,
        UpRefreshLoading: false,
        finished: false,
        query: {
          page: 1,
          itemsPerPage: 5,
        },
      },
    };
  },
  created() {
    this.getCome();
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.list.uploading = true;
      this.getCome();
    },
    // 滚动到底翻页
    handleUpRefresh() {
      this.list.query.page++;
      this.list.UpRefreshLoading = true;
      this.getCome();
    },
    getCome() {
      this.$toast.loading(this.$t("detail.load_text"));
      getincome({
        page: this.list.query.page,
        itemsPerPage: this.list.query.itemsPerPage,
      })
        .then((res) => {
          res.data.items.map((item) => {
            item.createDate = this.$dayjs(item.createDate).format(
              "YYYY.MM.DD hh:mm"
            );
          });
          if (this.list.query.page === 1) {
            this.personageArr = res.data.items;
          } else {
            this.personageArr.push(...res.data.items);
          }
          this.list.finished = !res.data.items.length;
        })
        .finally(() => {
          this.$toast.clear();
          this.list.uploading = false;
          this.list.UpRefreshLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  background: #f3f4f5;
}
.title {
  background: #f3f4f5;
  line-height: 48px;
}
.box {
  background: #fff;
  color: #666666;
  text-align: center;
  .van-row {
    line-height: 48px;
    font-size: 14px;
    border-bottom: 1px solid #f3f4f5;
  }
}
.record {
  margin-top: 48px;
  color: #999999;
}
.zan {
  font-size: 30px;
  padding-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-image {
  margin-top: 10%;
}
</style>