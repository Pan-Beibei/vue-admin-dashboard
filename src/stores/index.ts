// import { House } from "@element-plus/icons-vue";
import { defineStore } from "pinia";
import { markRaw, ref, watch, type Component } from "vue";
import { type Router, type RouteRecord, type RouteRecordRaw } from "vue-router";
import { House, Setting, Location, User, Goods } from "@element-plus/icons-vue";

export const MenuIconsMap: { [key: string]: typeof House } = {
  Home: markRaw(House),
  Setting: markRaw(Setting),
  Location: markRaw(Location),
  User: markRaw(User),
  Mall: markRaw(Goods),
};

export interface MenuItemType {
  path: string;
  name: string;
  label: string;
  url: string;
  icon: string;
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
        icon: "Home",
        url: "Home",
      },
    ],
    currentMenu: null as MenuItemType | null,
    menuList: [] as Array<MenuItemType>,
    routerList: [] as Array<RouteRecord>,
    token: "",
  };
}

export const useAllDataStore = defineStore("allData", () => {
  const state = ref(initialState());

  watch(
    state,
    (newObj) => {
      if (!newObj.token) return;
      localStorage.setItem("store", JSON.stringify(newObj));
    },
    { deep: true }
  );

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

  function addMenu(router: Router, type: string) {
    if (type === "refresh") {
      const local = localStorage.getItem("store");

      if (local) {
        state.value = JSON.parse(local);
        state.value.routerList = [];
      } else {
        return;
      }
    }
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
    state.value.routerList = [];
    const routers = router.getRoutes();

    routers.forEach((item) => {
      if (
        item.name === "main" ||
        item.name === "login" ||
        item.name === "404"
      ) {
      } else {
        if (item.name) router.removeRoute(item.name);
      }
    });
    routeArr.forEach((item) => {
      const routeItem = item as RouteRecordRaw;
      router.addRoute("main", routeItem);
    });
    state.value.routerList.push(...router.getRoutes());
  }

  function clean(router: Router) {
    console.log("clean ", router);

    state.value.routerList.forEach((item) => {
      if (item.name && item.name !== "login") router.removeRoute(item.name);
    });
    state.value = initialState();
    // 删除本地缓存
    localStorage.removeItem("store");
  }

  return {
    state,
    switchCollapse,
    selectMenu,
    updateTags,
    updateMenuList,
    addMenu,
    clean,
  };
});
