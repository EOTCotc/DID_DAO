<template>
  <div class="community_wrap fullscreen bg-gray">
    <page-header title="申请创建社区"/>
    <div class="content">
      <van-form
          validate-first
          @submit="handleSubmit">
        <van-field
            class="row"
            v-model="form.data.name"
            name="name"
            label="用户名"
            placeholder="请输入申请人真实姓名"
            :rules="[{ validator: val => !!val.length, message: '请输入申请人真实姓名' }]"
        />
        <van-field
            class="row"
            v-model="form.data.comName"
            name="comName"
            label="社区名"
            placeholder="请输入申请社区名"
            :rules="[{ validator: val => !!val.length, message: '请输入申请社区名' }]"
        />
        <van-field
            disabled
            :value="form.data.addressText"
            class="row selectAddress"
            name="address"
            label="社区地址"
            placeholder="请选择社区地址"
            @click="selectAddress"
        ></van-field>
        <van-field
            class="row"
            v-model="form.data.phone"
            name="phone"
            label="联系电话"
            type="tel"
            placeholder="请输入您的联系电话"
            :rules="[{ validator: val => val.length >= 8, message: '请输入正确联系电话' }]"
        />
        <van-field
            class="row"
            name="hasOffice"
            label="有无办公室">
          <template #input>
            <van-radio-group v-model="form.data.hasOffice" direction="horizontal">
              <van-radio :name="1">有</van-radio>
              <van-radio :name="0">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            class="row"
            name="hasGroup"
            label="是否建群">
          <template #input>
            <van-radio-group v-model="form.data.hasGroup" direction="horizontal">
              <van-radio :name="1">是</van-radio>
              <van-radio :name="0">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 25px 15px 0;">
          <van-button round block type="info" native-type="submit" :disabled="submitDisable" color="#1B2945">提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
  import jsCookie from 'js-cookie'
  import PageHeader from "@/components/topBar/pageHeader.vue"
  import {create, oldData} from "@/api/pagesApi/community";

  export default {
    name: "communityCreate",
    components: {
      PageHeader
    },
    data() {
      return {
        form: {
          loading: false,
          data: {
            addressText: "",
            addressName: "",
            name: "",
            comName: "",
            address: " ",
            phone: "",
            hasOffice: "",
            hasGroup: "",
            area: "",
            city: "",
            country: "",
            province: ""
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
      // 获取之前的数据
      getOldFormData() {
        const userInfo = JSON.parse(this.cookie.get('userInfo'))
        if (userInfo.authType === 3) {
          const loading = this.$toast.loading({
            message: "加载中",
            forbidClick: true
          })
          oldData(userInfo.applyCommunityId).then(res => {
            if (!res.data.code) {
              const data = res.data.items
              Object.keys(this.form.data).forEach(item => {
                this.form.data[item] = data[item]
              })
              this.form.data.name = userInfo.name
              this.form.data.addressText = data.addressName
            } else {
              this.$toast.fail({
                forbidClick: true,
                message: res.data.message
              })
            }
          }).finally(() => loading.clear())
        }
      },
      // 选择国家省市区
      selectAddress() {
        this.cookie.set("communityForm", JSON.stringify(this.form.data))
        this.$router.push({path: '/site', query: {form: this.$route.name}})
      },
      handleSubmit() {
        this.$dialog.confirm({
          title: "确认提示",
          message: "请确定提交信息无误，提交批准后将不可更改",
          confirmButtonColor: "#1B2945",
          cancelButtonColor: "#666",
          beforeClose: (action, done) => {
            if (action === "confirm") {
              this.form.data.addressName += this.form.data.address
              create(this.form.data).then(res => {
                done()
                if (!!res.data.code) {
                  this.$toast.fail({
                    forbidClick: true,
                    message: "创建失败"
                  })
                } else {
                  this.$router.replace('/my/community/create/success')
                }
              })
            } else {
              done()
            }
          }
        }).catch(() => {})
      }
    },
    created() {
      const formStr = this.cookie.get('communityForm')
      if(!!formStr) {
        Object.assign(this.form.data, JSON.parse(formStr))
      }
      console.log(this.$route.params)
      if (!!this.$route.params.code) {
        let country = null
        if (!!this.cookie.get('country')) {
          country = this.cookie.get('country').split(',')
        }
        const {province, city, area} = this.$route.params.code
        const address = []
        country[1] && address.push(country[1])
        province[1] && address.push(province[1])
        city[1] && address.push(city[1])
        area[1] && address.push(area[1])
        this.form.data.addressText = address.join(' - ')
        this.form.data.addressName = address.join('')
        this.form.data.country = country[0]
        this.form.data.province = province[0]
        this.form.data.city = city[0]
        this.form.data.area = area[0]
      }
      this.getOldFormData()
    },
    beforeRouteEnter(to, from, next) {
      if (from.path !== '/site') {
        jsCookie.remove('communityForm')
      }
      next()
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    flex: 1;
    margin: 25px;
    height: 100%;
    border-radius: 20px;
    background-color: #FFF;
    overflow: hidden;

    .row {
      flex-wrap: wrap;

      &::v-deep(.van-field__value) {
        flex: initial;
        width: 100%;
      }
    }
    .selectAddress::v-deep(.van-field__label) {
      color: #646566;
    }
    .selectAddress::v-deep(.van-field__control:disabled) {
      color: #323233;
      -webkit-text-fill-color: initial;
    }
  }
</style>