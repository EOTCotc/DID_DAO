<template>
  <div class="community_wrap fullscreen bg-gray">
    <page-header title="申请创建社区" />
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
          v-model="form.data.sqName"
          name="sqName"
          label="社区名"
          placeholder="请输入申请社区名"
          :rules="[{ validator: val => !!val.length, message: '请输入申请社区名' }]"
        />
        <!-- <van-field name="address" label="社区地址">
          <template #input>
            <van-area title="标题" :area-list="areaList" />
          </template>
        </van-field> -->
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
          name="ywbgs" 
          label="有无办公室">
          <template #input>
            <van-radio-group v-model="form.data.ywbgs" direction="horizontal">
              <van-radio name="1">有</van-radio>
              <van-radio name="0">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field 
          class="row"
          name="sfjq" 
          label="是否建群">
          <template #input>
            <van-radio-group v-model="form.data.sfjq" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="0">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 25px 15px 0;">
          <van-button round block type="info" native-type="submit" :disabled="submitDisable" color="#1B2945">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader.vue"

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
          name: "",
          sqName: "",
          // address: "",
          phone: "",
          ywbgs: "",
          sfjq: ""
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
    handleSubmit() {
      this.$dialog.confirm({
        title: "确认提示",
        message: "请确定提交信息无误，提交批准后将不可更改",
        confirmButtonColor: "#1B2945",
        cancelButtonColor: "#666",
        beforeClose: (action, done) => {
          if (action === "confirm") {
            done()
          } else {
            done()
          }
        }
      })
    }
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
}
</style>