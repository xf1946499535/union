<template>
  <div class="accountapply">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="待审批" name="first">
        <applylist></applylist>
      </el-tab-pane>
      <el-tab-pane label="审批历史" name="second">
        <rapplyhistory></rapplyhistory>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts' setup>
import applylist from "./components/applylist.vue";
import rapplyhistory from "./components/rapplyhistory.vue";

import { ref, defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'

const activeName = ref('first')

const handleClick = (tab, event) => {

}
</script>
<style lang='less'>
.accountapply {
  width: 100%;

  .table {
    width: 100%;
    // transition-delay: 0.5s;
  }


}
</style>