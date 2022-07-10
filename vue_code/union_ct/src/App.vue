<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { userStore } from '@/store'

export default defineComponent({
  name: 'App',
  setup() {
    const userstore = userStore()
    if (sessionStorage.getItem('myid')) {
      userstore.setuser(sessionStorage.getItem('myid'))
      console.log('我初始化了');
    }
    onMounted(() => {
      //3.组件挂载到页面之后执行-------onMounted

    })
  }
})
</script>

<style lang="scss">
#app {
  font-size: 16px;
}

@media screen and (max-width: 1200px) {
  #app {
    font-size: 14px;
  }
}

@media screen and (max-width: 800px) {
  #app {
    font-size: 12px;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.w {
  width: 100rem;
  margin: 0 auto;
}

#app {
  margin: 0 auto;
  padding: 0;
  min-width: 800px;
}

li {
  list-style: none;
}

a {
  text-decoration-line: none;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

