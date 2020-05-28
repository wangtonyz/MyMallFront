import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import axios from "axios";
import qs from "qs";
// import http from './api/api'

import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.use(axios);
Vue.use(qs);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

//
// Vue.http.options.emulateJSON = true;
// Vue.http.options.emulateHTTP = true;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
