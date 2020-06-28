<template>
  <div class="py-5">
    <b-container>
      <b-row>
        <b-col cols="12" md="6">
          <InputComponent></InputComponent>
        </b-col>
        <b-col cols="12" md="6">
          <ResultComponent></ResultComponent>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import ResultComponent from "./ResultComponent.vue";
import InputComponent from "./InputComponent.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    InputComponent,
    ResultComponent,
  },
});
</script>
