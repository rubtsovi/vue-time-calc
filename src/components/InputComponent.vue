<template>
  <div>
    <b-form-row class="mb-3">
      <b-col :cols="12" :sm="6">
        <label for="hours-control" class="sr-only">Hours</label>
        <b-form-input
          id="hours-control"
          v-model.lazy.number="hours"
          placeholder="Type hours here"
          type="number"
          min="0"
        />
      </b-col>
      <b-col :cols="12" :sm="6">
        <label for="minutes-control" class="sr-only">Minutes</label>
        <b-form-input
          id="minutes-control"
          v-model.lazy.number="minutes"
          placeholder="Type minutes here"
          type="number"
          min="0"
          max="60"
          step="5"
        />
      </b-col>
    </b-form-row>
    <b-button variant="primary" @click="initAddMutation()">Add session</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
export default Vue.extend({
  name: "InputComponent",
  data() {
    return {
      hours: null,
      minutes: null,
    };
  },
  methods: {
    ...mapMutations(["addSession"]),
    initAddMutation() {
      const hours = Number(this.hours);
      const minutes = Number(this.minutes);
      this.addSession({ hours, minutes });
      this.hours = null;
      this.minutes = null;
    },
  },
});
</script>
