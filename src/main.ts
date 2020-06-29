import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";
import "./styles/styles.scss";
import store from "./store";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.browserLocale = navigator.language;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
