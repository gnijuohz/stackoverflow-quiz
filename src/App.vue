<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: Athelas, STHeiti, '-apple-system, BlinkMacSystemFont', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #22222;
  margin-top: 60px;
}
a {
  color: #42b983;
  text-decoration: none;
}
</style>
