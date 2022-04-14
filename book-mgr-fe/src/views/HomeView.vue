<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
导入组件
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  // 组件注册
  components: {
    HelloWorld,
  },
};
</script>
