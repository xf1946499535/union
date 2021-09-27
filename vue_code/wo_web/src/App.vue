<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
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
