import { RouteConfig } from "vue-router";

import Homepage from "@/components/HomepageComponent.vue";
import CalculatorPage from "@/components/CalculatorPageComponent.vue";

const routes: RouteConfig[] = [
  {
    name: "homepage",
    path: "/",
    component: Homepage,
  },
  {
    name: "calculator",
    path: "/calculator/",
    component: CalculatorPage,
  },
];

export default routes;
