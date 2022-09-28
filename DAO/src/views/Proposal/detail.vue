<template>
  <div class="meun">
    <header>
      <div class="nav_an_box">
        <van-nav-bar
          fixed
          placeholder
          :title="title"
          left-arrow
          right-text="取消"
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
          <span>
            <div class="ion"></div>
            进行中 </span
          ><span>0xsd…8888提议</span>
        </div>
      </div>
      <div class="jindu" ref="jindu">
        <div class="tou">
          投票进度
          <span class="hui">创建于2022年6月26日</span>
        </div>
        <div>共{{ List.peopleNum }}人参与</div>
        <van-progress
          :track-color="trackColor"
          :percentage="percentageVotes"
          v-if="!isNaN(parseInt(percentageVotes))"
          :color="valueColor"
          :show-pivot="false"
          stroke-width="12"
        />
        <div class="num" v-if="isVote">
          <span style="color: #00b87a">{{ List.peopleNum }}</span
          >/99
        </div>
        <div class="num vote" v-if="isVote == false" style="font-size: 14px">
          <span>赞成票{{ TotalFavorVotes }}</span
          >反对票{{ TotalOpposeVotes }}
        </div>
        <div class="num vote" v-if="isVote == false" style="color: #fc7542">
          <span style="color: #00b87a">{{ List.favorVotes }}票</span
          >{{ List.opposeVotes }}票
        </div>
        <div>该提案需要99人投票才能取得进展，作者可以随时终止</div>
      </div>
      <div class="xiang">
        <div class="tou">提案详情</div>
        <div class="wen">
          为了降低这些门槛，需要签订新的合同。我们选择使用与Dharma原始提案相同的智能合约代码，并带有这些新值。为此，我们部署了一个新合约，其中包含以下更改：GovernorAlpha
          proposalThreshold已从 修改为 ，即从 1% 修改为
          0.25%。10_000_000e182_500_000e18
          添加了一个公共功能，允许合同在执行后对合同主张所有权。__acceptAdmin()TimelocksetPendingAdmin
          timelock现在被声明为，而不是在合同构建期间通过分配给存储插槽，因为它们的值在部署后不可修改（并且使用将需要一个主要的Solidity版本凸起和对已经经过良好审核的代码进行相应的重构）。uniconstantimmutable
          我们认为，该提案是朝着UNI治理的正确方向迈出的保守一步，并且创造了一个更容易获得的治理生态系统。我们希望这是Fish.vote可以参与的众多改进中的第一个。
        </div>
      </div>
      <div class="ti" v-if="isVote">
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
import { getproposal, cancelproposal, proposalvote } from "@/api/Proposal";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      trackColor: "#fff",
      valueColor: "#00B87A",
      title: "详情",
      radio: "",
      proposalId: this.$route.query.proposalId,
      List: {},
      isVote: true,
      Votes: 1,
      percentageVotes: 0,
    };
  },
  created() {
    getproposal(this.proposalId).then((res) => {
      this.List = res.data.items;
      console.log(this.List);
    });
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
        message: "确认该提案？",
      })
        .then(() => {
          cancelproposal(this.proposalId);
          Toast("取消成功");
        })
        .catch(() => {
          // on cancel
        });
    },
    isDloag() {
      proposalvote(this.proposalId, this.radio).then(() => {
        this.$refs.jindu.style.height = "241.5px";
        if (this.List.peopleNum <= 99) {
          if (this.radio == 1) {
            Toast(`投出${this.Votes}赞成票`);
            this.List.peopleNum += 1;
            this.List.favorVotes += 1;
            this.percentageVotes =
              (100 / this.List.peopleNum) * this.List.favorVotes;
          } else {
            Toast(`投出${this.Votes}反对票`);
            this.List.peopleNum += 1;
            this.List.opposeVotes += 1;
            if (this.List.opposeVotes != 0) this.trackColor = "#FC7542";
            if (this.List.favorVotes == 0) this.valueColor = "#FC7542";
            this.percentageVotes =
              (100 / this.List.peopleNum) * this.List.opposeVotes;
          }
        }
        this.isVote = false;
      });
    },
  },
  computed: {
    TotalOpposeVotes() {
      return (
        (this.List.opposeVotes /
          (this.List.favorVotes + this.List.opposeVotes)) *
          100 +
        "%"
      );
    },
    TotalFavorVotes() {
      return (
        (this.List.favorVotes /
          (this.List.favorVotes + this.List.opposeVotes)) *
          100 +
        "%"
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
  color: #000;
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
  padding: 16px;
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