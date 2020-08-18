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
import Vue from "vue";
import { WorkDay } from "../types";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  name: "WorkDayInput",
  model: {
    prop: "workDay",
    event: "change",
  },
})
export default class WorkDayInputComponent extends Vue {
  @Prop()
  private workDay!: WorkDay;

  public get from(): string {
    return this.workDay.from;
  }

  public set from(from: string) {
    this.workDay.from = from;
  }

  public get to(): string {
    return this.workDay.to;
  }

  public set to(to: string) {
    this.workDay.to = to;
  }

  public setWorkDay(): void {
    this.$emit("change", this.workDay);
  }
}
</script>
