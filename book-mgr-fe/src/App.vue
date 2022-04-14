<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <!-- 路由渲染组件, -->
  <router-view/>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    }
  }
</script>

<style lang="scss">

</style>
