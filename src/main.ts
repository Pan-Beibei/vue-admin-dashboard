import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

import "@/assets/scss/index.scss";

import App from "./App.vue";
import { useAllDataStore } from "@/stores";

async function prepareApp() {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    const { worker } = await import("@/mocks/browser");
    return worker.start();
  }

  return Promise.resolve();
}

// 路由守卫
function isRoute(to) {
  return router.getRoutes().filter((item) => item.path === to.path).length > 0;
}
router.beforeEach((to) => {
  if (to.path !== "/login" && !store.state.token) {
    return {
      name: "login",
    };
  }
  if (!isRoute(to)) {
    return {
      name: "404",
    };
  }
});

const app = createApp(App);

app.use(createPinia());
//在这里调用为了持久化数据
const store = useAllDataStore();
store.addMenu(router, "refresh");

app.use(router);

prepareApp().then(() => {
  app.mount("#app");
});
