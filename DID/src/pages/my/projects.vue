<template>
  <div class="wallets_wrap">
    <page-header title="DID绑定各项目" theme="dark" />
    <div class="content">
      <ul class="list" v-if="!!list.data.length">
        <li class="item" v-for="item in list.data" :key="item.walletId">
          <van-row type="flex" align="center">
            <van-col :span="20" class="title">{{item.name}}</van-col>
            <van-col :span="4" class="link" @click="cancelAuth(item)"><i class="icon icon-bind"></i>解绑</van-col>
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
  import {list, cancelAuth} from "@/api/pagesApi/projects"

  export default {
    name: "projects",
    components: {PageHeader},
    data() {
      return {
        list: {
          data: []
        }
      }
    },
    methods: {
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
          title: "取消绑定",
          message: "确定解绑当前项目",
          className: "referrerConfirmDialog",
          cancelButtonColor: "#666",
          confirmButtonColor: "#1B2945",
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              cancelAuth(data.projectId).then(res => {
                done()
                if (res.data.code) {
                  this.$toast({
                    type: "fail",
                    message: "操作失败"
                  })
                } else {
                  this.$toast({
                    forbidClick: true,
                    message: '已解绑',
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
          .icon {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>