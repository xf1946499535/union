<template>
  <div class="wopreview">
    <div class="w">
      <div id="previewbox" :style="{height:'100rem',width:'100%'}"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

export default {
  created() {},
  mounted() {
    echarts.use([
      TooltipComponent,
      GridComponent,
      LegendComponent,
      BarChart,
      CanvasRenderer
    ]);
    var chartDom = document.getElementById("previewbox");
    chartDom.style.width="100%"
    chartDom.style.height="30rem"
    var myChart = echarts.init(chartDom);
    this.option && myChart.setOption(this.option);
    
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        series: [
          {
            name: "待处理",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: "正在处理",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "待验证",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "正在验证",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: "其他",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss">
.wopreview{
  min-height: 50rem;
  #previewbox{
    width: 1000px;
    height: 30rem;
  }
}
</style>