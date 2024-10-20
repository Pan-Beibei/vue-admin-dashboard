import request from "./request";
import type {
  ApiDefinition,
  TableDataResponse,
  CountDataResponse,
  ChartDataResponse,
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
};

export default api;
