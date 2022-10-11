<template>
  <div class="container">
    <page-header title="仲裁案动态" />
    <div class="content">
      <ul v-if="list.length != 0">
        <li
          v-for="(item, index) in list"
          @click="toArbitrationMsg(item)"
          :key="index"
        >
          <img :src="item.messageType == 0 ? shen_qing : tong_zhi" />
          <div class="details">
            <div>
              <span>{{ item.messageType == 0 ? "申请" : "通知" }}</span>
              <span>{{ item.msgTime }}</span>
            </div>
            <p>{{ item.reason }}</p>
          </div>
        </li>
      </ul>
      <div class="not-data" v-else>
        <img src="@/assets/imgs/empty.png" alt="" />
        <p>暂无任何数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
import { getarbitratemessage } from "@/api/viewsApi/arbitrationMsg.js";
import { transformUTCDate } from "@/utils/utils";
export default {
  name: "arbitrationList",
  data() {
    return {
      shen_qing: require("@/assets/imgs/shenqing.png"),
      tong_zhi: require("@/assets/imgs/tongzhi.png"),
      list: [], //消息列表
    };
  },
  components: {
    PageHeader,
  },
  mounted() {
    this.getMsgList();
  },
  methods: {
    // 获取仲裁消息列表
    getMsgList() {
      getarbitratemessage({ isArbitrate: 1 }).then((res) => {
      console.log(res.data.items);
        if (res.data.code == 0) {
          this.list = res.data.items;
          this.list.forEach((item) => {
            // transformUTCDate()把中国时间转成格林威治时间
            item.msgTime = this.msgListTimes(transformUTCDate(item.createDate));
          });
        }
      });
    },
    // 消息列表的时间
    msgListTimes(val) {
      let days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      let now = new Date(),
        nowY = now.getFullYear(),
        nowM = now.getMonth() + 1,
        nowD = now.getDate(),
        nowW = now.getDay();
      let lastnow = new Date(val),
        lastY = lastnow.getFullYear(),
        lastM = lastnow.getMonth() + 1,
        lastD = lastnow.getDate(),
        lastW = lastnow.getDay(),
        lastH = lastnow.getHours(),
        lastI =
          lastnow.getMinutes() < 10
            ? "0" + lastnow.getMinutes()
            : lastnow.getMinutes(),
        lastT = lastnow.getTime();
      let fomatd = "1970-01-01 00:00:00";
      if (nowM == lastM) {
        //是这个月的
        if (nowD == lastD) {
          //是今天的
          fomatd = lastH + ":" + lastI;
        } else {
          //不是今天
          let nextWeek =
            new Date(`${nowY}-${nowM}-${nowD} 00:00:00`).getTime() +
            (8 - nowW) * 24 * 60 * 60 * 1000;
          if (lastT > nextWeek) {
            //是这周?
            fomatd = days[lastW];
          } else {
            //不是这周
            fomatd = lastM + "月" + lastD + "日";
          }
        }
      } else {
        if (nowY == lastY) {
          //是今年的
          fomatd = lastM + "月" + lastD + "日";
        } else {
          fomatd = lastY + "年" + lastM + "月" + lastD + "日";
        }
      }
      return fomatd;
    },
    // 去消息详情
    toArbitrationMsg(data) {
      const {messageType, arbitrateMessageId, associatedId, arbitrateId} = data
      this.$router.push({
        path: "/arbitrationMsg",
        query: { messageType, arbitrateMessageId, associatedId, arbitrateId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  min-height: 100vh;
}
.content {
  padding: 0 30px;
  li {
    margin-top: 43px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    img {
      margin-right: 16px;
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
    .details {
      width: 100%;
      div {
        display: flex;
        justify-content: space-between;
        font-size: 32px;
        color: #333;
        span:last-of-type {
          font-size: 24px;
          color: #999;
        }
      }
      p {
        margin-top: 5px;
        font-size: 28px;
        color: #999;
      }
    }
  }
  .not-data {
    margin-top: 50%;
    transform: translateY(-50%);
    img {
      margin: 0 auto;
      width: 400px;
      height: 400px;
      display: block;
    }
    p {
      text-align: center;
      font-size: 32px;
      color: #999;
    }
  }
}
</style>