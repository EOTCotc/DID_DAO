<template>
  <div>
    <van-dialog v-model="show"
                title="标题"
                show-cancel-button>
    </van-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    }
  },
}
</script>
<style lang="scss" scoped>
</style>