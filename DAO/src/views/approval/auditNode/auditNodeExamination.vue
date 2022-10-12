<template>
  <div class="bigbox">
    <header>
      <van-nav-bar fixed
                   placeholder
                   :title="title"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <div class="body">
      <div class="main">
        <div class="mainTitle">
          <div class="NumberOfQuestions">
            <span>{{ count }}</span>/{{ testQuestionData.length }}
          </div>
          <div class="Aim">
            <van-icon name="aim"
                      color="#237FF8" />
            <van-count-down :time="time"
                            format="mm:ss"
                            @finish="finish" />
          </div>
        </div>
        <div v-show="index + 1 == count"
             v-for="(item, index) in testQuestionData"
             :key="item.id">
          <div v-if="item.topicType != '(填空题)' && item.topicType != '(Completion)'">
            <div class="questions">
              <h3>{{ item.questionContant }}</h3>
              <h4>{{ item.topicType }}</h4>
            </div>
            <div class="answerOptions"
                 v-for="(el, index) in item.questionAnswer"
                 :key="index">
              <div @click="handleCilck(el, item, index)"
                   :class="flag && el.Check ? 'bg' : ''">
                <span>{{ el.title }}</span>{{ el.contant }}
              </div>
            </div>
          </div>
          <div class="completion"
               v-if="item.topicType == '(填空题)' || item.topicType == '(Completion)'">
            <h4>{{ item.topicType }}</h4>
            <div class="filed">
              {{ item.questionContant[0] }}
              <van-field v-model="item.result"
                         input-align="center"
                         @input="getText(item)" />{{ item.questionContant[1] }}
            </div>
            <div class="tips">{{$t("exam.blank")}}</div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <van-button round
                  block
                  :disabled="jumpTestQuestions"
                  color="#1B2945"
                  v-if="count == 1"
                  @click="nextQuestion(count - 1)">{{$t("exam.next")}}</van-button>
      <div class="btn"
           v-if="count > 1 && count < testQuestionData.length">
        <van-button round
                    type="default"
                    @click="previousQuestion">{{$t("exam.pre")}}</van-button>
        <van-button round
                    color="#1B2945"
                    :disabled="nextDisabled"
                    @click="nextQuestion(count - 1)">{{$t("exam.next")}}</van-button>
      </div>
      <van-button round
                  block
                  color="#1B2945"
                  v-if="count == testQuestionData.length"
                  :loading="loading"
                  :disabled="submitDisabled"
                  @click="SubmitExaminationPapers(count - 1)">{{$t("exam.submit")}}</van-button>
    </footer>
  </div>
</template>
<script>
import { Dialog } from 'vant'
export default {
  data() {
    return {
      show: false,
      showFraction: true,
      text: '',
      idx: null,
      flag: false,
      jumpTestQuestions: true,
      title: this.$t('exam._title'),
      time: 30 * 60 * 1000,
      count: 1,
      totalScore: null,
      UserAnswer: [],
      loading: false,
      nextDisabled: true,
      submitDisabled: true,
      testQuestionData: this.$t('exam.testQuestionData'),
    }
  },
  methods: {
    onClickLeft() {
      Dialog.confirm({
        title: this.$t('exam.quittitle'),
        message: this.$t('exam.quitmessage'),
        confirmButtonText: this.$t('exam.Text1'),
        cancelButtonText: this.$t('exam.Text2'),
      })
        .then(() => {
          this.$router.push({
            name: 'applicationConditions',
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    handleCilck(val, item, index) {
      this.idx = index
      this.jumpTestQuestions = false
      this.flag = true
      if (
        item.topicType == '(多选题)' ||
        item.topicType == '(multiple choice)'
      ) {
        let reindex = item.result.indexOf(val.contant)
        reindex == -1
          ? item.result.push(val.contant)
          : item.result.splice(reindex, 1)
        item.questionAnswer.forEach((element, index) => {
          if (index == this.idx) {
            element.Check = !element.Check
          }
        })
        let a = item.questionAnswer.filter((el) => el.Check)
        a.length >= 2 ? (this.nextDisabled = false) : (this.nextDisabled = true)
      } else {
        item.result = val.contant
        if (this.count >= 2 && this.count < 9) this.nextDisabled = false
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
      this.count--
      this.nextDisabled = false
    },
    nextQuestion(index) {
      this.idx = null
      this.text = ''
      if (
        !this.testQuestionData[index].result ||
        this.testQuestionData[index].result === '' ||
        this.testQuestionData[index].result == null
      ) {
        return
      } else {
        if (
          this.testQuestionData[index].topicType == '(多选题)' ||
          this.testQuestionData[this.count - 1].topicType == '(multiple choice)'
        ) {
          let CheckArr = []
          this.testQuestionData[index].questionAnswer.forEach((element) => {
            if (element.Check == true) CheckArr.push(element.Check)
          })
          if (CheckArr.length <= 1) {
            return
          } else {
            this.count++
            this.nextDisabled = true
            if (this.testQuestionData[this.count - 1].result.length >= 2) {
              this.nextDisabled = false
            }
            if (
              this.count == 6 &&
              this.testQuestionData[this.count - 1].result != ''
            ) {
              this.nextDisabled = false
            }
          }
        } else {
          this.count++
          this.nextDisabled = true
          if (this.testQuestionData[this.count - 1].result != '') {
            if (this.count == 4) {
              if (this.testQuestionData[this.count - 1].result.length >= 2)
                this.nextDisabled = false
            } else {
              this.nextDisabled = false
            }
          }
        }
      }
    },
    SubmitExaminationPapers(index) {
      if (
        !this.testQuestionData[index].result ||
        this.testQuestionData[index].result === '' ||
        this.testQuestionData[index].result == null
      ) {
        return
      } else {
        this.testQuestionData.forEach((el) => {
          if (el.topicType != '(填空题)' && el.topicType != '(Completion)') {
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
        this.loading = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$router.replace({
            name: 'applicationConditions',
            params: {
              totalScore: this.totalScore,
            },
          })
        }, 1000)
      }
    },
    getText(item) {
      this.$nextTick(() => {
        if (item.result != '') {
          if (item.id == 12) {
            this.submitDisabled = false
          }
          this.nextDisabled = false
        } else {
          this.nextDisabled = true
          if (item.id == 12) {
            this.submitDisabled = true
          }
        }
      })
    },
    finish() {
      Dialog.alert({
        title: this.$t('exam.timeoverT'),
        message: this.$t('exam.timeoverMsg'),
      }).then(() => {
        this.$router.push({
          name: 'applicationConditions',
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.van-nav-bar .van-icon {
  color: #000;
}
.van-button {
  display: inline-block !important;
}

::deep.van-nav-bar__title {
  font-size: 36px;
  font-weight: bold;
}
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
.bigbox {
  background-color: #f3f4f5;
  height: 100vh;
}
.body {
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
        padding: 35px 0 18px 0;
        color: #333333;
        font-size: 35px;
        line-height: 60px;
      }
      h4 {
        color: #999999;
        font-size: 25px;
        padding: 0 0 20px 0;
      }
    }
    .van-cell {
      padding: 0;
    }
    .completion {
      color: #333333;
      h4 {
        padding: 30px 0 0 0;
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
  bottom: 50px;
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