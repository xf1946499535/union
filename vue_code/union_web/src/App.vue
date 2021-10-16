<template>
  <div id="app">
    <!-- <theme-picker @change="themeChange"></theme-picker>
    <el-progress
      :percentage="100"
      :format="format"
      :color="$store.state.settings.theme"
    ></el-progress> -->
    <router-view />
  </div>
</template>
<script>
import ThemePicker from "@/components/ThemePicker";
export default {
  components: {
    ThemePicker,
  },
  created() {
    this.localtheme();
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    themeChange(val) {
      this.$store.dispatch("changeSetting", {
        key: "theme",
        value: val,
      });
      localStorage.setItem("theme", val); //保存选中的主题色
    },
    //获取本地保存的主题色
    localtheme() {
      if (localStorage.getItem("theme") != null) {
        this.themeChange(localStorage.getItem("theme"));
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/element-variables.scss";
$theme: var(theme);
#app {
  font-size: 12px;
}
@media screen and (max-width: 1200px) {
  #app {
    font-size: 12px;
  }
}
@media screen and (max-width: 800px) {
  #app {
    font-size: 7px;
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
  min-width: 600px;
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
