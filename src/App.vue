<script setup lang="ts">
import { provide } from "vue";
import api from "@/api/api";
import type { ApiDefinition } from "@/api/type";
import { apiInjectionKey } from "@/config/key";

provide<ApiDefinition>(apiInjectionKey, api);
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
