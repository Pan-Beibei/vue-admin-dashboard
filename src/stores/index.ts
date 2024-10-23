import { House } from "@element-plus/icons-vue";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface MenuItem {
  path: string;
  name: string;
  label: string;
  icon: typeof House;
  url: string;
}
function initialState() {
  return {
    isCollapse: false,
    tags: [
      {
        name: "home",
        label: "首页",
        path: "/home",
        icon: House,
        url: "Home",
      },
    ],
    currentMenu: null as MenuItem | null,
  };
}

export const useAllDataStore = defineStore("allData", () => {
  const state = ref(initialState());

  function switchCollapse() {
    state.value.isCollapse = !state.value.isCollapse;
  }

  function selectMenu(val: MenuItem) {
    if (val.name === "home") {
      state.value.currentMenu = null;
    } else {
      state.value.currentMenu = val;
      const index = state.value.tags.findIndex(
        (item) => item.name === val.name
      );
      if (index === -1) state.value.tags.push(val);
    }
  }

  function updateTags(tag: MenuItem) {
    const index = state.value.tags.findIndex((item) => item.name === tag.name);
    state.value.tags.splice(index, 1);
  }

  return {
    state,
    switchCollapse,
    selectMenu,
    updateTags,
  };
});
