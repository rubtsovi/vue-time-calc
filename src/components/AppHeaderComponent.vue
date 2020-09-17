<template>
  <div>
    <b-navbar toggleable="md">
      <b-container>
        <b-navbar-brand :to="{ name: 'homepage' }">
          <img src="../../public/images/logo.svg" width="120" alt="" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item :active="$route.name === 'calculator'" :to="{ name: 'calculator' }"
              >Calculator</b-nav-item
            >
            <b-nav-item :active="$route.name === 'planner'" :to="{ name: 'planner' }"
              >Project planning</b-nav-item
            >
            <LoggedInUserMenu />
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import LoggedInUserMenu from "@/components/LoggedInUserComponent.vue";

@Component({
  name: "AppHeader",
  components: {
    LoggedInUserMenu,
  },
})
export default class AppHeaderComponent extends Vue {}
</script>

<style lang="scss" scoped>
.nav-link {
  &.active {
    color: $secondary !important;
    pointer-events: none;
  }
}
</style>
