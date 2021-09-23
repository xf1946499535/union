<template>
  <div class="wolist">
    <el-cascader :options="conditions" v-model="screen" @change="change" :show-all-levels="false"></el-cascader>

    <el-table :data="woList" height="800" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作">
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
  methods: {
    change(op){
      console.log(op);
    },
    //进入选取的工单
    handleEdit(row) {
      this.offDrawer();
      this.$emit("getdetail", row);
    },
    //获取工单列表
    getWoList(woQuey = {}) {
      woList(woQuey)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  data() {
    return {
      //工单列表
      woList: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ],
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
            }
          ]
        }
      ],
      //筛选器选中的选项
      screen: {}
    };
  }
};
</script>
<style lang="scss">
.wolist {
  font-size: 1.5rem;
}
</style>