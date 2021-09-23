<template>
  <el-container>
    <el-header>
      <div class="w">
        <el-switch
        v-model="drawer"
        @click="drawer = true"
        active-text="打开筛选器"
      >
      </el-switch
    >
      </div>
     </el-header>
    <el-main><woInfo :woDetail="woInfo_query"/></el-main>
    <el-drawer size="50rem" title="我是标题" :visible.sync="drawer" :with-header="false">
      <span><woList @getdetail="getWodetail" :offDrawer="offDrawer"></woList></span>
    </el-drawer>
  </el-container>
</template>

<script>
import woInfo from "@/components/wo_ct/woInfo.vue";
import woList from "@/components/wo_ct/woList.vue";
export default {
  components: {
    woInfo,
    woList
  },
  data() {
    return {
      drawer: false,
      //表单信息
      woInfo_query: {}
    };
  },
methods:{
  //从woList组件拿到工单信息，发送给woInfo组件
  getWodetail(detail){
    console.log(detail);
    this.woInfo_query=detail
  },
  //关闭抽屉
  offDrawer(){
    this.drawer=false;
  }
}
};
</script>

<style lang="scss">
.w{
  width: 100rem;
  margin: 2rem auto;
}
</style>