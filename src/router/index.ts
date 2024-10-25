import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/MainView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    redirect: "/home",
    children: [],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404View.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
