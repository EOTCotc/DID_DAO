
<template>
  <div class="contatiner">
    <header>
      <white :title="title"></white>
      <div>
        <van-notice-bar mode="closeable" wrapable :scrollable="false"
          >为了正常使用账户，请及时与以下5位联系人进行视频身份核对(3位及以上联系人解除即生效)</van-notice-bar
        >
      </div>
    </header>
    <main class="section">
      <van-cell-group inset v-for="(item, index) in riskList" :key="index">
        <van-cell title="解除风控联系">
          <template #right-icon>
            <van-image
              width="25"
              height="25"
              v-if="item.status == 0"
              :src="require('../../assets/img/quan.png')"
            />
            <van-image
              width="25"
              height="25"
              v-if="item.status == 2"
              :src="require('../../assets/img/feng_jin.png')"
            />
          </template>
        </van-cell>
        <van-row class="wen">
          <van-col span="4">联系人</van-col>
          <van-col span="10" offset="4" @click="copy">{{ item.name }}</van-col>
        </van-row>
        <van-row class="wen">
          <van-col span="4">手机号</van-col>
          <van-col span="10" offset="4" id="phone" @click="copy">{{
            item.phone
          }}</van-col>
        </van-row>
      </van-cell-group>
      <van-empty
        v-show="!riskList.length"
        class="custom-image"
        :image="require('./../../assets/img/empty.png')"
        description="暂无任何数据"
      />
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @cancel="onCancel"
        @select="onSelect"
      />
    </main>
  </div>
</template>

<script>
import White from "@/components/Nav/white.vue";
import { Toast } from "vant";
import { getrisklist } from "@/api/pneumatic";
export default {
  components: {
    White,
  },
  data() {
    return {
      title: "解除风控",
      show: false,
      actions: [{ name: "呼叫" }, { name: "复制号码" }],
      riskList: [],
    };
  },
  mounted() {},
  created() {
    getrisklist().then((res) => {
      console.log(res);
      this.riskList = res.data.items;
    });
  },
  methods: {
    copy() {
      this.show = true;
    },
    onCancel() {
      Toast("取消");
    },
    onSelect(item) {
      if (item.name == "复制号码") {
        // 模拟 输入框
        var cInput = document.createElement("input");
        var value = document.getElementById("phone");
        cInput.value = value.innerText;
        document.body.appendChild(cInput);
        cInput.select(); // 选取文本框内容

        document.execCommand("copy");

        Toast("复制成功");
        // 复制成功后再将构造的标签 移除
        document.body.removeChild(cInput);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.contatiner {
  background: #f3f4f5;
  height: 100vh;
}
.section {
  .van-cell-group {
    margin-top: 16px;
    .van-field {
      .phone ::v-deep .van-field__control {
        color: #237ff8 !important;
      }
    }
  }
}
.wen {
  font-size: 26px;
  /* maring: ; */
  padding: 10px 30px;
  line-height: 48px;
}
</style>