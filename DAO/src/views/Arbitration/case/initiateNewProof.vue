<template>
  <div class="initiateNewProof_wrap bg-gray fullscreen">
    <page-header title="发起重新举证"></page-header>
    <div class="content">
      <div class="title">发起重新举证需满足以下一种条件</div>
      <van-radio-group v-model="form.data.reason">
        <van-radio :name="2" icon-size="16px" class="text">举证不足，无法进行判决</van-radio>
        <van-radio :name="3" icon-size="16px" class="text">部分举证不全</van-radio>
      </van-radio-group>
      <div class="title" style="font-weight: bold; font-size: 14px">
        申请延期说明
      </div>
      <van-field
        v-model="form.data.explain"
        show-word-limit
        class="textarea"
        name="explain"
        rows="3"
        type="textarea"
        placeholder="申请重新举证说明"
      />
      <div class="btn">
        <van-button
          block
          round
          color="#237FF8"
          loading-text="提交中…"
          :loading="form.loading"
          :disabled="form.loading"
          @click="onSubmit"
        >提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
import {delay} from '@/api/case'


export default {
  name: "initiateNewProof",
  components: { PageHeader },
  data() {
    return {
      form: {
        loading: false,
        data: {
          reason: 1,
          explain: "",
          day: 3,
          isArbitrate: 1
        },
      },
    };
  },
  methods: {
    onSubmit() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: "提交中…"
      })
      this.form.loading = true
      delay({...this.form.data, arbitrateInfoId: this.$route.query.id}).then(res => {
        if (res.data.code) {
          this.$toast.fail({
            forbidClick: true,
            message: "提交失败"
          })
        } else {
          this.$toast.success({
            forbidClick: true,
            message: "提交成功",
            onClose: () => this.$router.go(-1)
          })
        }
      }).catch(() => {
        this.$toast.fail({
          forbidClick: true,
          message: "提交失败"
        })
      }).finally(() => {
        loading.clear()
        this.form.loading = false
      })
    }
  },
  created() {
  }
};
</script>

<style scoped lang="scss">
.initiateNewProof_wrap {
  .content {
    flex: 1;
    padding: 30px;
    margin-top: 30px;
    background-color: #fff;
    .title {
      color: #333;
      font-size: 28px;
      margin-bottom: 30px;
    }
    .text {
      color: #333;
      font-size: 28px;
      margin-bottom: 30px;
    }
    .textarea {
      border: 1px solid #eee;
      border-radius: 14px;
    }
    .btn {
      @include posi($b: 30px, $l: 30px, $r: 30px);
    }
  }
}
</style>