<template>
  <div class="initiateNewProof_wrap bg-gray fullscreen">
    <page-header :title="$t('arbitrationcase.Toprooftl')"></page-header>
    <div class="content">
      <div class="title">{{$t('arbitrationcase.Toproofterm')}}</div>
      <van-radio-group v-model="form.data.reason">
        <van-radio :name="2"
                   icon-size="16px"
                   class="text">{{$t('arbitrationcase.Toproofterm1')}}</van-radio>
        <van-radio :name="3"
                   icon-size="16px"
                   class="text">{{$t('arbitrationcase.Toproofterm2')}}</van-radio>
      </van-radio-group>
      <div class="title"
           style="font-weight: bold; font-size: 14px">
        {{ $t('arbitrationcase.Toproofexplain')}}
      </div>
      <van-field v-model="form.data.explain"
                 show-word-limit
                 class="textarea"
                 name="explain"
                 rows="3"
                 type="textarea"
                 :placeholder="$t('arbitrationcase.Toproofexplain')" />
      <div class="btn">
        <van-button block
                    round
                    color="#237FF8"
                    :loading-text="$t('arbitrationcase.sumbit')"
                    :loading="form.loading"
                    :disabled="form.loading"
                    @click="onSubmit">{{$t('arbitrationcase.sub')}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/topBar/pageHeader'
import { delay } from '@/api/case'

export default {
  name: 'initiateNewProof',
  components: { PageHeader },
  data() {
    return {
      form: {
        loading: false,
        data: {
          reason: 1,
          explain: '',
          day: 3,
          isArbitrate: 1,
        },
      },
    }
  },
  methods: {
    onSubmit() {
      const loading = this.$toast.loading({
        forbidClick: true,
        message: this.$t('arbitrationcase.sumbit'),
      })
      this.form.loading = true
      delay({ ...this.form.data, arbitrateInfoId: this.$route.query.id })
        .then((res) => {
          if (res.data.code) {
            this.$toast.fail({
              forbidClick: true,
              message: this.$t('arbitrationcase.subfail'),
            })
          } else {
            this.$toast.success({
              forbidClick: true,
              message: this.$t('arbitrationcase.subsuss'),
              onClose: () => this.$router.go(-1),
            })
          }
        })
        .catch(() => {
          this.$toast.fail({
            forbidClick: true,
            message: this.$t('arbitrationcase.subfail'),
          })
        })
        .finally(() => {
          loading.clear()
          this.form.loading = false
        })
    },
  },
  created() {},
}
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