<template>
  <div class="community_wrap fullscreen bg-gray">
    <page-header :title="$t('community.tags3')" />
    <div class="content">
      <van-form validate-first @submit="handleSubmit">
        <van-field
          class="row"
          v-model="form.data.name"
          name="name"
          :label="$t('community.tags6')"
          :placeholder="$t('community.tags7')"
          :rules="[
            {
              validator: (val) => !!val.length,
              message: $t('community.tags7'),
            },
          ]"
        />
        <van-field
          class="row"
          v-model="form.data.comName"
          name="comName"
          :label="$t('community.tags8')"
          :placeholder="$t('community.tags9')"
          :rules="[
            {
              validator: (val) => !!val.length,
              message: $t('community.tags9'),
            },
          ]"
        />
        <van-field
          disabled
          :value="form.data.addressText"
          class="row selectAddress"
          name="address"
          :label="$t('community.tags10')"
          :placeholder="$t('community.tags11')"
          @click="selectAddress"
        ></van-field>
        <van-field
          class="row"
          v-model="form.data.phone"
          name="phone"
          :label="$t('community.tags12')"
          type="tel"
          :placeholder="$t('community.tags13')"
          :rules="[
            {
              validator: (val) => val.length >= 8,
              message: $t('community.tags14'),
            },
          ]"
        />
        <van-field class="row" name="hasOffice" :label="$t('community.tags15')">
          <template #input>
            <van-radio-group
              v-model="form.data.hasOffice"
              direction="horizontal"
            >
              <van-radio :name="1">{{ $t("community.tags16") }}</van-radio>
              <van-radio :name="0">{{ $t("community.tags17") }}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field class="row" name="hasGroup" :label="$t('community.tags18')">
          <template #input>
            <van-radio-group
              v-model="form.data.hasGroup"
              direction="horizontal"
            >
              <van-radio :name="1">{{ $t("community.tags19") }}</van-radio>
              <van-radio :name="0">{{ $t("community.tags20") }}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 25px 15px 0">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            :disabled="submitDisable"
            color="#1B2945"
            >{{ $t("logout.submit") }}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import jsCookie from "js-cookie";
import PageHeader from "@/components/topBar/pageHeader.vue";
import { create, oldData } from "@/api/pagesApi/community";

export default {
  name: "communityCreate",
  components: {
    PageHeader,
  },
  data() {
    return {
      form: {
        loading: false,
        data: {
          addressText: "",
          addressName: "",
          name: "",
          comName: "",
          address: "",
          phone: "",
          hasOffice: "",
          hasGroup: "",
          area: "",
          city: "",
          country: "",
          province: "",
        },
      },
    };
  },
  computed: {
    submitDisable() {
      const data = { ...this.form.data };
      delete data.address;
      delete data.province;
      delete data.city;
      delete data.area;
      return !!Object.values(data).includes("");
    },
  },
  methods: {
    // 获取之前的数据
    getOldFormData() {
      const userInfo = JSON.parse(this.cookie.get("userInfo"));
      if (userInfo.authType === 3) {
        const loading = this.$toast.loading({
          message: this.$t("public.loading"),
          forbidClick: true,
        });
        oldData(userInfo.applyCommunityId)
          .then((res) => {
            if (!res.data.code) {
              const data = res.data.items;
              Object.keys(this.form.data).forEach((item) => {
                this.form.data[item] = data[item];
              });
              this.form.data.name = userInfo.name;
              this.form.data.addressText = data.addressName;
            } else {
              this.$toast.fail({
                forbidClick: true,
                message: res.data.message,
              });
            }
          })
          .finally(() => loading.clear());
      }
    },
    // 选择国家省市区
    selectAddress() {
      this.cookie.set("communityForm", JSON.stringify(this.form.data));
      this.$router.push({ path: "/site", query: { form: this.$route.name } });
    },
    handleSubmit() {
      this.$dialog
        .confirm({
          title: this.$t("bindRelation.conf_tip"),
          message: this.$t("community.msg2"),
          confirmButtonColor: "#1B2945",
          cancelButtonColor: "#666",
          beforeClose: (action, done) => {
            if (action === "confirm") {
              this.form.data.addressName += this.form.data.address;
              create(this.form.data)
                .then((res) => {
                  if (res.data.code) {
                    this.$toast.fail({
                      forbidClick: true,
                      message: res.data.message,
                    });
                  } else {
                    this.$toast.success({
                      forbidClick: true,
                      message: this.$t("payment.msg4"),
                      onClose: () => {
                        this.$router.replace("/my/community/create/success");
                      },
                    });
                  }
                })
                .catch(() => {
                  this.$toast.fail({
                    forbidClick: true,
                    message: this.$t("payment.msg3"),
                  });
                })
                .finally(() => {
                  done();
                });
            } else {
              done();
            }
          },
        })
        .catch(() => {});
    },
  },
  created() {
    const formStr = this.cookie.get("communityForm");
    if (!!formStr) {
      Object.assign(this.form.data, JSON.parse(formStr));
    }
    if (!!this.$route.params.code) {
      let country = null;
      if (!!this.cookie.get("country")) {
        country = this.cookie.get("country").split(",");
      }
      const { province, city, area } = this.$route.params.code;
      const address = [];
      country[1] && address.push(country[1]);
      province[1] && address.push(province[1]);
      city[1] && address.push(city[1]);
      area[1] && address.push(area[1]);
      this.form.data.addressText = address.join(" - ");
      this.form.data.addressName = address.join("");
      this.form.data.country = country[0];
      this.form.data.province = province[0];
      this.form.data.city = city[0];
      this.form.data.area = area[0];
    }
    this.getOldFormData();
  },
  beforeRouteEnter(to, from, next) {
    if (from.path !== "/site") {
      jsCookie.remove("communityForm");
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.content {
  flex: 1;
  margin: 25px;
  height: 100%;
  border-radius: 20px;
  background-color: #fff;
  overflow: hidden;

  .row {
    flex-wrap: wrap;

    &::v-deep(.van-field__value) {
      flex: initial;
      width: 100%;
    }
  }
  .selectAddress::v-deep(.van-field__label) {
    color: #646566;
  }
  .selectAddress::v-deep(.van-field__control:disabled) {
    color: #323233;
    -webkit-text-fill-color: initial;
  }
}
</style>