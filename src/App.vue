<template>
  <div id="app">
      <button @click="goHome">返回首页</button>
    <router-view/>
  </div>
</template>
<script>
export default {
    methods:{
        goHome(){
            this.$router.push('/')
        }
    }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

</style>
