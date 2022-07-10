<template>
  <div>分析页{{ me.name }}</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { userStore } from '@/store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: '',
  setup() {
    const userstore = userStore()
    const me = storeToRefs(userstore).me

    const data = reactive({
    })
    onBeforeMount(() => {
      console.log('分析夜');

      //2.组件挂载页面之前执行----onBeforeMount
    })
    onMounted(() => {
      //3.组件挂载到页面之后执行-------onMounted
    })
    return {
      ...toRefs(data),
      me
    }
  },
})

</script>
<style scoped lang='less'>
</style>