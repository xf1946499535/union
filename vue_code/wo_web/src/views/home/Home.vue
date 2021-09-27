<template>
  <div class="home">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-submenu index="1">
        <template slot="title">个人中心</template>
        <el-menu-item index="1-1">我的工单</el-menu-item>
        <el-menu-item index="1-2">我的详情</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
          <el-menu-item index="1-4-2">选项2</el-menu-item>
          <el-menu-item index="1-4-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-5" @click="logout">退出账户</el-menu-item>
      </el-submenu>
      <el-menu-item index="2" @click="routeto('/createWo')"
        >新建工单</el-menu-item
      >
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4" @click="routeto('/woQuery')"
        >工单管理</el-menu-item
      >
    </el-menu>
    <el-divider content-position="left">欢迎进入wo系统{{"     "+adminInfo.admin_name}}</el-divider>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      adminInfo:JSON.parse(sessionStorage.getItem('me'))
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    routeto(path) {
      this.$router.push(path);
    },
    //退出登录
    logout() {
      localStorage.setItem("me", null);
      localStorage.setItem("token", null);
      //此处缺让服务器消除token
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
</style>