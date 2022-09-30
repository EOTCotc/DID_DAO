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
import district_zh from "@/utils/district_zh.json";
export default {
  name: "nation",
  data() {
    return {
      district_zh, //引入的json文件整个对象(有国家省市区)
      value: "", //搜索内容
      idx: 0.1, //选择的国家index
      nationList: [], //国家二维数组
    };
  },
  mounted() {
    this.handleNation(); //获取国家
  },
  methods: {
    // 获取国家
    handleNation() {
      const { COUNTRIES } = this.district_zh; //解构这个对象，只要国家数据
      // 遍历对象，把国家放到一个数组里
      for (const key in COUNTRIES) {
        if (Object.hasOwnProperty.call(COUNTRIES, key)) {
          const element = COUNTRIES[key];
          let arr = [];
          //国家个key，后端需要，还需要根据key获取省市区，先存起来
          arr.push(key);
          //国家的名称
          arr.push(element);
          // 添加国家名字
          if (arr[0] == "CHN" && arr[1] == "中国") {
            //把中国放第一
            this.nationList.unshift(arr);
          } else {
            this.nationList.push(arr);
          }
          arr = null;
        }
      }
    },
    // 选择国家
    handleTab(index) {
      this.idx = index;
      this.cookie.set("country", this.nationList[index]);
      setTimeout(() => {
        this.$router.back();
      }, 500);
    },
    // 搜索
    handleSearch() {
      const { COUNTRIES } = this.district_zh;
      this.nationList = []; //清空数组
      for (const key in COUNTRIES) {
        if (Object.hasOwnProperty.call(COUNTRIES, key)) {
          const element = COUNTRIES[key];
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
        this.nationList = [];
        this.handleNation();
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