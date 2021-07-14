import Child from './page/child.vue';
import ChildOne from './page/child1.vue';
import Game from "./page/game.vue";
import { createRouter, createWebHistory  } from "vue-router";
const routes = [
  { path: "/", component: Child },
  { path: "/game", component: Game },
  { path: "/childone", component: ChildOne },
  { path: "/childone/:catchAll(.*)", component: ChildOne },
  { path: "/child", component: Child },
  { path: '/child/:catchAll(.*)', component: Child }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;