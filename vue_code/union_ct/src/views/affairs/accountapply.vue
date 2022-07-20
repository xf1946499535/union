<template>
  <div class="accountapply">
    <div class="table">
      <div style="margin-bottom: 20px">
        <el-button @click="submitlist(true)">批量同意</el-button>
        <el-button @click="submitlist(false)">批量拒绝</el-button>
      </div>
      <el-table :data="applylist" style="width: 100%" table-layout="auto" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column fixed prop="applyUsername" label="申请人" />
        <el-table-column prop="account" label="账号" />
        <el-table-column prop="applyDate" label="申请时间" />
        <el-table-column prop="isdeal" label="审批状态" :formatter="formatdeal"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="submitapply(scope.row, true)">同意</el-button>
            <el-button link type="primary" size="small" @click="submitapply(scope.row, false)">拒绝</el-button>
          </template>
        </el-table-column>
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
import { reapplist, dealrlist } from '@/apis/account'
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
        reapplist(tabledata.reqnum, tabledata.pagenum).then(res => {
          tabledata.applylist = res.data.list
          tabledata.totalnum = res.data.totalnum
        })
      },
      //翻页
      nextpage(val) {
        tabledata.pagenum = val
        reapplist(tabledata.reqnum, tabledata.pagenum).then(res => {
          tabledata.applylist = res.data.list
          tabledata.totalnum = res.data.totalnum
        })
      },
      //多选框数据获取
      handleSelectionChange(val) {
        tabledata.multipleSelection = val
        // console.log(tabledata.multipleSelection);
      },
      //处理表格数据
      formatdeal(row, column, cellValue) {
        return cellValue == 0 ? '未处理' : '处理'
      },
      //批量提交审批信息
      submitlist(isallow) {
        // console.log(tabledata.multipleSelection);
        dealrlist(tabledata.multipleSelection, isallow, me.value.userid).then(res => {
          ElMessage({
            message: res.message,
            type: 'success',
          })
        })
      },
      //提交单个审批信息
      submitapply(row, isallow) {
        dealrlist([row], isallow, me.value.userid).then(res => {
          ElMessage({
            message: res.message,
            type: 'success',
          })
        })
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
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>