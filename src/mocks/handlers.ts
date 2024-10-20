import hoemApi from "./data/home";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(/\/home\/getTableData/, () => {
    return HttpResponse.json(hoemApi.getTableData());
  }),
  http.get(/\/home\/getCountData/, () => {
    return HttpResponse.json(hoemApi.getCountData());
  }),
  http.get(/\/home\/getChartData/, () => {
    return HttpResponse.json(hoemApi.getChartData());
  }),
];
