<template>
  <div class="container">
    <van-nav-bar :title="$t('bindRelation.site_comm')" left-arrow>
      <template #left>
        <van-icon @click="back" name="arrow-left" color="#000" />
      </template>
      <template #right>
        <span>{{ country }}</span>
      </template>
    </van-nav-bar>

    <div class="tips" v-show="show">
      <p>{{ $t("bindRelation.comm_tip") }}</p>
      <van-icon @click="show = false" name="cross" color="#333" />
    </div>

    <div class="list">
      <div class="site">
        <van-icon name="location-o" color="#999" size="12" />
        <span>{{ area }}</span>
      </div>

      <van-list
        :finished="finished"
        :finished-text="$t('bindRelation.not_more')"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index">
          <div class="info">
            <p>{{ item.name }}</p>
            <img :src="item.image || ''" />
            <p>{{ $t("bindRelation.adbout") }}</p>
            <p>{{ item.describe }}</p>
            <p>{{ $t("setup.telegram") }}</p>
            <a :href="item.telegram">{{ item.telegram }}</a>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getcomlist } from "@/api/pagesApi/bindRelation";
import { getcomselect } from "@/api/pagesApi/home";
export default {
  name: "bindCommunity",
  data() {
    return {
      show: true,
      // 展示页面的数据
      country: "",
      area: "",
      // 请求社区列表参数
      reqComm: {
        country: "",
        province: "",
        city: "",
        area: "",
        page: 1,
        itemsPerPage: 5,
      },
      // 社区列表
      list: [],
      finished: true, //ture为没有更多，false为加载更多
    };
  },
  mounted() {
    this.getComSelect();
  },
  methods: {
    // 获取用户选择的位置
    getComSelect() {
      getcomselect().then((res) => {
        if (res.data.code == 0) {
          let data = res.data.items;
          // 获取社区列表需要的参数
          this.reqComm.country = data.country.code;
          this.reqComm.province = data.province.code;
          this.reqComm.city = data.city.code;
          this.reqComm.area = data.county.code;
          // 展示位置给用户看
          this.country = data.country.name;
          // 如果是中国，则显示省市区；如果是国外，则显示国家-省
          if (data.country.code == "CHN") {
            this.area = `${data.province.name}-${
              data.city.name ? "-" + data.city.name : ""
            }${data.county.name ? "-" + data.county.name : ""}`;
          } else {
            this.area = `${data.country.name}${
              data.province.name ? "-" + data.province.name : ""
            }`;
          }
          // 获取社区列表
          this.onLoad();
        }
      });
    },
    // 获取社区列表
    onLoad() {
      getcomlist(this.reqComm).then((res) => {
        if (res.data.code == 0) {
          let data = res.data.items;
          this.list = [...this.list, data[0]];
          if (data.length < this.reqComm.itemsPerPage) {
            // 没有更多数据
            this.finished = true;
          } else {
            // 加载更多
            this.finished = false;
          }
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