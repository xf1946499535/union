<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
      <el-progress
        :percentage="100"
        :format="format"
        :color="$store.state.settings.theme"
      ></el-progress>
    </div>
    <theme-picker @change="themeChange"></theme-picker>
    <!-- <router-view/> -->
  </div>
</template> ``
<script>
import ThemePicker from "@/components/ThemePicker";
export default {
  components: {
    ThemePicker
  },
  created(){
    this.localtheme()
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    themeChange(val) {
      this.$store.dispatch("changeSetting", {
        key: "theme",
        value: val
      });
      localStorage.setItem('theme',val);//保存选中的主题色
    },
    //获取本地保存的主题色
    localtheme(){
      if (localStorage.getItem("theme") != null) {
        this.themeChange(localStorage.getItem("theme"))
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/element-variables.scss";
$theme: var(theme);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  .box {
    width: 100px;
    height: 100px;
    background-color: $UN_theme_main;
  }
}
</style>
