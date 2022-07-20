<template>
  <div class="home">
    <div class="common-layout">
      <el-container>
        <el-aside class="aside" width='200px'>
          <el-row class="tac" width="120px">
            <el-col :span="24">
              <el-menu :default-active="nowuseroute.meta.code" class="el-menu-vertical-demo" @open="handleOpen"
                @close="handleClose" background-color="rgb(247, 248, 252)">
                <div v-for="(item, index) in asidelist" :key="index + 'asidelist'">
                  <el-sub-menu :index="item.meta.code" v-if="item.children">
                    <template #title>
                      <span>{{ item.meta.title }}</span>
                    </template>
                    <el-menu-item @click="routeto(childrenitem.path)" v-for="(childrenitem, index) in item.children"
                      :key="index + 'asidelistitem'" :index="childrenitem.meta.code">{{ childrenitem.meta.title }}
                    </el-menu-item>
                  </el-sub-menu>
                  <el-menu-item :index="item.meta.title" @click="routeto(item.path)" v-else>
                    <span slot="title">{{ item.meta.title }}</span>
                  </el-menu-item>
                </div>

              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-header>
            姓名:{{ me.name }}<br>
            职务:{{ me.postName }}
            <el-divider />
          </el-header>
          <el-main>
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
import router from "@/router";
import { useRoute } from 'vue-router'
import { userStore } from '@/store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: '',
  setup() {
    const userstore = userStore()
    const me = storeToRefs(userstore).me
    const data = reactive({
      //获取当前页面路由
      nowuseroute: useRoute(),
      //开启折叠过渡
      iscolltran: true,
      asidelist: routes[0].children.filter(item => {
        return true
      })
    })
    const isCollapse = ref(true)
    const handleOpen = (key: string, keyPath: string[]) => {

    }
    const handleClose = (key: string, keyPath: string[]) => {

    }
    const routeto = (path) => {
      router.push(path)
    }

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
      handleClose,
      routeto,
      me
    }
  },
})

</script>
<style  lang='less'>
.home {
  .aside {
    overflow: hidden;
    // transition-delay: 0.5s;
  }
}
</style>