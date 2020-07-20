import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuelidate from "vuelidate";

import store from "./store";
import "./styles/styles.scss";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.prototype.browserLocale = navigator.language;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
