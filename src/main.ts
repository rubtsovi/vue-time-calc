import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuelidate from "vuelidate";
import retina from "retinajs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin, faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import store from "./store";
import router from "./router/router";
import "./styles/styles.scss";
import { auth } from "./firebase";

library.add(faUser, faGithub, faLinkedin, faChevronRight, faFacebookF, faGoogle);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
// Vue.use(VueRetina, { retina });
Vue.config.productionTip = false;
Vue.prototype.browserLocale = navigator.language;

Vue.component("font-awesome-icon", FontAwesomeIcon);

window.addEventListener("load", retina);

let app: Vue;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
  if (user) {
    store.commit("setUser", user);
  }
});
