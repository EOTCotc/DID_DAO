<template>
  <van-pull-refresh v-model='list.uploading' @refresh='handleBottomRefresh'>
    <div class='certificationAudit_wrap bg-gray fullscreen'>
      <page-header title='认证审核' theme='dark' />
      <van-tabs
        v-model='tab.active'
        swipeable
        background='#1b2945'
        title-active-color='#FFF'
        title-inactive-color='#8D94A2'
        @change='handleChangeTab'
      >
        <van-tab
          v-for='item in tab.data'
          :key='item'
          :title='item'
        >
        </van-tab>
      </van-tabs>
      <van-list
        class='list_wrap'
        v-show='!!list.data.length'
        v-model='list.UpRefreshLoading'
        :finished='!!list.data.length && list.finished'
        finished-text='没有更多了'
        @load='handleUpRefresh'
      >
        <ul class='list'>
          <li class='item'
              v-for='item in list.data'
              :key='item.id'
          >
            <img class='status' v-if='tab.active === 1' :src="require(`@/assets/imgs/status_${item.status === 1 ? 'confirm' : 'cancel'}.png`)" alt=''>
            <img class='status' v-else-if='tab.active === 2' :src="require(`@/assets/imgs/status_cancel.png`)" alt=''>
            <van-row class='item-row user'>
              <van-cell :title='item.name' :value='transformUTCDate(item.createDate)'></van-cell>
            </van-row>
            <van-row class='item-row'>
              <van-col span='8' class='name'>手机号：</van-col>
              <van-col span='16' class='value'>{{ item.phoneNum }}</van-col>
            </van-row>
            <van-row class='item-row'>
              <van-col span='8' class='name'>证件号：</van-col>
              <van-col span='16' class='value'>{{ item.idCard }}</van-col>
            </van-row>
            <van-row class='item-row'>
              <van-col span='24' class='name'>证件及手持证件照</van-col>
              <van-col span='24' class='value'>
                <div class='imgs'>
                  <img class='img' :src='item.portraitImage' alt='' @click='preview(item.portraitImage)'>
                  <img class='img' :src='item.nationalImage' alt='' @click='preview(item.nationalImage)'>
                </div>
              </van-col>
            </van-row>
            <!-- 流程 -->
            <van-steps
              v-if='tab.active > 0 && !!item.auths.length'
              :active='3'
              direction='vertical'
              active-color='#227AEE'
            >
              <van-step v-for='step in item.auths' :key='step.id'>
                <template slot='active-icon'>
                  <van-icon v-if='step.auditType === 1' size='16px' name='checked' color='#227AEE' />
                  <van-icon v-else name='clear' size='16px' color='#227AEE' />
                </template>
                <template slot='inactive-icon'>
                  <van-icon v-if='step.auditType === 1' size='16px' name='checked' color='#227AEE' />
                  <van-icon v-else name='clear' size='16px' color='#227AEE' />
                </template>
                <van-row class='main'>
                  <van-col :span='12' class='title'>
                    {{ step.isDao ? 'Dao' : getAuditStep(step.auditStep) }}:{{ step.name }}
                  </van-col>
                  <van-col :span='12' class='date' style='font-size: 12px;color: #999;text-align: right;'>
                    {{ transformUTCDate(step.authDate) }}
                  </van-col>
                  <van-col :span='24' class='remark' style='font-size: 12px;color: #999;margin-top: 15px;'>
                    <!-- 打回原因 -->
                    <van-row class='reason_wrap' v-if='!!step.remark'>
                      <div class='title'>打回原因</div>
                      <div class='message'>{{ step.remark }}</div>
                    </van-row>
                  </van-col>
                </van-row>
              </van-step>
            </van-steps>
            <!-- 操作 -->
            <van-row class='item-row' gutter='20' v-if='tab.active === 0'>
              <van-col span='12'>
                <van-button
                  class='more'
                  color='#237FF8'
                  round
                  plain
                  block
                  type='primary'
                  @click='cancel(item)'
                >
                  打回
                </van-button>
              </van-col>
              <van-col span='12'>
                <van-button
                  class='more'
                  round
                  block
                  color='#237FF8'
                  type='primary'
                  @click='confirm(item)'
                >
                  通过
                </van-button>
              </van-col>
            </van-row>
          </li>
        </ul>
      </van-list>
      <van-empty
        v-show='!list.data.length'
        class='custom-image'
        :image="require('../../../assets/imgs/empty.png')"
        description='暂无任何数据'
      />
    </div>
    <!-- 拒绝 -->
    <reject
      showSwitch
      ref='reject'
      title='打回原因'
      :types='["恶意提交", "信息有误"]'
      @handleReject='handleReject'
    />
    <!-- 通过 -->
    <!--  图片预览  -->
    <van-image-preview v-model='imgPreview.show' :images='imgPreview.images' />
  </van-pull-refresh>
</template>
<script>
import pageHeader from '@/components/topBar/pageHeader'
import Reject from '@/components/reject'
import {
  approval,
  list,
  getImg
} from '@/api/pagesApi/identity';
import {
  transformUTCDate,
  spliceSrc,
  getAuditStep
} from '@/utils/utils';

export default {
  name: 'authenticationApproval',
  components: {
    pageHeader,
    Reject
  },
  data() {
    return {
      // 当前选择的列表项的id
      id: null,
      userInfo: {},
      dialogOptions: {
        show: false,
        title: '',
        message: ''
      },
      tab: {
        data: ['待审批', '已审批', '驳回'],
        active: 0
      },
      list: {
        uploading: false,
        UpRefreshLoading: false,
        finished: false,
        query: {
          page: 1,
          itemsPerPage: 10
        },
        data: []
      },
      imgPreview: {
        show: false,
        images: []
      }
    }
  },
  methods: {
    handleChangeTab() {
      this.list.query.page = 1
      this.list.finished = false
      this.list.data = []
      this.getList()
    },
    // 下拉刷新
    handleBottomRefresh() {
      this.list.uploading = true
      this.getList()
    },
    // 滚动到底翻页
    handleUpRefresh() {
      this.list.query.page++
      this.list.UpRefreshLoading = true
      this.getList()
    },
    getWatermarkImg(data) {
      getImg(data.portraitImage).then(res => {
        console.log(res)
      })
      getImg(data.nationalImage).then(res => {
        console.log(res)
      })
    },
    // 获取列表
    getList() {
      const userInfo = JSON.parse(this.cookie.get('userInfo'))
      this.$toast.loading('列表加载中…')
      list(this.tab.active, this.list.query).then(res => {
        if (!res.data.code) {
          const data = res.data.items.map(item => {
            const auths = [...item.auths]
            this.getWatermarkImg(item)
            if (this.tab.active === 1) {
              item.auths = auths.slice(0, auths.findIndex(auth => auth.uId === userInfo.uid) + 1)
              item.status = item.auths[item.auths.length - 1].auditType
            }
            return item
          })
          if (this.list.query.page === 1) {
            this.list.data = data
          } else {
            this.list.data.push(...data)
          }
          this.list.finished = !data.length
        } else {
          this.$toast.fail({
            forbidClick: true,
            message: res.data.message
          })
        }
      }).finally(() => {
        this.$toast.clear()
        this.list.uploading = false
        this.list.UpRefreshLoading = false
      })
    },
    // 批准
    confirm(data) {
      this.handleSubmit('批准提示', '请确保申请人填写信息无误\n确定批准申请？', {
        userAuthInfoId: data.userAuthInfoId,
        auditType: 1,
        remark: ''
      })
    },
    // 提交信息
    handleSubmit(title, message, params) {
      this.$dialog.confirm({
        title,
        message,
        className: 'identityApprovalDialog',
        cancelButtonColor: '#666',
        confirmButtonColor: '#1B2945',
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            approval(params).then(res => {
              done()
              if (res.data.code) {
                this.$toast.fail('操作失败')
              } else {
                this.$toast({
                  type: 'success',
                  message: res.data.message
                })
                this.tab.active = 1
                this.getList()
              }
            })
          } else {
            done()
          }
        }
      }).catch(() => {
      })
    },
    // 驳回
    cancel(data) {
      this.$refs.reject.toggle(true)
      this.id = data.userAuthInfoId
    },
    // 驳回信息提交
    handleReject(data) {
      const {
        type,
        remark
      } = data
      this.handleSubmit('驳回提示', '确定驳回申请？', {
        userAuthInfoId: this.id,
        auditType: this.getAuditType(type),
        remark
      })
    },
    // 获取审核步骤
    getAuditStep,
    // 获取审核状态
    getAuditType(type) {
      const arr = ['未审核', '审核通过', '恶意提交', '信息有误']
      return arr.indexOf(type)
    },
    // 预览图片
    preview(src) {
      this.imgPreview.show = true
      this.$set(this.imgPreview.images, 0, src)
    },
    // 转换时间格式
    transformUTCDate,
  },
  created() {
    this.getList()
    this.userInfo = JSON.parse(this.cookie.get('userInfo'))
  }
}
</script>
<style lang='scss' scoped>
.certificationAudit_wrap {
  &::v-deep(.van-tabs__line) {
    background-color: #237DF4;
  }

  .list_wrap {
    flex: 1;
    box-sizing: border-box;
    min-height: 0;
    overflow: auto;

    .item {
      position: relative;
      padding: 0 30px 30px;
      margin: 25px 25px 0;
      border-radius: 20px;
      background: #FFF;
      overflow: hidden;

      .status {
        @include posi($t: 120px, $r: 40px);
        display: block;
        width: 140px;
      }
    }
  }

  .item-row {
    margin-top: 30px;

    &.user {
      border-bottom: 1px solid #F3F4F5;
    }

    &::v-deep(.van-cell) {
      padding: 0;
    }

    .name {
      color: #999;
      font-size: 28px;
    }

    .value {
      color: #333;
      font-size: 28px;

      .icon {
        color: #237FF8;
        font-size: 26px;
        margin-left: 10px;
      }
    }

    .imgs {
      display: flex;
      align-items: flex-start;
      margin-top: 30px;

      .img {
        display: block;
        width: calc((100% - 20px) / 2);

        &:first-of-type {
          margin-right: 20px;
        }
      }
    }
  }

  .reason_wrap {
    font-size: 28px;

    .title {
      color: #333;
    }

    .message {
      color: #FC7542;
      margin-top: 16px;
    }
  }
}
</style>
<style lang='scss'>
.identityApprovalDialog .van-dialog__message--has-title {
  color: #F37A4C;
}
</style>