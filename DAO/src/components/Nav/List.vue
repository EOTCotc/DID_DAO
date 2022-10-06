<template>
  <div class="content">
    <van-row class="row">
      <van-col span="1"
        ><img
          src="../../assets/img/an.png"
          class="img"
          width="20px"
          height="20px"
      /></van-col>
      <van-col span="23"
        ><van-cell
          title="我的提案"
          :border="false"
          is-link
          @click="auditing('Bill_list')"
        >
          <template #icon>
            <i class="iconfont icon-xinshouyindao icon_left"></i>
          </template> </van-cell
      ></van-col>
    </van-row>
    <van-row class="row">
      <van-col span="1"
        ><img
          src="../../assets/img/gong.png"
          class="img"
          width="20px"
          height="20px"
      /></van-col>
      <van-col span="23">
        <van-cell
          title="工单系统"
          :border="false"
          is-link
          @click="auditing('pending')"
        >
          <template #icon>
            <i class="iconfont icon-changjianwenti icon_left"></i>
          </template> </van-cell
      ></van-col>
    </van-row>
    <van-row class="row">
      <van-col span="1"
        ><img
          src="../../assets/img/xiao.png"
          class="img"
          width="20px"
          height="20px"
      /></van-col>
      <van-col span="23">
        <van-cell
          title="销毁查询"
          :border="false"
          is-link
          @click="auditing('Destruction')"
        >
          <template #icon>
            <i class="iconfont icon-lianxiwomen icon_left"></i>
          </template> </van-cell
      ></van-col>
    </van-row>
    <van-row class="row">
      <van-col span="1"
        ><img
          src="../../assets/img/kong.png"
          class="img"
          width="20px"
          height="20px"
      /></van-col>
      <van-col span="23">
        <van-cell
          title="风险解除"
          :border="false"
          is-link
          @click="auditing('pneumatic')"
        >
          <template #icon>
            <i class="iconfont icon-lianxiwomen icon_left"></i>
          </template> </van-cell
      ></van-col>
    </van-row>
    <van-row class="row">
      <van-col span="1"
        ><img
          src="../../assets/img/zhong.png"
          class="img"
          width="20px"
          height="20px"
      /></van-col>
      <van-col span="23">
        <van-cell
          title="仲裁"
          :border="false"
          is-link
          @click="auditing('arbitration')"
        >
          <template #icon>
            <i class="iconfont icon-lianxiwomen icon_left"></i>
          </template> </van-cell
      ></van-col>
    </van-row>
    <van-row class="row">
      <van-col span="1"
        ><img
          src="../../assets/img/shenhe.png"
          class="img"
          width="20px"
          height="20px"
      /></van-col>
      <van-col span="23">
        <van-cell
          title="审核"
          :border="false"
          is-link
          @click="auditing('approval')"
        >
          <template #icon>
            <i class="iconfont icon-lianxiwomen icon_left"></i>
          </template> </van-cell
      ></van-col>
    </van-row>
    <van-row class="row">
      <van-col span="1"
        ><img
          src="../../assets/img/he.png"
          class="img"
          width="20px"
          height="20px"
      /></van-col>
      <van-col span="23">
        <van-cell
          title="反馈&建议"
          :border="false"
          is-link
          @click="auditing('blue-nav')"
        >
          <template #icon>
            <i class="iconfont icon-fankuijianyi icon_left"></i>
          </template> </van-cell
      ></van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    auditing(name) {
      this.$router.push({ name: name })
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  color: #fff;
  .van-row {
    display: flex;
    align-items: center;
    padding-left: 20px;
    line-height: 48px;
  }
  .van-cell {
    color: #fff;
    background: none;
    font-size: 16px;
    font-weight: 500;
  }
}
/* .audit {
  .van-cell {
    background: #000;
    color: #fff;
    line-height: 30px;
    .van-icon {
      margin-top: 5px;
    }
  }
} */
</style>
