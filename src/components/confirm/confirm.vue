<template>
  <div class="i-cofirm">
    <div class="confirm-item">
      <div class="confirm-title">{{ options.title || '系统提示' }}</div>
      <div class="comfirm-content">{{ options.content }}</div>
      <div class="confirm-bottons">
        <button @click="cancel">{{ options.cancelText || '取消' }}</button>
        <button @click="confirm">{{ options.confirmText || '确定' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {},
    };
  },
  methods: {
    confirm() {
      if (this.options.confirm && typeof this.options.confirm === 'function') {
        this.options.confirm();
      }
      this.$emit('confirm');
      setTimeout(() => {
        this.$emit('remove');
      }, 100);
    },
    cancel() {
      if (this.options.cancel && typeof this.options.cancel === 'function') {
        this.options.cancel();
      }
      this.$emit('cancel');
      setTimeout(() => {
        this.$emit('remove');
      }, 100);
    },
  },
};
</script>

<style>
.i-cofirm {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2013;
  background: #000;
  opacity: 0.5;
}
.confirm-item {
  display: inline-block;
  width: 420px;
  margin: 300px auto;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
}
</style>
