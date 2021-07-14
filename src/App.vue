<template>
   <router-view></router-view>
</template>

<script>
import { onBeforeRouteUpdate } from 'vue-router'
export default {
  name: 'App',
  components: {},
  setup() {
    onBeforeRouteUpdate((to, from) => {
      console.log(to, from);
    });
    return {

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
body{
  padding: 0;
  margin:0
}
</style>
