<template>
  <div>
    <b-list-group v-if="sessions.length">
      <single-session
        v-for="(session, key) in sessions"
        :index="key"
        :key="key"
        :session="session"
      />
      <b-list-group-item variant="primary">
        <div>
          <strong>Summary:</strong>&nbsp; <strong>Hours:</strong> {{ totalTime.hours }}
          <strong>Minutes:</strong>
          {{ totalTime.minutes }}
        </div>
        <div v-if="wageOptions.hourlyWage">You've earned {{ earnedI18n }}</div>
      </b-list-group-item>
    </b-list-group>
    <b-alert variant="info" show v-else
      >There is no provided work sessions. Plese add the first one by the inputs below</b-alert
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SingleSession from "./SingleSessionComponent.vue";
import Component from "vue-class-component";
import countries from "countries-db";

import { State, Getter } from "vuex-class";
import { WorkSession, Duration, WageOptions } from "@/types";

@Component({
  name: "Result",
  components: {
    SingleSession,
  },
})
export default class ResultComponent extends Vue {
  @State("sessions")
  private sessions!: WorkSession[];

  @State("wageOptions")
  private wageOptions!: WageOptions;

  @Getter("totalTime")
  private totalTime!: Duration;

  @Getter("earnedMoney")
  private earnedMoney!: number;

  public get earnedI18n(): string {
    const localeMatched = this.browserLocale.match(/([a-z]*)-([A-Z]*)/);
    if (localeMatched) {
      return Intl.NumberFormat(this.browserLocale, {
        style: "currency",
        currency: countries.getCountry(localeMatched[2], "currencyCode"),
      }).format(this.earnedMoney);
    }
    return this.earnedMoney.toFixed(2);
  }
}
</script>
