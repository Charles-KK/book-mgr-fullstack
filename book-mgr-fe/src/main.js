import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Antd from 'ant-design-vue';
//还要导入样式
import 'ant-design-vue/dist/antd.css';


//create App 就是导入 == const APP {data(){}, methods:... }
createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .mount('#app');
  
