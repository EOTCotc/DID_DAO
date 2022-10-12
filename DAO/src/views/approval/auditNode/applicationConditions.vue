<template>
  <div :class="displayApplicationConditions ? 'box2' : 'box'">
    <header>
      <white :title="title"
             :name="name"></white>
    </header>
    <div class="backgroundPicture">
      <van-image width="100vw"
                 height="140px"
                 :src="require('./IMG/bg.png')" />
      <div class="text"
           v-if="displayApplicationConditions">
        <p>{{ $t("becomeAnArbitrator.text3") }}</p>
        <p>{{ $t("becomeAnArbitrator.text2") }}</p>
      </div>
      <div class="text2"
           v-else>
        <p>{{ $t("becomeAnArbitrator.text2") }}</p>
      </div>
    </div>
    <div v-if="displayApplicationConditions">
      <div class="applicationConditions">
        <h4>{{ $t("becomeAnArbitrator.title2") }}</h4>
        <div class="conditionsList">
          <div class="list list1">
            <div class="left">
              <van-image width="22px"
                         height="20px"
                         fit="contain"
                         :src="require('../../../assets/img/zshen.png')" />
              <p>{{ $t("becomeAnArbitrator.list1") }}</p>
            </div>
            <div class="right"
                 @click="didNot"
                 v-if="examinequalificationPassed1 == false">
              {{ $t("becomeAnArbitrator.right1") }}
              <van-icon name="arrow" />
            </div>
            <div class="right"
                 v-else>
              <van-icon name="success"
                        color="#1D9C3F "
                        size="20" />
            </div>
          </div>
          <div class="list">
            <div class="left">
              <van-image width="22px"
                         height="22px"
                         fit="contain"
                         :src="require('../../../assets/img/zya.png')" />
              <p>{{ $t("becomeAnArbitrator.list2") }}</p>
            </div>
            <div class="right"
                 v-if="examinequalificationPassed2 == false"
                 @click="pledge">
              {{ $t("becomeAnArbitrator.right2") }}
              <van-icon name="arrow" />
            </div>
            <div class="right"
                 v-else>
              <van-icon name="success"
                        color="#1D9C3F "
                        size="20" />
            </div>
          </div>
          <div class="list">
            <div class="left">
              <van-image width="21px"
                         height="20px"
                         fit="contain"
                         :src="require('../../../assets/img/stay.png')" />
              <p>{{ $t("becomeAnArbitrator._list3") }}</p>
            </div>
            <div class="right"
                 @click="auditing('examineUnderstandLearningRules')"
                 v-if="examinequalificationPassed3 == false">
              {{ $t("becomeAnArbitrator.right3") }}
              <van-icon name="arrow" />
            </div>
            <div class="right"
                 v-else>
              <van-icon name="success"
                        color="#1D9C3F "
                        size="20" />
            </div>
          </div>
          <div class="list listn">
            <div class="left">
              <van-image width="21px"
                         height="20px"
                         fit="contain"
                         :src="require('../../../assets/img/kao.png')" />
              <div class="examinationColumn">
                <span>{{ $t("becomeAnArbitrator.list4text1") }}</span><span style="color: #999999; font-size: 13px; margin-top: 3px">{{ $t("becomeAnArbitrator.list4text2") }}</span>
              </div>
            </div>
            <div class="right"
                 @click="ExamTips"
                 v-if="examinequalificationPassed4 == false">
              {{ $t("becomeAnArbitrator.right4") }}
              <van-icon name="arrow" />
            </div>
            <div class="right"
                 v-else>
              <van-icon name="success"
                        color="#1D9C3F "
                        size="20" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="displayApplicationConditions == false">
      <div class="identityCard">
        <div class="top">
          <div>
            <div class="first">
              <van-image width="40"
                         height="30"
                         :src="require('./IMG/组 490@2x.png')" />
              <span> {{ $t("becomeAnArbitrator.title4") }}</span>
            </div>
            <div>{{ ArbitratorsIdentityInformation.name }}</div>
          </div>
          <div>
            <div>{{ $t("becomeAnArbitrator.identifNumber") }}</div>
            <div>{{ ArbitratorsIdentityInformation.number }}</div>
          </div>
          <div>
            <div>{{ $t("becomeAnArbitrator.identityTtime") }}</div>
            <div>
              {{
                $dayjs(ArbitratorsIdentityInformation.createDate)
                  .utc()
                  .format("YYYY-MM-DD hh:mm:ss")
              }}
            </div>
          </div>
        </div>
        <div class="bottom">
          <div>
            <div>{{ $t("becomeAnArbitrator._processaudit") }}</div>
            <div>{{ ArbitratorsIdentityInformation.examineNum }}</div>
          </div>
          <div class="line"></div>
          <div>
            <div>{{ $t("becomeAnArbitrator.eotc") }}</div>
            <div>{{ ArbitratorsIdentityInformation.eotc }}</div>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="show"
                 closeOnClickOverlay="true">
      <div class="wrapper"
           @click.stop>
        <div class="block">
          <van-button color="linear-gradient(to right, #3EBDFF, #006BF8)"
                      size="large ">
            {{ $t("becomeAnArbitrator.explain") }}
          </van-button>
          <van-button color="#F3F4F5 "
                      style="color: #333333">
            {{ $t("becomeAnArbitrator.ruls") }}</van-button>
          <div class="middle">
            <div class="middleTitle">
              <p>{{ $t("becomeAnArbitrator.titleNumber") }}</p>
              <p class="p2">
                <span>{{ $t("becomeAnArbitrator.titleNumbertext1") }}</span>{{ $t("becomeAnArbitrator.titleNumbertext2") }}
              </p>
            </div>
            <div class="line"></div>
            <div class="middleTitle">
              <p>{{ $t("becomeAnArbitrator.testTime") }}</p>
              <p class="p2">
                <span>{{ $t("becomeAnArbitrator.testTimetext1") }}</span>{{ $t("becomeAnArbitrator.testTimetext2") }}
              </p>
            </div>
          </div>
          <van-button color="#237FF8"
                      class="startBtn"
                      @click="auditing('auditNodeExamination')">{{ $t("becomeAnArbitrator.start") }}</van-button>
          <van-icon name="close"
                    color="#fff"
                    size="29"
                    @click="show = false" />
        </div>
      </div>
    </van-overlay>
    <notification1 ref="notification1"
                   :class="this.title1 >= 90 ? 'dti1' : ' dti2'"
                   :buttonText="buttonText1"
                   :buttonColor="buttonColor1"
                   :headerIcon="headerIcon1"
                   :title="title1 + $t('becomeAnArbitrator.point')"
                   :message="message1"
                   :closeOnClick="closeOnClick"></notification1>
    <notification2 ref="notification2"
                   :buttonText="buttonText2"
                   :buttonColor="buttonColor2"
                   :headerIcon="headerIcon2"
                   :title="title2"
                   :message="message2"
                   :closeOnClick="closeOnClick"
                   @buttonClick="buttonClick"></notification2>
    <footer>
      <van-button round
                  block
                  type="info"
                  color="#1B2945"
                  :disabled="!examinequalificationPassed"
                  @click="applyNow"
                  v-if="displayApplicationConditions">{{ $t("becomeAnArbitrator.applyimmediately") }}</van-button>
      <van-button round
                  block
                  type="info"
                  color="#fff"
                  @click="dismissal"
                  v-if="displayApplicationConditions == false"
                  class="vanbtn">{{ $t("becomeAnArbitrator.relieve") }}</van-button>
    </footer>
  </div>
</template>
<script>
import white from '@/components/Nav/white.vue'
import { getuSereotc } from '@/api/earnings'
import notification1 from '@/components/notification.vue'
import notification2 from '@/components/notification.vue'
import {
  becomeAnAuditor,
  getUnapprovedInformation,
  disapproveIdentity,
} from '@/api/BecomeAnAuditor'
import icon1 from './IMG/icon.png'
import icon2 from './IMG/icon2.png'
import icon3 from './IMG/icon3.png'
import { Dialog } from 'vant'
export default {
  components: {
    white,
    notification1,
    notification2,
  },
  data() {
    return {
      title: this.$t('becomeAnArbitrator.title4'),
      name: 'approval',
      isExamine: +localStorage.getItem('isExamine'),
      ArbitratorsIdentityInformation: {},
      show: false,
      showFraction: false,
      applynow: false,
      authType: +localStorage.getItem('authType'),
      displayApplicationConditions: false,
      examinequalificationPassed: Boolean(
        localStorage.getItem('examinequalificationPassed')
      ),
      examinequalificationPassed1: Boolean(
        localStorage.getItem('examinequalificationPassed1')
      ),
      examinequalificationPassed2: Boolean(
        localStorage.getItem('examinequalificationPassed2')
      ),
      examinequalificationPassed3: Boolean(
        localStorage.getItem('examinequalificationPassed3')
      ),
      examinequalificationPassed4: Boolean(
        localStorage.getItem('examinequalificationPassed4')
      ),
      title1: null,
      message1: '',
      buttonColor1: '#237FF8',
      buttonText1: this.$t('becomeAnArbitrator.know'),
      headerIcon1: '',
      closeOnClick: true,
      title2: null,
      message2: '',
      buttonColor2: '#237FF8',
      buttonText2: this.$t('becomeAnArbitrator.know'),
      headerIcon2: '',
      closeOnClick2: true,
    }
  },
  created() {
    getuSereotc().then((res) => {
      if (res.data.items >= 5000) {
        this.examinequalificationPassed2 = true
        localStorage.setItem('examinequalificationPassed2', true)
      }
    })
  },
  mounted() {
    if (this.authType == 2) {
      this.examinequalificationPassed1 = true
      localStorage.setItem('examinequalificationPassed1', true)
    }
    this.isExamine == 0
      ? (this.displayApplicationConditions = true)
      : (this.displayApplicationConditions = false)
    if (this.isExamine == 1) {
      getUnapprovedInformation().then((res) => {
        this.ArbitratorsIdentityInformation = res.data.items
      })
    }
    this.title1 = this.$route.params.totalScore + ''
    if (this.title1 != 'undefined') {
      this.$nextTick().then(() => {
        this.$refs.notification1.toggle(true)
      })
    }
    if (this.title1 >= 90) {
      this.title1 = this.title1
      this.headerIcon1 = icon1
      this.message1 = this.$t('becomeAnArbitrator._message1')
      this.examinequalificationPassed4 = true
      localStorage.setItem('examinequalificationPassed4', true)
    } else {
      this.title1 = this.title1
      this.headerIcon1 = icon2
      this.message1 = this.$t('becomeAnArbitrator._message2')
    }
    if (this.$route.params.examinequalificationPassed3 != undefined) {
      localStorage.setItem(
        'examinequalificationPassed3',
        this.$route.params.examinequalificationPassed3
      )
      this.examinequalificationPassed3 = localStorage.getItem(
        'examinequalificationPassed3'
      )
    }
    if (
      this.examinequalificationPassed1 &&
      this.examinequalificationPassed2 &&
      this.examinequalificationPassed3 &&
      this.examinequalificationPassed4
    ) {
      this.examinequalificationPassed = true
      localStorage.setItem('examinequalificationPassed', true)
    }
  },
  methods: {
    didNot() {
      Dialog.alert({
        title: this.$t('becomeAnArbitrator.idcardtitle'),
        message: this.$t('becomeAnArbitrator.idcardmessage'),
        confirmButtonText: this.$t('becomeAnArbitrator.know'),
      }).then(() => {
        // on close
      })
    },
    pledge() {
      Dialog.alert({
        title: this.$t('becomeAnArbitrator.pledgetitle'),
        message: this.$t('becomeAnArbitrator.pledgemessage'),
        confirmButtonText: this.$t('becomeAnArbitrator.know'),
      }).then(() => {
        // on close
      })
    },
    auditing(name) {
      this.$router.push({
        name: name,
      })
    },
    buttonClick() {
      this.displayApplicationConditions = false
      this.isExamine = 1
      becomeAnAuditor().then(() => {
        getUnapprovedInformation().then((res) => {
          localStorage.setItem('isExamine', 1)
          this.ArbitratorsIdentityInformation = res.data.items
        })
        this.displayApplicationConditions = false
        this.isExamine = 1
      })
    },
    ExamTips() {
      this.show = true
    },
    applyNow() {
      this.$refs.notification2.toggle(true)
      this.headerIcon2 = icon3
      this.title2 = this.$t('becomeAnArbitrator.approved')
      this.message2 = this.$t('becomeAnArbitrator._approvedmsg')
      this.buttonColor2 = '#237FF8'
      this.buttonText2 = this.$t('becomeAnArbitrator.approvedbText2')
      this.closeOnClick = true
    },

    dismissal() {
      Dialog.confirm({
        title: this.$t('becomeAnArbitrator.relievetitle3'),
        message: this.$t('becomeAnArbitrator._relievemsg'),
        confirmButtonText: this.$t('becomeAnArbitrator.know'),
        confirmButtonColor: '#1B2945',
        cancelButtonText: this.$t('becomeAnArbitrator.think'),
        cancelButtonColor: '#666666 ',
        className: 'dismissalDialog',
        getContainer: '.box',
      })
        .then(() => {
          // on confirm
          Dialog.confirm({
            title: this.$t('becomeAnArbitrator.relievetitle4'),
            message: this.$t('becomeAnArbitrator._relievemssg'),
            confirmButtonText: this.$t('exam.Text1'),
            cancelButtonText: this.$t('exam.Text2'),
            confirmButtonColor: '#1B2945',
            cancelButtonColor: '#666666 ',
            className: 'dismissalDialog',
            getContainer: '.box',
          })
            .then(() => {
              this.displayApplicationConditions = true
              this.isExamine = 0
              localStorage.setItem('isExamine', 0)
              localStorage.removeItem('examinequalificationPassed1')
              localStorage.removeItem('examinequalificationPassed2')
              localStorage.removeItem('examinequalificationPassed3')
              localStorage.removeItem('examinequalificationPassed4')
              localStorage.removeItem('examinequalificationPassed')
              this.examinequalificationPassed1 = Boolean(
                localStorage.getItem('examinequalificationPassed1')
              )
              this.examinequalificationPassed2 = Boolean(
                localStorage.getItem('examinequalificationPassed2')
              )
              this.examinequalificationPassed3 = Boolean(
                localStorage.getItem('examinequalificationPassed3')
              )
              this.examinequalificationPassed4 = Boolean(
                localStorage.getItem('examinequalificationPassed4')
              )
              this.examinequalificationPassed = Boolean(
                localStorage.getItem('examinequalificationPassed')
              )
              disapproveIdentity()
              // on confirm
            })
            .catch(() => {
              // on cancel
            })
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.box {
  background-color: #f3f4f5;
  height: 100vh;
}
.box {
  ::v-deep .van-dialog__message--has-title {
    color: #f37a4c !important;
  }
}
.box2 {
  background-color: #fff;
  height: 100vh;
}

.dti2 {
  ::v-deep .dialog-title {
    color: #999999;
  }
  ::v-deep .dialog_wrap .dialog-header-icon[data-v-2c0d290a] {
    width: 280px;
  }
}
.dti1 {
  ::v-deep .dialog-title {
    color: #237ff8;
  }
  ::v-deep .dialog_wrap .dialog-header-icon[data-v-2c0d290a] {
    width: 280px;
  }
}
.dismissalDialog {
  .van-dialog__header {
    color: #333333;
    font-weight: bold;
    font-size: 24px;
  }
}
.identityCard {
  padding: 0 35px;
  position: relative;
  top: -165px;
  left: 0;
  .top {
    background: linear-gradient(#e9ecff, #b4b0f3);
    border-radius: 20px;
    height: 263px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28px;
      padding: 6px 15px;
      color: #333333;
      .first {
        font-weight: bold;
        font-size: 35px;
        color: #191653;
        padding: 20px 0;
      }
    }
  }
  .bottom {
    background-color: #fff;
    margin-top: 30px;
    border-radius: 20px;
    height: 128px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    div {
      &:nth-child(1) {
        font-size: 30px;
      }
      &:nth-child(2) {
        font-size: 36px;
        font-weight: bold;
        span {
          font-size: 24px;
          display: inline-block;
        }
      }
      div {
        padding: 8px 0;
      }
    }
    .line {
      width: 1px;
      height: 50px;
      background: #f3f4f5;
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  position: relative;
  width: 545px;
  height: 490px;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-button:nth-child(1) {
    width: 170px;
    height: 45px;
    border-radius: 5px 5px 20px 20px;
    margin-top: -7px;
    font-size: 18px;
  }
  .van-button:nth-child(2) {
    .van-button__text {
      color: #333333;
    }
    width: 109px;
    height: 30px;
    margin-top: 17px;
    border-radius: 15px;
    color: #333333;
    font-size: 14px;
  }
  .startBtn {
    width: 310px;
    height: 88px;
    margin-top: 28px;
    border-radius: 44px;
    font-size: 34px;
  }
  .van-icon {
    position: absolute;
    bottom: -48px;
  }
  .middle {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #666666;
    margin-top: 10px;
    width: 100%;
    height: 35%;
    .middleTitle {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 31px;
      .p2 {
        color: #333333;
        margin-top: 30px;
        span {
          font-size: 45px;
          font-weight: bold;
        }
      }
    }
    .line {
      width: 1px;
      height: 80px;
      background-color: #ecebeb;
    }
  }
}
.backgroundPicture {
  position: relative;
  .text {
    color: #fff;
    width: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    line-height: 55px;
    transform: translateX(-50%);
    text-align: center;
    p:nth-of-type(1) {
      font-size: 50px;
      margin: 60px 0 15px 0;
    }
    p:nth-of-type(2) {
      font-size: 27px;
    }
  }
  .text2 {
    color: #fff;
    position: absolute;
    top: 0;
    left: 50%;
    margin-top: 40px;
    transform: translateX(-50%);
    text-align: center;
    font-size: 30px;
    width: 100%;
  }
}
.applicationConditions {
  color: #333333;
  padding: 0 35px;
  h4 {
    font-size: 34px;
    padding: 30px 5px 35px 5px;
  }
  .conditionsList {
    background-color: #f3f4f5;
    min-height: 450px;
    border-radius: 25px;
    padding: 25px 0;
    box-sizing: border-box;
    .list {
      padding: 27px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 6px;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        color: #333333;
        p {
          font-size: 29px;
          margin-left: 20px;
          margin-top: 4px;
        }
        .examinationColumn {
          font-size: 29px;
          display: flex;
          line-height: 35px;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20px;
        }
      }
      .right {
        color: #999999;
        font-size: 28px;
        font-weight: bold;
        margin-top: 4px;
        .van-icon-arrow {
          font-weight: bold;
        }
      }
    }
    .listn {
      padding: 10px 30px;
      .left {
        ::v-deep .van-image__img {
          margin-top: -1px;
        }
      }
    }
    .list1 {
      margin-top: 2px;
      .left {
        p {
          margin-top: 3px;
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
  .vanbtn {
    color: #999999 !important;
    font-weight: bold;
  }
}
</style>