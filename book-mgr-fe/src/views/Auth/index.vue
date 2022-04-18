<template>
  <div class="auth">
    <div class="title-info">
      <img src="" alt="">
      <div class="title">管理系统后台</div>
      
    </div>
    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登录">
          <div class="item">
            <a-input placeholder="账号" v-model:value="loginForm.account">  
              <template #prefix>
                <UserOutlined />
              </template>
          </a-input>
          </div>
          <div class="item">
            <a-input placeholder="密码" v-model:value="loginForm.password">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-button type="primary" @click="login">登录</a-button>
          </div>
          <div class="item"><a ref="javascript:;">忘记密码</a></div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input placeholder="账号" v-model:value="regForm.account">  
              <template #prefix>
                <UserOutlined />
              </template>
          </a-input>
          </div>
          <div class="item">
            <a-input placeholder="密码" v-model:value="regForm.password">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input placeholder="邀请码"></a-input>
          </div>
          <div class="item">
            <a-button type="primary" @click="register">注册</a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
      
    </div>
  </div>
  
</template>

<script src="./index.js">
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>