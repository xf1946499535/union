<template>
  <div class="home">
    <div class="common-layout">
      <el-container>
        <el-aside class="aside" width='200px'>
          <el-row class="tac" width="120px">
            <el-col :span="24">
              <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="rgb(247, 248, 252)">
                <div v-for="(item, index) in asidelist" :key="index + 'asidelist'">
                  <el-sub-menu index="1" v-if="item.childrenlist">
                    <template #title>
                      <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                  </el-sub-menu>
                  <el-menu-item :index="item.title" v-else @click="routeto(item.path)">
                    <span slot="title">{{ item.title }}</span>
                  </el-menu-item>
                </div>

              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-header>
            我是少年
          </el-header>
          <el-main>
            我是主题页面
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>

</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
export default defineComponent({
  name: '',
  setup() {
    const isCollapse = ref(true)
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const data = reactive({
      //开启折叠过渡
      iscolltran: true,
      asidelist: [
        {
          index: "1",

          title: "首页",
          path: "/dashboard",
          childrenlist: [{
            index: "1-1",

            title: "分析页",
            path: "/dashboard"
          }]
        },
        {
          index: "2",
          title: "选车",
          path: "/carstore",
        },
        {
          index: "3",
          title: "二手车",
          path: "/oldcar",
        },
        {
          index: "4",
          title: "车友圈",
          path: "/club",
        },
        {
          index: "5",
          title: "直播",
        },
        {
          index: "6",
          title: "工具",
        },
        {
          index: "7",
          title: "排行榜",
        },
        {
          index: "8",
          title: "车图",
        },
        {
          index: "9",
          title: "车库",
          path: "/barn",
        },
        {
          index: "10",

          title: "我的",
          path: "/aboutme",
        },
        {
          index: "11",
          title: "反馈",
        },
      ],
    })
    onBeforeMount(() => {
      // 2.组件挂载页面之前执行----onBeforeMount
    })
    onMounted(() => {
      // 3.组件挂载到页面之后执行-------onMounted
    })
    return {
      ...toRefs(data),
      isCollapse,
      handleOpen,
      handleClose
    }
  },
})

</script>
<style  lang='scss'>
.home {
  .aside {
    overflow: hidden;
    // transition-delay: 0.5s;
  }


}
</style>