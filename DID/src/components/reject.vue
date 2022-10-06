<template>
  <van-popup 
    v-model="show" 
    round 
    lock-scroll
    position="bottom"
  >
    <div class="popup_header_wrap">
      <div class="cancel" @click="handleCancel">取消</div>
      <div class="title">{{title}}</div>
      <div class="confirm" @click="handleConfirm">确定</div>
    </div>
    <div class="cancel_wrap">
      <div class="title_wrap">
        <div class="label">
          <span class="text">类型</span>
          <van-popover
            v-model="showPopover"
            placement="bottom-start"
            trigger="click"
          >
            <div class="cancel-message">恶意操作的用户及进行通过的推荐人节点将扣取相应的信用分</div>
            <template #reference>
              <van-icon class="icon" name="warning-o" />
            </template>
          </van-popover>
        </div>
      </div>
      <div class="item">
        <span
            class="type"
            v-for="item in types"
            :key="item"
            :class="{'active': type === item}"
            @click="selectType('type', item)"
        >
          {{item}}
        </span>
      </div>
      <div class="title_wrap">
        <div class="label">
          <span class="text">具体原因</span>
        </div>
<!--        <div class="switch" @click="handleSwitch">-->
<!--          <span class="text">{{isInput ? '选择' : '输入'}}</span>-->
<!--          <i class="icon icon-refresh"></i>-->
<!--        </div>-->
      </div>
      <div class="item" v-show="isInput">
        <van-field
            border
            class="textarea"
            v-model="remark"
            label=""
            type="textarea"
            rows="4"
            placeholder="请输入具体原因"
        />
      </div>
      <div class="item" v-show="!isInput">
        <span
            class="type"
            v-for="item in reason"
            :key="item"
            :class="{'active': remark === item}"
            @click="selectType('remark', item)"
        >
          {{item}}
        </span>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    title: {required: true, type: String},
    types: {type: Array, default: () => ['信息不全', '信息有误', '证件照片有误', '证件照片不清晰']}
  },
  data() {
    return {
      show: false,
      showPopover: false,
      reason: ['信息不全', '信息错误', '证件照有误', '证件照不清晰'],
      isInput: true,
      type: "",
      remark: ""
    }
  },
  methods: {
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
      this.$emit('handleReject', {type: this.type, remark: this.remark})
      this.handleCancel()
    }
  }
}
</script>

<style lang="scss" scoped>
.popup_header_wrap {
  display: flex;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 1px solid #F3F4F5;
  font-size: 32px;
  color: #1B2945;
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
    .icon {
      color: #FC7542;
      margin-left: 10px;
    }
    .switch {
      font-size: 28px;
      .text {
        color: #237FF8;
      }
      .icon {
        color: #237FF8;
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
      background-color: #F3F4F5;
      border-radius: 16px;
      flex: 0 0 calc((100% - 60px) / 3);
      margin: 30px 30px 0 0;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &.active {
        color: #FFF;
        background-color: #237FF8;
      }
    }
    .textarea {
      padding: 0;
      border: 1px solid #DDD;
      border-radius: 18px;
      padding: 10px 30px;
      margin-top: 30px;
      transition: all .2s;
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