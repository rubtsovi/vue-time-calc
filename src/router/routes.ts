import { RouteConfig } from "vue-router";

import Homepage from "@/components/HomepageComponent.vue";
import CalculatorPage from "@/components/CalculatorPageComponent.vue";
import LoginView from "@/components/LoginViewComponent.vue";

const routes: RouteConfig[] = [
  {
    name: "homepage",
    path: "/",
    component: Homepage,
  },
  {
    name: "login",
    path: "/login",
    component: LoginView,
  },
  {
    name: "calculator",
    path: "/calculator/",
    component: CalculatorPage,
  },
];

export default routes;
