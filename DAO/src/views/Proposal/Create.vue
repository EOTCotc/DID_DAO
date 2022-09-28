<template>
  <div class="meun">
    <header>
      <white :title="title"></white>
    </header>
    <main class="section">
      <div class="title">提案标题</div>
      <van-field v-model="value" placeholder="请输入提案标题…" />
      <div class="title">提案概述</div>
      <van-field
        v-model="message"
        rows="5"
        autosize
        type="textarea"
        placeholder="描述您的提案…"
      />
    </main>
    <footer>
      <!-- <van-button block type="warning"
        >您必须持有10000EOTC才能提交提案</van-button
      > -->
      <van-button class="but" block type="warning" @click="submit()"
        >提交提案</van-button
      >
    </footer>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import { putproposal } from "@/api/Proposal";
import { Toast } from "vant";
export default {
  components: { white },
  data() {
    return {
      title: "创建提案",
      value: "",
      message: "",
    };
  },
  methods: {
    onClickLeft() {
      history.go(-1);
    },
    submit() {
      putproposal({
        title: this.value,
        summary: this.message,
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          Toast.success("提交成功");
          this.$router.push("/Bill_list");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.meun {
  position: relative;
  background: #f3f4f5;
  height: 100vh;
}

.section {
  height: 100vh;
  margin-top: 16px;
  padding: 16px;
  background: #fff;
  .title {
    color: #000;
    margin: 16px 0;
  }
  .van-field {
    background: #f3f4f5;
    border-radius: 16px;
    margin-top: 16px;
  }
}
.van-button {
  background: #fc7542;
  width: 352px;
  position: absolute;
  bottom: 16px;
  right: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 32px;
  border: none;
}
.van-button:last-child {
  background: #237ff8;
}
</style>