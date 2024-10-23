<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAllDataStore, type MenuItem } from "@/stores";

const store = useAllDataStore();
const tags = computed(() => store.state.tags);
const route = useRoute();
const router = useRouter();

const handleMenu = (tag: MenuItem) => {
  router.push(tag.name);
  store.selectMenu(tag);
};

const handleClose = (tag: MenuItem, index: number) => {
  store.updateTags(tag);
  if (tag.name !== route.name) return;

  console.log(tags.value);

  if (index === store.state.tags.length) {
    store.selectMenu(tags.value[index - 1]);
    router.push(tags.value[index - 1].name);
  } else {
    store.selectMenu(tags.value[index]);
    router.push(tags.value[index].name);
  }
};
</script>

<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
      @click="handleMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}</el-tag
    >
  </div>
</template>

<style lang="scss" scoped>
.tags {
  margin: 20px 0 0 20px;
}
.el-tag {
  margin-right: 10px;
}
</style>
