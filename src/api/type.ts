import type { MenuItemType } from "@/stores";

export interface ApiDefinition {
  getTableData: () => Promise<TableDataResponse>;
  getCountData: () => Promise<CountDataResponse>;
  getChartData: () => Promise<ChartDataResponse>;
  getUserData: (params: QueryUserParams) => Promise<UserListResponse>;
  deleteUser: (params: DeleteUserParams) => Promise<DeleteResult>;
  addUser: (params: AddUserParams) => Promise<AddResult>;
  editUser: (params: UpdateUserParams) => Promise<UpdateResult>;
  getMenu: (params: GetMenuParams) => Promise<GetMenuResult>;
}

export interface TableData {
  name: string;
  todayBuy: number;
  monthBuy: number;
  totalBuy: number;
}

export interface TableDataResponse {
  tableData: Array<TableData>;
}

export interface CountData {
  name: string;
  value: number;
  icon: string;
  color: string;
}

export type CountDataResponse = Array<CountData>;

// 定义 OrderData 类型
export interface OrderData {
  date: string[];
  data: Array<{
    苹果: number;
    小米: number;
    华为: number;
    oppo: number;
    vivo: number;
    一加: number;
  }>;
}

// 定义 VideoData 类型
export interface VideoData {
  name: string;
  value: number;
}

// 定义 UserData 类型
export interface UserData {
  date: string;
  new: number;
  active: number;
}

// 定义 ChartData 类型
export interface ChartData {
  orderData: OrderData;
  videoData: VideoData[];
  userData: UserData[];
}

// 定义 API 返回类型
export type ChartDataResponse = ChartData;

export interface User {
  id: string;
  name: string;
  addr: string;
  age: number;
  birth: string;
  sex: number;
  sexLabel?: string;
}

// export type UserListResponse = User[];

export interface UserListResponse {
  count: number;
  list: User[];
}

export interface QueryUserParams {
  name: string;
  page: number;
  total: number;
}

export interface DeleteUserParams {
  id: string;
}

export interface DeleteResult {
  isSuccess: boolean;
  message?: string;
}

interface OperationUserParams {
  name: string;
  addr: string;
  age: number;
  birth: string;
  sex: string;
}

interface OperationUserResult {
  isSuccess: boolean;
  data: {
    message: string;
  };
}

export type AddUserParams = OperationUserParams;

export type AddResult = OperationUserResult;

export type UpdateUserParams = OperationUserParams;

export type UpdateResult = OperationUserResult;

export interface GetMenuParams {
  username: string;
  password: string;
}

export interface GetMenuResult {
  menuList: MenuItemType[];
  token: string;
  message: string;
}
