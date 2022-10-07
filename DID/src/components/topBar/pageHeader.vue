<template>
  <van-nav-bar
      :class="{'nav-bar': theme === 'dark'}"
      :title="title"
      :left-arrow='hasLeftArrow'
      @click-left="$router.go(-1)"
  />
</template>

<script>
  export default {
    props: {
      title: {type: String, default: '', required: true},
      theme: {type: String, default: 'light'},
      hasLeftArrow: {type: Boolean, default: true}
    }
  }
</script>

<style lang="scss" scoped>
  .nav-bar {
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