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
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "/user",
          name: "user",
          component: () => import("@/views/UserView.vue"),
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
