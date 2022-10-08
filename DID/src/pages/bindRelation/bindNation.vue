<template>
  <div>
    <van-nav-bar
      :border="false"
      :title="$t('bindRelation.country')"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 搜索 -->
    <van-search
      v-model="value"
      shape="round"
      left-icon=""
      :placeholder="$t('bindRelation.search')"
      @input="handleClear"
      @clear="handleClear"
    >
      <template #right-icon>
        <van-icon @click="handleSearch" name="search" /> </template
    ></van-search>
    <!-- 展示的国家 -->
    <div class="">
      <van-cell
        v-for="(item, index) in nationList"
        :key="index"
        :title="item[1]"
        @click="handleTab(index)"
      >
        <template #right-icon>
          <van-icon
            :name="idx == index ? 'success' : ''"
            color="#50A6E8"
          /> </template
      ></van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: "bindNation",
  data() {
    return {
      value: "", //搜索内容
      idx: 0.1, //选择的国家index
      country: {},
      nationList: [], //国家二维数组
    };
  },
  mounted() {
    this.getCountry();
  },
  methods: {
    // 获取国家
    getCountry() {
      let country = this.$route.query;
      this.country = country;
      for (const key in country) {
        if (Object.hasOwnProperty.call(country, key)) {
          const element = country[key];
          this.nationList.push([key, element]);
        }
      }
    },
    // 选择国家
    handleTab(index) {
      this.idx = index;
      // 保存国家到cookie
      this.cookie.set("country", this.nationList[index]);
      setTimeout(() => {
        this.$router.back();
      }, 500);
    },
    // 搜索
    handleSearch() {
      this.nationList = []; //清空数组
      for (const key in this.country) {
        if (Object.hasOwnProperty.call(this.country, key)) {
          const element = this.country[key];
          // 包含搜索的文字就放到数组里
          if (element.indexOf(this.value) != -1) {
            let arr = [];
            arr.push(key);
            arr.push(element);
            if (arr[0] == "CHN" && arr[1] == "中国") {
              this.nationList.unshift(arr);
            } else {
              this.nationList.push(arr);
            }
            arr = null;
          }
        }
      }
    },
    // 清除搜索框
    handleClear() {
      if (this.value.length == 0) {
        this.nationList.length = 0;
        this.getCountry();
      }
    },
    // 返回上一页
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.van-icon) {
  color: #000;
}
:deep(.van-nav-bar) {
  border-bottom: 1px solid #f3f4f5;
}
</style>