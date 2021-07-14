if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
import { createApp } from "vue";
import App from "./App.vue";
import routers from './router'
let instance = null;

function render(props = {}) {
    const { container, route } = props;
    instance = createApp(App);
    instance.use(routers)
    route && (instance.config.globalProperties.parentRoute = route)
    instance.mount(container ? container.querySelector('#container') : '#container');
}

if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log("%c ", "color: green;", "vue3.0 app bootstraped");
}

export async function mount(props) {
    render(props);
    instance.config.globalProperties.$onGlobalStateChange =
        props.onGlobalStateChange;
    instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
    instance.unmount();
    instance._container.innerHTML = "";
    instance = null;
}



