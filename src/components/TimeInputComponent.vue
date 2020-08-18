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
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  name: "TimeInput",
  model: {
    prop: "time",
    event: "change",
  },
})
export default class TimeInputComponent extends Vue {
  @Prop()
  private time!: { hours: number | null; minutes: number | null };

  public get hours(): number | null {
    return this.time.hours;
  }

  public set hours(hours: number | null) {
    this.time.hours = hours;
  }

  public get minutes(): number | null {
    return this.time.minutes;
  }

  public set minutes(minutes: number | null) {
    this.time.minutes = minutes;
  }

  public setTime(): void {
    this.$emit("change", {
      hours: this.time.hours,
      minutes: this.time.minutes,
    });
  }
}
</script>
