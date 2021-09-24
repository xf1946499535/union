<template>
  <div class="wolist">
    <el-cascader
      :options="conditions"
      v-model="screen"
      @change="change"
      :show-all-levels="false"
    ></el-cascader>

    <el-table
      :data="woList"
      height="800"
      border
      style="width: 100%"
      v-loading="woList_loading"
    >
      <el-table-column prop="title" label="工单名" width="180">
      </el-table-column>
      <el-table-column prop="id" label="工单号" width="180"> </el-table-column>
      <el-table-column prop="status" label="进度" width="180">
      </el-table-column>
      <el-table-column prop="creator_id" label="处理人"> </el-table-column>
      <el-table-column prop="project_id" label="所属项目"> </el-table-column>
      <el-table-column prop="creator_id" label="处理人"> </el-table-column>
      <el-table-column prop="project_id" label="所属项目"> </el-table-column>
      <el-table-column prop="creator_id" label="处理人"> </el-table-column>
      <el-table-column prop="project_id" label="所属项目"> </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { woList } from "@/api/wo";
export default {
  created() {
    this.getWoList();
  },
  props: ["offDrawer"],
  data() {
    return {
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
                handlor: JSON.parse(sessionStorage.getItem("me")).id,
                status: 0
              },
              label: "待处理"
            },
            {
              value: {
                handlor: JSON.parse(sessionStorage.getItem("me")).id,
                status: 1
              },
              label: "正在处理"
            },
            {
              value: {
                handlor: JSON.parse(sessionStorage.getItem("me")).id,
                status: 2
              },
              label: "待验证"
            },
            {
              value: {
                handlor: JSON.parse(sessionStorage.getItem("me")).id,
                status: 3
              },
              label: "正在验证"
            },
            {
              value: {
                handlor: JSON.parse(sessionStorage.getItem("me")).id,
                status: 4
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
              value: {
                status: 0
              },
              label: "无条件"
            },
            {
              value: {
                status: 0
              },
              label: "待处理"
            },
            {
              value: {
                status: 1
              },
              label: "正在处理"
            },
            {
              value: {
                status: 2
              },
              label: "待验证"
            },
            {
              value: {
                status: 3
              },
              label: "正在验证"
            },
            {
              value: {
                status: 4
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
    change(op) {
      console.log(op);
    },
    //进入选取的工单
    handleEdit(row) {
      this.offDrawer();
      this.$emit("getdetail", row);
    },
    //获取工单列表
    getWoList(woQuey = {}) {
      this.woList_loading = true;
      woList(woQuey)
        .then(res => {
          setTimeout(() => {
            this.woList_loading = false;
            this.woList = res.data;
            console.log(res.data);
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