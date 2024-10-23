<script setup lang="ts">
import {
  ref,
  reactive,
  inject,
  onMounted,
  markRaw,
  useTemplateRef,
  nextTick,
} from "vue";
import { apiInjectionKey } from "@/config/key";
import type { ApiDefinition } from "@/api/type";
import type { User, QueryUserParams } from "@/api/type";
import { Delete } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { timeFormat } from "@/utils";

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

function handleDelete(row: User) {
  // 提示
  ElMessageBox.confirm("你确定要删除吗？", "确定", {
    type: "warning",
    icon: markRaw(Delete),
  }).then(async () => {
    console.log("删除");

    await api?.deleteUser({
      id: row.id,
    });
    ElMessage({
      showClose: true,
      message: "删除成功",
      type: "success",
    });
    getUserData();
  });
}

//新增和编辑共用一个窗口，所以通过设置action区分
const action = ref("add");
const dialogVisible = ref(false);
const formUser = reactive({
  name: "",
  age: 0,
  sex: "1",
  birth: "",
  addr: "",
});
//表单校验规则
const rules: FormRules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项" }],
  addr: [{ required: true, message: "地址是必填项" }],
});
const userFormRef = useTemplateRef<FormInstance>("userForm");

function handleClose() {
  dialogVisible.value = false;
  if (userFormRef.value) userFormRef.value.resetFields();
}

function handleCancel() {
  dialogVisible.value = false;
  if (userFormRef.value) userFormRef.value.resetFields();
}
function handleAdd() {
  dialogVisible.value = true;
  action.value = "add";
}

function handleEdit(row: User) {
  action.value = "edit";
  dialogVisible.value = true;

  nextTick(() => {
    Object.assign(formUser, { ...row, sex: "" + row.sex });
  });
}

function onSubmit() {
  if (!userFormRef.value) return;
  //执行userForm表单的validate进行规则校验，传入一个回调函数，回调函数会接受到一个是否校验通过的变量
  userFormRef.value.validate(async (valid) => {
    //如果校验成功
    if (valid) {
      //res用于接收添加用户或者编辑用户接口的返回值
      let res = null;
      //这里无论是新增或者是编辑，我们都要对这个日期进行一个格式化
      //如果不是1997-01-02这种格式，使用timeFormat方法进行格式化
      formUser.birth = /^\d{4}-\d{2}-\d{2}$/.test(formUser.birth)
        ? formUser.birth
        : timeFormat(formUser.birth);
      //如果当前的操作是新增，则调用新增接口
      if (action.value == "add") {
        res = await api?.addUser(formUser);
      } else if (action.value == "edit") {
        res = await api?.editUser(formUser);
      }
      //如果接口调用成功
      if (res) {
        //关闭对话框，重置表单，重新请求用户数据
        dialogVisible.value = false;
        userFormRef.value?.resetFields();
        getUserData();
      }

      //如果校验失败
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确的内容",
        type: "error",
      });
    }
  });
}
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
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
        <template #default="scope">
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

  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
    <!--需要注意的是设置了:inline="true"，
    会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
    在css进行处理-->
    <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="sex">
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
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
