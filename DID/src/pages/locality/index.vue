<template>
  <div class="container">
    <van-nav-bar
      :border="false"
      :title="$t('bindRelation.tab_locality')"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <!-- <van-cell
        class="now"
        :title="$t('bindRelation.user_loc')"
        :value="$t('bindRelation.loc')"
        :border="false"
      /> -->
      <van-cell
        class="now"
        :title="$t('bindRelation.country')"
        :value="country"
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

    <button class="btn" @click="save">{{ $t("public.save") }}</button>
  </div>
</template>

<script>
import district_zh from "@/utils/district_zh.json";
import { setuserinfo } from "@/api/pagesApi/locality";
export default {
  name: "site",
  data() {
    return {
      district_zh,
      country: "", //国家
      region: "", //省市区
      columns: [],
      showPopup: false,
      // 更新所在地
      req: {},
    };
  },
  mounted() {
    // 获取省市，国家由getCountry获取
    let userInfo = JSON.parse(this.cookie.get("userInfo"));
    var province, city, area;
    if (userInfo.province != "-" && userInfo.city == "-") {
      // 有省级
      province = userInfo.province.split("-")[1];
      this.region = province;
    } else if (userInfo.city != "-" && userInfo.area == "-") {
      // 有市级
      province = userInfo.province.split("-")[1];
      city = userInfo.city.split("-")[1];
      this.region = `${province}-${city}`;
    } else if (userInfo.area != "-") {
      // 有区级
      province = userInfo.province.split("-")[1];
      city = userInfo.city.split("-")[1];
      area = userInfo.area.split("-")[1];
      this.region = `${province}-${city}-${area}`;
    }
    //获取用户选择的国家
    this.getCountry();
  },
  methods: {
    // 获取选择的国家以及处理省市区的数据
    getCountry() {
      if (this.cookie.get("country")) {
        let country = this.cookie.get("country").split(",");
        this.country = country[1];
        this.req.country = country[0];
        // 添加省级对象
        let province = this.district_zh[this.req.country];
        // 有的国家没有省 比如：阿鲁巴
        if (province) {
          for (const key_p in province) {
            if (Object.hasOwnProperty.call(province, key_p)) {
              const element_p = province[key_p];
              // 添加省
              this.columns.push({
                text: element_p,
                eng: key_p,
                children: [],
              });
            }
          }
        } else {
          this.columns.push({
            text: "",
            eng: "",
            children: [],
          });
        }
        // 添加城市
        this.columns.forEach((item) => {
          let city = this.district_zh[item.eng];
          // 有的省没有市 比如：台湾省
          if (city) {
            for (const key_c in city) {
              if (Object.hasOwnProperty.call(city, key_c)) {
                const element_c = city[key_c];
                item.children.push({
                  text: element_c,
                  eng: key_c,
                  children: [],
                });
              }
            }
          } else {
            item.children.push({ text: "", eng: "", children: [] });
          }
        });
        // 添加区
        this.columns.forEach((item) => {
          item.children.forEach((item2) => {
            let district = this.district_zh[item2.eng];
            if (district) {
              for (const key_d in district) {
                if (Object.hasOwnProperty.call(district, key_d)) {
                  const element_d = district[key_d];
                  item2.children.push({
                    text: element_d,
                    eng: key_d,
                  });
                }
              }
            } else {
              item2.children.push({ text: "", eng: "" });
            }
          });
        });
      }
    },
    // 确定选择的位置
    tabConfirm(e, i) {
      if (this.country) {
        // 判断省市区是否有,this.region展示给用户看
        if (e[0] == "") {
          //只有国家
          this.region = "";
        } else if (e[0] != "" && e[1] == "") {
          //只有省
          this.region = `${e[0]}`;
        } else if (e[0] != "" && e[1] != "" && e[2] == "") {
          //只有省市
          this.region = `${e[0]} - ${e[1]}`;
        } else if (e[0] != "" && e[1] != "" && e[2] != "") {
          this.region = `${e[0]} - ${e[1]} - ${e[2]}`;
        }
        // 省市区的code，传给后端
        this.req.province = this.columns[i[0]].eng;
        this.req.city = this.columns[i[0]].children[i[1]].eng;
        this.req.area = this.columns[i[0]].children[i[1]].children[i[2]].eng;
      } else {
        this.$toast.fail(this.$t('public.toast1'));
      }
      // 选择省市区的显示隐藏
      this.showPopup = false;
    },
    // 保存按钮
    save() {
      if (this.req.country == "CHN") {
        if (this.req.province) {
          setuserinfo(this.req).then((res) => {
            if (res.data.code == 0) {
              this.$toast.success(this.$t('public.suc'));
              setTimeout(() => {
                this.$router.back();
              }, 600);
            } else {
              this.$toast.fail(res.data.message);
              console.log(1231231);
            }
          });
        } else {
          this.$toast(this.$t('bindRelation.msg1'));
        }
      } else {
        setuserinfo(this.req).then((res) => {
          if (res.data.code == 0) {
            this.$toast.success(this.$t('public.suc'));
            setTimeout(() => {
              this.$router.back();
            }, 600);
          } else {
            this.$toast.fail(res.data.message);
          }
        });
      }
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
  position: absolute;
  bottom: 60px;
  left: 4%;
  margin: 0 auto;
  width: 92%;
  height: 96px;
  font-size: 36px;
  color: #fff;
  border-radius: 48px;
  border: none;
  background: #1b2945;
}
</style>