import request from "./request";
import type {
  ApiDefinition,
  TableDataResponse,
  CountDataResponse,
  ChartDataResponse,
  UserListResponse,
  QueryUserParams,
  DeleteUserParams,
  OperationResult,
  AddUserParams,
  AddResult,
} from "./type";

const api: ApiDefinition = {
  getTableData() {
    return request<TableDataResponse>({
      url: "/home/getTableData",
      method: "get",
      // mock: false   // 可以局部控制开关
    });
  },

  getCountData() {
    return request<CountDataResponse>({
      url: "/home/getCountData",
      method: "get",
      // mock: false   // 可以局部控制开关
    });
  },
  getChartData() {
    return request<ChartDataResponse>({
      url: "/home/getChartData",
      method: "get",
      // mock: false   // 可以局部控制开关
    });
  },
  getUserData(params: QueryUserParams) {
    return request<UserListResponse>({
      url: "/user/getUserData/",
      method: "get",
      data: params,
      // mock: false   // 可以局部控制开关
    });
  },
  deleteUser(params: DeleteUserParams) {
    return request<OperationResult>({
      url: "/user/deleteUser/",
      method: "get",
      data: params,
      // mock: false   // 可以局部控制开关
    });
  },
  addUser(params: AddUserParams) {
    console.log(params);

    return request<AddResult>({
      url: "/user/addUser/",
      method: "post",
      data: params,
      // mock: false   // 可以局部控制开关
    });
  },
};

export default api;
