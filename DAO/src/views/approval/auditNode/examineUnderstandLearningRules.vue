<template>
  <div>
    <header>
      <white :title="title"></white>
    </header>
    <div class="rulesBox "
         ref="rulesBox">
      <div class="BasicRules">
        <h3>{{$t("learningRules2.rulstitle1")}}</h3>
        <div>
          {{$t("learningRules2.rus1")}}
        </div>
        <div>
          {{$t("learningRules2.rus2")}}
        </div>
        <div>
          {{$t("learningRules2.rus3")}}
        </div>
        <div>
          {{$t("learningRules2.rus4")}}
        </div>
        <div>
          {{$t("learningRules2.rus5")}}
        </div>
        <div>
          {{$t("learningRules2.rus6")}}
        </div>
        <div>
          {{$t("learningRules2.rus7")}}
        </div>
      </div>
      <div class="DeductionRules">
        <h3>{{$t("learningRules2.rulstitle2")}}</h3>
        <div>
          {{$t("learningRules2._rus1title")}}
          <div> {{$t("learningRules2._rus1content1")}}</div>
        </div>

      </div>
    </div>
    <footer ref="footer">
      <van-button round
                  block
                  color="#1B2945"
                  :disabled="flag"
                  @click="completeLearning"> {{$t("learningRules2.btnmsg")}}</van-button>
    </footer>
  </div>
</template>
<script>
import white from '@/components/Nav/white.vue'
export default {
  components: { white },
  data() {
    return {
      title: this.$t('learningRules.title1'),
      examinequalificationPassed3: true,
      flag: true,
    }
  },
  // 滚动监听
  mounted() {
    this.$nextTick(() => {
      const footerHeight = this.$refs.footer.offsetHeight
      const height = window.innerHeight - 30
      this.$refs.rulesBox.style.height = `calc(${height}px  - ${footerHeight}px )`
    })
    this.$refs.rulesBox.addEventListener('scroll', this.rulesScroll) // 监听页面滚动
  },
  methods: {
    completeLearning() {
      this.$router.push({
        name: 'applicationConditions',
        params: {
          examinequalificationPassed3: this.examinequalificationPassed3,
        },
      })
    },
    rulesScroll(e) {
      if (
        e.target.scrollTop + e.target.clientHeight >=
        e.target.scrollHeight - 5
      )
        this.flag = false
    },
  },
}
</script>
<style lang="scss" scoped>
.rulesBox {
  color: #333333;
  background-color: #fff;
  padding: 0 25px;
  // height: 82vh;
  overflow: auto;
  .BasicRules,
  .DeductionRules {
    h3 {
      font-size: 35px;
      padding: 20px 0;
    }
    div {
      font-size: 27px;
      margin-bottom: 20px;
    }
  }
  .BasicRules {
    div {
      line-height: 50px;
    }
  }
  .DeductionRules {
    div {
      line-height: 50px;
      div {
        line-height: 50px;
      }
    }
  }
}
footer {
  width: 100%;
  min-height: 200px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 50px 28px 20px 28px;
  position: fixed;
  bottom: 0;
}
</style>