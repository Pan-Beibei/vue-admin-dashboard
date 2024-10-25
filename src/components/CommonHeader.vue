<script lang="ts" setup>
import { useAllDataStore } from "@/stores";
import { Menu } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
const getImageUrl = (user: string) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};

const store = useAllDataStore();
const router = useRouter();

function handleCollapse() {
  store.switchCollapse();
}
function handleLoginOut() {
  store.clean(router);
  router.push("/login");
}

const current = computed(() => store.state.currentMenu);
</script>

<template>
  <div class="header">
    <div class="header-left">
      <el-button size="small" @click="handleCollapse">
        <component class="icons" :is="Menu"></component>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="current.path">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" class="user"
        /></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.icons {
  width: 20px;
  height: 20px;
}
.header-left {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.header-right {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
:deep(.bread span) {
  color: #ffffff !important;
  cursor: pointer !important;
}
</style>
