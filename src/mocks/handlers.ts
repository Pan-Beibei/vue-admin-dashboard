import hoemApi from "./data/home";
import userApi from "./data/user";
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
  http.get(RegExp(`/api/user/getUserData` + ".*"), (req) => {
    console.log(req);

    return HttpResponse.json(userApi.getUserList(req.request));
  }),
  http.get(RegExp(`/api/user/deleteUser` + ".*"), (req) => {
    console.log(req);

    return HttpResponse.json(userApi.deleteUser(req.request));
  }),
];
