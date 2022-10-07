
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
              v-if="item.status == 1"
              :src="require('../../assets/img/feng_jin.png')"
            />
          </template>
        </van-cell>
        <van-row class="wen">
          <van-col span="4">联系人</van-col>
          <van-col span="10" offset="4">{{ item.name }}</van-col>
        </van-row>
        <van-row class="wen">
          <van-col span="4">手机号</van-col>
          <van-col
            span="10"
            offset="4"
            id="phone"
            @click="toggle(true, item.phone)"
            >{{ item.phone }}</van-col
          >
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
        @select="handleSelect"
      />
      <a ref="tel" :href="`tel: ${phone};`" style="display: none"></a>
    </main>
  </div>
</template>

<script>
import White from "@/components/Nav/white.vue";
import { Toast } from "vant";
import { getrisklist } from "@/api/pneumatic";
import { copy } from "@/utils/utils";
export default {
  components: {
    White,
  },
  data() {
    return {
      title: "解除风控",
      show: false,
      actions: [{ name: "呼叫" }, { name: "复制号码" }],
      phone: "",
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
    copy,
    toggle(show, phone) {
      this.show = show;
      this.phone = phone;
    },
    onCancel() {
      Toast("取消");
    },
    handleSelect(data) {
      console.log(data);
      if (data.name === "呼叫") {
        this.$refs.tel.click();
      } else if (data.name === "复制号码") {
        this.copy(this.phone);
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
    margin-top: 20px;
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
.custom-image {
  margin-top: 25%;
}
</style>