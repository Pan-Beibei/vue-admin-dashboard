export interface ApiDefinition {
  getTableData: () => Promise<TableDataResponse>;
  getCountData: () => Promise<CountDataResponse>;
  getChartData: () => Promise<ChartDataResponse>;
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
