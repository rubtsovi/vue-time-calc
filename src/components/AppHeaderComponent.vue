<template functional>
  <div>
    <b-navbar toggleable="md">
      <b-container>
        <b-navbar-brand :to="{ name: 'homepage' }">
          <img src="../../public/images/logo.svg" width="120" alt="" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'calculator' }">Calculator</b-nav-item>
            <b-nav-item href="#">Project planning</b-nav-item>
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

@Component({
  name: "AppHeader",
})
export default class AppHeaderComponent extends Vue {}
</script>
