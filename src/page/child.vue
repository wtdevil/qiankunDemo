<template>
  <div>
    <div>主体应用页面</div>
    <button @click="lineToChild1">跳转到主体应用1</button>
    <div id="containerVue"></div>
  </div>
</template>

<script>
import { loadMicroApp } from "qiankun";
import route from '../router'
import { defineComponent, onMounted, onUnmounted } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const lineToChild1 = () => {
      //route.push("/childone");
      history.pushState({}, '', "/childone")
    };
    let microApp = null
    onMounted(() => {
      microApp = loadMicroApp({
        name: "project-part-one",
        entry: "//localhost:7105",
        container: "#containerVue",
        activeRule: "/child",
        props: {route: route}
      });
    });
    onUnmounted(() => {
      microApp?.unmount();
    });
    return {
      microApp,
      lineToChild1,
    };
  },
});
</script>