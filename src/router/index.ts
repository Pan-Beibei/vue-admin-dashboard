import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/MainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      redirect: "/home",
      children: [
        // {
        //   path: "/home",
        //   name: "home",
        //   component: () => import("@/views/HomeView.vue"),
        // },
        // {
        //   path: "/user",
        //   name: "user",
        //   component: () => import("@/views/UserView.vue"),
        // },
        // {
        //   path: "/mall",
        //   name: "mall",
        //   component: () => import("@/views/MallView.vue"),
        // },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
  ],
});

export default router;
