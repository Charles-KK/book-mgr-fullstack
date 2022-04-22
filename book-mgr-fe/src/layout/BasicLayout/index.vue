<template>
  <div class="wrap">
    <div class="header">
      <div class="left">
        <img src="../../assets/imgs/logo.png" alt="">
        <div class="title">智慧校园管理系统</div>
      </div>
      <div class="right"> welcome xxx 
        <div class="log-out">logout</div> 
      </div>
    </div>
    <div class="header-placeholder"></div>
    <div class="content">
      <div class="left">
        <app-nav />
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>  
</template>


<script src="./index.js"></script>
<style lang="scss" scoped>
  @import './index.scss';
</style>