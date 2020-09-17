<template>
  <div>
    <WageOptions class="mb-4" />
    <b-form-checkbox v-model="timeMode" class="pb-2" name="check-button" switch>
      Daytime mode
    </b-form-checkbox>
    <time-input v-if="!timeMode" v-model="time" />
    <work-day-input v-else v-model="workDay" />
    <b-button class="mt-3" variant="primary" :disabled="$v.$invalid" @click="initAddMutation()"
      >Add session</b-button
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { RuleDecl } from "vue/types/options";
import Component from "vue-class-component";
import { Mutation } from "vuex-class";
import { Validations } from "vuelidate-property-decorators";

import TimeInput from "./TimeInputComponent.vue";
import WorkDayInput from "./WorkDayInputComponent.vue";
import WageOptions from "./WageOptionsComponent.vue";
import { WorkSession } from "../classes/WorkSessionClass";
import { validDuration, validWorkDay } from "@/validators";
import { MutationTypes } from "@/store/mutations";

@Component({
  name: "Input",
  components: {
    TimeInput,
    WorkDayInput,
    WageOptions,
  },
})
export default class InputComponent extends Vue {
  private time: { hours: number | null; minutes: number | null };
  private workDay: { from: string; to: string };
  private timeMode: boolean;

  public constructor() {
    super();
    this.time = { hours: null, minutes: null };
    this.workDay = { from: "", to: "" };
    this.timeMode = false;
  }

  @Mutation(MutationTypes.ADD_SESSION)
  private addSession!: (workSession: WorkSession) => void;

  public initAddMutation(): void {
    if (this.$v.$invalid) {
      return;
    }
    const workSession: WorkSession = new WorkSession();
    if (this.timeMode) {
      workSession.workDay = this.workDay;
    } else {
      if (this.time.hours === null) {
        return;
      } else if (this.time.minutes === null) {
        workSession.duration = { hours: Number(this.time.hours), minutes: 0 };
      } else if (this.time.hours !== null && this.time.minutes !== null) {
        workSession.duration = {
          hours: Number(this.time.hours),
          minutes: Number(this.time.minutes),
        };
      }
    }
    this.addSession(workSession);
    this.time = { hours: null, minutes: null };
    this.workDay = { from: "", to: "" };
  }

  @Validations()
  validations() {
    let rules: RuleDecl;
    if (this.timeMode) {
      rules = {
        workDay: {
          validWorkDay,
        },
      };
      return rules;
    }
    rules = {
      time: {
        validDuration,
      },
    };
    return rules;
  }
}
</script>
