<template>
  <div class="community_wrap fullscreen bg-gray">
    <page-header title="社区信息" theme="dark" />
    <div class="content">
      <van-cell class="title">粒紫社区</van-cell>
      <van-form>
        <van-cell>
          <template slot="title">
            <div class="label">展示图片<span style="color: #999;">(不传则显示默认图片)</span></div>
          </template>
          <template slot="label">
            <div class="upload_wrap">
              <van-uploader
              :after-read="afterRead"
              />
              <div class="tip">
                <i class="icon icon-photo"></i>
                <p class="text">点击上传展示图片</p>
              </div>
            </div>
          </template>
        </van-cell>
        <van-field
          v-model="form.data.desc"
          show-word-limit
          rows="3"
          label="简介"
          type="textarea"
          maxlength="100"
          placeholder="请输入…"
        />
        <van-field
          v-model="form.data.dbq"
          required
          name="dbq"
          label="电报群"
          placeholder="填写电报群地址"
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
          <van-button round block type="info" native-type="submit" :disabled="submitDisable" color="#1B2945">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader.vue"

export default {
  components: { pageHeader },
  name: "communitySetting",
  data() {
    return {
      loading: false,
      status: 0,
      form: {
        data: {
          desc: "",
          dbq: "",
          qq: "",
          discord: ""
        }
      }
    }
  },
  computed: {
    submitDisable() {
      return !!Object.values(this.form.data).includes("")
    }
  },
  methods: {
    afterRead() {},
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
      .tip {
        @include centered();
        color: #999;
        text-align: center;
        .icon {
          font-size: 40px;
        }
        .text {
          font-size: 28px;
        }
      }
      &::v-deep(.van-uploader) {
        display: block;
        width: 100%;
        opacity: 0;
        .van-uploader__upload {
          width: 100%;
          margin: 0;
          height: 130px;
        }
      }
    }
    .btn {
      @include posi($b: 30px, $l: 30px, $r: 30px);
    }
  }
}
</style>