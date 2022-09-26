<template>
  <div class="dest">
    <header>
      <white :title="title"></white>
    </header>
    <main>
      <van-search
        v-model="value"
        show-action
        shape="round"
        @input="showInput"
        placeholder="输入关键词查询"
      >
        <template #action>
          <div @click="showPopup">筛选</div>
          <!-- <div @click="showPopup">取消</div> -->
        </template>
      </van-search>
      <van-cell-group inset v-for="(item, index) in destroyList" :key="index">
        <van-cell title="游戏消耗" value="2022年7月27日" />
        <van-cell :title="item.memo" :border="false" />
        <van-cell title="销毁查询地址:" :border="false" />
        <van-cell :title="item.destructionId" :border="false" />
      </van-cell-group>
      <van-popup
        v-model="show"
        position="right"
        :style="{ height: '730px', width: '70%' }"
      >
        <div>筛选时间</div>
        <div class="tag">
          <div
            v-for="(ite, index) in tags"
            :key="index"
            :class="active == index ? 'active' : 'noActive'"
            @click="changeZi(index)"
          >
            {{ ite.title }}
          </div>
        </div>
        <div class="date">
          <van-button round type="default"
            ><span v-if="start == ''">起始时间</span
            ><span>{{ start }}</span></van-button
          >
          <p style="width: 10px; border: 0.5px solid #cccccc"></p>
          <van-button round type="default"
            ><span v-if="end == ''">起始时间</span
            ><span>{{ end }}</span></van-button
          >
        </div>

        <div class="btn">
          <van-button round type="default">重置</van-button>
          <van-button round type="info" @click="que">确定</van-button>
        </div>
      </van-popup>
      <van-calendar
        title="日期选择"
        v-model="showDate"
        :show-subtitle="true"
        type="multiple"
        @confirm="onConfirm"
      />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import White from "../../components/Nav/white.vue";
import { getdestruction } from "@/api/Destruction";
export default {
  components: { White },
  data() {
    return {
      title: "销毁查询",
      value: "",
      show: false,
      showDate: false,
      timer: null, //防抖的定时器
      active: 0, //分类标签选中的下标
      tags: [
        {
          title: "本周",
          index: 0,
        },
        {
          title: "本月",
          index: 1,
        },
        {
          title: "自定义",
          index: 2,
        },
      ],
      date: "",
      start: "",
      end: "",
      page: 1,
      itemsPerPage: 10,
      destroyList: [],
    };
  },
  methods: {
    //筛选、取消按钮
    showPopup() {
      if (this.value == "") {
        this.show = true;
      } else {
        this.value = "";
      }
    },

    //搜索框
    showInput() {
      clearTimeout(this.timer); //清除上一次的
      this.timer = setTimeout(() => {
        // 执行搜索请求
        this.inquiry();
      }, 1000); // 设置时间
    },
    //弹出层确定
    que() {
      this.show = false;
      this.inquiry();
    },
    formatDate(date) {
      return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
        -2
      )}-${("0" + (date.getDate() + 1)).slice(-2)}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.showDate = false;
      this.start = this.formatDate(start);
      this.end = this.formatDate(end);
    },
    //分类标签
    changeZi(index) {
      this.active = index;
      if (this.active == 2) {
        this.showDate = true;
      }
    },
    // onConfirm(date) {
    //   this.show = false;
    //   this.text = `选择了 ${date.length} 个日期`;
    // },
    //查询销毁
    inquiry() {
      console.log(this.start, this.end);
      let walletAddress = localStorage.getItem("myaddress");
      let otype = localStorage.getItem("netType");
      let sign = localStorage.getItem("mysign");
      let beginDate = this.start;
      let endDate = this.end;
      getdestruction({
        walletAddress: walletAddress,
        otype: otype,
        sign: sign,
        keyWord: this.value,
        beginDate: beginDate,
        endDate: endDate,
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      }).then((res) => {
        console.log(res);
        this.destroyList = res.data.items;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dest {
  background: #f3f4f5;
  height: 100vh;
}

.van-cell-group {
  margin-top: 1rem;
  .van-cell:first-child {
    line-height: 1.5rem;
    margin-bottom: 0.3rem;
  }
  .van-cell {
    line-height: 0.5rem;
  }
  .van-cell:last-child {
    color: #237ff8;
    margin-bottom: 0.5rem;
  }
}
.van-popup {
  height: 20rem;
  padding: 1rem;
  margin-top: 2rem;
}
.tag {
  display: flex;
  justify-content: center;
}
.tag div {
  display: inline-block;
  padding: 0.4rem 1.4rem;
  margin: 1rem 0.5rem 0;
  border-radius: 16px;
}
.noActive {
  border: 1px solid #f3f4f5;
  background: #f3f4f5;
}
.active {
  border: 1px solid #247ff7;
  color: #247ff7;
}
.van-tag {
  padding: 0.5rem 1.3rem;
  margin: 1rem 0.6rem 0;
}
.btn {
  position: fixed;
  bottom: 1rem;
  .van-button:first-child {
    width: 6rem;
    margin-left: 1rem;
    margin-right: 1.2rem;
  }
  .van-button:last-child {
    width: 8.5rem;
  }
}
</style>