<template>
  <div class="order">
    <header>
      <white :title="title"></white>
    </header>
    <main>
      <van-cell-group inset>
        <van-cell
          v-if="type_title == 0"
          :title="$t('order.type')"
          title-style="color:#999;"
          :value="$t('order.type_value_feed')"
        />
        <van-cell
          v-if="type_title == 1"
          :title="$t('order.type')"
          title-style="color:#999;"
          :value="$t('order.type_value')"
        />
        <van-cell
          :title="$t('order.time')"
          title-style="color:#999;"
          :value="order.createDate"
        />
        <van-cell
          :title="$t('order.submitter')"
          title-style="color:#999;"
          :value="order.submitter"
        />
        <van-cell
          :title="$t('order.information')"
          title-style="color:#999;"
          :value="order.phone"
        />
      </van-cell-group>
      <van-cell-group inset class="group">
        <van-cell
          :title="$t('order.describe')"
          title-style="color:#999;"
          :border="false"
        />
        <van-cell :title="order.describe" />
      </van-cell-group>
      <van-cell-group inset class="tu">
        <van-image
          width="55"
          height="55"
          v-for="(item, index) in order.images"
          :key="index"
          :src="spliceSrc(item)"
        />
      </van-cell-group>
      <van-cell-group inset class="group" v-show="order.status == 1">
        <van-cell
          :title="$t('order.processing')"
          style="color: #999"
          :border="false"
        />
        <van-field
          v-model="message"
          rows="5"
          type="textarea"
          :placeholder="$t('order.placeholder')"
        />
      </van-cell-group>
      <van-cell-group inset class="group" v-show="order.status == 2">
        <van-cell
          :title="$t('order.processing')"
          style="color: #999"
          :border="false"
        />
        <van-cell :title="order.record"></van-cell>
      </van-cell-group>
      <van-button
        round
        type="info"
        @click="update(order.status)"
        class="one_btn"
        v-show="order.status == 0"
        >{{ $t("order.further") }}</van-button
      >
      <div class="two_btn" v-show="order.status == 1">
        <van-button round type="info" color="#E52A2A" plain @click="cancel()">{{
          $t("order.cancel")
        }}</van-button>
        <van-button round type="info" @click="update(order.status)">{{
          $t("order.finish")
        }}</van-button>
      </div>
    </main>
  </div>
</template>

<script>
import { spliceSrc } from "@/utils/utils";
import white from "../../components/Nav/white.vue";
import { getworkorder, updateWork } from "@/api/workOrder";
import { Dialog } from "vant";
export default {
  components: { white },
  data() {
    return {
      title: this.$t("order.nav_title"),
      order: {},
      message: "",
      workOrderId: "",
      fileList: [],
      type: "wordOrder",
      type_title: undefined,
    };
  },
  created() {
    this.type_title = this.$route.query.type;
    this.workOrderId = this.$route.query.workOrderId;
    getworkorder({ workOrderId: this.workOrderId }).then((res) => {
      res.data.items.createDate = this.$dayjs(res.data.items.createDate).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      res.data.items.images = res.data.items.images.split(",");
      this.order = res.data.items;
      console.log(this.order);
    });
  },
  methods: {
    spliceSrc,
    onClickLeft() {
      history.go(-1);
    },

    cancel() {
      Dialog.confirm({
        title: this.$t("order.dialog_title"),
        confirmButtonColor: "#000",
        message: this.$t("order.dialog_message"),
        getContainer: ".order",
      })
        .then(() => {
          updateWork({
            workOrderId: this.workOrderId,
            workOrderStatus: 0,
            record: this.message,
          }).then((res) => {
            console.log(res);
            this.$router.push({
              path: "/pending",
            });
          });
        })
        .catch(() => {});
    },
    update(status) {
      console.log(status);
      if (status == 0) {
        updateWork({
          workOrderId: this.workOrderId,
          workOrderStatus: status + 1,
          record: this.message,
        }).then((res) => {
          console.log(res);
          this.$router.push({
            path: "/pending",
            query: { status: status + 1 },
          });
        });
      } else {
        Dialog.confirm({
          title: this.$t("order.dialog_finish"),
          confirmButtonColor: "#000",
          message: this.$t("order.dialog_messfinish"),
        })
          .then(() => {
            updateWork({
              workOrderId: this.workOrderId,
              workOrderStatus: status + 1,
              record: this.message,
            }).then((res) => {
              console.log(res);
              this.$router.push({
                path: "/pending",
                query: { status: status + 1 },
              });
            });
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order {
  position: relative;
  background: #f3f4f5;
  height: 100vh;
}

.van-cell-group {
  margin-top: 16px;
  color: #999;
  padding: 5px 3.2px;
  .van-cell {
    font-size: 16px;
  }
  .van-cell__value {
    color: #333;
  }
}
.group {
  .van-cell {
    font-size: 16px;
    line-height: 15px;
    .van-cell__title {
      color: #000;
    }
  }
}
.tu {
  .van-image {
    margin: 0 10px;
  }
  .van-uploader {
    margin: 0 10px;
  }
}

.one_btn {
  width: 90%;
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;
  margin: 0 auto;
}

.two_btn {
  display: flex;
  justify-content: space-around;

  .van-button {
    width: 176px;
    margin-top: 16px;
  }
}
.order ::v-deep .van-dialog__message--has-title {
  color: #f37a4c !important;
}
</style>