<template>
  <div class="community_wrap fullscreen bg-gray">
    <page-header :title="$t('setting.title1')" theme="dark" />
    <div class="content">
      <van-cell class="title">{{ form.data.comName }}</van-cell>
      <van-form @submit="handleSubmit">
        <van-cell style="overflow: initial">
          <template slot="title">
            <div class="label">
              {{ $t("setting.tags1")
              }}<span style="color: #999">({{ $t("setting.tags2") }})</span>
            </div>
          </template>
          <template slot="label">
            <div class="upload_wrap">
              <van-uploader
                v-model="fileList"
                :after-read="afterRead"
                :max-count="1"
              />
            </div>
          </template>
        </van-cell>
        <van-field
          v-model="form.data.describe"
          show-word-limit
          rows="3"
          :label="$t('community.tags1')"
          type="textarea"
          maxlength="100"
          :placeholder="$t('setting.title2')"
        />
        <van-field
          v-model="form.data.addressName"
          required
          name="addressName"
          :label="$t('setup.address')"
          :placeholder="$t('setup.addressPlaceholder')"
          :rules="[{ required: true, message: $t('setup.addressPlaceholder') }]"
          @click="$router.push({ path: '/site', query: {form: $route.name} })"
        />
        <van-field
          v-model="form.data.telegram"
          required
          name="telegram"
          :label="$t('setup.telegram')"
          :placeholder="$t('setting.title3')"
          :rules="[{ required: true, message: $t('setting.title3') }]"
        />
        <van-field
          v-model="form.data.qq"
          name="qq"
          :label="$t('community.tags2')"
          :placeholder="$t('setting.title4')"
        />
        <van-field
          v-model="form.data.discord"
          name="discord"
          label="Discord"
          :placeholder="$t('setting.title5')"
        />
        <div class="btn">
          <van-button
            round
            block
            type="info"
            color="#1B2945"
            native-type="submit"
            :loading="form.loading"
          >
            {{$t('logout.submit')}}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader.vue";
import { uploadImage, update, search } from "@/api/pagesApi/community";

export default {
  components: { pageHeader },
  name: "communitySetting",
  data() {
    return {
      loading: false,
      fileList: [],
      form: {
        data: {},
      },
    };
  },
  methods: {
    // 获取社区信息
    getCommunity() {
      this.$toast.loading(this.$t('public.loading'));
      search().then((res) => {
        if (!res.data.code) {
          const data = res.data.items;
          if (this.$route.params.code) {
            const {province, city, area} = this.$route.params.code
            const country = this.cookie.get("country") ? this.cookie.get("country").split(',') : []
            data.addressName = `${country ? country[1] : ''}${province ? province[1] : ''}${city ? city[1] : ''}${area ? area[1] : ''}`
            data.country = country ? country[0] : ''
            data.province = province ? province[0] : ''
            data.city = city ? city[0] : ''
            data.area = area ? area[0] : ''
          }
          data.image && this.$set(this.fileList, 0, {
            url: `${process.env.VUE_APP_LOCATION}${data.image}`,
            file: "",
            status: "",
            message: this.$t('setting.data1'),
            deletable: true,
            imageFit: "contain",
            previewSize: "100%",
          });
          this.form.data = data;
        } else {
          this.$toast.fail({
            forbidClick: true,
            message: res.data.message,
          });
        }
      }).finally((err) => {
        this.$toast.clear();
      });
    },
    afterRead({ content, file }) {
      this.$set(this.fileList, 0, {
        url: content,
        file,
        status: "",
        message:this.$t('setting.data1'),
        deletable: true,
        imageFit: "contain",
        previewSize: "100%",
      });
      this.upload();
    },
    upload() {
      this.fileList[0].status = "uploading";
      const formData = new FormData();
      formData.append("file", this.fileList[0].file);
      uploadImage(formData).then((res) => {
        if (!!res.data.code) {
          this.fileList[0].status = "fail";
        } else {
          this.form.data.image = res.data.message;
          this.fileList[0].status = "success";
        }
      });
    },
    handleSubmit() {
      this.$dialog.confirm({
        title: this.$t('setting.title'),
        message: this.$t('setting.message'),
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            const loading = this.$toast.loading({
              message:this.$t('setting.data2'),
              forbidClick: true,
            });
            update(this.form.data).then(() => {
              this.$toast.success({
                message: this.$t('identity.data4'),
                forbidClick: true,
                onClose: () => {
                  this.$router.replace("/my/community");
                },
              });
            }).finally(() => loading.clear());
          } else {
            done()
          }
        }
      })
    },
  },
  created() {
    this.getCommunity();
  },
};
</script>

<style lang="scss" scoped>
.community_wrap {
  position: relative;

  .content {
    position: relative;
    flex: 1;
    margin-top: 20px;
    background-color: #fff;

    .title {
      color: #333;
      font-size: 32px;
    }

    .upload_wrap {
      position: relative;
      margin-top: 20px;
      background-color: #f3f4f5;

      &::v-deep(.van-uploader) {
        display: block;
        width: 100%;

        .van-uploader__upload {
          width: 100%;
          margin: 0;
          height: 130px;
        }
        .van-uploader__preview {
          margin: 0;
        }
      }
    }

    .btn {
      @include posi($b: 30px, $l: 30px, $r: 30px);
    }
  }
}
</style>