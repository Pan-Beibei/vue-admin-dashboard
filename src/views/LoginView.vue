<script lang="ts" setup>
import { reactive, inject } from "vue";
import { apiInjectionKey } from "@/config/key";
import type { ApiDefinition } from "@/api/type";
import { useAllDataStore } from "@/stores";
import { useRouter } from "vue-router";

const api = inject<ApiDefinition>(apiInjectionKey);
if (!api) {
  throw new Error("api is not provided");
}

const loginForm = reactive({
  username: "",
  password: "",
});

const store = useAllDataStore();
const router = useRouter();

async function handleLogin() {
  const res = await api?.getMenu(loginForm);
  console.log(res);
  if (res?.menuList) store.updateMenuList(res?.menuList);
  if (res?.token) store.state.token = res?.token;

  store.addMenu(router, "");
  await router.push("/home");
}
</script>

<template>
  <div class="body-login">
    <el-form :model="loginForm" class="login-container">
      <h1>欢迎登录</h1>
      <el-form-item>
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="loginForm.username"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.body-login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/background.png");
  background-size: 100%;
  overflow: hidden;
}
.login-container {
  width: 400px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 250px auto;
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #505450;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>
