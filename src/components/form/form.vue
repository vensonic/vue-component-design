<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'iForm',
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    //由于子组件先挂载渲染，所以需要在created中收集和移除formitem
    this.$on('formItemAdd', (item) => {
      this.list.push(item);
    });
    this.$on('formItemRemove', (item) => {
      if (item.prop) {
        this.list.splice(this.list.indexOf(item), 1);
      }
    });
  },
  methods: {
    //校验所有
    validate(cb = function() {}) {
      //要校验所有项并支持promise
      return new Promise((resolve, reject) => {
        let pass = true;
        this.list.forEach((item) => {
          item.validate('', (error) => {
            if (error) {
              pass = false;
            }
          });
        });
        cb(pass);
        if (pass) {
          console.log(pass);
          resolve(pass);
        } else {
          reject();
        }
      });
    },
  },
};
</script>

<style></style>
