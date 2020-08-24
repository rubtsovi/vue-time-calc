<template>
  <div id="app">
    <AppHeader />
    <router-view></router-view>
    <footer class="py-4 bg-dark">
      <div class="container text-center text-light">
        Developed by: rubtsovi<br />
        <a target="_blank" href="https://github.com/rubtsovi" class="social-link text-reset">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/rubtsovi/"
          class="social-link text-reset"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AppHeader from "@/components/AppHeaderComponent.vue";
import LoggedInUserMenu from "@/components/LoggedInUserComponent.vue";

@Component({
  name: "App",
  components: {
    AppHeader,
    LoggedInUserMenu,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  footer {
    margin-top: auto;
  }
}

.social-link {
  padding: map-get($map: $spacers, $key: 2);
  font-size: 1.5rem;
}
</style>
