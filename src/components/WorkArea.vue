<template>
  <div class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6">
          <InputComponent></InputComponent>
        </div>
        <div class="col-12 col-md-6">
          <ResultComponent></ResultComponent>
        </div>
      </div>
    </div>
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
