
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
  name: "blue-nav",
  components: {
    White,
  },
  data() {
    return {
      title: "反馈和建议",
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.contatiner {
  width: 100%;
}
</style>