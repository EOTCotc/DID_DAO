<template>
  <div class="content">
    <van-row class="row">
      <van-col span="1"
               class="imgbox"><img src="../../assets/img/an.png"
             class="img"
             width="20px"
             height="20px" /></van-col>
      <van-col span="23">
        <van-cell :title="$t('user.proposal')"
                  :border="false"
                  is-link
                  @click="auditing('Bill_list')">
          <template #icon>
            <i class="iconfont icon-xinshouyindao icon_left"></i>
          </template>
        </van-cell>
      </van-col>
    </van-row>

    <van-row class="row"
             v-show="items >= 100">
      <van-col span="1"
               class="imgbox"><img src="../../assets/img/gong.png"
             class="img"
             width="20px"
             height="20px" /></van-col>
      <van-col span="23">
        <van-cell :title="$t('user.work_order')"
                  :border="false"
                  is-link
                  @click="auditing('pending')">
          <template #icon>
            <i class="iconfont icon-changjianwenti icon_left"></i>
          </template>
        </van-cell>
      </van-col>
    </van-row>
    <van-row class="row">
      <van-col span="1"
               class="imgbox"><img src="../../assets/img/xiao.png"
             class="img"
             width="20px"
             height="20px" /></van-col>
      <van-col span="23">
        <van-cell :title="$t('user.destroy')"
                  :border="false"
                  is-link
                  @click="auditing('Destruction')">
          <template #icon>
            <i class="iconfont icon-lianxiwomen icon_left"></i>
          </template>
        </van-cell>
      </van-col>
    </van-row>

    <van-row class="row"
             v-show="isExamine == 1">
      <van-col span="1"
               class="imgbox"><img src="../../assets/img/kong.png"
             class="img"
             width="20px"
             height="20px" /></van-col>
      <van-col span="23">
        <van-cell :title="$t('user.risk')"
                  :border="false"
                  is-link
                  @click="auditing('pneumatic')">
          <template #icon>
            <i class="iconfont icon-lianxiwomen icon_left"></i>
          </template>
        </van-cell>
      </van-col>
    </van-row>
    <van-row class="row">
      <van-col span="1"
               class="imgbox"><img src="../../assets/img/zhong.png"
             class="img"
             width="20px"
             height="20px" /></van-col>
      <van-col span="23">
        <van-cell :title="$t('user.arbitration')"
                  :border="false"
                  is-link
                  @click="auditing('arbitration')">
          <template #icon>
            <i class="iconfont icon-lianxiwomen icon_left"></i>
          </template>
        </van-cell>
      </van-col>
    </van-row>
    <van-row class="row">
      <van-col span="1"
               class="imgbox"><img src="../../assets/img/shenhe.png"
             class="img"
             width="20px"
             height="20px" /></van-col>
      <van-col span="23">
        <van-cell :title="$t('user.check')"
                  :border="false"
                  is-link
                  @click="auditing('approval')">
          <template #icon>
            <i class="iconfont icon-lianxiwomen icon_left"></i>
          </template>
        </van-cell>
      </van-col>
    </van-row>
    <van-row class="row">
      <van-col span="1"
               class="imgbox"><img src="../../assets/img/he.png"
             class="img"
             width="20px"
             height="20px" /></van-col>
      <van-col span="23">
        <van-cell :title="$t('user.feedback')"
                  :border="false"
                  is-link
                  @click="auditing('blue-nav')">
          <template #icon>
            <i class="iconfont icon-fankuijianyi icon_left"></i>
          </template>
        </van-cell>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getuSereotc } from '@/api/earnings'
export default {
  data() {
    return {
      isExamine: localStorage.getItem('isExamine'),
      items: 0,
    }
  },
  created() {
    getuSereotc().then((res) => {
      this.items = res.data.items
    })
  },
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
    padding-left: 16px;
    line-height: 55px;
    height: 55px;
  }
  .imgbox {
    display: flex;
    align-items: center;
  }
  .van-cell {
    color: #fff;
    background: none;
    font-size: 16px;
    font-weight: 500;
  }
}
.after {
  display: none;
}
.before {
  display: block;
}
</style>
