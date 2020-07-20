<template>
  <div>
    <b-form-row class="my-n2">
      <b-col :cols="12" :sm="6" :md="12" :lg="6" class="py-2">
        <b-timepicker
          v-model="from"
          placeholder="Type here start time"
          :hour12="false"
          :locale="browserLocale"
          :minutes-step="5"
          :now-button="true"
          :hide-header="true"
          @hidden="setWorkDay()"
        />
      </b-col>
      <b-col :cols="12" :sm="6" :md="12" :lg="6" class="py-2">
        <b-form-group class="mb-0">
          <b-timepicker
            v-model="to"
            placeholder="Type here finish time"
            :hour12="false"
            :locale="browserLocale"
            :minutes-step="5"
            :now-button="true"
            :hide-header="true"
            @hidden="setWorkDay()"
          />
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { WorkDay } from "../types";
export default Vue.extend({
  name: "WorkDayInput",
  model: {
    prop: "workDay",
    event: "change",
  },
  props: {
    workDay: {
      type: Object as PropType<WorkDay>,
    },
  },
  computed: {
    from: {
      get(): string {
        return this.workDay.from;
      },
      set(time: string): void {
        this.workDay.from = time;
      },
    },
    to: {
      get(): string {
        return this.workDay.to;
      },
      set(time: string): void {
        this.workDay.to = time;
      },
    },
  },
  methods: {
    setWorkDay(): void {
      this.$emit("change", this.workDay);
    },
  },
});
</script>
