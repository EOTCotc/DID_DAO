<template>
  <div class="fullscreen bg-gray">
    <header>
      <white :title="title"></white>
    </header>
    <main class="dest">
      <van-search v-model="value"
                  show-action
                  shape="round"
                  @input="showInput"
                  placeholder="输入关键词查询">
        <template #action>
          <div @click="showPopup">筛选</div>
        </template>
      </van-search>
      <van-cell-group v-show="destroyList.length > 0"
                      inset
                      v-for="(item, index) in destroyList"
                      :key="index">
        <van-cell title="游戏消耗"
                  value="2022年7月27日" />
        <van-cell :title="item.memo"
                  :border="false" />
        <van-cell title="销毁查询地址:"
                  :border="false" />
        <van-cell>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title"
                  id="destId"
                  @click="copy()"
                  :data-clipboard-text="item.destructionId">{{ item.destructionId }}</span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-empty v-show="!destroyList.length"
                 class="custom-image"
                 :image="require('./../../assets/img/empty.png')"
                 description="暂无任何数据" />

      <van-popup
        v-model="show"
        position="right"
        :style="{ height: '730px', width: '80%' }"
      >
        <div style="padding: 20px 0 0 20px">筛选时间</div>
        <div class="tag">
          <div v-for="(ite, index) in tags"
               :key="index"
               :class="active == index ? 'active' : 'noActive'"
               @click="changeZi(index)">
            {{ ite.title }}
          </div>
        </div>
        <div class="date">
          <van-button round
                      type="default"><span v-if="start == ''">起始时间</span><span>{{ start }}</span></van-button>
          <p style="width: 10px; height: 1px; background: #ccc"></p>
          <van-button round
                      type="default"><span v-if="end == ''">截至时间</span><span>{{ end }}</span></van-button>
        </div>

        <div class="btn">
          <van-button round type="default" @click="chongzhi()">重置</van-button>
          <van-button round type="info" @click="que" :disabled="disabled"
            >确定</van-button
          >
        </div>
      </van-popup>
      <van-calendar
        title="日期选择"
        v-model="showDate"
        :show-subtitle="true"
        type="range"
        color="#227AEE"
        @confirm="onConfirm"
      />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import White from "../../components/Nav/white.vue";
import { getdestruction } from "@/api/Destruction";
import Clipboard from "clipboard";
export default {
  components: { White },
  data() {
    return {
      title: "销毁查询",
      disabled: true,
      value: "",
      show: false,
      showDate: false,
      timer: null, //防抖的定时器
      active: 0, //分类标签选中的下标
      tags: [
        {
          title: '本周',
          index: 0,
        },
        {
          title: '本月',
          index: 1,
        },
        {
          title: '自定义',
          index: 2,
        },
      ],
      date: '',
      start: '',
      end: '',
      destroyList: [],
    }
  },
  created() {
    this.inquiry()
  },
  methods: {
    //筛选、取消按钮
    showPopup() {
      if (this.value == '') {
        this.show = true
      } else {
        this.value = ''
      }
    },
    chongzhi() {
      this.end = "";
      this.start = "";
      this.active = 0;
      this.disabled = true;
      this.inquiry();
    },
    //复制
    copy() {
      let clipboard = new Clipboard("#destId");
      clipboard.on("success", (e) => {
        this.$toast.success("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        this.$toast.fail("复制失败");
        clipboard.destroy();
      });
    },

    //搜索框
    showInput() {
      clearTimeout(this.timer) //清除上一次的
      this.timer = setTimeout(() => {
        // 执行搜索请求
        this.inquiry()
      }, 1000) // 设置时间
    },
    //弹出层确定
    que() {
      this.show = false
      this.inquiry()
    },
    formatDate(date) {
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(
        -2
      )}-${('0' + (date.getDate() + 1)).slice(-2)}`
    },
    onConfirm(date) {
      const [start, end] = date;
      this.showDate = false;
      this.start = this.formatDate(start);
      this.end = this.formatDate(end);
      this.disabled = false;
    },
    //分类标签
    changeZi(index) {
      this.active = index
      if (this.active == 2) {
        this.showDate = true
      }
    },

    //查询销毁
    inquiry() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: '加载中…',
      })
      let beginDate = this.start
      let endDate = this.end
      getdestruction({
        keyWord: this.value || undefined,
        beginDate: beginDate || undefined,
        endDate: endDate || undefined,
      })
        .then((res) => {
          const { code, items } = res.data
          if (code) {
            this.$toast.fail({
              forbidClick: true,
              message: '加载失败！',
            })
          } else {
            this.destroyList = items
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: '加载失败！',
          })
        })
        .finally(() => {
          loading.clear()
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.dest {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.van-cell-group {
  margin-top: 16px;
  .van-cell:first-child {
    line-height: 24px;
    margin-bottom: 4.8px;
  }
  .van-cell {
    line-height: 8px;
  }
  .van-cell:last-child {
    color: #237ff8;
    margin-bottom: 8px;
  }
}
.van-popup {
  width: 100%;
  height: 320px;
  color: #000;
  box-sizing: border-box;
  font-size: 20px;
}
.tag {
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin: 20px 0;
}
.tag div {
  width: 140px;
  display: inline-block;
  text-align: center;
  padding: 15px 25px;
  margin: 16px 20px 0;
  border-radius: 25px;
}
.noActive {
  border: 1px solid #f3f4f5;
  background: #f3f4f5;
  color: #999;
}
.active {
  border: 1px solid #247ff7;
  color: #247ff7;
  background: #e8f2ff;
}
.van-tag {
  padding: 8px 20.8px;
  margin: 16px 9.6px 0;
}
.btn {
  position: fixed;
  bottom: 16px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  .van-button:first-child {
    width: 96px;
    /* margin-left: 16px;
    margin-right: 19.2px; */
  }
  .van-button:last-child {
    width: 136px;
  }
}
.date {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  .van-button {
    height: 35px;
    width: 110px;
    padding: 0 10px;
    border: 1px solid #f3f4f5;
    background: #f3f4f5;
    color: #999;
  }
}
.dest ::v-deep .van-dialog__message--has-title {
  color: #f37a4c !important;
}
</style>