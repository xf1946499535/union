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
        id: "",
        project: {
          id: null,
          title: "项目1"
        },
        handler: {
          handler_id: 0,
          handler_name: ""
        },
        handlers: [], //处理人数组
        handlers_ids: [], //处理人id数组，可能会有新增
        create_time: "",
        estimate_time: "",
        creator_id:"",
        over_time: "",
        status: 0,
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
      // console.log(wodetail);
      wodetail.handlers.forEach((item, index) => {
        this.woInfo_query.handlers_ids[index] =
          wodetail.handlers[index].handler_id;
      });
      this.woInfo_query.id = wodetail.id;
      this.woInfo_query.title = wodetail.title;
      this.woInfo_query.project = JSON.parse(
        JSON.stringify(wodetail.project_info)
      );
      this.woInfo_query.creator_id=wodetail.creator_id
      this.woInfo_query.create_time = wodetail.create_time;
      this.woInfo_query.status = wodetail.status;
      this.woInfo_query.handler = JSON.parse(JSON.stringify(wodetail.handler));
      this.woInfo_query.handlers = wodetail.handlers;
      this.woInfo_query.content = wodetail.detail;
      // console.log(this.woInfo_query);
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