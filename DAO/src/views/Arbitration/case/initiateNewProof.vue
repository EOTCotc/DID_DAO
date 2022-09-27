<template>
<div class="initiateNewProof_wrap bg-gray fullscreen">
  <page-header title="发起重新举证"></page-header>
  <div class="content">
    <div class="title">发起重新举证需满足以下一种条件</div>
    <van-radio-group v-model="form.data.type">
      <van-radio name="1" icon-size="16px" class="text">单选框 1</van-radio>
      <van-radio name="2" icon-size="16px" class="text">单选框 2</van-radio>
    </van-radio-group>
    <div class="title" style="font-weight: bold;font-size: 14px;">申请延期说明</div>
    <van-field
        v-model="form.data.remark"
        show-word-limit
        class="textarea"
        rows="3"
        type="textarea"
        placeholder="请描述申请延期的说明"
    />
    <div class="btn">
      <van-button
          block
          round
          color="#237FF8"
      >
        提交
      </van-button>
    </div>
  </div>
</div>
</template>

<script>
import PageHeader from "@/components/topBar/pageHeader";
export default {
  name: "initiateNewProof",
  components: {PageHeader},
  data() {
    return {
      form: {
        data: {
          type: 1,
          remark: ""
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.initiateNewProof_wrap {
  .content {
    flex: 1;
    padding: 30px;
    background-color: #FFF;
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
      border: 1px solid #EEE;
      border-radius: 14px;
    }
    .btn {
      @include posi($b: 30px, $l: 30px, $r: 30px);
    }
  }
}
</style>