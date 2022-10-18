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
        :value="country[1]"
        is-link
        @click="toBindNation"
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
      <van-area
        :title="$t('bindRelation.select_site')"
        @confirm="confirm"
        @cancel="showPopup = false"
        :area-list="areaList"
      />
    </van-popup>

    <div class="have-num">
      {{ $t("bindRelation.have_site") }}
      <span> {{ num }} </span>
      {{ $t("bindRelation.comm_num") }}
    </div>

    <div class="btn">
      <div>{{ $t("bindRelation.tip") }}</div>
      <button
        :style="showBtn ? 'background:#1B2945;' : 'background:#8c93a1;'"
        @click="toNext"
      >
        {{ $t("bindRelation.next") }}
      </button>
    </div>

    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="tips">{{ $t("bindRelation.conf_tip") }}</div>
          <div class="msg">
            {{ $t("bindRelation.conf_cont") }}
          </div>
          <div class="mask-btn">
            <div @click="showOverlay = false">{{ $t("public.cancel") }}</div>
            <div @click="toCommunity">{{ $t("public.confirm") }}</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {
  getcomaddr,
  getcomnum,
  setcomselect,
} from "@/api/pagesApi/bindRelation";
export default {
  name: "bindRelation",
  data() {
    return {
      country: "", //国家
      region: "", //省市区
      areaList: {},
      country_list: {},
      showPopup: false, //显示隐藏弹出层
      showBtn: false, //按钮是否可用
      showOverlay: false, //显示隐藏遮罩层
      num: 0,
      reqComNum: {
        country: "",
        province: "",
        city: "",
        area: "",
      },
      //存放地区信息,去往下一页的社区列表需要
      objSite: {},
    };
  },
  mounted() {
    if (this.cookie.get("country")) {
      this.country = this.cookie.get("country").split(",");
      this.objSite.country = this.country;
      this.reqComNum.country = this.country[0];
    }
    // this.getNowLocation(); //获取当前位置
    this.getHaveSite();
  },
  methods: {
    // 获取已有的社区地址
    getHaveSite() {
      getcomaddr().then((res) => {
        let data = res.data.items;
        this.country_list = data.country_list; //国家
        this.areaList.province_list = data.province_list; //省
        this.areaList.city_list = data.city_list; //市
        this.areaList.county_list = data.county_list; //区
      });
    },
    //选择国家
    toBindNation() {
      this.$router.push({
        path: "/bindNation",
        query: this.country_list,
      });
    },
    // 获取省市区
    confirm(e) {
      if (this.country[1]) {
        this.objSite.area = JSON.stringify(e);
        this.region = `${e[0].name}-${e[1].name}-${e[2].name}`;
        this.reqComNum.province = e[0].code;
        this.reqComNum.city = e[1].code;
        this.reqComNum.area = e[2].code;
        if (this.country && this.region) {
          this.showBtn = true;
        } else {
          this.showBtn = false;
        }
        this.getComNum();
      } else {
        this.$toast.fail("请先选择国家");
      }
      this.showPopup = false;
    },
    // 获取社区数量
    getComNum() {
      if (this.showBtn) {
        //国家和地区都有才请求
        getcomnum(this.reqComNum).then((res) => {
          this.num = res.data.items;
        });
      }
    },
    // 下一步按钮是否可用
    toNext() {
      if (this.showBtn) {
        this.showOverlay = true;
      }
    },
    // 设置并去往社区
    toCommunity() {
      // 请求参数和获取社区数量参数一样
      setcomselect(this.reqComNum).then((res) => {
        if (res.data.code == 0) {
          this.$router.replace({
            name: "bindCommunity",
            params: JSON.stringify(this.objSite),
          });
        } else {
          this.$toast.fail(res.data.message);
        }
      });
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
.have-num {
  margin-top: 60px;
  text-align: center;
  font-size: 31px;
  color: #999;
  span {
    color: #333;
  }
}
.btn {
  position: fixed;
  bottom: 60px;
  left: 4%;
  width: 92%;
  div {
    padding: 24px;
    font-size: 28px;
    color: #fc7542;
    border-radius: 8px;
    background: #fffbe8;
  }
  button {
    margin-top: 43px;
    width: 100%;
    height: 96px;
    font-size: 31px;
    font-weight: bold;
    color: #fff;
    border-radius: 48px;
    border: none;
  }
}
// 遮罩层
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 630px;
  height: 345px;
  border-radius: 20px;
  background-color: #fff;
  div {
    text-align: center;
  }
  .tips {
    margin-top: 30px;
    font-size: 36px;
    font-weight: bold;
  }
  .msg {
    margin-top: 30px;
    padding: 0 30px;
    font-size: 32px;
    color: #fc7542;
  }
  .mask-btn {
    margin-top: 40px;
    padding: 0;
    border-top: 1px solid #f3f4f5;
    display: flex;
    justify-content: flex-start;
    div {
      margin-top: 0;
      width: 50%;
      height: 96px;
      font-size: 31px;
      border-top: none;
      line-height: 96px;
    }
    div:first-of-type {
      border-right: 1px solid #f3f4f5;
    }
    div:last-of-type {
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>