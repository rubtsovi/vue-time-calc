<template>
  <div>
    <b-form-row class="my-n2">
      <b-col :cols="12" :sm="6" class="py-2">
        <label for="hours-control" class="sr-only">Hours</label>
        <b-form-spinbutton
          id="hours-control"
          v-model="hours"
          placeholder="Type hours here"
          min="0"
          @change="setTime()"
        />
      </b-col>
      <b-col :cols="12" :sm="6" class="py-2">
        <label for="minutes-control" class="sr-only">Minutes</label>
        <b-form-spinbutton
          id="minutes-control"
          v-model="minutes"
          placeholder="Type minutes here"
          min="0"
          max="60"
          step="5"
          @change="setTime()"
        />
      </b-col>
    </b-form-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "TimeInput",
  model: {
    prop: "time",
    event: "change",
  },
  props: {
    time: {
      type: Object as PropType<{ hours: number | null; minutes: number | null }>,
    },
  },
  computed: {
    hours: {
      get(): number | null {
        return this.time.hours;
      },
      set(v: number): void {
        this.time.hours = v;
      },
    },
    minutes: {
      get(): number | null {
        return this.time.minutes;
      },
      set(v: number): void {
        this.time.minutes = v;
      },
    },
  },
  methods: {
    setTime(): void {
      this.$emit("change", {
        hours: this.time.hours,
        minutes: this.time.minutes,
      });
    },
  },
});
</script>
