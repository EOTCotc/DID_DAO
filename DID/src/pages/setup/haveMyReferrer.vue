<template>
  <div>
    <van-nav-bar>
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          color="#000"
          size="18"
        />
      </template>
      <template #title>
        <span class="title">{{ $t("setup.my_referrer") }}</span>
      </template>
    </van-nav-bar>

    <div class="line"></div>

    <div class="content">
      <div>
        <div>{{ $t("setup.referrer_name") }}</div>
        <div>{{ refInfo.name }}</div>
      </div>
      <div>
        <div>UID</div>
        <div>{{ refInfo.uid }}</div>
      </div>
      <div>
        <div>{{ $t("setup.email") }}</div>
        <div>{{ refInfo.mail }}</div>
      </div>
      <div>
        <div>{{ $t("setup.referrer_phone") }}</div>
        <div>{{ refInfo.phoneNum }}</div>
      </div>
      <div>
        <div>{{ $t("setup.locality") }}</div>
        <div>{{ site }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getuserinfobyuid } from "@/api/pagesApi/myReferrer";
export default {
  name: "haveMyReferrer",
  data() {
    return {
      refInfo: {},
      site: "", //所在地
    };
  },
  mounted() {
    let refUid = this.$route.query.refUid;
    this.getRefUid(refUid);
  },
  methods: {
    getRefUid(refUid) {
      getuserinfobyuid({ uid: refUid }).then((res) => {
        if (res.data.code == 0) {
          let refInfo = res.data.items;
          this.refInfo = refInfo;
          if (refInfo.country) {
            let arrCountry = refInfo.country.split("-");
            let arrProvince = refInfo.province.split("-");
            let arrCity = refInfo.province.split("-");
            let arrArea = refInfo.area.split("-");
            // 如果是中国，不显示国家，只显示省市区
            if (arrCountry[0] == "CHN") {
              this.site = `${arrProvince[1] ? arrProvince[1] : ""}
              ${arrCity[1] ? "-" + arrCity[1] : ""}
              ${arrArea[1] ? "-" + arrArea[1] : ""}`;
            } else if (refInfo.province == "-") {
              //外国 没有省 只显示国家
              this.site = arrCountry[1];
            } else if (refInfo.province) {
              //有省就显示  国家-省
              this.site = `${arrCountry[1] ? arrCountry[1] + "-" : ""}
              ${arrProvince[1] ? arrProvince[1] : ""}`;
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
}
.title {
  font-size: 36px;
  color: #333;
  font-weight: bold;
}
.line {
  height: 20px;
  background: #f3f4f5;
}
.content {
  padding: 0 32px;
  div {
    height: 96px;
    font-size: 32px;
    color: #333;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #f3f4f5;
    div:first-of-type {
      width: 200px;
      font-weight: bold;
      border: none;
    }
    div:last-of-type {
      width: 100%;
      border: none;
    }
  }
}
</style>