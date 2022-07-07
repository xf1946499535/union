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
                  <el-sub-menu :index="item.meta.code" v-if="item.children">
                    <template #title>
                      <span>{{ item.meta.title }}</span>
                    </template>
                    <el-menu-item v-for="(childrenitem, index) in item.children" :key="index + 'asidelistitem'"
                      :index="childrenitem.meta.code">{{ childrenitem.meta.title }}</el-menu-item>
                  </el-sub-menu>
                  <el-menu-item :index="item.meta.title" v-else>
                    <span slot="title">{{ item.meta.title }}</span>
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
import { defineComponent, ref, reactive, computed, toRefs, onBeforeMount, onMounted } from 'vue'
import routes from "@/router/routes/index";

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
      asidelist: routes[0].children.filter(item => {
        console.log(item);
        return true
      })
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