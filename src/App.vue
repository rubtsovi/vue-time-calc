<template>
  <div id="app">
    <b-jumbotron
      header="Time calc App"
      lead="The app which helps you to manage your working time"
      :fluid="true"
      bg-variant="primary"
      text-variant="white"
    ></b-jumbotron>
    <WorkArea />
  </div>
</template>

<script lang="ts">
import WorkArea from "@/components/WorkArea.vue";
import Vue from "vue";
import Component from "vue-class-component";
import Result from "@/components/ResultComponent.vue";
import Input from "@/components/InputComponent.vue";

@Component({
  name: "App",
  components: {
    WorkArea,
    Result,
    Input,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
