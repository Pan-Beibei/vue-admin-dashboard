import { House } from "@element-plus/icons-vue";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface MenuItemType {
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
    currentMenu: null as MenuItemType | null,
    menuList: [] as Array<MenuItemType>,
    routerList: [],
    token: "",
  };
}

export const useAllDataStore = defineStore("allData", () => {
  const state = ref(initialState());

  function switchCollapse() {
    state.value.isCollapse = !state.value.isCollapse;
  }

  function selectMenu(val: MenuItemType) {
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

  function updateTags(tag: MenuItemType) {
    const index = state.value.tags.findIndex((item) => item.name === tag.name);
    state.value.tags.splice(index, 1);
  }

  function updateMenuList(list: Array<MenuItemType>) {
    state.value.menuList = list;
  }

  return {
    state,
    switchCollapse,
    selectMenu,
    updateTags,
    updateMenuList,
  };
});
