<template>
  <div>
    <b-form-checkbox v-model="timeMode" class="pb-2" name="check-button" switch>
      Daytime mode
    </b-form-checkbox>
    <b-form-row class="my-n2" v-if="!timeMode">
      <b-col :cols="12" :sm="6" class="py-2">
        <label for="hours-control" class="sr-only">Hours</label>
        <b-form-spinbutton
          id="hours-control"
          v-model.lazy.number="hours"
          placeholder="Type hours here"
          min="0"
        />
      </b-col>
      <b-col :cols="12" :sm="6" class="py-2">
        <label for="minutes-control" class="sr-only">Minutes</label>
        <b-form-spinbutton
          id="minutes-control"
          v-model.lazy.number="minutes"
          placeholder="Type minutes here"
          min="0"
          max="60"
          step="5"
        />
      </b-col>
    </b-form-row>
    <b-form-row class="my-n2" v-else>
      <b-col :cols="12" :sm="6" :md="12" :lg="6" class="py-2">
        <b-timepicker
          v-model.lazy="startTime"
          placeholder="Type here start time"
          :hour12="false"
          :locale="browserLocale"
          :minutes-step="5"
          :now-button="true"
          :hide-header="true"
        />
      </b-col>
      <b-col :cols="12" :sm="6" :md="12" :lg="6" class="py-2">
        <b-form-group class="mb-0">
          <b-timepicker
            v-model.lazy="finishTime"
            placeholder="Type here finish time"
            :hour12="false"
            :locale="browserLocale"
            :minutes-step="5"
            :now-button="true"
            :hide-header="true"
            :state="isFinishTimeValid"
          />
          <b-form-invalid-feedback v-show="!isFinishTimeValid" class="position-absolute"
            >Finish time must be greater than Start time</b-form-invalid-feedback
          >
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-button class="mt-3" variant="primary" @click="initAddMutation()">Add session</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import { convertArrayToMinutes } from "../helpers";
import { WorkDay } from "@/types";
export default Vue.extend({
  name: "InputComponent",
  data() {
    return {
      hours: null,
      minutes: null,
      timeMode: false,
      startTime: "",
      finishTime: "",
    };
  },
  computed: {
    timeDiff(): number {
      return convertArrayToMinutes(this.finishTime) - convertArrayToMinutes(this.startTime);
    },
    isFinishTimeValid(): boolean | null {
      return this.startTime === "" || this.finishTime === "" || this.timeDiff >= 1 ? null : false;
    },
  },
  methods: {
    ...mapMutations(["addSession"]),
    initAddMutation(): void {
      let hours, minutes, workDay: WorkDay | undefined;

      if (this.timeMode) {
        if (this.timeDiff < 1) {
          return;
        }
        hours = Math.floor(this.timeDiff / 60);
        minutes = this.timeDiff % 60;
        workDay = {
          from: this.startTime.replace(/(\d{2}):(\d{2}):(\d{2})/, "$1:$2"),
          to: this.finishTime.replace(/(\d{2}):(\d{2}):(\d{2})/, "$1:$2"),
        };
      } else {
        hours = Number(this.hours);
        minutes = Number(this.minutes);
      }
      this.addSession({ duration: { hours, minutes }, workDay });
      this.hours = null;
      this.minutes = null;
      this.startTime = "";
      this.finishTime = "";
    },
  },
});
</script>
