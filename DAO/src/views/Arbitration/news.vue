<template>
  <div class="wrap">
    <header>
      <white :title="title"></white>
    </header>
    <div class="content_box"
         id="box"
         ref="scrollBox">
      <div class="timer">2022-08-02 11:08:07</div>
      <div :class="item.position == 'left' ? 'userbox2' : 'userbox'"
           v-for="(item, index) in chatList"
           :key="index">
        <div :class="item.position == 'left' ? 'nameInfo2' : 'nameInfo'">
          <div style="font-size: 14px;color:#666666 ">{{ item.username }}</div>
          <div :class="item.position == 'left' ? 'contentText2' : 'contentText'">
            <div class="content">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
        <div>
          <van-image round
                     width="50px"
                     height="50px"
                     :src="item.url" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-field v-model="inputValue"
                 center
                 type="textarea"
                 :autosize="{ maxHeight: 100, minHeight: 25 }"
                 placeholder=""
                 rows="1">
        <template #button>
          <van-button size="normal"
                      type="info"
                      @click="sendOut">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import white from '@/components/Nav/white.vue'
export default {
  components: { white },
  data() {
    return {
      title: '王晓雷',
      //聊天数据
      chatList: [
        {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          username: '王晓雷',
          content: '模拟数据123模拟数据123模拟数据123模拟数据123',
          position: 'left',
        },
        {
          url: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          username: '李四',
          content: '模拟数据123模拟数据123模拟数据123模拟数据123模拟数据123',
          position: 'right',
        },
        {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          username: '王晓雷',
          content: '模拟数据123',
          position: 'left',
        },
        {
          url: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          username: '李四',
          content: '模拟数据123模拟数据',
          position: 'right',
        },
        {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          username: '王晓雷',
          content: '模拟数据123',
          position: 'left',
        },
        {
          url: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          username: '李四',
          content: '模拟数据123模拟数据',
          position: 'right',
        },
        {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          username: '王晓雷',
          content: '模拟数据123',
          position: 'left',
        },
        {
          url: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          username: '李四',
          content: '模拟数据123模拟数据',
          position: 'right',
        },
        {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          username: '王晓雷',
          content: '模拟数据123',
          position: 'left',
        },
        {
          url: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          username: '李四',
          content: '模拟数据123模拟数据',
          position: 'right',
        },
        {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          username: '王晓雷',
          content: '模拟数据123',
          position: 'left',
        },
        {
          url: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          username: '李四',
          content: '模拟数据123模拟数据',
          position: 'right',
        },
        {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          username: '王晓雷',
          content: '模拟数据000000',
          position: 'left',
        },
        {
          url: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          username: '李四',
          content: '模拟数据123模拟数据',
          position: 'right',
        },
      ],
      //输入内容
      inputValue: '',
      //滚动条距离顶部距离
      scrollTop: 0,
    }
  },
  mounted() {
    this.setPageScrollTo()
    //创建监听内容部分滚动条滚动
    this.$refs.scrollBox.addEventListener('scroll', this.srTop)
  },
  methods: {
    //滚动条默认滚动到最底部
    setPageScrollTo() {
      //获取中间内容盒子的可见区域高度
      this.scrollTop = document.querySelector('#box').offsetHeight
      setTimeout(() => {
        //加个定时器，防止上面高度没获取到，再获取一遍。
        if (this.scrollTop != this.$refs.scrollBox.offsetHeight) {
          this.scrollTop = document.querySelector('#box').offsetHeight
        }
      }, 100)
      //scrollTop：滚动条距离顶部的距离。
      //把上面获取到的高度座位距离，把滚动条顶到最底部
      this.$refs.scrollBox.scrollTop = this.scrollTop
    },
    //滚动条到达顶部
    srTop() {
      //判断：当滚动条距离顶部为0时代表滚动到顶部了
      if (this.$refs.scrollBox.scrollTop == 0) {
        //逻辑简介：
        //到顶部后请求后端的方法，获取第二页的聊天记录，然后插入到现在的聊天数据前面。
        //如何插入前面：可以先把获取的数据保存在 A 变量内，然后 this.chatList=A.concat(this.chatList)把数组合并进来就可以了

        //拿聊天记录逻辑:
        //第一次调用一个请求拉历史聊天记录，发请求时参数带上页数 1 传过去，拿到的就是第一页的聊天记录，比如一次拿20条。你显示出来
        //然后向上滚动到顶部时，触发新的请求，在请求中把分页数先 +1 然后再请求，这就拿到了第二页数据，然后通过concat合并数组插入进前面，依次类推，功能完成！
        console.log('到顶了，滚动条位置 :', this.$refs.scrollBox.scrollTop)
      }
    },
    sendOut() {
      if (this.inputValue != '') {
        this.chatList.shift()
        this.chatList.push({
          url: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          username: '李四',
          content: this.inputValue,
          position: 'right',
        })
        this.inputValue = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  background-color: #f3f4f5;
  width: 100%;
  position: relative;
}
::v-deep .van-field__body {
  box-sizing: border-box;
  height: 40px;
  border: 1px solid #c8cfde;
  border-radius: 10px;
}

::v-deep .van-button {
  height: 40px;
  width: 82px;
  border-radius: 10px;
}
::v-deep .van-dialog__header {
  color: #333333;
}
.content {
  display: flex;
  align-items: center;
  p {
    margin: 0;
  }
}
.bottom {
  height: 60px;
  width: 100%;
  border-top: 1px solid #eaeaea;
  position: fixed;
  bottom: 0;
}
.content_box {
  height: 86vh;
  overflow: auto;
  padding: 16px;
}
.timer {
  text-align: center;
  color: #c2c2c2;
}
.userbox {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}
.nameInfo {
  /* 用flex：1把盒子撑开 */
  flex: 1;
  margin-right: 10px;
  /* 用align-items把元素靠右对齐 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.contentText {
  min-height: 42px;
  background-color: #247ff7;
  /* 把内容部分改为行内块元素，因为盒子flex：1把盒子撑大了，所以用行内块元素让内容宽度不根据父盒子来 */
  display: inline-block;
  /* 这四句是圆角 */
  border-top-left-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  /* 最大宽度限定内容输入到百分61换行 */
  max-width: 61%;
  padding: 5px 10px;
  /* 忽略多余的空白，只保留一个空白 */
  white-space: normal;
  /* 换行显示全部字符 */
  word-break: break-all;
  margin-top: 3px;
  font-size: 16px;
}

/* 接收的信息样式 */
/* 
左边消息思路解释：跟上面一样，就是换一下位置，首先通过把最外层大盒子的排列方式通过flex-direction: row-reverse;属性翻转，也就是头像和文字盒子换位置
然后删除掉尾部对齐方式，因为不写这个默认是左对齐的。我们写的左边就没必要再写了。
*/
.userbox2 {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
}
.nameInfo2 {
  /* 用flex：1把盒子撑开 */
  flex: 1;
  margin-left: 10px;
}
.contentText2 {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  min-height: 42px;
  background-color: #fff;
  color: #333333;
  /* 把内容部分改为行内块元素，因为盒子flex：1把盒子撑大了，所以用行内块元素让内容宽度不根据父盒子来 */
  display: inline-block;
  /* 这四句是圆角 */
  border-top-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  /* 最大宽度限定内容输入到百分61换行 */
  max-width: 61%;
  padding: 5px 10px;
  /* 忽略多余的空白，只保留一个空白 */
  white-space: normal;
  /* 换行显示全部字符 */
  word-break: break-all;
  margin-top: 3px;
  font-size: 16px;
}
</style>
