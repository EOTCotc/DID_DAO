<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="community_wrap fullscreen">
      <page-header title="社区信息" theme="dark" />
      <div class="content">
        <h3 class="title">粒紫社区</h3>
      </div>
      <van-form>
        <van-row class="row">
          <van-col class="label" span="24">展示图片<span style="color: #999;">(不传则显示默认图片)</span></van-col>
          <van-col span="24">
            <div class="upload_wrap">

            </div>
          </van-col>
        </van-row>
      </van-form>
    </div>
  </van-pull-refresh>
</template>

<script>
import pageHeader from "@/components/topBar/pageHeader.vue"

export default {
  components: { pageHeader },
  name: "community",
  data() {
    return {
      loading: false,
      status: 0,
    }
  },
  methods: {
    onRefresh() {},
    getList() {},
    handleLoad() {

    },
  }
}
</script>

<style lang="scss" scoped>
.community_wrap {
  position: relative;
  .content {
    padding: 0 32px;
    .title {
      padding: 30px 0;
      font-size: 36px;
      color: #333;
      font-weight: bold;
      border-bottom: 1px solid #EEE;
    }
    .img {
      margin: 20px 0;
      display: block;
      width: 100%;
    }
    .row {
      padding: 30px 0;
      .label {
        color: #333;
        font-size: 32px;
      }
      .value {
        color: #666;
        font-size: 32px;
        .icon {
          color: #999;
          font-size: 24px;
          margin-left: 15px;
        }
        &.desc {
          line-height: 1.5;
          margin-top: 30px;
        }
        &.link {
          color: #237FF8;
        }
      }
    }
    .btn {
      @include posi($b: 30px, $l: 30px, $r: 30px);
      line-height: 96px;
      text-align: center;
      background-color: #247FF6;
      font-size: 32px;
      color: #FFF;
      border-radius: 48px;
      &.pending {
        color: #237FF8;
        background-color: #D3E5FD;
        border: 1px solid #247FF6;
      }
      &.reject {
        color: #FF6343;
        background-color: #FFDFD8;
        border: 1px solid #FF6343;
      }
    }
  }
}
</style>