<template>
  <div :class="displayApplicationConditions? 'box2':'box'">
    <header>
      <white :title="title"></white>
    </header>
    <div class="backgroundPicture">
      <van-image width="100vw" height="140px" :src="require('./IMG/bg.png')" />
      <div class="text" v-if="displayApplicationConditions">
        <p>成为仲裁员</p>
        <p>维护安全稳定信任的交易环境</p>
      </div>
      <div class="text2" v-else>
        <p>维护安全稳定信任的交易环境</p>
      </div>
    </div>
    <div class="applicationConditions" v-if="displayApplicationConditions">
      <h4>申请条件</h4>
      <div class="conditionsList">
        <div class="list list1">
          <div class="left">
            <van-icon name="coupon-o" />
            <p>DID身份认证</p>
          </div>
<<<<<<< HEAD
          <div class="right"
               @click="auditing('ArbitrationByFormula') "
               v-if="qualificationPassed1==false">去认证
            <van-icon name="arrow" />
          </div>
          <div class="right"
               v-else>
            <van-icon name="success"
                      color="#1D9C3F "
                      size="18" />
=======
          <div
            class="right"
            @click="auditing('ArbitrationByFormula')"
            v-if="qualificationPassed == false"
          >
            去认证
            <van-icon name="arrow" />
          </div>
          <div class="right" v-else>
            <van-icon name="success" color="#1D9C3F " />
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
          </div>
        </div>
        <div class="list">
          <div class="left">
            <van-icon name="refund-o" />
            <p>质押5000 EOTC以上</p>
          </div>
<<<<<<< HEAD
          <div class="right"
               v-if="qualificationPassed2==false">去质押
            <van-icon name="arrow" />
          </div>
          <div class="right"
               v-else>
            <van-icon name="success"
                      color="#1D9C3F "
                      size="18" />
=======
          <div class="right" v-if="qualificationPassed == false">
            去质押
            <van-icon name="arrow" />
          </div>
          <div class="right" v-else>
            <van-icon name="success" color="#1D9C3F " />
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
          </div>
        </div>
        <div class="list">
          <div class="left">
            <van-icon name="orders-o" />
            <p>了解学习仲裁规则</p>
          </div>
<<<<<<< HEAD
          <div class="right"
               @click="auditing('understandLearningRules')"
               v-if="qualificationPassed3==false">去学习
            <van-icon name="arrow" />
          </div>
          <div class="right"
               v-else>
            <van-icon name="success"
                      color="#1D9C3F"
                      size="18" />
=======
          <div
            class="right"
            @click="auditing('understandLearningRules')"
            v-if="qualificationPassed == false"
          >
            去学习
            <van-icon name="arrow" />
          </div>
          <div class="right" v-else>
            <van-icon name="success" color="#1D9C3F " />
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
          </div>
        </div>
        <div class="list listn">
          <div class="left">
<<<<<<< HEAD
            <van-icon name="cart-circle-o" />
            <div class="examinationColumn"><span>通过考试</span><span style="color:#999999;font-size:12px; margin-top: 3px;">考试成绩达到90分以上</span></div>
          </div>
          <div class="right"
               @click="ExamTips"
               v-if="qualificationPassed4==false">去考试
=======
            <van-icon name="sign" />
            <div class="examinationColumn">
              <span>通过考试</span
              ><span style="color: #999999; font-size: 12px"
                >考试成绩达到90分以上</span
              >
            </div>
          </div>
          <div
            class="right"
            @click="ExamTips"
            v-if="qualificationPassed == false"
          >
            去考试
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
            <van-icon name="arrow" />
          </div>
<<<<<<< HEAD
          <div class="right"
               v-else>
            <van-icon name="success"
                      color="#1D9C3F "
                      size="18" />
=======
          <div class="right" v-else>
            <van-icon name="success" color="#1D9C3F " />
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
    <div v-if="displayApplicationConditions==false"
         class="identityCard">
      <div class="top"
           v-for="(item,index) in ArbitratorsIdentityInformation"
           :key="index">
        <div>
          <div class="first">
            <van-image width="40"
                       height="30"
                       :src="require('./IMG/组 490@2x.png')" />
=======
    <div v-if="displayApplicationConditions == false" class="identityCard">
      <div class="top">
        <div>
          <div class="first">
            <van-image
              width="20"
              height="20"
              :src="require('./IMG/组 490@2x.png')"
            />
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
            <span>仲裁员</span>
          </div>
          <div>{{item.name}}</div>
        </div>
        <div>
          <div>身份编号</div>
          <div>{{item.number}}</div>
        </div>
        <div>
          <div>申请时间</div>
          <div>{{item.createDate}}</div>
        </div>
        <div>
          <div>仲裁次数</div>
          <div>{{item.arbitrateNum}}</div>
        </div>
      </div>
      <div class="bottom">
        <div>
          <div>仲裁案(个)</div>
          <div>40<span>/45</span></div>
        </div>
        <div class="line"></div>
        <div>
          <div>收益(EOTC)</div>
          <div>3000</div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
    <van-overlay :show="show"
                 closeOnClickOverlay="true">
      <div class="wrapper"
           @click.stop>
=======
    <van-overlay :show="show" @click="toggle2" closeOnClickOverlay="true">
      <div class="wrapper" @click.stop>
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
        <div class="block">
          <van-button
            color="linear-gradient(to right, #3EBDFF, #006BF8)"
            size="large "
          >
            考试说明
          </van-button>
<<<<<<< HEAD
          <van-button color="#F3F4F5 ">90分即通过</van-button>
=======
          <van-button color="#F3F4F5 " style="color: #333333"
            >90分即通过</van-button
          >
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
          <div class="middle">
            <div class="middleTitle">
              <p>题目数量</p>
              <p class="p2"><span>12</span>题</p>
            </div>
            <div class="line"></div>
            <div class="middleTitle">
              <p>考试时长</p>
              <p class="p2"><span>30</span>分钟</p>
            </div>
          </div>
          <van-button
            color="#237FF8"
            class="startBtn"
            @click="auditing('examination')"
            >开始答题</van-button
          >
          <van-icon name="close" color="#fff" size="29" @click="show = false" />
        </div>
      </div>
    </van-overlay>
<<<<<<< HEAD
    <notification1 ref="notification1"
                   :class="this.title1 > 90?'dti1':' dti2'"
                   :buttonText="buttonText1"
                   :buttonColor="buttonColor1"
                   :headerIcon="headerIcon1"
                   :title="title1"
                   :message="message1"
                   :closeOnClick="closeOnClick"></notification1>
    <notification2 ref="notification2"
                   :buttonText="buttonText2"
                   :buttonColor="buttonColor2"
                   :headerIcon="headerIcon2"
                   :title="title2+ '分'"
                   :message="message2"
                   :closeOnClick="closeOnClick"
                   @buttonClick="buttonClick"></notification2>
    <footer>
      <van-button round
                  block
                  type="info"
                  color="#1B2945"
                  :disabled="!qualificationPassed"
                  @click="applyNow"
                  v-if="displayApplicationConditions">立即申请</van-button>
      <van-button round
                  block
                  type="info"
                  color="#fff"
                  @click="dismissal"
                  v-if="displayApplicationConditions==false"
                  class="vanbtn">解除身份</van-button>
=======
    <notification
      ref="notification"
      :buttonText="buttonText"
      :buttonColor="buttonColor"
      :headerIcon="headerIcon"
      :title="title1"
      :message="message"
      :closeOnClick="closeOnClick"
    ></notification>
    <footer>
      <van-button
        round
        block
        type="info"
        color="#1B2945"
        :disabled="!qualificationPassed"
        @click="applyNow"
        v-if="displayApplicationConditions"
        >立即申请</van-button
      >
      <van-button
        round
        block
        type="info"
        color="#fff"
        :disabled="!qualificationPassed"
        @click="dismissal"
        v-if="displayApplicationConditions == false"
        class="vanbtn"
        >解除身份</van-button
      >
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
    </footer>
  </div>
</template>
<script>
<<<<<<< HEAD
import white from '@/components/Nav/white.vue'
import {
  TerminationArbitrator,
  becomeAnArbitrator,
} from '@/api/TerminationOfArbitrator'
import notification1 from '@/components/notification.vue'
import notification2 from '@/components/notification.vue'
import icon1 from './IMG/icon.png'
import icon2 from './IMG/icon2.png'
import icon3 from './IMG/icon3.png'
import { Dialog } from 'vant'
=======
import white from "@/components/Nav/white.vue";
import notification from "@/components/notification.vue";
import icon1 from "./IMG/icon.png";
import icon2 from "./IMG/icon2.png";
import icon3 from "./IMG/icon3.png";
import { Dialog } from "vant";
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
export default {
  components: { white, notification1, notification2 },
  data() {
    return {
<<<<<<< HEAD
      title: '仲裁员',
      ArbitratorsIdentityInformation: [
        {
          name: '李木子',
          number: '012022052601',
          createDate: '2022-09-28T08:03:49.797Z',
          arbitrateNum: 0,
        },
      ],
      show: false,
      showFraction: false,
      applynow: false,
=======
      title: "仲裁员",
      show: false,
      showFraction: false,
      applynow: false,
      headerIcon: "",
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
      displayApplicationConditions: true,
      qualificationPassed: Boolean(localStorage.getItem('qualificationPassed')),
      qualificationPassed1: Boolean(
        localStorage.getItem('qualificationPassed1')
      ),
      qualificationPassed2: Boolean(
        localStorage.getItem('qualificationPassed2')
      ),
      qualificationPassed3: Boolean(
        localStorage.getItem('qualificationPassed3')
      ),
      qualificationPassed4: Boolean(
        localStorage.getItem('qualificationPassed4')
      ),
      title1: null,
<<<<<<< HEAD
      message1: '',
      buttonColor1: '#237FF8',
      buttonText1: '知道了',
      headerIcon1: '',
      closeOnClick: true,
      title2: null,
      message2: '',
      buttonColor2: '#237FF8',
      buttonText2: '知道了',
      headerIcon2: '',
      closeOnClick2: true,
    }
  },
  mounted() {
    this.title1 = this.$route.params.totalScore + ''

    if (this.title1 != 'undefined') {
      console.log(this.title1 != 'undefined')
      this.$nextTick().then(() => {
        this.$refs.notification1.toggle(true)
      })
    }
    if (this.title1 > 90) {
      this.title1 = this.title1 + '分'
      this.headerIcon1 = icon1
      this.message1 = '恭喜通过仲裁考试'
      this.qualificationPassed4 = true
      localStorage.setItem('qualificationPassed4', true)
    } else {
      this.title1 = this.title1
      this.headerIcon1 = icon2
      this.message1 = '很遗憾未通过仲裁考试'
    }
    if (this.$route.query.qualificationPassed3 != undefined) {
      localStorage.setItem(
        'qualificationPassed3',
        this.$route.query.qualificationPassed3
      )
      this.qualificationPassed3 = localStorage.getItem('qualificationPassed3')
    }
    if (
      this.qualificationPassed1 &&
      this.qualificationPassed2 &&
      this.qualificationPassed3 &&
      this.qualificationPassed4
    ) {
      this.qualificationPassed = true
      localStorage.setItem('qualificationPassed', true)
=======
      qualificationPassed: false,
      message: "恭喜通过仲裁考试",
      buttonColor: "#237FF8",
      buttonText: "知道了",
      closeOnClick: true,
    };
  },
  mounted() {
    this.title1 = this.$route.query.totalScore;
    if (this.title1 > 90) {
      this.headerIcon = icon1;
      this.message = "恭喜通过仲裁考试";
    } else {
      this.headerIcon = icon2;
      this.message = "很遗憾未通过仲裁考试";
    }
    if (this.title1 != null) {
      this.message.length &&
        this.$nextTick().then(() => {
          this.$refs.notification.toggle(true);
        });
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
    }
  },

  methods: {
    auditing(name) {
      this.$router.push({
        name: name,
      });
    },
<<<<<<< HEAD
    buttonClick() {
      this.displayApplicationConditions = false
      becomeAnArbitrator(this.ArbitratorsIdentityInformation).then((res) => {
        console.log(res)
      })
=======
    toggle2() {
      console.log(false);
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
    },
    ExamTips() {
      this.show = true;
    },
    applyNow() {
<<<<<<< HEAD
      this.$refs.notification2.toggle(true)
      this.headerIcon2 = icon3
      this.title2 = '申请成功'
      this.message2 = '成为仲裁员后平台会给您委派仲裁案'
      this.buttonColor2 = '#237FF8'
      this.buttonText2 = '好的'
      this.closeOnClick = true
=======
      this.$refs.notification.toggle(true);
      this.headerIcon = icon3;
      this.title1 = "申请成功";
      this.message = "成为仲裁员后平台会给您委派仲裁案";
      this.buttonColor = "#237FF8";
      this.buttonText = "好的";
      this.closeOnClick = true;
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
    },

    dismissal() {
      Dialog.confirm({
        title: "温馨提示",
        message:
          '解除身份后平台将不会再委派处理仲裁案，再申请仲裁员身份需要重新学习和考试',
        confirmButtonText: '知道了',
        confirmButtonColor: '#1B2945',
        cancelButtonText: '我再想想',
        cancelButtonColor: '#666666 ',
        className: 'dismissalDialog',
        getContainer: '.box',
      })
        .then(() => {
          // on confirm
          Dialog.confirm({
            title: '解除提示',
            message: '确定解除仲裁员身份？',
            confirmButtonColor: '#1B2945',
            cancelButtonColor: '#666666 ',
            className: 'dismissalDialog',
            getContainer: '.box',
          })
            .then(() => {
              this.displayApplicationConditions = true
              TerminationArbitrator(this.IDNo)
              // on confirm
            })
            .catch(() => {
              // on cancel
            });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  background-color: #fff;
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
}
.dti1 {
  ::v-deep .dialog-title {
    color: #237ff8;
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
    background: linear-gradient(#fff1e9, #f3c9b0);
    border-radius: 20px;
    height: 312px;
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
        color: #c26e42;
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
    line-height: 75px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    p:nth-of-type(1) {
      font-size: 50px;
      margin: 55px 0 28px 0;
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
    margin-top: 30px;
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
<<<<<<< HEAD
    font-size: 32px;
    padding: 0 5px;
=======
    font-size: 35px;
    margin-bottom: 0px;
    padding: 0 0 20px;
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
  }
  .conditionsList {
    background-color: #f3f4f5;
    height: 448px;
<<<<<<< HEAD
    border-radius: 25px;
=======
    border-radius: 20px;
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
    padding: 16px 0;
    box-sizing: border-box;
    .list1 {
      margin-top: 20px;
    }
    .list {
<<<<<<< HEAD
      padding: 20px 25px;
=======
      line-height: 70px;
      padding: 10px 20px;
>>>>>>> 189e0b2d7d11c30406de7c8f274188a42cb450bf
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        .van-icon {
          margin-top: 3px;
        }
        p {
          font-size: 26px;
          color: #333333;
          margin-left: 20px;
        }
        .examinationColumn {
          font-size: 26px;
          display: flex;
          line-height: 35px;
          flex-direction: column;
          margin-left: 20px;
        }
      }
      .right {
        color: #999999;
        font-size: 23px;
        font-weight: bold;
        margin-top: 4px;
      }
    }
    .listn {
      margin-top: 5px;
      .left {
        .van-icon {
          margin-top: 0;
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
  .vanbtn {
    color: #999999 !important;
    font-weight: bold;
  }
}
</style>