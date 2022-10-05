<template>
  <div class="meun">
    <header>
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
    <main class="box">
      <div class="one_an">
        <div>{{ List.title }}</div>
        <div class="piao">
          <span v-if="List.state == 0">
            <div class="ion"></div>
            进行中
          </span>
          <span v-if="List.state == 1">
            <div class="ion two"></div>
            未通过
          </span>
          <span v-if="List.state == 2">
            <div class="ion three"></div>
            已通过
          </span>
          <span v-if="List.state == 3">
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
            >{{ createDate | dateFormat("yyyy-MM-dd") }}</span
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
          <span>赞成票{{ TotalFavorVotes }}</span
          >反对票{{ TotalOpposeVotes }}
        </div>
        <div class="num vote" v-if="isVote == false" style="color: #fc7542">
          <span style="color: #00b87a">{{ favorVotes }}票</span
          >{{ opposeVotes }}票
        </div>
        <div v-if="peopleNum < 99">
          该提案需要99人投票才能取得进展，作者可以随时终止
        </div>
        <div v-if="peopleNum == 99">该提案已99人投票参与,投票已完成</div>
      </div>
      <div class="xiang">
        <div class="tou">提案详情</div>
        <div class="wen">{{ List.summary }}</div>
        <!-- <div class="wen">
          为了降低这些门槛，需要签订新的合同。我们选择使用与Dharma原始提案相同的智能合约代码，并带有这些新值。为此，我们部署了一个新合约，其中包含以下更改：GovernorAlpha
          proposalThreshold已从 修改为 ，即从 1% 修改为
          0.25%。10_000_000e182_500_000e18
          添加了一个公共功能，允许合同在执行后对合同主张所有权。__acceptAdmin()TimelocksetPendingAdmin
          timelock现在被声明为，而不是在合同构建期间通过分配给存储插槽，因为它们的值在部署后不可修改（并且使用将需要一个主要的Solidity版本凸起和对已经经过良好审核的代码进行相应的重构）。uniconstantimmutable
          我们认为，该提案是朝着UNI治理的正确方向迈出的保守一步，并且创造了一个更容易获得的治理生态系统。我们希望这是Fish.vote可以参与的众多改进中的第一个。
        </div> -->
      </div>
      <div class="ti" v-if="isVote && List.isVote != 1">
        <div class="tou">
          对此提案
          <van-button disabled type="default" size="small" v-if="radio == ''"
            >投票</van-button
          >
          <van-button type="info" size="small" @click="isDloag" v-else
            >投票</van-button
          >
        </div>
        <van-radio-group v-model="radio">
          <van-radio name="1">赞成</van-radio>
          <van-radio name="2">反对</van-radio>
        </van-radio-group>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import "vant/es/toast/style";
import { cancelproposal, proposalvote, getproposal } from "@/api/Proposal";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      text: "创建于",
      trackColor: "#fff",
      valueColor: "#00B87A",
      rightText: "取消",
      title: "详情",
      radio: "",
      proposalId: this.$route.query.proposalId,
      state: this.$route.query.state,
      List: {},
      isVote: true,
      Votes: 1,
      isVote1: true,
      percentageVotes: 0,
      flag: false,
      favorVotes: 0,
      peopleNum: 0,
      opposeVotes: 0,
      createDate: "",
    };
  },
  created() {
    let data = {
      id: this.proposalId,
    };
    getproposal(data).then((res) => {
      res.data.items.walletAddress =
        res.data.items.walletAddress.slice(0, 4) +
        "..." +
        res.data.items.walletAddress.slice(-4);
      this.List = res.data.items;
      if (
        Boolean(localStorage.getItem(`createDate+${this.proposalId}`)) == false
      ) {
        localStorage.setItem(
          `createDate+${this.proposalId}`,
          this.List.createDate
        );
        this.createDate = localStorage.getItem(`createDate+${this.proposalId}`);
      }
    });
  },
  filters: {
    dateFormat(originVal, fmt) {
      const dt = new Date(originVal);
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + "").padStart(2, "0");
      const d = (dt.getDate() + "").padStart(2, "0");
      const hh = (dt.getHours() + "").padStart(2, "0");
      const mm = (dt.getMinutes() + "").padStart(2, "0");
      const ss = (dt.getSeconds() + "").padStart(2, "0");
      if (fmt === "yyyy-MM-dd") {
        return `${y}年${m}月${d}日`;
      }
      return `${y}年${m}月${d}日 ${hh}时${mm}分${ss}秒`;
    },
  },
  mounted() {
    if (this.state == 3) this.rightText = "";
    this.createDate = localStorage.getItem(`createDate+${this.proposalId}`);
    this.favorVotes = Number(
      localStorage.getItem(`favorVotes+${this.proposalId}`)
    );
    (this.peopleNum =
      Number(localStorage.getItem(`favorVotes+${this.proposalId}`)) +
      Number(localStorage.getItem(`opposeVotes+${this.proposalId}`))),
      (this.opposeVotes = Number(
        localStorage.getItem(`opposeVotes+${this.proposalId}`)
      ));
    if (this.state != 2) {
      this.isVote = false;
      this.isVote1 = false;
      this.text = "投票结束";
      this.percentageVotes = (100 / this.peopleNum) * this.favorVotes;
      this.trackColor = "#FC7542";
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
      if (localStorage.getItem(`createDate+${this.proposalId}`)) {
        localStorage.removeItem(`createDate+${this.proposalId}`);
        localStorage.setItem(`createDate+${this.proposalId}`, new Date());
      }
      this.List.state = 1;
      this.createDate = localStorage.getItem(`createDate+${this.proposalId}`);
    }
  },
  watch: {
    radio: function (val) {
      this.radio = val;
    },
  },
  methods: {
    onClickLeft() {
      history.go(-1);
    },
    onClickRight() {
      Dialog.confirm({
        title: "取消提示",
        message: "确认取消该提案？",
      })
        .then(() => {
          let data = {
            id: this.proposalId,
          };
          cancelproposal(data);
          Toast("取消成功");
          this.rightText = "";
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
      proposalvote(data).then(() => {
        this.$refs.jindu.style.height = "241.5px";
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
        }
      });
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

.box {
  background: #fff;
  box-sizing: border-box;
  height: 92.7vh;
  color: #000;
  padding-bottom: 30px;
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
  padding: 16px;
  font-size: 30px;
  color: #000;
  font-size: 29px;
  line-height: 45px;
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
  .vote {
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
  width: 92%;
  font-size: 28px;
  background: #f3f4f5;
  border-radius: 8px;
  margin: 30px auto;
  line-height: 48px;
  padding: 16px;
  .wen {
    color: #666666;
  }
}
.ti {
  font-size: 25px;
  color: #000;
  width: 92%;
  background: #f3f4f5;
  border-radius: 8px;
  margin: 16px auto;
  font-size: 30px;
  padding: 20px;
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