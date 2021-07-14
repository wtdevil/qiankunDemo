<template>
  <div class="hello">
    <h1>Vue子应用pageOne页面</h1>
    <img src="../assets/logo.png">
    <button @click="linkToPageTwo">跳转到子应用pageTwo</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "PageOne",
  props: {},
  setup() {
    const route = useRouter();
    const linkToPageTwo = () => {
      route.push("/pageTwo");
    };
    return {
      linkToPageTwo,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
