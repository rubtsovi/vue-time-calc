<template>
  <div>
    <b-jumbotron
      header="Time Calculator"
      lead="This feature helps you to count how much you've earned"
      :fluid="true"
      bg-variant="primary"
      text-variant="white"
    ></b-jumbotron>
    <WorkArea />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import WorkArea from "@/components/WorkArea.vue";
import Result from "@/components/ResultComponent.vue";
import Input from "@/components/InputComponent.vue";

@Component({
  name: "CalculatorPage",
  components: {
    WorkArea,
    Result,
    Input,
  },
})
export default class CalculatorPageComponent extends Vue {}
</script>
