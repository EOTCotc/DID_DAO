<template>
  <div class="container fullscreen">
    <page-header :title="$t('my.my_index_title1')" theme="dark" />
    <van-form class="form_wrap">
      <div class="main steps_wrap">
        <div class="info_wrap step-1" v-show="step.active === 0">
          <van-field
            v-model="form.data.name"
            name="name"
            :label="$t('create.tags4')"
            size="large"
            :placeholder="$t('create.text2')"
            :rules="[{ required: true, message: $t('create.text2') }]"
          />
          <van-field
            v-model="form.data.phoneNum"
            name="phoneNum"
            :label="$t('setup.referrer_phone')"
            size="large"
            :placeholder="$t('identity.text1')"
            :rules="[{ required: true, message: $t('identity.text1') }]"
          />
          <van-field
            v-model="form.data.idCard"
            name="code"
            :label="$t('identity.text2')"
            size="large"
            :placeholder="$t('identity.text3')"
            :rules="[{ required: true, message: $t('identity.text3') }]"
          />
        </div>
        <div class="upload_wrap step-2" v-show="step.active === 1">
          <div class="example_wrap">
            <div class="title">{{ $t("identity.tags1") }}:</div>
            <img class="img" src="../../../assets/imgs/example-1.png" alt="" />
          </div>
          <div class="upload_main">
            <div class="title">{{ $t("identity.tags2") }}</div>
            <div class="upload">
              <van-uploader
                v-model="fileList.portraitImage"
                :after-read="(file) => afterRead(file, 'portraitImage')"
                :max-count="1"
              />
            </div>
            <div class="tip">* {{ $t("identity.tags3") }}</div>
          </div>
          <div class="tip_wrap">
            <div class="title">{{ $t("identity.tags4") }}</div>
            <div class="tip">
              {{ $t("identity.tags5") }}
            </div>
            <div class="img_wrap">
              <div class="item">
                <div class="img">
                  <img src="../../../assets/imgs/example-1.png" alt="" />
                </div>
                <div class="text">{{ $t("identity.tags6") }}</div>
              </div>
              <div class="item">
                <div class="img">
                  <img src="../../../assets/imgs/example-2.png" alt="" />
                </div>
                <div class="text">{{ $t("identity.tags7") }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="upload_wrap step-3" v-show="step.active === 2">
          <div class="example_wrap">
            <div class="title">{{ $t("identity.tags1") }}:</div>
            <img class="img" src="../../../assets/imgs/example-2.png" alt="" />
          </div>
          <div class="upload_main">
            <div class="title">{{ $t("identity.tags8") }}</div>
            <div class="upload">
              <van-uploader
                v-model="fileList.nationalImage"
                :after-read="(file) => afterRead(file, 'nationalImage')"
                :max-count="1"
              />
            </div>
            <div class="tip">* {{ $t("identity.tags9") }}</div>
          </div>
        </div>
        <div class="upload_wrap step-4" v-show="step.active === 3">
          <div class="example_wrap">
            <div class="title">{{ $t("identity.tags1") }}:</div>
            <img class="img" src="../../../assets/imgs/example-3.png" alt="" />
          </div>
          <div class="upload_main">
            <div class="title">{{ $t("identity.tags10") }}</div>
            <div class="upload">
              <van-uploader
                v-model="fileList.handHeldImage"
                :after-read="(file) => afterRead(file, 'handHeldImage')"
                :max-count="1"
              />
            </div>
            <div class="tip">* {{ $t("identity.tags11") }}</div>
          </div>
        </div>
      </div>
      <div class="btns">
        <van-button
          block
          round
          plain
          v-if="step.active > 1"
          class="prev btn"
          color="#1B2945"
          type="primary"
          @click="prev"
        >
          {{ $t("identity.tags12") }}
        </van-button>
        <van-button
          block
          round
          class="next btn"
          color="#1B2945"
          type="primary"
          :disabled="disable || form.loading"
          :loading="form.loading"
          :loading-text="
            step.active < 3 ? $t('identity.tags13') : $t('identity.tags14')
          "
          @click="next"
        >
          {{ step.active < 3 ? $t("logout.next") : $t("logout.submit") }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import pageHeader from "@/components/topBar/pageHeader";
import { uploadImage, submit } from "@/api/pagesApi/identity";

export default {
  name: "identity",
  components: {
    pageHeader,
  },
  data() {
    return {
      step: {
        active: 0,
      },
      fileList: {
        portraitImage: [],
        nationalImage: [],
        handHeldImage: [],
      },
      form: {
        loading: false,
        data: {
          name: "",
          phoneNum: "",
          idCard: "",
          portraitImage: "",
          nationalImage: "",
          handHeldImage: "",
        },
      },
    };
  },
  computed: {
    // 判断下一步按钮是否可以点击
    disable() {
      const step = this.step.active;
      const data = this.form.data;
      if (step === 0) {
        return !data.name || !data.phoneNum || !data.idCard;
      } else if (step === 1) {
        return !this.fileList.portraitImage.length;
      } else if (step === 2) {
        return !this.fileList.nationalImage.length;
      } else if (step === 3) {
        return !this.fileList.handHeldImage.length;
      }
    },
  },
  methods: {
    afterRead({ content, file }, type) {
      this.$set(this.fileList[type], 0, {
        url: content,
        file,
        status: "",
        message: this.$t("identity.data1"),
        deletable: true,
        imageFit: "contain",
        previewSize: "100%",
      });
    },
    // 上传图片
    upload() {
      const types = ["portraitImage", "nationalImage", "handHeldImage"];
      const type = types[this.step.active - 1];
      const formData = new FormData();
      formData.append("file", this.fileList[type][0].file);
      this.form.loading = true;
      uploadImage(formData)
        .then((res) => {
          if (!!res.data.code) {
            const message = [
              this.$t("identity.data2"),
              this.$t("identity.data3"),
            ];
            this.$toast.fail({
              forbidClick: true,
              message: message[res.data.message],
            });
          } else {
            this.form.data[type] = res.data.message;
            if (this.step.active < 3) {
              this.step.active++;
            } else if (this.step.active === 3) {
              this.handleSubmit();
            }
          }
        })
        .finally(() => (this.form.loading = false));
    },
    // 提交表单
    handleSubmit() {
      this.form.loading = true;
      submit(this.form.data)
        .then((res) => {
          if (!!res.data.code) {
            this.$toast.fail({
              forbidClick: false,
              message: res.data.message,
            });
          } else {
            this.$toast.success({
              forbidClick: true,
              message: this.$t("identity.data4"),
              onClose: () => {
                this.$router.replace("/my");
              },
            });
          }
        })
        .finally(() => (this.form.loading = false));
    },
    // 上一步
    prev() {
      this.step.active > 0 && this.step.active--;
    },
    // 下一步
    next() {
      const step = this.step.active;
      if (step === 0) {
        this.step.active++;
      } else {
        this.upload();
      }
    },
  },
  created() {
    const params = this.$route.params;
    if (params) {
      const { name, phoneNum, idCard } = params;
      this.form.data.name = name;
      this.form.data.phoneNum = phoneNum;
      this.form.data.idCard = idCard;
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  .form_wrap {
    flex: 1;
    padding-bottom: 30px;

    .main {
      min-height: 100%;
      padding-bottom: 120px;

      .upload_wrap {
        padding: 30px;

        .example_wrap {
          padding: 35px 25px;
          border-radius: 20px;
          border: 2px dashed #eee;

          .title {
            color: #666;
            font-size: 23px;
          }

          .img {
            display: block;
            width: 60%;
            margin: 0 auto;
          }
        }

        .upload_main {
          margin-top: 40px;

          .title {
            color: #333;
            font-size: 28px;
            margin-bottom: 20px;
          }

          .upload {
            border-radius: 20px;
            border: 2px dashed #eee;

            &::v-deep(.van-uploader) {
              width: 100%;

              .van-uploader__preview-image,
              .van-uploader__wrapper,
              .van-uploader__upload {
                width: 100%;
                height: 100%;
                margin: 0;
              }

              .van-uploader__upload {
                padding: 60px 0;
              }
            }
          }
        }

        .tip {
          color: #fc7542;
          font-size: 24px;
          margin-top: 50px;
        }
      }

      .tip {
        color: #fc7542;
        font-size: 24px;
        margin-top: 50px;
      }
    }

    .tip_wrap {
      margin-top: 40px;

      .title {
        color: #333;
        font-size: 28px;
        margin-bottom: 20px;
      }

      .tip {
        color: #fc7542;
        padding: 25px;
        margin: 30px 0 20px;
        font-size: 26px;
        background-color: #fffbe8;
      }

      .img_wrap {
        display: flex;
        justify-content: space-between;

        .item {
          flex: 0 0 48%;

          &:nth-of-type(1) .img:after {
            @include posi($t: 0, $l: 0);
          }

          &:nth-of-type(2) .img:after {
            @include posi($t: 0, $r: 0);
          }

          .img {
            position: relative;
            padding: 25px 45px;
            border-radius: 20px;
            border: 2px dashed #eee;

            &:after {
              display: block;
              content: "";
              width: 60%;
              height: 100%;
              backdrop-filter: blur(10px);
            }

            img {
              display: block;
              width: 100%;
            }
          }

          .text {
            color: #999;
            font-size: 24px;
            margin-top: 20px;
            text-align: center;
          }
        }
      }
    }
  }

  .btns {
    margin: -120px 30px 0;
    display: flex;

    .btn {
      flex: 1;

      &:nth-of-type(2) {
        margin-left: 30px;
      }
    }
  }
}
</style>