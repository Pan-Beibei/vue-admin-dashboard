<script setup lang="ts">
import { ref, reactive, inject, onMounted } from "vue";
import { apiInjectionKey } from "@/config/key";
import type { ApiDefinition } from "@/api/type";
import type { User, QueryUserParams } from "@/api/type";

const userData = ref<Array<User>>();
const formInline = reactive({
  keyWord: "",
});
const config = reactive<QueryUserParams>({
  name: "",
  total: 0,
  page: 1,
});

const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sexLabel",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 400,
  },
]);

const api = inject<ApiDefinition>(apiInjectionKey);
if (!api) {
  throw new Error("api is not provided");
}

const getUserData = async () => {
  const res = await api.getUserData(config);
  // console.log(res);
  userData.value = res.list.map((item) => ({
    ...item,
    sexLabel: item.sex === 1 ? "男" : "女",
  }));
  config.total = res.count;

  console.log(userData.value);
};

onMounted(() => {
  getUserData();
});

function handleSearch() {
  config.name = formInline.keyWord;
  getUserData();
}

function handleChange(page: number) {
  config.page = page;
  getUserData();
}
</script>

<template>
  <div class="user-header">
    <el-button type="primary">新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input
          placeholder="请输入用户名"
          v-model="formInline.keyWord"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="table">
    <el-table :data="userData" style="width: 100%">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :width="item.width ? item.width : 125"
        :prop="item.prop"
        :label="item.label"
      />

      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      background
      layout="prev, pager, next"
      size="small"
      :total="config.total"
      @current-change="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 10px;
    bottom: -20px;
  }
  .el-table {
    width: 100%;
    height: 500px;
  }
}
.select-clearn {
  display: flex;
}
</style>
