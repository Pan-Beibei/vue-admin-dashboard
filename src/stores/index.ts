import { defineStore } from "pinia";
import { ref } from "vue";

function initialState() {
  return {
    isCollapse: false,
  };
}

export const useAllDataStore = defineStore("allData", () => {
  const state = ref(initialState());

  function switchCollapse() {
    state.value.isCollapse = !state.value.isCollapse;
  }

  return {
    state,
    switchCollapse,
  };
});
