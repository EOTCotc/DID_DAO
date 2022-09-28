<template>
  <div class="container">
    <van-nav-bar title="所在地社区" left-arrow>
      <template #left>
        <van-icon @click="back" name="arrow-left" color="#000" />
      </template>
      <template #right>
        <span>{{ country }}</span>
      </template>
    </van-nav-bar>

    <div class="tips" v-show="show">
      <p>为了您的账户安全，请加入所在地的电报群联系管理进行线下建立推荐关系</p>
      <van-icon @click="show = false" name="cross" color="#333" />
    </div>

    <div class="list">
      <div class="site">
        <van-icon name="location-o" color="#999" size="12" />
        <span>{{ area }}</span>
      </div>
      <div v-for="(item, index) in list" :key="index">
        <div class="info">
          <p>{{ item.name }}</p>
          <img :src="item.image || ''" />
          <p>社区简介</p>
          <p>{{ item.describe }}</p>
          <p>电报群</p>
          <a :href="item.telegram">{{ item.telegram }}</a>
        </div>
      </div>
      <!-- 下拉加载更多 -->
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteHandler"
        :distance="200"
        class="infinite-loading-wrap"
      >
        <div slot="spinner">加载中...</div>
        <div slot="no-more">没有更多数据</div>
        <div slot="no-results">没有数据</div>
        <!-- <div slot="error" slot-scope="{ trigger }">
          Error Data, click
          <a href="javascript:;" @click="trigger">here</a> toretry
        </div> -->
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { getcomlist } from "@/api/pagesApi/bindRelation";
export default {
  name: "bindCommunity",
  data() {
    return {
      show: true,
      // 展示页面的数据
      country: "",
      area: "",
      // 请求参数
      reqComm: {
        country: "",
        province: "",
        city: "",
        area: "",
        page: 1,
        itemsPerPage: 5,
      },
      list: [],
    };
  },
  mounted() {
    console.log(this.cookie.get('country'));
    this.getCommList();
  },
  components: {
    InfiniteLoading,
  },
  methods: {
    // 获取社区列表
    getCommList() {
      // 从home过来
      if (this.$route.params.home == "home") {
        //个人信息有位置信息，不需要再选位置
        let site = JSON.parse(this.$route.params.site);
        // 展示数据
        this.country = site.country.name;
        this.area = `${site.province.name}-${site.city.name}-${site.county.name}`;
        // 请求数据
        this.reqComm.country = site.country.code;
        this.reqComm.province = site.province.code;
        this.reqComm.city = site.city.code;
        this.reqComm.area = site.county.code;
      } else {
        //从上个页面过来
        let data = this.$router.params;
        console.log(JSON.parse(this.cookie.get('country')));
        let area = JSON.parse(data.area);
        let country = data.country;
        // 赋值展示的数据
        this.country = country[1]; //国家
        this.area = `${area[0].name}-${area[1].name}-${area[2].name}`; //省市区
        // 赋值请求参数
        this.reqComm.country = country[0];
        this.reqComm.province = area[0].code;
        this.reqComm.city = area[1].code;
        this.reqComm.area = area[2].code;
      }
    },
    // 上拉加载更多
    infiniteHandler($state) {
      getcomlist(this.reqComm).then((res) => {
        if (res.data.items.length) {
          this.reqComm.page += 1; // 下一页
          let arr = res.data.items;
          this.list = [...this.list, ...arr];
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #f3f4f5;
  min-height: 100vh;
}
.tips {
  padding: 28px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 140px;
  font-size: 28px;
  color: #fc7542;
  background: #fffbe8;
  p {
    margin-right: 40px;
  }
}
.list {
  padding: 20px 30px;
  .site {
    span {
      margin-left: 13px;
      color: #999;
      font-size: 28px;
    }
  }
  .info {
    padding: 30px;
    margin-top: 20px;
    border-radius: 20px;
    background: #fff;
    p:first-of-type {
      line-height: 88px;
      font-size: 36px;
      color: #333;
      font-weight: bold;
      border-bottom: 1px solid #f3f4f5;
    }
    img {
      width: 100%;
      height: 236px;
      border-radius: 20px;
    }
    p:nth-of-type(2) {
      margin-top: 25px;
      font-size: 28px;
      color: #333;
    }
    p:nth-of-type(3) {
      margin-top: 20px;
      line-height: 54px;
      font-size: 32px;
      color: #333;
    }
    p:last-of-type {
      margin-top: 30px;
      font-size: 28px;
      color: #333;
    }
    a {
      margin-top: 20px;
      font-size: 32px;
      color: #237ff8;
    }
  }
}
.infinite-loading-wrap {
  margin-top: 100px;
  color: #999;
  text-align: center;
}
</style>