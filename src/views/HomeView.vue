<script setup lang="ts">
import { getImageUrl } from "@/utils";
import { ref, onMounted, inject } from "vue";
import type {
  ApiDefinition,
  TableDataResponse,
  TableData,
  CountDataResponse,
  CountData,
} from "@/api/type";
import { apiInjectionKey } from "@/config/key";

//这个tableData是假数据，等会我们使用axios请求mock数据
const tableData = ref<Array<TableData>>();
const countData = ref<Array<CountData>>();

const tableLabel = ref({
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
});

const api = inject<ApiDefinition>(apiInjectionKey);
if (!api) {
  throw new Error("api is not provided");
}

const getTableData = async () => {
  const response: TableDataResponse = await api.getTableData();

  console.log(response);
  tableData.value = response.tableData;
};

const getCountData = async () => {
  const response: CountDataResponse = await api.getCountData();

  console.log(response);
  countData.value = response;
};

onMounted(() => {
  getTableData();
  getCountData();
});
</script>

<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImageUrl('user')" class="user" />
          <div class="user-info">
            <p class="user-info-admin">Admin</p>
            <p class="user-info-p">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2024-10-10</span></p>
          <p>上次登录地点:<span>北京</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" class="user-table">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :label="val"
            :prop="key"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;
  .el-col {
    margin-top: 20px;

    .user {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
      }
      .user-info {
        p {
          line-height: 40px;
        }
        .user-info-p {
          color: #999;
        }
        .user-info-admin {
          font-size: 35px;
        }
      }
    }
    .login-info {
      p {
        line-height: 30px;
        font-size: 14px;
        color: #999;
        span {
          color: #666;
          margin-left: 60px;
        }
      }
    }
  }

  .user-table {
    margin-top: 20px;
  }
}
</style>
