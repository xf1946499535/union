<template>
  <div class="wolist">
    <el-cascader
      :options="conditions"
      v-model="screen"
      @change="getWoList(screen[1])"
      :show-all-levels="false"
    ></el-cascader>
    <el-table
      :data="woList"
      stripe
      height="800"
      border
      style="width: 100%"
      v-loading="woList_loading"
    >
      <el-table-column prop="title" label="工单名" width="180">
      </el-table-column>
      <el-table-column prop="id" label="工单号"></el-table-column>
      <el-table-column prop="status_title" label="进度"> </el-table-column>
      <el-table-column prop="project_id" label="所属项目"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :hide-on-single-page="true"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
import { woList } from "@/api/wo";
export default {
  created() {},
  props: ["offDrawer"],
  computed: {},
  data() {
    return {
      status_title: [
        "未分配",
        "待处理",
        "正在处理",
        "待验证",
        "正在验证",
        "已完成"
      ],
      //工单列表
      woList: [],
      woList_loading: false,
      //快速筛选器预备选项
      conditions: [
        {
          value: "",
          label: "我的工单",
          children: [
            {
              value: {
                handler_id: JSON.parse(sessionStorage.getItem("me")).id,
                status: 1
              },
              label: "待处理"
            },
            {
              value: {
                handler_id: JSON.parse(sessionStorage.getItem("me")).id,
                status: 2
              },
              label: "正在处理"
            },
            {
              value: {
                handler_id: JSON.parse(sessionStorage.getItem("me")).id,
                status: 3
              },
              label: "待验证"
            },
            {
              value: {
                handler_id: JSON.parse(sessionStorage.getItem("me")).id,
                status: 4
              },
              label: "正在验证"
            },
            {
              value: {
                handler_id: JSON.parse(sessionStorage.getItem("me")).id,
                status: 5
              },
              label: "已完成"
            }
          ]
        },
        {
          value: "",
          label: "全部工单",
          children: [
            {
              value: {},
              label: "无条件"
            },
            {
              value: {
                status: 0
              },
              label: "未分配"
            },
            {
              value: {
                status: 1
              },
              label: "待处理"
            },
            {
              value: {
                status: 2
              },
              label: "正在处理"
            },
            {
              value: {
                status: 3
              },
              label: "待验证"
            },
            {
              value: {
                status: 4
              },
              label: "正在验证"
            },
            {
              value: {
                status: 5
              },
              label: "已完成"
            }
          ]
        }
      ],
      //筛选器选中的选项
      screen: {}
    };
  },
  methods: {
    //进入选取的工单
    handleEdit(wo_id) {
      this.offDrawer();
      console.log(wo_id);
      this.$emit("getdetail", wo_id);
    },
    //获取工单列表
    getWoList(woQuery = {}) {
      this.woList_loading = true;
      woList(woQuery)
        .then(res => {
          setTimeout(() => {
            this.woList_loading = false;
            this.woList = res.data;
            res.data.forEach((item, index) => {
              this.woList[index].status_title = this.status_title[item.status];
            });
          }, 500);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss">
.wolist {
  font-size: 1.5rem;
}
</style>