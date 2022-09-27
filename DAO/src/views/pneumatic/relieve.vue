
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
      <van-cell-group inset>
        <van-cell title="解除风控联系①" />
        <van-field label="联系人" value="程莉莉" readonly :border="false" />
        <van-field
          label="手机号"
          class="phone"
          value="13145698742"
          readonly
          @click="copy"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="解除风控联系①" />
        <van-field label="联系人" value="程莉莉" readonly :border="false" />
        <van-field
          label="手机号"
          class="phone"
          value="13145698742"
          readonly
          @click="copy"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="解除风控联系①" />
        <van-field label="联系人" value="程莉莉" readonly :border="false" />
        <van-field
          label="手机号"
          class="phone"
          value="13145698742"
          readonly
          @click="copy"
        />
      </van-cell-group>
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
export default {
  components: {
    White,
  },
  data() {
    return {
      title: "解除风控",
      show: false,
      actions: [{ name: "呼叫" }, { name: "复制号码" }],
    };
  },
  mounted() {},
  methods: {
    copy() {
      this.show = true;
    },
    onCancel() {
      Toast("取消");
    },
    onSelect(item) {
      if (item.name == "复制号码") {
        console.log(111);
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
</style>