<template>
  <van-popup v-model="show"
             round
             lock-scroll
             position="bottom">
    <div class="popup_header_wrap">
      <div class="cancel"
           @click="handleCancel">{{ $t("public.cancel") }}</div>
      <div class="title">{{ title }}</div>
      <div class="confirm"
           @click="handleConfirm">
        {{ $t("public.confirm") }}
      </div>
    </div>
    <div class="cancel_wrap">
      <div class="title_wrap">
        <div class="label">
          <span class="text">{{ $t("reject.tags1") }}</span>
          <van-popover v-model="showPopover"
                       placement="bottom-start"
                       trigger="click">
            <div class="cancel-message">{{ $t("reject.tags2") }}</div>
            <template #reference>
              <van-icon class="icon"
                        name="warning-o" />
            </template>
          </van-popover>
        </div>
      </div>
      <div class="item">
        <span class="type"
              v-for="item in types"
              :key="item"
              :class="{ active: type === item }"
              @click="selectType('type', item)">
          {{ item }}
        </span>
      </div>
      <div class="title_wrap">
        <div class="label">
          <span class="text">{{ $t("reject.tags3") }}</span>
        </div>
      </div>
      <div class="item"
           v-show="isInput">
        <van-field border
                   class="textarea"
                   v-model="remark"
                   label=""
                   type="textarea"
                   rows="4"
                   :placeholder="$t('reject.tags4')" />
      </div>
      <div class="item"
           v-show="!isInput">
        <span class="type"
              v-for="item in reason"
              :key="item"
              :class="{ active: remark === item }"
              @click="selectType('remark', item)">
          {{ item }}
        </span>
      </div>
    </div>
  </van-popup>
</template>

<script>
function arr() {
  return this.$t('reject.data')
}
export default {
  props: {
    title: { required: true, type: String },
    types: {
      type: Array,
      default: arr,
    },
  },
  data() {
    return {
      show: false,
      showPopover: false,
      reason: this.$t('reject.data'),
      isInput: true,
      type: '',
      remark: '',
    }
  },
  methods: {
    arr,
    toggle(show) {
      this.show = show
    },
    selectType(type, data) {
      this[type] = this[type] === data ? '' : data
    },
    // 切换输入或选择
    handleSwitch() {
      this.isInput = !this.isInput
      this.remark = ''
    },
    // 取消
    handleCancel() {
      this.toggle(false)
      this.type = ''
      this.reason = ''
      this.isInput = true
    },
    // 确定
    handleConfirm() {
      this.$emit('handleReject', { type: this.type, remark: this.remark })
      this.handleCancel()
    },
  },
}
</script>

<style lang="scss" scoped>
.popup_header_wrap {
  display: flex;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 1px solid #f3f4f5;
  font-size: 32px;
  color: #1b2945;
  .title {
    flex: 1;
    text-align: center;
    color: #333;
  }
  .cancel {
    color: #666;
    font-size: 32px;
  }
}
.cancel_wrap {
  .title_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 30px 0;
    font-size: 32px;
    color: #333;
    .icon {
      color: #fc7542;
      margin-left: 10px;
    }
    .switch {
      font-size: 28px;
      .text {
        color: #237ff8;
      }
      .icon {
        color: #237ff8;
      }
    }
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 0 30px 30px;
    .type {
      color: #333;
      font-size: 28px;
      line-height: 68px;
      text-align: center;
      background-color: #f3f4f5;
      border-radius: 16px;
      flex: 0 0 calc((100% - 60px) / 3);
      margin: 30px 30px 0 0;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &.active {
        color: #fff;
        background-color: #237ff8;
      }
    }
    .textarea {
      padding: 0;
      border: 1px solid #ddd;
      border-radius: 18px;
      padding: 10px 30px;
      margin-top: 30px;
      transition: all 0.2s;
    }
  }
}
.cancel-message {
  color: #333;
  font-size: 28px;
  padding: 30px 25px;
  width: 600px;
}
</style>