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
        <strong>Summary:</strong>&nbsp; <strong>Hours:</strong> {{ totalTime.hours }}
        <strong>Minutes:</strong>
        {{ totalTime.minutes }}
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
import { State, Getter } from "vuex-class";
import { WorkSession, Duration } from "@/types";

@Component({
  name: "Result",
  components: {
    SingleSession,
  },
})
export default class ResultComponent extends Vue {
  @State("sessions")
  private sessions!: WorkSession[];

  @Getter("totalTime")
  private totalTime!: Duration;
}
</script>
