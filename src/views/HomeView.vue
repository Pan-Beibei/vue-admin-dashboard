<script setup lang="ts">
import { getImageUrl } from "@/utils";
import { ref, onMounted, inject, reactive, useTemplateRef } from "vue";
import type {
  ApiDefinition,
  TableDataResponse,
  TableData,
  CountDataResponse,
  ChartDataResponse,
} from "@/api/type";
import { apiInjectionKey } from "@/config/key";
import {
  SuccessFilled,
  StarFilled,
  GoodsFilled,
} from "@element-plus/icons-vue";
import * as echarts from "echarts";

//这个tableData是假数据，等会我们使用axios请求mock数据
const tableData = ref<Array<TableData>>();
const countData = ref<CountDataResponse>();
const chartData = ref<ChartDataResponse>();
const echartRef = useTemplateRef<HTMLDivElement>("echart");
const userEchart = useTemplateRef<HTMLDivElement>("userEchart");
const videoEchart = useTemplateRef<HTMLDivElement>("videoEchart");

const observer = ref<ResizeObserver | null>(null); //observer 接收观察器实例对象

const tableLabel = ref({
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
});

const iconsMap = {
  SuccessFilled,
  StarFilled,
  GoodsFilled,
};

//这个是折线图和柱状图 两个图表共用的公共配置
const xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  legend: {},
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});
// 饼状图的配置
const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});

const api = inject<ApiDefinition>(apiInjectionKey);
if (!api) {
  throw new Error("api is not provided");
}

const getTableData = async () => {
  const response: TableDataResponse = await api.getTableData();
  tableData.value = response.tableData;
};

const getCountData = async () => {
  const response: CountDataResponse = await api.getCountData();
  countData.value = response;
};

const getChartData = async () => {
  const response: ChartDataResponse = await api.getChartData();
  const { orderData, videoData, userData } = response;
  // console.log(response);

  //对第一个图表的xAxis和series赋值
  xOptions.xAxis.data = orderData.date as never[];
  xOptions.series = Object.keys(orderData.data[0]).map((val) => ({
    name: val,
    data: orderData.data.map((item) => item[val as keyof typeof item]),
    type: "line",
  })) as never[];

  const OneEcharts = echarts.init(echartRef.value);
  //setOption方法应用配置对象
  OneEcharts.setOption(xOptions);
  chartData.value = response;

  //对第二个图表的xAxis和series赋值
  xOptions.xAxis.data = userData.map((item) => item.date) as never[];
  xOptions.series = [
    {
      name: "新增用户",
      data: userData.map((item) => item.new),
      type: "bar",
    },
    {
      name: "活跃用户",
      data: userData.map((item) => item.active),
      type: "bar",
    },
  ] as never[];
  //two
  const TwoEcharts = echarts.init(userEchart.value);
  TwoEcharts.setOption(xOptions);

  //对第三个图表的series赋值
  pieOptions.series = [
    {
      data: videoData,
      type: "pie",
    },
  ] as never[];
  //three
  const ThreeEcharts = echarts.init(videoEchart.value);
  ThreeEcharts.setOption(pieOptions);

  //ResizeObserver 如果监视的容器大小变化，如果改变会执行传递的回调
  observer.value = new ResizeObserver(() => {
    OneEcharts.resize();
    TwoEcharts.resize();
    ThreeEcharts.resize();
  });
  //如果这个容器存在
  if (echartRef.value) {
    //则调用监视器的observe方法，监视这个容器的大小
    observer.value.observe(echartRef.value as Element);
  }
};

onMounted(() => {
  getTableData();
  getCountData();
  getChartData();
});
</script>

<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImageUrl('user')" class="user" />
          <div class="user-info">
            <p class="user-info-admin">Admin</p>
            <p class="user-info-p">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2024-10-10</span></p>
          <p>上次登录地点:<span>北京</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" class="user-table">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :label="val"
            :prop="key"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16">
      <!--      // 右上：订单数据-->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <component
            :is="iconsMap[item.icon as keyof typeof iconsMap]"
            class="icons"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <!--      //右下：三个图表的容器-->
      <el-card class="top-echart">
        <div ref="echart" style="height: 260px"></div>
      </el-card>
      <div class="graph">
        <el-card>
          <div ref="userEchart" style="height: 240px"></div>
        </el-card>
        <el-card>
          <div ref="videoEchart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;

  .el-col {
    margin-top: 0px;

    .user-table {
      margin-top: 10px;
    }

    .user {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
      }
      .user-info {
        p {
          line-height: 40px;
        }
        .user-info-p {
          color: #999;
        }
        .user-info-admin {
          font-size: 35px;
        }
      }
    }
    .login-info {
      p {
        line-height: 30px;
        font-size: 14px;
        color: #999;
        span {
          color: #666;
          margin-left: 60px;
        }
      }
    }

    .num {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .el-card {
        width: 32%;
        margin-bottom: 15px;
      }
      .icons {
        width: 60px;
        height: 60px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
      }
      .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .num {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .txt {
          font-size: 14px;
          text-align: center;
          color: #999;
        }
      }
    }
    .top-echart {
      height: 250px;
    }
    .graph {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      .el-card {
        width: 48%;
        height: 260px;
      }
    }
  }
}
</style>
