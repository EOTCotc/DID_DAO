<template>
  <div>
    <header>
      <white :title="title"></white>
    </header>
    <div class="body">
      <div class="main">
        <div class="mainTitle">
          <div class="NumberOfQuestions"><span>1</span>/10</div>
          <div class="Aim">
            <van-icon name="aim"
                      color="#237FF8" />
            <van-count-down :time="time"
                            format="HH:mm" />
          </div>
        </div>
        <div v-if="show==false">
          <div class="questions">
            <h3>交易中,买家打款时不能进行哪些备注？</h3>
            <h4>(单选题)</h4>
          </div>
          <div class="answerOptions">
            <div><span>A.</span>买U,USTD,BTC,ETH等任何区域链相关的信息</div>
            <div><span>B.</span>卖家个人账号信息</div>
          </div>
        </div>
        <div class="completion"
             v-if="show==true">
          <h4>(填空题)</h4>
          <div>超时放币
            <van-field v-model="text" />内无需仲裁,系统自动扣分
          </div>
          <div class="tips">在横线输入您的答案</div>
        </div>
      </div>
    </div>
    <footer>
      <van-button round
                  block
                  disabled
                  color="#1B2945"
                  v-if="show==false"
                  @click="nextQuestion">下一题</van-button>
      <div class="btn"
           v-if="show==false">
        <van-button round
                    type="default"
                    @click="previousQuestion">上一题</van-button>
        <van-button round
                    color="#1B2945"
                    @click="nextQuestion">下一题</van-button>
      </div>
      <van-button round
                  block
                  color="#1B2945"
                  v-if="show"
                  @click="SubmitExaminationPapers">提交</van-button>
    </footer>
  </div>
</template>
<script>
import white from '@/components/Nav/white.vue'
export default {
  components: { white },
  data() {
    return {
      show: true,
      text: '',
      title: '仲裁考试',
      time: 30 * 60 * 60 * 1000,
      testQuestionData: [
        {
          id: 1,
          question: '题目一',
          questionContant: '交易中,买家打款时不能进行哪些备注？',
          questionAnswer: [
            {
              title: 'A.',
              contant: '买U,USTD,BTC,ETH等任何区域链相关的信息',
            },
            {
              title: 'B.',
              contant: '卖家个人账号信息',
            },
          ],
        },
      ],
    }
  },
  methods: {
    previousQuestion() {
      console.log('上一题')
    },
    nextQuestion() {
      console.log('下一题')
    },
    SubmitExaminationPapers() {
      this.$router.back()
      console.log('提交')
    },
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.body {
  height: 91.2vh;
  background-color: #f3f4f5;
  padding: 30px;
  .main {
    background-color: #fff;
    margin: 0 auto;
    padding: 32px;
    border-radius: 18px;
    .mainTitle {
      display: flex;
      justify-content: space-between;
      .NumberOfQuestions {
        font-size: 30px;
        font-weight: bold;
        color: rgb(77, 75, 75);
        span {
          font-size: 48px;
          color: #237ff8;
        }
      }
      .Aim {
        font-weight: bold;
        display: flex;
        font-weight: bold;
        align-items: center;
        color: #237ff8;
        font-size: 18px;
        .van-icon {
          font-size: 24px;
        }
        .van-count-down {
          margin-top: 2px;
          font-size: 20px;
          margin-left: 4px;
          color: #237ff8;
        }
      }
    }
    .questions {
      h3 {
        color: #333333;
        font-size: 35px;
      }
      h4 {
        color: #999999;
        font-size: 25px;
      }
    }
    .van-cell {
      padding: 0;
    }
    .completion {
      color: #333333;
      h4 {
        color: #999999;
        font-size: 25px;
      }
      div {
        margin-top: 5px;
        font-size: 31px;
        line-height: 55px;
      }
      .tips {
        color: #f37a4c;
        font-size: 29px;
        margin-top: 20px;
      }
      .van-field {
        border-bottom: 1px solid black;
        display: inline-block;
        width: 100px;
      }
    }
    .answerOptions {
      div {
        background-color: #f9f9f9;
        border-radius: 10px;
        color: #666666;
        font-size: 30px;
        margin: 25px 0;
        display: flex;
        padding: 11px;
        line-height: 55px;
        span {
          color: #666666;
          display: block;
          margin-top: 3px;
          width: 21px;
        }
      }
    }
  }
}
footer {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  position: fixed;
  bottom: 32px;
  .van-button {
    height: 48px;
  }
  .btn {
    display: flex;
    justify-content: space-between;
    .van-button {
      height: 48px;
      width: 164px;
    }
  }
}
</style>