import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";

import "@/assets/scss/index.scss";
import { worker } from "@/mocks/browser";

import App from "./App.vue";

const app = createApp(App);

// app.config.globalProperties.$api = api;
app.use(createPinia());
app.use(router);

app.mount("#app");

if (process.env.NODE_ENV === "development") {
  worker.start();
}
