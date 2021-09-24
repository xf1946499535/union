<template>
  <div class="woQuery">
    <el-container>
      <el-header>
        <div class="w">
          <el-switch
            v-model="drawer"
            @click="drawer = true"
            active-text="打开筛选器"
          >
          </el-switch>
        </div>
      </el-header>
      <el-main><woInfo :woDetail="woInfo_query" /></el-main>
      <el-drawer
        size="50rem"
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false"
      >
        <span
          ><woList @getdetail="getWodetail" :offDrawer="offDrawer"></woList
        ></span>
      </el-drawer>
    </el-container>
  </div>
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
      woInfo_query: {
        title: "",
        project: {
          project_id: null,
          project_name: "项目1"
        },
        handler: {},
        handlers: [],
        create_time: "",
        estimate_time: "",
        over_time: "",
        status: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        content: ""
      }
    };
  },
  methods: {
    //从woList组件拿到工单信息，发送给woInfo组件
    getWodetail(wodetail) {
      console.log(wodetail);
      this.woInfo_query.title = wodetail.title;
      this.woInfo_query.project.project_id = wodetail.project_id;
      this.woInfo_query.status = wodetail.status;
      this.woInfo_query.content = wodetail.detail;
    },
    //关闭抽屉
    offDrawer() {
      this.drawer = false;
    }
  }
};
</script>

<style lang="scss">
.woQuery {
  .w {
    width: 80rem;
    margin: 2rem auto;
  }
}
</style>