import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//create App 就是导入 const APP {data(){}, methods:... }
createApp(App).use(store).use(router).mount('#app');
