<template>
  <div id="app">
    <b-jumbotron
      header="Time calc App"
      lead="The app which helps you to manage your working time"
      :fluid="true"
      bg-variant="primary"
      text-variant="white"
    ></b-jumbotron>
    <WorkArea></WorkArea>
  </div>
</template>

<script lang="ts">
import WorkArea from "./components/WorkArea.vue";
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {
    WorkArea,
  },
});
</script>

<style lang="scss"></style>
