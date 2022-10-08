<template>
  <div class="risk_wrap bg-gray fullscreen"> 
    <page-header title="解除风控" />
    <div class="tip">为了正常使用账户，请及时与以下5位联系人进行视频身份核对(3位及以上联系人解除即生效)</div>
    <div class="content">
      <ul class="list" v-if="!!list.data.length">
        <li class="item" v-for="(item, index) in list.data" :key="index">
          <van-row class="header">
            <van-col :span="12">
              <div class="title">解除风控联系<span class="index">{{index + 1}}</span></div>
            </van-col>
            <van-col :span="12" style="text-align: right;">
              <img :src="item.status ? img1 : img2" alt="" class="img">
            </van-col>
          </van-row>
          <van-row class="row">
            <van-col :span="6" class="title">联系人</van-col>
            <van-col :span="18" class="value">{{item.name}}</van-col>
          </van-row>
          <van-row class="row">
            <van-col :span="6" class="title">手机号</van-col>
            <van-col :span="18" class="value phone" @click="toggle(true, item.phone)">{{item.phone}}</van-col>
          </van-row>
        </li>
      </ul>
      <van-empty
        v-else
        class="custom-image"
        :image="require('@/assets/imgs/empty.png')"
        description="暂无任何数据"
      />
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="handleSelect"
    />
    <a ref="tel" :href="`tel: ${phone};`" style="display: none;"></a>
  </div>
</template>
<script>
import PageHeader from '@/components/topBar/pageHeader'
import {list} from '@/api/risk'
import img1 from "../assets/imgs/quan.png"
import img2 from "../assets/imgs/quan.png"
import {copy} from '@/utils/utils'

export default {
  name: 'risk',
  components: {PageHeader},
  data() {
    return {
      img1,
      img2,
      show: false,
      phone: '',
      actions: [
        {name: "呼叫"},
        {name: "复制号码"}
      ],
      list: {
        loading: false,
        data: []
      }
    }
  },
  methods: {
    copy,
    getList() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: "加载中…"
      })
      list().then(res => {
        const {code, items} = res.data
        if (code) {
          this.$toast.fail({
            forbidClick: true,
            message: '未知错误'
          })
        } else {
          this.list.data = items
        }
      }).catch(() => {
        this.$toast.fail({
          forbidClick: true,
          message: '未知错误'
        })
      }).finally(() => {
        loading.clear()
      })
    },
    toggle(show, phone) {
      this.show = show
      this.phone = phone
    },
    handleSelect(data) {
      if (data.name === '呼叫') {
        this.$refs.tel.click()
      } else if (data.name === '复制号码') {
        this.copy(this.phone)
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style scoped lang="scss">
.risk_wrap {
  .tip {
    padding: 30px;
    color: #FC7542;
    font-size: 28px;
    background-color: #FFFBE8;
  }
  .content {
    margin-top: 30px;
    padding: 0 30px 30px;
    .list {
      .item {
        padding: 30px;
        font-size: 28px;
        margin-bottom: 30px;
        background-color: #FFF;
        border-radius: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          color: #999;
        }
        .value {
          color: #333;
          &.phone {
            color: #237FF8;
          }
        }
        .header {
          padding-bottom: 30px;
          border-bottom: 1px solid #EEE;
          .title {
            display: flex;
            align-items: center;
            color: #333;
            font-size: 32px;
          }
          .index {
            display: block;
            margin-left: 10px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #333;
            border-radius: 50%;
          }
          .img {
            display: inline-block;
            width: 36px;
          }
        }
        .row {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>