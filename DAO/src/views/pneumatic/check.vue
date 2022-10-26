
<template>
  <div class="meun">
    <white :title="title"></white>
    <div class="contatiner">
      <van-form class="form_wrap">
        <div class="main steps_wrap">
          <div class="info_wrap step-1">
            <van-field
              :label="$t('check.name')"
              label-width="100px"
              v-model="user.name"
            />
            <van-field
              :label="$t('check.phone')"
              label-width="100px"
              v-model="user.phoneNum"
            />
            <van-field
              :label="$t('check.card')"
              label-width="100px"
              v-model="user.idCard"
              border
            />
          </div>
          <div class="upload_wrap step-2">
            <div class="title">{{ $t("check.identity") }}</div>

            <div class="example_wrap">
              <img class="img" :src="user.portraitImage" alt="" />
              <img class="img" :src="user.nationalImage" alt="" />
            </div>
          </div>
          <div class="upload_wrap step-2">
            <div class="title">{{ $t("check.card_photo") }}</div>
            <div
              class="example_zheng"
              v-if="user.handHeldImage != null || user.handHeldImage != ''"
            >
              <img class="img" :src="user.handHeldImage" alt="" />
            </div>
          </div>
          <div
            class="upload_wrap step-2"
            v-if="authStatus == 0 || authStatus == 1"
          >
            <div class="title">
              {{ $t("check.collate")
              }}<span>{{ $t("check.collate_text") }}</span>
            </div>
            <div class="example_zheng">
              <van-uploader
                multiple
                :max-count="3"
                v-model="fileList"
                :after-read="afterRead"
                :max-size="500 * 1024"
              />
            </div>
          </div>
          <div v-if="authStatus == 2" class="upload_wrap step-2">
            <div class="title">
              {{ $t("check.collate")
              }}<span>{{ $t("check.collate_text") }}</span>
            </div>
            <van-image
              width="60"
              height="60"
              v-for="(item, index) in imagesZu"
              :key="index"
              :src="spliceSrc(item)"
            />
          </div>
        </div>
        <div class="btns" v-if="authStatus == 0">
          <van-button
            round
            size="small"
            color="#E8F2FF"
            class="frist"
            @click="abnormal()"
            >{{ $t("check.btn_abnormal") }}</van-button
          >
          <van-button round size="small" color="#237FF8" @click="success()">{{
            $t("check.btn_success")
          }}</van-button>
        </div>
        <div class="btns" v-if="authStatus == 2 && remedyMax == true">
          <van-button
            round
            size="small"
            block
            plain
            color="#237FF8"
            style="width: 100%; margin: 0 16px"
            @click="Remedy"
            >{{ $t("check.btn_remedy") }}</van-button
          >
        </div>
        <div class="btns" v-if="remedyShow == true">
          <van-button round color="#E8F2FF" class="frist" @click="quxiao()">{{
            $t("check.btn_cancel")
          }}</van-button>
          <van-button round size="small" color="#237FF8" @click="subRemedy()">{{
            $t("check.btn_make")
          }}</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import White from "@/components/Nav/white.vue";
import {
  getuserinfo,
  userriskstatus,
  uploadimage,
  getImg,
} from "@/api/pneumatic";
import { spliceSrc } from "@/utils/utils";
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  components: {
    White,
  },
  data() {
    return {
      fileList: [],
      title: this.$t("check.nav_title"),
      id: "",
      authStatus: 0,
      over_show: false,
      user: {},
      imagesZu: [],
      imagesArr: [],
      remedyShow: false,
      remedyMax: true,
    };
  },
  created() {
    this.id = this.$route.query.userRiskId;
    this.authStatus = this.$route.query.authStatus;
    console.log(this.id, this.authStatus);
    this.userInfo();
  },
  mounted() {},
  methods: {
    spliceSrc,
    async getWatermarkImg(src) {
      const res = await getImg(src);
      const blob = new window.Blob([res.data], { type: res.type });
      const url = window.URL.createObjectURL(blob);
      return url;
    },
    afterRead(fileObj) {
      // 声明form表单数据
      const formData = new FormData();
      // 添加文件信息
      formData.append("file", fileObj.file);
      uploadimage(formData).then((res) => {
        console.log(res);
        this.imagesArr.push(res.data.message);
      });
      console.log(this.imagesArr);
    },
    //确定解除
    subRemedy() {
      userriskstatus({
        userRiskId: this.id,
        authStatus: 1,
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          history.go(-1);
        }
      });
    },
    //取消解除
    quxiao() {
      this.remedyShow = false;
      this.remedyMax = true;
    },

    userInfo() {
      getuserinfo({
        userRiskId: this.id,
      }).then((res) => {
        this.imagesZu =
          res.data.items.image == null ? "[]" : res.data.items.image.split(",");
        this.user = res.data.items;
        this.getWatermarkImg(this.user.portraitImage)
          .then((res) => {
            this.user.portraitImage = res;
          })
          .then(() => {
            this.getWatermarkImg(this.user.nationalImage).then((res) => {
              this.user.nationalImage = res;
            });
          })
          .then(() => {
            this.getWatermarkImg(this.user.handHeldImage).then((res) => {
              this.user.handHeldImage = res;
            });
          });
      });
    },
    //核对信息异常
    abnormal() {
      Dialog.confirm({
        title: this.$t("check.dialog_title"),
        confirmButtonColor: "#000",
        message: this.$t("check.dialog_message"),
        getContainer: ".meun",
      })
        .then(() => {
          userriskstatus({
            userRiskId: this.id,
            authStatus: 2,
            images: this.imagesArr.join(","),
          }).then((res) => {
            console.log(res);
            if (res.status == 200) {
              history.go(-1);
              Toast(this.$t("check.handle_success"));
            }
          });
        })
        .catch(() => {});
    },
    //核对信息无误
    success() {
      Dialog.confirm({
        title: this.$t("check.dialog_title"),
        confirmButtonColor: "#000",
        message: this.$t("check.dialog_message_error"),
        getContainer: ".meun",
      })
        .then(() => {
          userriskstatus({
            userRiskId: this.id,
            authStatus: 1,
            images: this.imagesArr.join(","),
          }).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$router.push({
                name: "pneumatic",
                params: { authStatus: 1 },
              });
            }
          });
        })
        .catch(() => {});
    },

    //解除异常
    Remedy() {
      Dialog.confirm({
        title: this.$t("check.btn_remedy"),
        confirmButtonColor: "#000",
        message: this.$t("check.dialog_message_remedy"),
        getContainer: ".meun",
      })
        .then(() => {
          this.remedyMax = false;
          this.remedyShow = true;
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.meun {
  background: #f3f4f5;
}
.contatiner {
  padding-top: 20px;
}

.form_wrap {
  margin-top: 16px;
  background: #fff;
  .info_wrap {
    ::v-deep .van-cell__title {
      color: #000;
      font-weight: bold;
    }
  }
  .upload_wrap {
    padding: 10px 16px;
    ::v-deep .title {
      padding: 10px;
      font-size: 26px;
      color: #000;
      font-weight: bold;
    }
    .example_wrap {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      .img {
        width: 332px;
        height: 202px;
      }
    }
    .example_zheng {
      margin-top: 10px;
      margin-left: 10px;
      .img {
        width: 695px;
        height: 385px;
        display: flex;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
    .van-button {
      width: 180px;
      height: 45px;
    }
    .frist ::v-deep .van-button__text {
      color: #237ff8;
      font-weight: bold;
    }
  }
}

.meun ::v-deep .van-dialog__message--has-title {
  color: #f37a4c !important;
}
</style>