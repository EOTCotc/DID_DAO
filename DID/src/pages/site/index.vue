<template>
  <div class="container">
    <van-nav-bar
      :border="false"
      :title="$t('bindRelation.tab_locality')"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <van-cell
        class="now"
        :title="$t('bindRelation.user_loc')"
        :value="$t('bindRelation.loc')"
        :border="false"
      />
      <van-cell
        class="now"
        :title="$t('bindRelation.country')"
        :value="country[1]"
        is-link
        to="/nation"
      />
      <van-cell
        :title="$t('bindRelation.p_c_area')"
        :value="region"
        is-link
        @click="showPopup = true"
        :border="false"
      />
    </div>

    <!-- 省市区 -->
    <van-popup v-model="showPopup" round position="bottom">
      <van-picker
        @confirm="tabConfirm"
        @cancel="showPopup = false"
        show-toolbar
        :title="$t('bindRelation.select_site')"
        :columns="columns"
      />
    </van-popup>

    <div class="btn">
      <div class="tip">{{$t('bindRelation.tip')}}</div>
      <van-button
        round
        block
        color="#1b2945"
        :disabled="!selected"
        @click="$router.replace({name: $route.query.form, params: {code: selected}})"
      >
        {{$t('bindRelation.next')}}
      </van-button>
    </div>
  </div>
</template>

<script>
import district_zh from "@/utils/district_zh.json";
export default {
  name: "site",
  data() {
    return {
      district_zh,
      country: "", //国家
      region: "", //省市区
      columns: [],
      showPopup: false,
      selected: null
    };
  },
  mounted() {
    let country = this.cookie.get("country");
    this.getNowLocation(); //获取当前位置
    country && this.getCountry(country); //获取选择的国家
  },
  methods: {
    // 获取当前位置
    getNowLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (res) => {
            // console.log(res, "suc");
          },
          (err) => {
            // console.log(err, "err");
          }
        );
      } else {
        this.$toast.fail("地理位置服务不可用");
      }
    },
    // 获取选择的国家以及处理省市区的数据
    getCountry(country) {
       //获取的是字符串
      this.country = country.split(",");
      // 添加省级对象
      let province = this.district_zh[this.country[0]];
      for (const key_p in province) {
        if (Object.hasOwnProperty.call(province, key_p)) {
          const element_p = province[key_p];
          // 添加省
          this.columns.push({
            text: element_p || "",
            eng: key_p || "",
            children: [],
          });
        }
      }
      // 添加城市
      this.columns.forEach((item) => {
        let city = this.district_zh[item.eng];
        for (const key_c in city) {
          if (Object.hasOwnProperty.call(city, key_c)) {
            const element_c = city[key_c];
            item.children.push({
              text: element_c || "",
              eng: key_c || "",
              children: [],
            });
          }
        }
      });
      // 添加区
      this.columns.forEach((item) => {
        item.children.forEach((item2) => {
          let district = this.district_zh[item2.eng];
          for (const key_d in district) {
            if (Object.hasOwnProperty.call(district, key_d)) {
              const element_d = district[key_d];
              item2.children.push({
                text: element_d || "",
                eng: key_d || "",
              });
            }
          }
        });
      });
    },
    // 确定选择的位置
    tabConfirm(e, i) {
      this.region = `${e[0]} - ${e[1]} - ${e[2]}`;
      this.selected = {
        province: [i[0], e[0]],
        city: [i[1], e[1]],
        area: [i[2], e[2]]
      }
      this.showPopup = false;
    },
    // 导航栏返回
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  height: 100vh;
  background: #f3f4f5;
}
:deep(.van-icon) {
  color: #000;
}
.content {
  .now {
    margin-top: 20px;
  }
}
.btn {
  @include posi($b: 30px, $l: 30px, $r: 30px);
  .tip {
    padding: 24px;
    font-size: 28px;
    color: #fc7542;
    border-radius: 8px;
    background: #fffbe8;
    margin-bottom: 30px;
  }
}
</style>