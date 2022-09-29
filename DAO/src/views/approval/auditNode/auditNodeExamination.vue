<template>
  <div>
    <header>
      <white :title="title"></white>
    </header>
    <div class="body">
      <div class="main">
        <div class="mainTitle">
          <div class="NumberOfQuestions"><span>{{count}}</span>/{{testQuestionData.length}}</div>
          <div class="Aim">
            <van-icon name="aim"
                      color="#237FF8" />
            <van-count-down :time="time"
                            format="HH:mm" />
          </div>
        </div>
        <div v-show="(index+1) == count"
             v-for="(item,index) in testQuestionData"
             :key="item.id">
          <div v-if="item.topicType!='(填空题)'">
            <div class="questions">
              <h3>{{item.questionContant}}</h3>
              <h4>{{item.topicType}}</h4>
            </div>
            <div class="answerOptions"
                 v-for="(el,index) in item.questionAnswer"
                 :key="index">
              <div @click="handleCilck(el,item,index)"
                   :class="flag && el.Check? 'bg' : ''"><span>{{el.title}}</span>{{el.contant}}</div>
            </div>
          </div>
          <div class="completion"
               v-if="item.topicType=='(填空题)'">
            <h4>{{item.topicType}}</h4>
            <div class="filed">{{item.questionContant[0]}}
              <van-field v-model="text"
                         @blur="getText(item)" />{{item.questionContant[1]}}
            </div>
            <div class="tips">在横线输入您的答案</div>
          </div>
        </div>

      </div>
    </div>
    <footer>
      <van-button round
                  block
                  :disabled="jumpTestQuestions"
                  color="#1B2945"
                  v-if="count==1"
                  @click="nextQuestion(count-1)">下一题</van-button>
      <div class="btn"
           v-if="count>1&& count<testQuestionData.length">
        <van-button round
                    type="default"
                    @click="previousQuestion">上一题</van-button>
        <van-button round
                    color="#1B2945"
                    @click="nextQuestion(count-1)">下一题</van-button>
      </div>
      <van-button round
                  block
                  color="#1B2945"
                  v-if="count==testQuestionData.length"
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
      show: false,
      showFraction: true,
      text: '',
      idx: null,
      flag: false,
      jumpTestQuestions: true,
      title: '仲裁考试',
      time: 30 * 60 * 60 * 1000,
      count: 1,
      totalScore: null,
      UserAnswer: [],
      testQuestionData: [
        {
          id: 1,
          question: '题目一',
          questionContant: '交易中，买家打款备注交易相关信息会被判定？',
          topicType: '(单选题)',
          result: '',
          isTrue: false,
          questionAnswer: [
            {
              title: 'A、',
              contant: '作恶交易',
              Check: false,
            },
            {
              title: 'B、',
              contant: '洗黑钱',
              Check: false,
            },
            {
              title: 'C、',
              contant: '非法交易',
              Check: false,
            },
          ],
          Answers: 0,
        },
        {
          id: 2,
          question: '题目二',
          questionContant: '系统根据信用评分，默认收款后多少小时放币？',
          topicType: '(单选题)',
          result: '',
          questionAnswer: [
            {
              title: 'A、',
              contant: '12-24小时',
              Check: false,
            },
            {
              title: 'B、',
              contant: '24-48小时',
              Check: false,
            },
            {
              title: 'C、',
              contant: '36-48小时',
              Check: false,
            },
          ],
          Answers: 1,
        },
        {
          id: 3,
          question: '题目三',
          questionContant: '卖家在什么期间内可以发起黑钱仲裁？',
          topicType: '(单选题)',
          result: '',
          questionAnswer: [
            {
              title: 'A、',
              contant: '买家付款后12个月后',
              Check: false,
            },
            {
              title: 'B、',
              contant: '卖家收款后3个月后',
              Check: false,
            },
            {
              title: 'C、',
              contant: '卖家收款后6个月内',
              Check: false,
            },
          ],
          Answers: 2,
        },
        {
          id: 4,
          question: '题目四',
          questionContant: '买家打款备注违规会进行什么处理？',
          topicType: '(多选题)',
          result: '',
          questionAnswer: [
            {
              title: 'A、',
              contant: '判定作恶交易',
              Check: false,
            },
            {
              title: 'B、',
              contant: '打出款项冻结',
              Check: false,
            },
            {
              title: 'C、',
              contant: '质押代币全部罚没',
              Check: false,
            },
            {
              title: 'D、',
              contant: '连坐扣分',
              Check: false,
            },
          ],
          Answers: 3,
        },
        {
          id: 5,
          question: '题目五',
          questionContant: '仲裁中以下哪些属于有效举证？',
          topicType: '(多选题)',
          result: '',
          questionAnswer: [
            {
              title: 'A、',
              contant: '双方聊天记录',
              Check: false,
            },
            {
              title: 'B、',
              contant: '银行电子回单',
              Check: false,
            },
            {
              title: 'C、',
              contant: '微信支付转账电子凭证',
              Check: false,
            },
            {
              title: 'D、',
              contant: '支付宝电子回单',
              Check: false,
            },
          ],
          Answers: 3,
        },
        {
          id: 6,
          question: '题目六',
          questionContant: '系统根据信用评分，默认收款后12-24小时放币？',
          topicType: '(判断题)',
          result: '',
          questionAnswer: [
            {
              title: 'A、',
              contant: '对',
              Check: false,
            },
            {
              title: 'B、',
              contant: '错',
              Check: false,
            },
          ],
          Answers: 1,
        },
        {
          id: 7,
          question: '题目七',
          questionContant: '打款不需要使用DID实名的同名账户打款？',
          topicType: '(判断题)',
          result: '',
          questionAnswer: [
            {
              title: 'A、',
              contant: '对',
              Check: false,
            },
            {
              title: 'B、',
              contant: '错',
              Check: false,
            },
          ],
          Answers: 1,
        },
        {
          id: 8,
          question: '题目八',
          questionContant: '仲裁DAO不支持异名打款仲裁？',
          topicType: '(判断题)',
          result: '',
          questionAnswer: [
            {
              title: 'A、',
              contant: '对',
              Check: false,
            },
            {
              title: 'B、',
              contant: '错',
              Check: false,
            },
          ],
          Answers: 0,
        },
        {
          id: 9,
          question: '题目九',
          questionContant: ['超时放币', '内无需仲裁，系统自动扣分.'],
          topicType: '(填空题)',
          result: '',
          Answers: '30分钟',
        },
        {
          id: 10,
          question: '题目十',
          questionContant: ['系统自动扣分后超时60分钟以上可申请', ''],
          topicType: '(填空题)',
          result: '',
          Answers: '仲裁放币',
        },
        {
          id: 11,
          question: '题目十一',
          questionContant: ['交易中卖家放币时间提前，由此引发的损失', '承担'],
          topicType: '(填空题)',
          result: '',
          Answers: '自行',
        },
        {
          id: 12,
          question: '题目十二',
          questionContant: ['买家申请已打款仲裁，需要提供具有', '的打款凭证'],
          topicType: '(填空题)',
          result: '',
          Answers: '法律效力',
        },
      ],
    }
  },
  methods: {
    handleCilck(val, item, index) {
      // console.log(val.contant, index, count, item)
      item.result = val.contant
      this.idx = index
      this.jumpTestQuestions = false
      this.flag = true
      if (item.topicType == '(多选题)') {
        item.questionAnswer.forEach((element, index) => {
          if (index == this.idx) {
            element.Check = !element.Check
          }
        })
      } else {
        item.questionAnswer.forEach((element, index) => {
          if (index == this.idx) {
            element.Check = true
          } else {
            element.Check = false
          }
        })
      }
    },
    previousQuestion() {
      console.log('上一题')
      this.count--
    },
    nextQuestion(index) {
      console.log('下一题', index)
      this.idx = null
      this.text = ''
      if (
        !this.testQuestionData[index].result ||
        this.testQuestionData[index].result === '' ||
        this.testQuestionData[index].result == null
      ) {
        return
      } else {
        if (this.testQuestionData[index].topicType == '(多选题)') {
          let CheckArr = []
          this.testQuestionData[index].questionAnswer.forEach((element) => {
            if (element.Check == true) CheckArr.push(element.Check)
          })
          if (CheckArr.length == 1) {
            return
          } else {
            this.count++
          }
        } else {
          this.count++
        }
      }
    },
    SubmitExaminationPapers() {
      this.testQuestionData.forEach((el) => {
        console.log(el.questionAnswer)
        if (el.topicType != '(填空题)') {
          let a = []
          el.questionAnswer.forEach((item, idx) => {
            if (item.Check) {
              a.push(idx)
            }
          })
          this.UserAnswer.push(a)
        } else {
          this.UserAnswer.push([el.result])
        }
      })
      this.UserAnswer.map((el, index) => {
        for (let i = 0; i < el.length; i++) {
          if (el.length == 4) {
            el = [3]
          }
          if (el.length >= 2 && el.length <= 3) {
            el = [0]
          }
          console.log(el, 'el')
          if (el[i] == this.testQuestionData[index].Answers) {
            if (index == 3 || index == 4) {
              this.totalScore += 10
            } else {
              this.totalScore += 8
            }
          }
        }
      })
      //提交表单
      this.$router.replace({
        name: 'applicationConditions',
        params: {
          totalScore: this.totalScore,
        },
      })
      console.log(this.totalScore, 'totalScore')
    },
    getText(item) {
      item.result = this.text
    },
  },
  mounted() {
    if (this.time <= 0) {
      this.$router.push({
        name: 'applicationConditions',
      })
    }
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
  height: 100vh;
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
        line-height: 60px;
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
        display: inline-block;
        width: 100px;
      }
      ::v-deep .van-field__control {
        border-bottom: 1px solid black;
      }
    }
    .answerOptions {
      div {
        background-color: #f9f9f9;
        border-radius: 20px;
        color: #666666;
        font-size: 30px;
        margin: 25px 0;
        display: flex;
        padding: 11px 30px;
        line-height: 55px;
        span {
          color: #666666;
          display: block;
          width: 40px;
        }
      }
      .bg {
        background-color: #e8f1fe;
        color: #227aee;
        span {
          color: #227aee;
        }
      }
    }
  }
}
footer {
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
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