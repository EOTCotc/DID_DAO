<template>
  <van-nav-bar
    :class="{'nav-bar': theme === 'dark'}"
    :title="title"
    left-arrow
    @click-left="$router.go(-1)"
  />
</template>

<script>
export default {
  props: {
    title: {type: String, default: '', required: true},
    theme: {type: String, default: 'light'}
  }
}
</script>

<style>

</style>