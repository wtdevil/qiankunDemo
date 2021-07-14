<template>
  <div class="hello">
    <h1>Vue子应用pageTwo页面</h1>
    <button @click="linkToPageOne">跳转到子应用pageOne</button>
    <button @click="linkToParent">跳转到父级子页面1</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import {getCurrentInstance} from 'vue'
export default {
  name: "PageTwo",
  props: {
    msg: String,
  },
  setup() {
    const current = getCurrentInstance()
    const route = useRouter()
    const linkToPageOne = () => {
      route.push("/pageOne");
    };
    const linkToParent = () => {
      current.appContext.config.globalProperties.parentRoute?.push('/childone')
    }
    return {
      linkToPageOne,
      linkToParent
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
