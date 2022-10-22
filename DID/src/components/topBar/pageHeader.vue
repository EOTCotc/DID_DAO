<template>
  <van-nav-bar
      :class="{'nav-bar': theme === 'dark'}"
      :title="title"
      :left-arrow='hasLeftArrow'
      @click-left="back"
  />
</template>

<script>
  export default {
    props: {
      title: {type: String, default: '', required: true},
      theme: {type: String, default: 'light'},
      hasLeftArrow: {type: Boolean, default: true},
      isGo: {type: Boolean, default: true}
    },
    methods: {
      back() {
        this.isGo ? this.$router.go(-1) : this.$emit('handleBack')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .van-nav-bar {
    &::v-deep(.van-icon) {
      color: #000;
    }
  }
  .van-nav-bar.nav-bar {
    background-color: $theme;

    &::after {
      border-bottom-color: $theme;
    }

    &::v-deep(.van-icon) {
      color: #fff;
    }

    &::v-deep(.van-nav-bar__title) {
      color: #fff;
    }
  }
</style>