<template>
  <div class="accountapply">
    <div class="table">
      <el-table :data="applylist" style="width: 100%" table-layout="auto">
        <el-table-column fixed prop="applyUsername" label="申请人" />
        <el-table-column prop="account" label="账号" />
        <el-table-column prop="applyDate" label="申请时间" />
        <el-table-column prop="isdeal" label="审批状态" :formatter="formatdeal"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default>
            <el-button link type="primary" size="small">同意</el-button>
            <el-button link type="primary" size="small">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="applypageination">
      <el-pagination small background layout="prev, pager, next" :current-page="pagenum" :page-size="reqnum"
        :total="totalnum" :hide-on-single-page="false" class="mt-4" @update:current-page.sync="changelist" />
    </div>
  </div>

</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { reapplist } from '@/apis/account'
export default defineComponent({
  name: '',
  setup() {
    const tabledata = reactive({
      applylist: [],
      reqnum: 10,
      pagenum: 1,
      totalnum: 0,
      //获取申请列表
      getapplylist() {
        reapplist(tabledata.reqnum, tabledata.pagenum).then(res => {
          tabledata.applylist = res.data.list
          tabledata.totalnum = res.data.totalnum
          console.log(res.data);
        })
      },
      changelist(val) {
        tabledata.pagenum = val
        reapplist(tabledata.reqnum, tabledata.pagenum).then(res => {
          tabledata.applylist = res.data.list
          tabledata.totalnum = res.data.totalnum
          console.log(res.data);
        })
      },

      formatdeal(row, column, cellValue) {
        return cellValue == 0 ? '未处理' : '处理'
      }
    })
    tabledata.getapplylist()
    onBeforeMount(() => {
      //2.组件挂载页面之前执行----onBeforeMount
    })
    onMounted(() => {
      //3.组件挂载到页面之后执行-------onMounted
    })
    return {
      ...toRefs(tabledata),
    }
  },
})

</script>
<style lang='less'>
.accountapply {
  width: 100%;

  .table {
    width: 100%;
    // transition-delay: 0.5s;
  }

  .applypageination {
    width: 100%;
  }
}
</style>