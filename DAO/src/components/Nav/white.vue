<template>
  <div class="nav_an_box">
    <van-nav-bar
      fixed
      placeholder
      :title="title"
      :name="name"
      left-arrow
      @click-left="onClickLeft(name)"
    />
  </div>
</template>

<script>
export default {
  //白色导航栏，带返回
  name: "Nav-white",
  props: { title: String, name: String },
  data() {
    return {};
  },
  methods: {
    onClickLeft(name) {
      if (name) {
        this.$router.push({ name: name });
      } else {
        this.$router.back();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar .van-icon {
  color: #000;
}
.van-button {
  display: inline-block !important;
}

::deep.van-nav-bar__title {
  font-size: 36px;
  font-weight: bold;
}
</style>>
