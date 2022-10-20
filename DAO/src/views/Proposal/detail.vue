<template>
  <div class="fullscreen bg-gray meun"
       ref="meun">
    <header ref="headerHeight">
      <div class="nav_an_box">
        <van-nav-bar fixed
                     placeholder
                     :title="title"
                     left-arrow
                     :right-text="rightText"
                     @click-left="onClickLeft"
                     @click-right="onClickRight">
        </van-nav-bar>
      </div>
    </header>
    <main class="box"
          ref="box">
      <div class="one_an">
        <div>{{ List.title }}</div>
        <div class="piao">
          <span v-if="state == 0">
            <div class="ion"></div>
            {{ $t("home.status1") }}
          </span>
          <span v-if="state == 1">
            <div class="ion two"></div>
            {{ $t("home.status2") }}
          </span>
          <span v-if="state == 2">
            <div class="ion three"></div>
            {{ $t("home.status3") }}
          </span>
          <span v-if="state == 3">
            <div class="ion fhire"></div>
            {{ $t("home.status4") }}
          </span>
          <span>{{ List.walletAddress }}{{ $t("Detailsofproposal.propose") }}</span>
        </div>
      </div>
      <div class="jindu"
           ref="jindu">
        <div class="tou">
          {{ $t("Detailsofproposal.schedule") }}
          <span class="hui"><span>{{ text }}</span>{{ createDate }}</span>
        </div>
        <div>
          {{ $t("Detailsofproposal.inall1") }}{{ InitialpeopleNum
          }}{{ $t("Detailsofproposal.inall2") }}
        </div>
        <van-progress :track-color="trackColor"
                      :percentage="percentageVotes"
                      v-if="!isNaN(parseInt(percentageVotes))"
                      :color="valueColor"
                      :show-pivot="false"
                      stroke-width="12" />
        <div class="num"
             v-if="isVote1">
          <span style="color: #00b87a">{{ InitialpeopleNum }}</span>/99
        </div>
        <div class="num vote"
             v-if="isVote == false"
             style="font-size: 14px">
          <div v-if="InitialopposeVotes == 0 && InitialfavorVotes == 0">
            <span>
              {{ $t("Detailsofproposal.favorVotes")
              }}{{ InitialfavorVotes + "%" }}</span>{{ $t("Detailsofproposal.opposeVotes")
            }}{{ InitialopposeVotes + "%" }}
          </div>
          <div v-else>
            <span>{{ $t("Detailsofproposal.favorVotes")
              }}{{ TotalFavorVotes }}</span>{{ $t("Detailsofproposal.opposeVotes") }}{{ TotalOpposeVotes }}
          </div>
        </div>

        <div class="num vote"
             style="color: #FC7542"
             v-if="isVote == false">
          <div>
            <span style="color: #00b87a">{{ InitialfavorVotes }}{{ $t("Detailsofproposal.ticket") }}</span>{{ InitialopposeVotes }}{{ $t("Detailsofproposal.ticket") }}
          </div>
        </div>
        <div v-if="InitialpeopleNum < 99">
          {{ $t("Detailsofproposal.introduce1") }}
        </div>
        <div v-if="InitialpeopleNum == 99">
          {{ $t("Detailsofproposal.introduce2") }}
        </div>
      </div>
      <div class="jindu">
        <div class="xiang">
          <div class="tou">{{ $t("Detailsofproposal.detail") }}</div>
          <div class="wen">{{ List.summary }}</div>
        </div>
      </div>
      <div class="jindu"
           v-if="isVote">
        <div class="ti">
          <div class="tou">
            {{ $t("Detailsofproposal.withal") }}
            <van-button type="default"
                        size="small"
                        v-if="radio == ''">
              {{ $t("Detailsofproposal.vote") }}</van-button>
            <van-button type="info"
                        size="small"
                        @click="isDloag"
                        v-if="radio != ''">{{ $t("Detailsofproposal.vote") }}</van-button>
          </div>
          <van-radio-group v-model="radio">
            <van-radio name="1">{{
              $t("Detailsofproposal.endorse")
            }}</van-radio>
            <van-radio name="2">{{ $t("Detailsofproposal.oppose") }}</van-radio>
          </van-radio-group>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import 'vant/es/toast/style'
import { cancelproposal, proposalvote, getproposal } from '@/api/Proposal'
import { getuSereotc } from '@/api/earnings'
import { Toast, Dialog } from 'vant'
export default {
  data() {
    return {
      text: this.$t('Detailsofproposal.text'),
      trackColor: '#fff',
      valueColor: '#00B87A',
      rightText: '',
      title: this.$t('Detailsofproposal.title'),
      radio: '',
      items: undefined,
      proposalId: this.$route.query.proposalId,
      state: this.$route.query.state,
      isProponent: this.$route.query.isProponent || 1,
      List: {},
      isVote: true,
      Votes: 0,
      isVOTE: null,
      isVote1: true,
      percentageVotes: 0,
      flag: false,
      createDate: '',
      InitialpeopleNum: 0,
      InitialopposeVotes: 0,
      InitialfavorVotes: 0,
    }
  },
  created() {
    let data = {
      id: this.proposalId,
    }
    getuSereotc().then((res) => {
      this.items = res.data.items
    })
    const loading = this.$toast.loading({
      forbidClick: true,
      message: this.$t('Detailsofproposal.message1'),
    })
    this.$nextTick(() => {
      getproposal(data)
        .then((res) => {
          // console.log(res.data.items, 'res.data.items')
          res.data.items.createDate = this.$dayjs(res.data.items.createDate)
            .utc()
            .format('YYYY年MM月DD')
          this.List = res.data.items
          this.InitialpeopleNum = this.List.peopleNum
          this.InitialopposeVotes = this.List.opposeVotes
          this.InitialfavorVotes = this.List.favorVotes
          this.pre()
          localStorage.setItem(
            `InitialpeopleNum+${this.proposalId}`,
            this.InitialpeopleNum
          )
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: this.$t('Detailsofproposal.message2'),
          })
        })
        .finally(() => {
          loading.clear()
        })
    })
  },

  watch: {
    radio: function (val) {
      this.radio = val
    },
  },
  methods: {
    pre() {
      console.log(this.isProponent, '1111111')
      if (this.List.isVote == 1) {
        this.isVote = false
        this.isVote1 = false
      } else {
        this.isVote = true
        this.isVote1 = true
      }
      if (
        this.state != 3 &&
        this.List.walletAddress == localStorage.getItem('myaddress')
      )
        this.rightText = this.$t('Detailsofproposal.cancle')
      this.List.walletAddress =
        this.List.walletAddress.slice(0, 4) +
        '...' +
        this.List.walletAddress.slice(-4)
      this.createDate =
        localStorage.getItem(`createDate+${this.proposalId}`) ||
        this.List.createDate
      if (this.state == 0) {
        if (this.List.isVote != 0) {
          this.isVote = false
          this.isVote1 = false
          this.percentageVotes =
            (this.InitialfavorVotes /
              (this.InitialfavorVotes + this.InitialopposeVotes)) *
            100
          this.trackColor = '#FC7542'
        } else {
          this.percentageVotes = this.InitialpeopleNum
        }
      }
      if (this.state != 2 && this.state != 0) {
        this.isVote = false
        this.isVote1 = false
        this.text = this.$t('Detailsofproposal.finish')
        if (this.InitialpeopleNum == 0) {
          this.percentageVotes = 0
        } else {
          this.percentageVotes =
            (this.InitialfavorVotes /
              (this.InitialfavorVotes + this.InitialopposeVotes)) *
            100
          this.trackColor = '#FC7542'
        }
      }

      if (this.flag == false && this.state == 2) {
        this.percentageVotes = this.InitialpeopleNum
      }
      if (this.InitialpeopleNum == 99) {
        console.log('提案成功')
        this.text = this.$t('Detailsofproposal.finish')
        this.percentageVotes =
          (this.InitialfavorVotes /
            (this.InitialfavorVotes + this.InitialopposeVotes)) *
          100
        this.trackColor = '#FC7542'
        this.isVote = false
        this.isVote1 = false
        this.List.state = 1
        if (this.InitialfavorVotes >= this.InitialopposeVotes) {
          this.List.state = 2
          this.state = 2
        } else {
          this.List.state = 1
          this.state = 1
        }
        if (localStorage.getItem(`createDate+${this.proposalId}`)) {
          localStorage.removeItem(`createDate+${this.proposalId}`)
          localStorage.setItem(
            `createDate+${this.proposalId}`,
            this.$dayjs(new Date()).format('YYYY年MM月DD')
          )
        }
        this.createDate = localStorage.getItem(`createDate+${this.proposalId}`)
      }
    },
    onClickLeft() {
      history.go(-1)
    },
    onClickRight() {
      Dialog.confirm({
        title: this.$t('Detailsofproposal.cancletitle'),
        message: this.$t('Detailsofproposal.canclemessage'),
        confirmButtonColor: '#1B2945 ',
        cancelButtonColor: '#666666 ',
        confirmButtonText: this.$t('exam.Text1'),
        cancelButtonText: this.$t('exam.Text2'),
        getContainer: '.meun',
      }).then(() => {
        let data = {
          id: this.proposalId,
        }
        this.rightText = ''
        this.state = 3
        cancelproposal(data)
        Toast(this.$t('Detailsofproposal.cancelsuccessful'))
        this.text = this.$t('Detailsofproposal.finish')
        this.isVote = false
        localStorage.setItem(
          `createDate+${this.proposalId}`,
          this.$dayjs(new Date()).format('YYYY年MM月DD')
        )
        this.createDate = localStorage.getItem(`createDate+${this.proposalId}`)
        console.log(this.createDate, 'this.createDate')
        // on close
      })
    },
    isDloag() {
      this.flag = true
      let data = {
        proposalId: this.proposalId,
        vote: +this.radio == 2 ? 0 : 1,
      }
      this.InitialpeopleNum += 1
      if (this.items >= 100) {
        proposalvote(data).then(() => {
          this.$refs.jindu.style.height = '270.5px'
          if (this.InitialpeopleNum < 99) {
            if (this.radio == 1) {
              this.Votes = this.items / 100
              Toast(
                this.$t('Detailsofproposal.launch') +
                  this.Votes +
                  this.$t('Detailsofproposal.favorVotes')
              )
              this.List.peopleNum++
              this.List.favorVotes += this.Votes
              this.InitialfavorVotes += this.Votes
              this.percentageVotes =
                (this.InitialfavorVotes /
                  (this.InitialfavorVotes + this.InitialopposeVotes)) *
                100
            } else {
              this.Votes = this.items / 100
              Toast(
                this.$t('Detailsofproposal.launch') +
                  this.Votes +
                  this.$t('Detailsofproposal.opposeVotes')
              )
              this.List.peopleNum++
              this.List.opposeVotes += this.Votes
              this.InitialopposeVotes += this.Votes
              this.percentageVotes =
                (this.InitialfavorVotes /
                  (this.InitialfavorVotes + this.InitialopposeVotes)) *
                100
            }
            if (this.InitialopposeVotes != 0) this.trackColor = '#FC7542'
            if (this.InitialfavorVotes == 0) this.valueColor = '#FC7542'
            this.isVote = false
            this.isVote1 = false
            this.List.isVote = 1
          }
        })
      } else {
        Dialog.alert({
          title: this.$t('Detailsofproposal.votefor'),
          message: this.$t('Detailsofproposal.votemessage'),
          confirmButtonText: this.$t('Detailsofproposal.know'),
        }).then(() => {
          // on close
        })
      }
    },
  },
  computed: {
    TotalOpposeVotes() {
      return (
        parseInt(
          (this.InitialopposeVotes /
            (this.InitialfavorVotes + this.InitialopposeVotes)) *
            100
        ) + '%'
      )
    },
    TotalFavorVotes() {
      return (
        parseInt(
          (this.InitialfavorVotes /
            (this.InitialfavorVotes + this.InitialopposeVotes)) *
            100
        ) + '%'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.meun {
  background: #f3f4f5;
  height: 100vh;
  overflow: auto;
}
.meun {
  ::v-deep .van-dialog__message--has-title {
    color: #f37a4c !important;
  }
  ::v-deep .van-button {
    font-weight: bold;
  }
}
.box {
  flex: 1;
  min-height: 0;
  overflow: auto;
  background: #fff;
  box-sizing: border-box;
  color: #000;
  padding-bottom: 20px;
}
.van-nav-bar .van-icon {
  color: #000;
}
::v-deep .van-nav-bar__text {
  color: rgb(51, 49, 49);
}

::deep.van-nav-bar__title {
  font-size: 36px;
  font-weight: bold;
}
.one_an {
  margin: 30px;
  padding: 16px 0 0;
  line-height: 60px;
  font-size: 30px;
  .piao {
    display: flex;
    color: #9296a2;
    margin-top: 15px;
    font-size: 28px;
    justify-content: space-between;
    .ion {
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #237ff8;
    }
    .two {
      background: #fc7542;
    }
    .three {
      background: #00b87a;
    }
    .fhire {
      background: #999999;
    }
  }
}
.jindu {
  width: 92%;
  background: #f3f4f5;
  border-radius: 8px;
  margin: 0 auto;
  padding: 32px;
  font-size: 30px;
  color: #000;
  font-size: 29px;
  line-height: 45px;
  margin-top: 30px;
  .hui {
    color: #999999;
    font-size: 18px;
  }
  .van-progress {
    margin: 16px 0;
  }
  .num {
    font-size: 50px;
    color: #878888;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .vote div {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
  }
}
.tou {
  font-size: 29px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 20px;
  margin-top: 15px;
  margin-bottom: 20px;
  align-items: center;
}
.xiang {
  color: #000;
  font-size: 28px;
  width: 100%;
  background: #f3f4f5;
  border-radius: 8px;
  line-height: 48px;
  .wen {
    word-wrap: break-word;
    color: #666666;
  }
}
.ti {
  font-size: 25px;
  color: #000;
  width: 100%;
  background: #f3f4f5;
  border-radius: 8px;
  font-size: 30px;
  .van-button {
    width: 80px;
    padding: 5px 24px;
    border-radius: 8px;
    position: relative;
    top: -4px;
  }
  .van-radio-group {
    .van-radio {
      margin: 16px 0 1px;
    }
  }
}
</style>