import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@utils/global";
import iview from "iview";
import "iview/dist/styles/iview.css";

import $config from "@utils/config";
Vue.prototype.$config = $config;

Vue.use(iview);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
