<template>
  <div>
    <b-jumbotron
      header="Project planner"
      lead="Divide your project into the single taskt and control your time"
      :fluid="true"
      bg-variant="primary"
      text-variant="white"
    ></b-jumbotron>
    <div class="container">
      <h1>Oooops....This feature still in developing stage.<br />I just need more time!</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "ProjectPlannerPage",
})
export default class ProjectPlannerPageComponent extends Vue {}
</script>
