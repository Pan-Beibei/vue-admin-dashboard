/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";

export default {
  getMenu: (config: any) => {
    const { username, password } = JSON.parse(config.body);
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    //menuList用于后面做权限分配，也就是用户可以展示的菜单
    // console.log(username,password)
    if (username === "admin" && password === "admin") {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "Home",
              url: "HomeView",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "Mall",
              url: "MallView",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "User",
              url: "UserView",
            },
            {
              path: "other",
              label: "其他",
              name: "other",
              icon: "Location",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "页面1",
                  icon: "Setting",
                  url: "Page1View",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "页面2",
                  icon: "Setting",
                  url: "Page2View",
                },
              ],
            },
          ],
          token: faker.string.uuid(),
          message: "获取成功",
        },
      };
    } else if (username === "xiaoxiao" && password === "xiaoxiao") {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "Home",
              url: "HomeView",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "User",
              url: "UserView",
            },
          ],
          token: faker.string.uuid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      };
    }
  },
};
