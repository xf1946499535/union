<template>
  <div class="rapplyhistory">
    <div class="table">
      <el-table :data="applylist" style="width: 100%" table-layout="auto">
        <el-table-column fixed prop="applyUsername" label="申请人" />
        <el-table-column prop="account" label="申请账号" />
        <el-table-column prop="applyDate" label="申请时间" />
        <el-table-column prop="dealUsername" label="审批人" />
        <el-table-column prop="dealDate" label="审批时间" />
        <el-table-column prop="dealRes" :formatter="formatdeal" label="审批结果" />
      </el-table>
    </div>
    <div class="applypageination">
      <el-pagination small background layout="prev, pager, next" :current-page="pagenum" :page-size="reqnum"
        :total="totalnum" :hide-on-single-page="false" class="mt-4" @update:current-page.sync="nextpage" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { reapplistHistory } from '@/apis/account'
import { userStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: '',
  setup() {
    const userstore = userStore()
    const me = storeToRefs(userstore).me
    const tabledata = reactive({
      applylist: [],
      reqnum: 10,
      pagenum: 1,
      totalnum: 0,
      multipleSelection: [],
      //获取申请列表
      getapplylist() {
        reapplistHistory(tabledata.reqnum, tabledata.pagenum).then(res => {
          tabledata.applylist = res.data.list
          tabledata.totalnum = res.data.totalnum
        })
      },
      //翻页
      nextpage(val) {
        tabledata.pagenum = val
        reapplistHistory(tabledata.reqnum, tabledata.pagenum).then(res => {
          tabledata.applylist = res.data.list
          tabledata.totalnum = res.data.totalnum
        })
      },
      //处理表格数据
      formatdeal(row, column, cellValue) {
        return cellValue == 0 ? '拒绝' : '同意'
      },
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
.rapplyhistory {
  width: 100%;

  .table {
    width: 100%;
    // transition-delay: 0.5s;
  }

  .applypageination {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }


}
</style>