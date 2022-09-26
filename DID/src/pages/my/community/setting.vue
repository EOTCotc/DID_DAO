<template>
  <div class="community_wrap fullscreen bg-gray">
    <page-header title="社区信息" theme="dark"/>
    <div class="content">
      <van-cell class="title">{{form.data.comName}}</van-cell>
      <van-form @submit="handleSubmit">
        <van-cell style="overflow: initial;">
          <template slot="title">
            <div class="label">展示图片<span style="color: #999;">(不传则显示默认图片)</span></div>
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
            label="简介"
            type="textarea"
            maxlength="100"
            placeholder="请输入…"
        />
        <van-field
            v-model="form.data.telegram"
            required
            name="telegram"
            label="电报群"
            placeholder="填写电报群地址"
            :rules="[{required: true, message: '请填写电报群地址'}]"
        />
        <van-field
            v-model="form.data.qq"
            name="qq"
            label="QQ群"
            placeholder="填写QQ群号"
        />
        <van-field
            v-model="form.data.discord"
            name="discord"
            label="Discord"
            placeholder="填写Discord账号"
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
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
  import pageHeader from "@/components/topBar/pageHeader.vue"
  import {uploadImage, update, search} from "@/api/pagesApi/community"

  export default {
    components: {pageHeader},
    name: "communitySetting",
    data() {
      return {
        loading: false,
        fileList: [],
        form: {
          data: {}
        }
      }
    },
    methods: {
      // 获取社区信息
      getCommunity() {
        this.$toast.loading('加载中…')
        search().then(res => {
          if (!res.data.code) {
            const data = res.data.items
            this.form.data = res.data.items
            data.image && this.$set(this.fileList, 0, {
              url: `http://192.168.2.110:5555/${data.image}`,
              file: "",
              status: '',
              message: "上传中",
              deletable: true,
              imageFit: 'contain',
              previewSize: '100%'
            })
          } else {
            this.$toast.fail({
              forbidClick: true,
              message: res.data.message
            })
          }
        }).finally(err => {
          this.$toast.clear()
        })
      },
      afterRead({content, file}) {
        this.$set(this.fileList, 0, {
          url: content,
          file,
          status: '',
          message: "上传中",
          deletable: true,
          imageFit: 'contain',
          previewSize: '100%'
        })
        this.upload()
      },
      upload() {
        this.fileList[0].status = 'uploading'
        const formData = new FormData()
        formData.append('file', this.fileList[0].file)
        uploadImage(formData).then(res => {
          if (!!res.data.code) {
            this.fileList[0].status = 'fail'
          } else {
            this.form.data.image = res.data.message
            this.fileList[0].status = 'success'
          }
        })
      },
      handleSubmit() {
        const loading = this.$toast.loading({
          message: "正在提交…",
          forbidClick: true
        })
        update(this.form.data).then(res => {
          this.$toast.success({
            message: '提交成功',
            forbidClick: true,
            onClose:() => {
              this.$router.replace('/my/community')
            }
          })
        }).finally(() => loading.clear())
      }
    },
    created() {
      this.getCommunity()
    }
  }
</script>

<style lang="scss" scoped>
  .community_wrap {
    position: relative;

    .content {
      position: relative;
      flex: 1;
      margin-top: 20px;
      background-color: #FFF;

      .title {
        color: #333;
        font-size: 32px;
      }

      .upload_wrap {
        position: relative;
        margin-top: 20px;
        background-color: #F3F4F5;

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