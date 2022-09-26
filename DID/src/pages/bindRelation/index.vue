<template>
  <div class="container">
    <van-nav-bar
      :border="false"
      title="选择所在地"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <van-cell
        class="now"
        title="使用当前位置"
        value="当前位置"
        :border="false"
      />
      <van-cell
        class="now"
        title="国家"
        :value="country[1]"
        is-link
        @click="toBindNation"
      />
      <van-cell
        title="省市"
        :value="region"
        is-link
        @click="showPopup = true"
        :border="false"
      />
    </div>

    <!-- 省市区 -->
    <van-popup v-model="showPopup" round position="bottom">
      <van-area
        title="选择当前所在地区"
        @confirm="confirm"
        @cancel="showPopup = false"
        :area-list="areaList"
      />
    </van-popup>

    <div class="have-num">
      当前地区现有<span> {{ num }} </span>个社区
    </div>

    <div class="btn">
      <div>为了便于线下建立推荐关系请谨慎选择当前所在地，一旦绑定不可更改</div>
      <button
        :style="showBtn ? 'background:#1B2945;' : 'background:#8c93a1;'"
        @click="toNext"
      >
        确认，前往下一步
      </button>
    </div>

    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="tips">确认提示</div>
          <div class="msg">
            确认后将不可修改关系绑定所地区，确定前往下一步？
          </div>
          <div class="mask-btn">
            <div @click="showOverlay = false">取消</div>
            <div @click="toCommunity">确定</div>
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
    this.getNowLocation(); //获取当前位置
    this.getHaveSite();
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
      this.objSite.area = JSON.stringify(e);
      this.region = `${e[0].name}-${e[1].name}-${e[2].name}`;
      this.reqComNum.province = e[0].code;
      this.reqComNum.city = e[1].code;
      this.reqComNum.area = e[2].code;
      this.showPopup = false;
      if (this.country && this.region) {
        this.showBtn = true;
      } else {
        this.showBtn = false;
      }
      this.getComNum();
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
        console.log(res);
        if (res.data.code == 0) {
          this.$router.push({
            name: "bindCommunity",
            params: JSON.stringify(this.objSite),
          });
        } else {
          this.$toast.fail("设置失败");
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