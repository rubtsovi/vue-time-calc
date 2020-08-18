<template functional>
  <div class="py-5">
    <b-container>
      <b-row class="my-n3">
        <b-col cols="12" md="6" class="py-3">
          <Input />
        </b-col>
        <b-col cols="12" md="6" class="py-3">
          <Result />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "WorkArea",
})
export default class WorkArea extends Vue {}
</script>
