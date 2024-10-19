const env = import.meta.env.MODE || "prod";

interface EnvironmentConfig {
  baseApi: string;
  mockApi: string;
}

interface EnvConfigType {
  development: EnvironmentConfig;
  test: EnvironmentConfig;
  prod: EnvironmentConfig;
}

const EnvConfig: EnvConfigType = {
  development: {
    baseApi: "/api",
    mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
  },
  test: {
    baseApi: "//test.future.com/api",
    mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
  },
  prod: {
    baseApi: "//future.com/api",
    mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
  },
};

export default {
  env,
  ...EnvConfig[env as keyof EnvConfigType],
  //mock
  mock: false, // 远程的关了，可以在本地mock.js的方式使用本地的
};
