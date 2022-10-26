<template>
  <div class="meun">
    <header>
      <white :title="title"></white>
    </header>
    <main class="section">
      <van-form @submit="submit">
        <div class="title">{{ $t("create.title") }}</div>
        <van-field
          v-model="value"
          :placeholder="$t('create.placeholder')"
          :rules="[{ required: true }]"
        />
        <div class="title">{{ $t("create.overview") }}</div>
        <van-field
          v-model="message"
          rows="5"
          autosize
          type="textarea"
          :placeholder="$t('create.describe')"
          :rules="[{ required: true }]"
        />

        <div v-if="items < 10000">
          <van-button block type="warning" color="#fc7542">
            {{ $t("create.btn_text") }}
          </van-button>
        </div>
        <div v-else>
          <van-button block type="warning" color="#237ff8" native-type="submit">
            {{ $t("create.btn_submit") }}
          </van-button>
        </div>
      </van-form>
    </main>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import { putproposal } from "@/api/Proposal";
import { getuSereotc } from "@/api/earnings";
import { Toast } from "vant";
export default {
  components: { white },
  data() {
    return {
      title: this.$t("create.nav_title"),
      value: "",
      message: "",
      items: undefined,
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {
    getuSereotc().then((res) => {
      console.log(res);
      this.items = res.data.items;
    });
  },
  methods: {
    onClickLeft() {
      history.go(-1);
    },
    submit() {
      if (this.user.daoEOTC >= 10000) {
        putproposal({
          title: this.value,
          summary: this.message,
        }).then((res) => {
          console.log(res);
          if (res.status == 200) {
            Toast.success(this.$t("create.success"));
            this.$router.push("/Bill_list");
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.meun {
  position: relative;
  background: #f3f4f5;
}

.section {
  height: 89vh;
  margin-top: 20px;
  padding: 16px;
  background: #fff;
  .title {
    color: #000;
    margin: 16px 0;
    font-size: 30px;
  }
  .van-field {
    background: #f3f4f5;
    border-radius: 16px;
    margin-top: 16px;
  }
}
.van-button {
  width: 352px;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 16px;
  margin: 0 auto;
  border-radius: 32px;
  border: none;
}
</style>