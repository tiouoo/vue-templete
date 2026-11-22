import { createRouter, createWebHistory } from 'vue-router';
import { appName } from '../config.js';

const pages = [
  {
    path: '',
    name: 'home',
    component: () => import('./views/HomeView.vue'),
    meta: { title: '首页', navigation: true },
  },
  {
    path: 'blank',
    name: 'blank',
    component: () => import('./views/BlankView.vue'),
    meta: { title: '空白页', navigation: true },
  },
  {
    path: ':pathMatch(.*)*',
    name: 'not-found',
    component: () => import('./views/NotFoundView.vue'),
    meta: { title: '404' },
  },
];

export const navigation = pages
  .filter(({ meta }) => meta.navigation)
  .map(({ name, meta }) => ({ name, title: meta.title }));

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: () => import('./MainView.vue'), children: pages }],
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to, _from, failure) => {
  if (!failure) document.title = to.meta.title + ' · ' + appName;
});

export default router;
