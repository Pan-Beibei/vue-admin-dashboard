import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

import "@/assets/scss/index.scss";

import App from "./App.vue";

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

const app = createApp(App);

app.use(createPinia());
app.use(router);

prepareApp().then(() => {
  app.mount("#app");
});
