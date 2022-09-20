<template>
  <div class="step_wrap">
    <van-row class="item" v-for="item in step" :key="item.id">
      <div class="line"></div>
      <van-col span="12">
        <div class="title">
          <slot name="icon" :slot-scope="item">
            <van-icon name="checked" color="#227AEE" style="margin-right: 5px;" />
          </slot>
          {{item.status}}:{{item.name}}
        </div>
      </van-col>
      <van-col span="12">
        <div class="date">{{item.date}}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    step: {required: true, type: Array, default: []}
  }
}
</script>

<style lang="scss" scoped>
.step_wrap {
  margin-top: 30px;
  .item {
    position: relative;
    overflow: initial;
    margin-top: 20px;
    .line {
      @include posi($b: 32px, $l: 13px, $z: 0);
      width: 1px;
      height: 100%;
      background-color: #237FF8;
    }
    &:first-of-type .line {
      display: none;
    }
  }
  .title {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 28px;
  }
  .date {
    color: #999;
    font-size: 24px;
    text-align: right;
  }
  &::v-deep(.van-cell::after) {
    display: none;
  }
}
</style>