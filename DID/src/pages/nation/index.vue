<template>
  <div>
    <van-nav-bar
      :border="false"
      title="国家"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 搜索 -->
    <van-search v-model="value" @search="onSearch" right-icon="search" left-icon="" shape="round" placeholder="请输入搜索关键词" />
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
import bus from "@/utils/bus";
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
      this.cookie.set('country',this.nationList[index])
      // bus.$emit("country", this.nationList[index]);
      setTimeout(() => {
        this.$router.back()
      }, 500);
    },
    onSearch(val){
      console.log(111);
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
:deep(.van-nav-bar){
  border-bottom: 1px solid #F3F4F5;
}
</style>