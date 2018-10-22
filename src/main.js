import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

Vue.config.productionTip = false;
Vue.use(router);
Vue.use(VueAxios, axios);
Vue.use(require("vue-pusher"), {
  api_key: "5ecb126c1d035c2fef98",
  options: {
    cluster: "us2",
    encrypted: true
  }
});
