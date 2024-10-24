// import { House } from "@element-plus/icons-vue";
import { defineStore } from "pinia";
import { markRaw, ref, type Component } from "vue";
import type { Router, RouteRecordRaw } from "vue-router";
import { House, Setting, Location, User, Goods } from "@element-plus/icons-vue";

const MenuIconsMap: { [key: string]: typeof House } = {
  Home: markRaw(House),
  Setting: markRaw(Setting),
  Location: markRaw(Location),
  User: markRaw(User),
  Mall: markRaw(Goods),
};

export interface ServerMenuItemType extends BasicMenuItemType {
  icon: string;
}

export interface MenuItemType extends BasicMenuItemType {
  icon: typeof House;
}

export interface BasicMenuItemType {
  path: string;
  name: string;
  label: string;
  url: string;
  children?: Array<MenuItemType>;
  component?: Component;
}
function initialState() {
  return {
    isCollapse: false,
    tags: [
      {
        name: "home",
        label: "首页",
        path: "/home",
        icon: MenuIconsMap["Home"],
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
    console.log("val: ", val);

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

  function updateMenuList(list: Array<ServerMenuItemType>) {
    state.value.menuList = list.map((item) => ({
      ...item,
      icon: MenuIconsMap[item.icon],
    }));
  }

  function addMenu(router: Router) {
    // if (type === "refresh") {
    //   if (JSON.parse(localStorage.getItem("store"))) {
    //     state.value = JSON.parse(localStorage.getItem("store"));
    //     state.value.routerList = [];
    //   } else {
    //     return;
    //   }
    // }
    const menus = state.value.menuList;
    const module = import.meta.glob("../views/**/*.vue");
    const routeArr: Array<MenuItemType> = [];
    menus.forEach((item) => {
      if (item.children) {
        item.children.forEach((val: MenuItemType) => {
          const url = `../views/${val.url}.vue`;
          val.component = module[url];
          routeArr.push(val);
        });
      } else {
        const url = `../views/${item.url}.vue`;
        item.component = module[url];
        routeArr.push(item);
      }
    });
    // state.value.routerList = [];
    const routers = router.getRoutes();
    console.log("routers: ", routers);

    // routers.forEach((item) => {
    //   if (
    //     item.name === "main" ||
    //     item.name === "login" ||
    //     item.name === "404"
    //   ) {
    //   } else {
    //     router.removeRoute(item.name);
    //   }
    // });
    routeArr.forEach((item) => {
      const routeItem = item as RouteRecordRaw;
      router.addRoute("main", routeItem);
      // state.value.routerList.push();
    });

    console.log("getRoutes: ", router.getRoutes());
  }

  return {
    state,
    switchCollapse,
    selectMenu,
    updateTags,
    updateMenuList,
    addMenu,
  };
});
