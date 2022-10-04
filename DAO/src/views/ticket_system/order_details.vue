<template>
  <div class="order">
    <header>
      <white :title="title"></white>
    </header>
    <main>
      <van-cell-group inset>
        <van-cell title="类型" title-style="color:#999;" value="功能建议" />
        <van-cell
          title="提交时间"
          title-style="color:#999;"
          :value="order.createDate"
        />
        <van-cell
          title="提交人"
          title-style="color:#999;"
          :value="order.submitter"
        />
        <van-cell
          title="联系方式"
          title-style="color:#999;"
          :value="order.phone"
        />
      </van-cell-group>
      <van-cell-group inset class="group">
        <van-cell title="问题描述" title-style="color:#999;" :border="false" />
        <van-cell :title="order.describe" />
      </van-cell-group>
      <van-cell-group inset class="tu">
        <!-- <van-uploader
          :after-read="clzpAfterRead"
          v-model="fileList"
          :max-count="1"
          :max-size="5 * 1024 * 1024"
        /> -->
        <van-image width="60" height="60" :src="order.images" />
        <!-- <van-image width="60" height="60" src="./assets/image/leaf.jpg" /> -->
      </van-cell-group>
      <van-cell-group inset class="group" v-show="order.status == 1">
        <van-cell title="处理记录" style="color: #999" :border="false" />
        <van-field
          v-model="message"
          rows="6"
          type="textarea"
          placeholder="工单处理记录..."
        />
      </van-cell-group>
      <van-cell-group inset class="group" v-show="order.status == 2">
        <van-cell title="处理记录" style="color: #999" :border="false" />
        <van-cell :title="order.record"></van-cell>
      </van-cell-group>
    </main>
    <footer>
      <van-button
        round
        type="info"
        @click="update(order.status)"
        class="one_btn"
        v-show="order.status == 0"
        >更进处理</van-button
      >
      <div class="two_btn" v-show="order.status == 1">
        <van-button round type="info" color="#E52A2A" plain @click="cancel()"
          >取消处理</van-button
        >
        <van-button round type="info" @click="update(order.status)"
          >处理完成</van-button
        >
      </div>
    </footer>
  </div>
</template>

<script>
import white from "../../components/Nav/white.vue";
import { getworkorder, updateWork } from "@/api/workOrder";
import { Dialog } from "vant";
export default {
  components: { white },
  data() {
    return {
      title: "工单详情",
      order: {},
      message: "",
      workOrderId: "",
      fileList: [],
    };
  },
  created() {
    this.workOrderId = this.$route.query.workOrderId;
    getworkorder({ workOrderId: this.workOrderId }).then((res) => {
      res.data.items.createDate = this.$dayjs(res.data.items.createDate).format(
        "YYYY-MM-DD"
      );

      this.order = res.data.items;
    });
  },
  methods: {
    // clzpAfterRead(file) {
    //   console.log(file);
    //   // 上传状态提示开启
    //   file.status = "uploading";
    //   file.message = "上传中...";
    //   // 创建一个空对象实例
    //   let formData = new FormData();
    //   // 调用append()方法添加数据
    //   formData.append("type", file.file);
    //   uploadimage(formData).then((res) => {
    //     console.log(res);
    //     // if (res.code == "10000") {
    //     //   // 上传状态提示关闭
    //     //   file.status = "done";
    //     //   this.$toast("上传成功！");
    //     //   this.clzpfilePath = res.data.relativePath; //删除所需参数
    //     // }
    //   });
    // },
    onClickLeft() {
      history.go(-1);
    },
    cancel() {
      Dialog.confirm({
        title: "取消提示",
        confirmButtonColor: "#000",
        message: "确定取消处理该工单？",
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
          title: "处理完成",
          confirmButtonColor: "#000",
          message: "请确定该工单问题已处理完成,点击确定完成",
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
  padding: 12.8px 3.2px;
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
    line-height: 12.8px;
  }
}
.tu {
  .van-image {
    margin: 0 10px;
  }
}
.one_btn {
  width: 90%;
  position: absolute;
  bottom: 16px;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: 20px;
}
.two_btn {
  margin-top: 32px;
  display: flex;
  justify-content: space-around;
  .van-button {
    width: 176px;
  }
}
.order ::v-deep .van-dialog__message--has-title {
  color: #f37a4c !important;
}
</style>