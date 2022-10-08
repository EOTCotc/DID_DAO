<template>
  <div class="meun" ref="meun">
    <header ref="headerHeight">
      <div class="nav_an_box">
        <van-nav-bar
          fixed
          placeholder
          :title="title"
          left-arrow
          :right-text="rightText"
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
        </van-nav-bar>
      </div>
    </header>
    <main class="box" ref="box">
      <div class="one_an">
        <div>{{ List.title }}</div>
        <div class="piao">
          <span v-if="state == 0">
            <div class="ion"></div>
            进行中
          </span>
          <span v-if="state == 1">
            <div class="ion two"></div>
            未通过
          </span>
          <span v-if="state == 2">
            <div class="ion three"></div>
            已通过
          </span>
          <span v-if="state == 3">
            <div class="ion fhire"></div>
            已终止
          </span>
          <span>{{ List.walletAddress }}提议</span>
        </div>
      </div>
      <div class="jindu" ref="jindu">
        <div class="tou">
          投票进度
          <span class="hui"
            ><span>{{ text }}</span
            >{{ $dayjs(createDate).format("YYYY年MM月DD ") }}</span
          >
        </div>
        <div>共{{ peopleNum }}人参与</div>
        <van-progress
          :track-color="trackColor"
          :percentage="percentageVotes"
          v-if="!isNaN(parseInt(percentageVotes))"
          :color="valueColor"
          :show-pivot="false"
          stroke-width="12"
        />
        <div class="num" v-if="isVote1">
          <span style="color: #00b87a">{{ peopleNum }}</span
          >/99
        </div>
        <div class="num vote" v-if="isVote == false" style="font-size: 14px">
          <div v-if="favorVotes == 0 && opposeVotes == 0">
            <span>赞成票{{ favorVotes + "%" }}</span
            >反对票{{ opposeVotes + "%" }}
          </div>
          <div v-else>
            <span>赞成票{{ TotalFavorVotes }}</span
            >反对票{{ TotalOpposeVotes }}
          </div>
        </div>

        <div class="num vote" v-if="isVote == false">
          <div>
            <span style="color: #00b87a">{{ favorVotes }}票</span
            >{{ opposeVotes }}票
          </div>
        </div>
        <div v-if="peopleNum < 99">
          该提案需要99人投票才能取得进展，作者可以随时终止
        </div>
        <div v-if="peopleNum == 99">该提案已99人投票参与,投票已完成</div>
      </div>
      <div class="jindu">
        <div class="xiang">
          <div class="tou">提案详情</div>
          <div class="wen">{{ List.summary }}</div>
        </div>
      </div>
      <div class="jindu" v-if="isVote">
        <div class="ti">
          <div class="tou">
            对此提案
            <van-button type="default" size="small" v-if="radio == ''"
              >投票</van-button
            >
            <van-button
              type="info"
              size="small"
              @click="isDloag"
              v-if="radio != ''"
              >投票</van-button
            >
          </div>
          <van-radio-group v-model="radio">
            <van-radio name="1">赞成</van-radio>
            <van-radio name="2">反对</van-radio>
          </van-radio-group>
        </div>
      </div>
    </main>
    <!-- <footer style="height:20px"></footer> -->
  </div>
</template>

<script>
import "vant/es/toast/style";
import { cancelproposal, proposalvote, getproposal } from "@/api/Proposal";
import { getuSereotc } from "@/api/earnings";
import { Toast, Dialog, List } from "vant";
export default {
  data() {
    return {
      text: "创建于",
      trackColor: "#fff",
      valueColor: "#00B87A",
      rightText: "",
      title: "详情",
      radio: "",
      items: undefined,
      proposalId: this.$route.query.proposalId,
      state: this.$route.query.state,
      isProponent: this.$route.query.isProponent || 1,
      IDList: this.$route.query.IDList || [],
      IDList2: this.$route.query.IDList2 || [],
      List: {},
      isVote: true,
      Votes: 1,
      isVOTE: null,
      isVote1: true,
      percentageVotes: 0,
      flag: false,
      favorVotes: 0,
      peopleNum: 0,
      opposeVotes: 0,
      createDate: "",
      InitialpeopleNum: undefined,
      InitialopposeVotes: undefined,
      InitialfavorVotes: undefined,
      dataList: {},
      that: null,
    };
  },
  mounted() {
    // console.log(this.$dayjs('2022-10-07T18:33:01.98Z').format('YYYY年MM月DD '))
  },
  created() {
    let data = {
      id: this.proposalId,
    };
    getuSereotc().then((res) => {
      this.items = res.data.items;
    });
    const loading = this.$toast.loading({
      forbidClick: true,
      message: "加载中…",
    });
    this.$nextTick(() => {
      getproposal(data)
        .then((res) => {
          res.data.items.walletAddress =
            res.data.items.walletAddress.slice(0, 4) +
            "..." +
            res.data.items.walletAddress.slice(-4);
          this.List = res.data.items;
          this.InitialpeopleNum = this.List.peopleNum;
          this.InitialopposeVotes = this.List.opposeVotes;
          this.InitialfavorVotes = this.List.favorVotes;
          // this.InitialpeopleNum = 10
          // this.InitialopposeVotes = 4
          // this.InitialfavorVotes = 6
          this.pre();
          localStorage.setItem(
            `InitialpeopleNum+${this.proposalId}`,
            this.InitialpeopleNum
          );
          if (localStorage.getItem(`InitialpeopleNum+${this.proposalId}`)) {
            localStorage.removeItem(`InitialpeopleNum+${this.proposalId}`);
            localStorage.setItem(
              `InitialpeopleNum+${this.proposalId}`,
              this.InitialpeopleNum
            );
          }
          if (
            Boolean(localStorage.getItem(`createDate+${this.proposalId}`)) ==
            false
          ) {
            localStorage.setItem(
              `createDate+${this.proposalId}`,
              this.List.createDate
            );
            this.createDate = localStorage.getItem(
              `createDate+${this.proposalId}`
            );
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: "加载失败！",
          });
        })
        .finally(() => {
          loading.clear();
        });
    });
  },

  watch: {
    radio: function (val) {
      this.radio = val;
    },
  },
  methods: {
    pre() {
      console.log(this.isProponent, "1111111");
      if (this.List.isVote == 1) {
        this.isVote = false;
        this.isVote1 = false;
      } else {
        this.isVote = true;
        this.isVote1 = true;
      }
      if (
        this.state != 3 &&
        this.IDList.some((item) => this.proposalId == item)
      )
        this.rightText = "取消";
      if (
        this.IDList2.some((item) => this.proposalId == item) &&
        this.state != 3
      )
        this.rightText = "取消";
      this.createDate = localStorage.getItem(`createDate+${this.proposalId}`);
      this.favorVotes =
        this.InitialfavorVotes +
        Number(localStorage.getItem(`favorVotes+${this.proposalId}`));
      (this.peopleNum =
        this.InitialpeopleNum +
        Number(localStorage.getItem(`favorVotes+${this.proposalId}`)) +
        Number(localStorage.getItem(`opposeVotes+${this.proposalId}`))),
        (this.opposeVotes =
          this.InitialopposeVotes +
          Number(localStorage.getItem(`opposeVotes+${this.proposalId}`)));
      if (this.state == 0) {
        if (this.List.isVote != 0) {
          this.isVote = false;
          this.isVote1 = false;
          this.percentageVotes = (100 / this.peopleNum) * this.favorVotes;
          this.trackColor = "#FC7542";
        }
      }
      if (this.state != 2 && this.state != 0) {
        this.isVote = false;
        this.isVote1 = false;
        this.text = "投票结束";
        if (this.peopleNum == 0) {
          this.percentageVotes = 0;
        } else {
          this.percentageVotes = (100 / this.peopleNum) * this.favorVotes;
          this.trackColor = "#FC7542";
        }
      }

      if (this.flag == false && this.state == 2) {
        this.percentageVotes = this.peopleNum;
      }
      if (this.peopleNum == 99) {
        console.log("提案成功");
        this.percentageVotes = (100 / this.peopleNum) * this.favorVotes;
        this.trackColor = "#FC7542";
        this.isVote = false;
        this.isVote1 = false;
        this.List.state = 1;
        if (localStorage.getItem(`createDate+${this.proposalId}`)) {
          localStorage.removeItem(`createDate+${this.proposalId}`);
          localStorage.setItem(`createDate+${this.proposalId}`, new Date());
        }
        this.createDate = localStorage.getItem(`createDate+${this.proposalId}`);
      }
    },
    onClickLeft() {
      history.go(-1);
    },
    onClickRight() {
      Dialog.confirm({
        title: "取消提示",
        message: "确认取消该提案？",
        confirmButtonColor: "#1B2945 ",
        cancelButtonColor: "#666666 ",
        getContainer: ".meun",
      })
        .then(() => {
          let data = {
            id: this.proposalId,
          };
          this.rightText = "";
          this.state = 3;
          cancelproposal(data);
          Toast("取消成功");
          this.text = "投票结束";
          this.isVote = false;
          this.isVote1 = false;
          if (localStorage.getItem(`createDate+${this.proposalId}`)) {
            localStorage.removeItem(`createDate+${this.proposalId}`);
            localStorage.setItem(`createDate+${this.proposalId}`, new Date());
          }
          this.createDate = localStorage.getItem(
            `createDate+${this.proposalId}`
          );
        })
        .catch(() => {
          // on cancel
        });
    },
    isDloag() {
      this.flag = true;
      let data = {
        proposalId: this.proposalId,
        radio: +this.radio,
      };
      this.peopleNum += 1;
      if (this.items >= 100) {
        proposalvote(data).then(() => {
          this.$refs.jindu.style.height = "270.5px";
          if (this.peopleNum <= 99) {
            if (this.radio == 1) {
              Toast(`投出${this.Votes}赞成票`);
              this.List.peopleNum++;
              this.List.favorVotes++;
              this.favorVotes = this.List.peopleNum;
              if (localStorage.getItem(`favorVotes+${this.proposalId}`)) {
                this.favorVotes += Number(
                  localStorage.getItem(`favorVotes+${this.proposalId}`)
                );
                localStorage.removeItem(`favorVotes+${this.proposalId}`);
              }
              localStorage.setItem(
                `favorVotes+${this.proposalId}`,
                this.favorVotes
              );
              this.percentageVotes = (100 / this.peopleNum) * this.favorVotes;
              console.log(this.percentageVotes, "赞成票");
            } else {
              Toast(`投出${this.Votes}反对票`);
              this.List.peopleNum++;
              this.List.opposeVotes++;
              this.opposeVotes = this.List.peopleNum;
              if (localStorage.getItem(`opposeVotes+${this.proposalId}`)) {
                this.opposeVotes += Number(
                  localStorage.getItem(`opposeVotes+${this.proposalId}`)
                );
                localStorage.removeItem(`opposeVotes+${this.proposalId}`);
              }
              localStorage.setItem(
                `opposeVotes+${this.proposalId}`,
                this.opposeVotes
              );
              this.percentageVotes = (100 / this.peopleNum) * this.favorVotes;
              console.log(this.percentageVotes, "反对票");
            }
            if (this.opposeVotes != 0) this.trackColor = "#FC7542";
            if (this.favorVotes == 0) this.valueColor = "#FC7542";
            this.isVote = false;
            this.isVote1 = false;
            this.List.isVote = 1;
          } else {
            Dialog.alert({
              title: "提案投票",
              message: "该提案已经有99人投票",
            }).then(() => {
              // on close
            });
          }
        });
      } else {
        Dialog.alert({
          title: "提案投票",
          message: "请选择你要投票的类型，同时当前账号需要有100 EOTC",
        }).then(() => {
          // on close
        });
      }
    },
  },
  computed: {
    TotalOpposeVotes() {
      return (
        parseInt(
          (this.opposeVotes / (this.favorVotes + this.opposeVotes)) * 100
        ) + "%"
      );
    },
    TotalFavorVotes() {
      return (
        parseInt(
          (this.favorVotes / (this.favorVotes + this.opposeVotes)) * 100
        ) + "%"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.meun {
  background: #f3f4f5;
  height: 100vh;
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
  background: #fff;
  box-sizing: border-box;
  height: 93vh;
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