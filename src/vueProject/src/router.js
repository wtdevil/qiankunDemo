import PageOne from './components/pageOne.vue';
import PageTwo from "./components/pageTwo.vue";
import { createRouter, createWebHistory } from "vue-router";
const path = window.__POWERED_BY_QIANKUN__ ? "/child" : "/"
const routes = [
  { path: `/`, component: PageOne },
  { path: `/pageOne`, component: PageOne },
  { path: `/pageTwo`, component: PageTwo },
];

const router = createRouter({
  history: createWebHistory(path),
  routes
});
export default router;