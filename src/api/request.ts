import axios from "axios";
import { ElMessage } from "element-plus";
import config from "@/config";

// 增加import config
// import config from "@/config";
const server = axios.create({
  baseURL: config.baseApi,
});
const NETWORK_ERROR_MESSAGE = "网络错误...";

// 添加请求拦截器
server.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
server.interceptors.response.use((res) => {
  //这边直接解构，所以返回类型不再是 Promise<AxiosResponse<any, any>>
  //而是 Promise<any>
  const { code, data, msg } = res.data;
  if (code === 200) {
    return data;
  } else {
    ElMessage.error(msg || NETWORK_ERROR_MESSAGE);
    return Promise.reject(msg || NETWORK_ERROR_MESSAGE);
  }
});

interface Options {
  method?: "get" | "post" | "put" | "delete";
  url: string;
  data?: object;
  params?: object;
  mock?: boolean;
}

function request<T>(options: Options): Promise<T> {
  options.method = options.method || "get";

  // 增加一个关于get请求参数的调整
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }
  // 对单独的mock的开关做一个处理
  let isMock = config.mock;
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }

  // 对环境做一个处理
  console.log(config.env);
  if (config.env === "prod") {
    // 线上不能mock
    server.defaults.baseURL = config.baseApi;
  } else {
    server.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }

  return server(options) as Promise<T>;
}

export default request;
