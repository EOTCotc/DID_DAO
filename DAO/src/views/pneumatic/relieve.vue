
<template>
  <div class="fullscreen bg-gray">
    <header>
      <white :title="title"></white>
      <div>
        <van-notice-bar mode="closeable" wrapable :scrollable="false">{{
          $t("relieve.notice_text")
        }}</van-notice-bar>
      </div>
    </header>
    <main class="section">
      <van-cell-group inset v-for="(item, index) in riskList" :key="index">
        <van-cell>
          <template #title class="title">
            <span class="custom-title">{{ $t("relieve.custom_title") }}</span>
            <span class="num">{{ index + 1 }}</span>
          </template>
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
          <van-col span="4">{{ $t("relieve.contacts") }}</van-col>
          <van-col span="10" offset="4">{{ item.name }}</van-col>
        </van-row>
        <van-row class="wen">
          <van-col span="4">{{ $t("relieve.phone") }}</van-col>
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
        :description="$t('relieve.description')"
      />
      <van-action-sheet
        v-model="show"
        :actions="actions"
        :cancel-text="$t('relieve.cancel_text')"
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
      title: this.$t("relieve.nav_title"),
      show: false,
      actions: [
        { name: this.$t("relieve.call") },
        { name: this.$t("relieve.copy") },
      ],
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
      Toast(this.$t("relieve.cancel_text"));
    },
    handleSelect(data) {
      console.log(data);
      if (data.name === this.$t("relieve.call")) {
        this.$refs.tel.click();
      } else if (data.name === this.$t("relieve.copy")) {
        this.copy(this.phone);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.section {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding-bottom: 20px;
  .van-cell-group {
    margin-top: 20px;
    .van-field {
      .phone ::v-deep .van-field__control {
        color: #237ff8 !important;
      }
    }
  }
}

.num {
  padding: 0px 8px;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-radius: 50%;
}
.wen {
  font-size: 26px;
  padding: 10px 30px;
  line-height: 48px;
}
.custom-image {
  margin-top: 25%;
}
</style>