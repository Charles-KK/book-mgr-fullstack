import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue')
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import('../layout/BasicLayout/index.vue'),
    children: [
      {
        path: 'books',
        name: 'Books',
        component: () => import('../views/Books/index.vue'),
      }
    ]
  }
  

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
