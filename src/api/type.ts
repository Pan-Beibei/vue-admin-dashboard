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

export interface ApiDefinition {
  getTableData: () => Promise<TableDataResponse>;
  getCountData: () => Promise<CountDataResponse>;
}
