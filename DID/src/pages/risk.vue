<template>
  <div class="risk_wrap bg-gray fullscreen">
    <page-header title="解除风控" />
    <div class="tip">{{ $t("risk.tags1") }}({{ $t("risk.tags2") }})</div>
    <div class="content">
      <ul class="list" v-if="!!list.data.length">
        <li class="item" v-for="(item, index) in list.data" :key="index">
          <van-row class="header">
            <van-col :span="12">
              <div class="title">
                {{ $t("risk.tags3") }}<span class="index">{{ index + 1 }}</span>
              </div>
            </van-col>
            <van-col :span="12" style="text-align: right">
              <img :src="item.status ? img1 : img2" class="img" />
            </van-col>
          </van-row>
          <van-row class="row">
            <van-col :span="6" class="title">{{ $t("risk.tags4") }}</van-col>
            <van-col :span="18" class="value">{{ item.name }}</van-col>
          </van-row>
          <van-row class="row">
            <van-col :span="6" class="title">{{
              $t("setup.referrer_phone")
            }}</van-col>
            <van-col
              :span="18"
              class="value phone"
              @click="toggle(true, item.phone)"
              >{{ item.phone }}</van-col
            >
          </van-row>
        </li>
      </ul>
      <van-empty
        v-else
        class="custom-image"
        :image="require('@/assets/imgs/empty.png')"
        :description="$t('public.not_data')"
      />
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="$t('public.cancel')"
      close-on-click-action
      @select="handleSelect"
    />
    <a ref="tel" :href="`tel: ${phone};`" style="display: none"></a>
  </div>
</template>
<script>
import PageHeader from "@/components/topBar/pageHeader";
import { list } from "@/api/risk";
import img1 from "../assets/imgs/quan.png";
import img2 from "../assets/imgs/quan.png";
import { copy } from "@/utils/utils";

export default {
  name: "risk",
  components: { PageHeader },
  data() {
    return {
      img1,
      img2,
      show: false,
      phone: "",
      actions: [
        { name: this.$t("risk.data1") },
        { name: this.$t("risk.data2") },
      ],
      list: {
        loading: false,
        data: [],
      },
    };
  },
  methods: {
    copy,
    getList() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: this.$t("public.loading"),
      });
      list()
        .then((res) => {
          const { code, items } = res.data;
          if (code) {
            this.$toast.fail({
              forbidClick: true,
              message: this.$t("payment.msg1"),
            });
          } else {
            this.list.data = items;
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: this.$t("payment.msg1"),
          });
        })
        .finally(() => {
          loading.clear();
        });
    },
    toggle(show, phone) {
      this.show = show;
      this.phone = phone;
    },
    handleSelect(data) {
      if (data.name === "呼叫") {
        this.$refs.tel.click();
      } else if (data.name === "复制号码") {
        this.copy(this.phone);
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped lang="scss">
.risk_wrap {
  .tip {
    padding: 30px;
    color: #fc7542;
    font-size: 28px;
    background-color: #fffbe8;
  }
  .content {
    margin-top: 30px;
    padding: 0 30px 30px;
    .list {
      .item {
        padding: 30px;
        font-size: 28px;
        margin-bottom: 30px;
        background-color: #fff;
        border-radius: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          color: #999;
        }
        .value {
          color: #333;
          &.phone {
            color: #237ff8;
          }
        }
        .header {
          padding-bottom: 30px;
          border-bottom: 1px solid #eee;
          .title {
            display: flex;
            align-items: center;
            color: #333;
            font-size: 32px;
          }
          .index {
            display: block;
            margin-left: 10px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #333;
            border-radius: 50%;
          }
          .img {
            display: inline-block;
            width: 36px;
          }
        }
        .row {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>