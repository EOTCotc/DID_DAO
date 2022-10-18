<template>
  <div class="payment_wrap fullscreen">
    <page-header :title="$t('payment.title1')" theme="dark"></page-header>
    <div class="content">
      <van-row class="header_wrap">
        <van-col :span="12" class="currency">CNY</van-col>
        <van-col :span="12" class="setting" @click="show = true">{{
          $t("payment.tags1")
        }}</van-col>
      </van-row>
      <template v-if="!!list.data.length">
        <ul class="list">
          <li class="item" v-for="item in list.data" :key="item.paymentId">
            <van-swipe-cell>
              <van-row type="flex" align="center">
                <van-col :span="20">
                  <van-row
                    class="label"
                    type="flex"
                    align="center"
                    :gutter="10"
                  >
                    <van-col :span="4"
                      ><img
                        class="img"
                        :src="
                          require(`../../../assets/imgs/pay-${
                            item.type + 1
                          }.png`)
                        "
                        alt=""
                    /></van-col>
                    <van-col :span="20">
                      <div class="title">{{ getPaymentType(item.type) }}</div>
                      <div class="text">{{ item.cardNum }}</div>
                    </van-col>
                  </van-row>
                </van-col>
                <van-col :span="4">
                  <van-switch
                    v-model="item.isEnable"
                    :disabled="item.loading"
                    :loading="item.loading"
                    size="25px"
                    @click="handleSwitch(item)"
                  />
                </van-col>
              </van-row>
              <template #right v-if="item.type !== 0">
                <van-button
                  square
                  type="danger"
                  :text="$t('payment.text1')"
                  @click="remove(item)"
                />
              </template>
            </van-swipe-cell>
          </li>
        </ul>
        <div class="tip">{{ $t("payment.tags2") }}</div>
      </template>
      <van-empty
        v-else
        :image="require('../../../assets/imgs/empty.png')"
        :description="$t('public.not_data')"
      />
    </div>
    <van-popup position="bottom" v-model="show">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
import {
  list,
  deletePayment,
  update,
  addPayment,
} from "@/api/pagesApi/payment";

export default {
  name: "payment",
  components: { PageHeader },
  data() {
    return {
      show: false,
      list: {
        UpRefreshLoading: false,
        finished: false,
        query: {
          page: 1,
          itemsPerPage: 10,
        },
        data: [],
      },
      columns: [
        this.$t("payment.data1"),
        this.$t("payment.data2"),
        this.$t("payment.data3"),
      ],
    };
  },
  methods: {
    handleUpRefresh() {
      this.list.query.page++;
      this.list.UpRefreshLoading = true;
      this.getList();
    },
    getPaymentType(type) {
      return type === 0 ? this.$t("payment.data4") : this.columns[type - 1];
    },
    getList() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: this.$t("public.loading"),
      });
      list(this.list.query)
        .then((res) => {
          if (!res.data.code) {
            const data = res.data.items.map((item) => ({
              ...item,
              loading: false,
              isEnable: !!item.isEnable,
            }));
            if (this.list.query.page > 1) {
              this.list.data.push(...data);
            } else {
              this.list.data = data;
            }
            this.list.finished = !data.length;
          } else {
            this.$toast.fail({
              forbidClick: false,
              message: this.$t("payment.msg1"),
            });
          }
        })
        .finally(() => {
          loading.clear();
          this.list.uploading = false;
          this.list.UpRefreshLoading = false;
        });
    },
    remove(data) {
      this.$dialog.confirm({
        title: this.$t("payment.title2"),
        message: this.$t("payment.msg2"),
        beforeClose: (action, done) => {
          if (action === "confirm") {
            deletePayment(data.paymentId)
              .then(() => {
                this.getList();
                done();
              })
              .catch(() => done());
          }
        },
      });
    },
    handleSwitch(data) {
      const isEnable = !!data.isEnable ? 0 : 1;
      data.loading = true;
      update({ paymentId: data.paymentId, isEnable })
        .then(() => {
          data.isEnable = !!isEnable;
        })
        .finally(() => (data.loading = false));
    },
    handleConfirm(data) {
      this.$router.push({
        path: "/my/payment/create",
        query: { type: this.columns.indexOf(data) + 1 },
      });
    },
    handleSubmit() {
      const loading = this.$toast.loading({
        forbidClick: true,
      });
      addPayment({ type: 0 })
        .then((res) => {
          if (res.data.code) {
            this.$toast.loading({
              forbidClick: true,
              message: this.$t("payment.msg3"),
            });
          } else {
            this.$toast.success({
              forbidClick: true,
              message: this.$t("payment.msg4"),
              onClose: () => {
                this.list.query.page = 1;
                this.getList();
              },
            });
          }
        })
        .finally(() => loading.clear());
    },
    handleCancel() {
      this.show = false;
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped lang="scss">
.payment_wrap {
  .content {
    .header_wrap {
      padding: 30px;
      font-size: 28px;
      .currency {
        color: #333;
      }
      .setting {
        color: #237ff8;
        text-align: right;
      }
    }
    .list {
      .item {
        padding: 30px;
        .label {
          .img {
            display: block;
            width: 100%;
          }
          .title {
            font-weight: bold;
            font-size: 28px;
          }
          .text {
            font-size: 24px;
            margin-top: 15px;
          }
        }
        &::v-deep(.van-swipe-cell__right) {
          transform: translate3d(101%, 0, 0);
        }
      }
    }
    .tip {
      padding: 30px;
      color: #999;
      font-size: 28px;
    }
  }
}
</style>