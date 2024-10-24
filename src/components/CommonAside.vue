<script lang="ts" setup>
import { computed } from "vue";

import { useAllDataStore, type MenuItemType, MenuIconsMap } from "@/stores";
import { useRoute, useRouter } from "vue-router";

const list = computed(() => store.state.menuList);

const noChildren = computed(() => list.value.filter((item) => !item.children));
const hasChildren = computed(() => list.value.filter((item) => item.children));

const store = useAllDataStore();

const isCollapse = computed(() => store.state.isCollapse);
//width
const width = computed(() => (store.state.isCollapse ? "64px" : "180px"));

const router = useRouter();
const route = useRoute();
const activeMenu = computed(() => route.path);
const handleMenu = (item: MenuItemType) => {
  router.push(item.path);
  store.selectMenu(item);
};
</script>

<template>
  <el-aside :width="width">
    <el-menu
      text-color="#fff"
      background-color="#545c64"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="activeMenu"
    >
      <h3 v-show="!isCollapse">通用管理系统后台</h3>
      <h3 v-show="isCollapse">后台</h3>
      <el-menu-item
        v-for="item in noChildren"
        :key="item.path"
        :index="item.path"
        @click="handleMenu(item)"
      >
        <component class="icons" :is="MenuIconsMap[item.icon]"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        v-for="item in hasChildren"
        :index="item.path"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="MenuIconsMap[item.icon]"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="subItem in item.children"
            :index="subItem.path"
            :key="subItem.path"
            @click="handleMenu(subItem)"
          >
            <component
              class="icons"
              :is="MenuIconsMap[subItem.icon]"
            ></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
.el-aside {
  height: 100%;
  background-color: #545c64;
}
</style>
