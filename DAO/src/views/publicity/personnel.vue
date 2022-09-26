<template>
  <notification
      title="申请成功"
      button-text="前往处理"
      button-color="#237FF8"
      message="最近有 2 件仲裁案待处理件仲裁案待处理件仲裁案待处理件仲裁案待处理件仲裁案待处理"
      :close-on-click="false"
      :header-icon="require('../../assets/imgs/dialog-title-1.png')"
      @buttonClick="handleButtonClick"
  ></notification>
</template>

<script>
import notification from "@/components/notification";
export default {
  name: "personnel",
  components: {
    notification
  },
  methods: {
    handleButtonClick() {
      console.log(1);
    }
  }
}
</script>

<style scoped lang="scss">
</style>