<template>
  <div class="wallets_wrap">
    <page-header title="各公链绑定地址" theme="dark" />
    <div class="content">
      <ul class="list" v-if="!!list.data.length">
        <li class="item" v-for="item in list.data" :key="item.walletId">
          <van-row type="flex" align="center">
            <van-col :span="24" class='title'>{{item.otype}}</van-col>
            <van-col :span='24'>
              <van-row class="value" type="flex" align="center" @click="copy(item.walletAddress)">
                <van-col :span="20">{{item.walletAddress}} <i class="icon icon-copy" style='margin-left: 5px;'></i></van-col>
                <van-col :span="4" class="link" @click="cancelAuth(item)">取消授权</van-col>
              </van-row>
            </van-col>
          </van-row>
        </li>
      </ul>
      <van-empty
          v-else
          class="custom-image"
          :image="require('../../assets/imgs/empty.png')"
          description="暂无任何数据"
      />
    </div>
  </div>
</template>

<script>
  import PageHeader from "@/components/topBar/pageHeader";
  import {list, cancelAuth} from "@/api/pagesApi/wallets"
  import {copy} from '@/utils/utils';

  export default {
    name: "wallets",
    components: {PageHeader},
    data() {
      return {
        list: {
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
          if (!res.data.code) {
            this.list.data = res.data.items
          } else {
            this.$toast.fail({
              forbidClick: true,
              message: res.data.message
            })
          }
        }).finally(() => loading.clear())
      },
      cancelAuth(data) {
        this.$dialog.confirm({
          title: "取消授权",
          message: "确定取消当前公链地址授权",
          className: "referrerConfirmDialog",
          cancelButtonColor: "#666",
          confirmButtonColor: "#1B2945",
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              cancelAuth(data.walletId).then(res => {
                done()
                if (res.data.code) {
                  this.$toast({
                    type: "fail",
                    message: "操作失败"
                  })
                } else {
                  this.$toast({
                    forbidClick: true,
                    message: '授权已取消',
                    onClose: () => this.getList()
                  })
                }
              })
            } else {
              done()
            }
          }
        }).catch(() => {
        })
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style scoped lang="scss">
.wallets_wrap {
  .content {
    .list {
      .item {
        padding: 30px;
        font-size: 28px;
        .title {
          color: #333;
          font-weight: bold;
        }
        .value {
          color: #999;
          margin-top: 11px;
        }
        .link {
          color: #237FF8;
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }
}
</style>