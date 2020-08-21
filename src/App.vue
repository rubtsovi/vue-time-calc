<template>
  <div id="app">
    <AppHeader />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AppHeader from "@/components/AppHeaderComponent.vue";

@Component({
  name: "App",
  components: {
    AppHeader,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
