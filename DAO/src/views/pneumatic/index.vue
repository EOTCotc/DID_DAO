
<template>
  <div class="">
    <white :title="title"></white>
    <div class="contatiner">
      <div class="top">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import White from "@/components/Nav/white.vue";

export default {
  components: {
    White,
  },
  data() {
    return {
      title: "风控",
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>