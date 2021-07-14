<template>
  <div>
    <div>主体应用页面1</div>
    <button @click="lineToChild">跳转到主体应用</button>
    <div id="reactContainer"></div>
  </div>
</template>

<script>
import { loadMicroApp } from "qiankun";
import { defineComponent, onMounted, onUnmounted } from "vue";
// import route from '../router'
export default defineComponent({
  name: "App",
  setup() {
    const lineToChild = () => {
      //route.push("/child");
      history.pushState({}, '', "/child")
    };
    let microApp = null;
    onMounted(() => {
      microApp = loadMicroApp({
        name: "project-part-two",
        entry: "//localhost:3003",
        container: "#reactContainer",
        activeRule: "/childone",
        props: {route: history}
      });
      
    });
    onUnmounted(() => {
      microApp?.unmount();
    });
    return {
      microApp,
      lineToChild,
    };
  },
});
</script>