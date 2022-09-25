<template>
  <div class="password_wrap">
    <input
        v-for="item in input"
        v-model="item.value"
        :key="item.id"
        :style="{'width': width}"
        ref="input"
        class="input"
        type="text"
        maxlength="1"
        @input="handleChange"
        @focus="$refs.input[active].focus()"
    >
  </div>
</template>

<script>
  export default {
    name: "password",
    props: {
      maxSize: {type: Number, default: 6}
    },
    data() {
      return {
        input: [],
        active: 0
      }
    },
    computed: {
      width() {
        const ml = (this.maxSize - 1) * 10
        return `calc((100% - ${ml}px) / ${this.maxSize})`
      }
    },
    methods: {
      handleChange(e) {
        const value = e.target.value
        if (value) {
          if (this.active < this.maxSize) {
            this.active ++
            this.active < 6 && this.focus()
          }
        }
        this.$emit('handleChange', this.input.map(item => item.value).join(''))
      },
      focus() {
        this.$refs.input[this.active].focus()
      },
      handleKeyDownBackSpace(e) {
        if (e.key === 'Backspace') {
          if (this.active > 0) {
            this.active --
            if (!!this.input[this.active]) {
              this.input[this.active].value = ''
              this.focus()
              this.$emit('handleChange', this.input.map(item => item.value).join(''))
            }
          }
        }
      },
    },
    created() {
      for (let i = 0; i < this.maxSize; i++) {
        this.input.push({id: i + 1, value: ""})
      }
      this.$nextTick(() => {
        this.focus()
        document.addEventListener('keydown', this.handleKeyDownBackSpace)
      })
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.handleKeyDownBackSpace)
    }
  }
</script>

<style scoped lang="scss">
.password_wrap {
  display: flex;
  margin-top: 40px;
  .input {
    flex: 1;
    margin: 0 10px 0 0;
    height: 90px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #F3F4F5;
    border-radius: 4px;
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>