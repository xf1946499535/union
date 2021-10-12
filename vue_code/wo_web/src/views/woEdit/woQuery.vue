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
      <el-main v-if="Mult_wo_id!= ''"
        ><woInfo :wo_id="Mult_wo_id" />
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              评论<i class="header-icon el-icon-info"></i>
            </template>
            <addDiscuss @save="createDiscuss"></addDiscuss>
          </el-collapse-item> </el-collapse
      ></el-main>
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
import addDiscuss from "@/components/addDiscuss.vue";
export default {
  components: {
    woInfo,
    woList,
    addDiscuss
  },
  data() {
    return {
      drawer: false,
      Mult_wo_id: "", //筛选器选中的工单id
    };
  },
  methods: {
    //从woList组件拿到工单信息，发送给woInfo组件
    getWodetail(wo_id) {
      this.Mult_wo_id = wo_id;
    },
    //关闭抽屉
    offDrawer() {
      this.drawer = false;
    },
    //新建评论
    createDiscuss(newdiscuss) {
      console.log(newdiscuss);
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