<template>
  <div>
    <b-list-group v-if="sessions.length">
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
        v-for="(session, key) in sessions"
        :key="key"
      >
        <div>
          {{ key + 1 }}. <strong>Hours:</strong> {{ session.hours }} <strong>Minutes:</strong>
          {{ session.minutes }}
        </div>

        <!-- TODO: <b-badge variant="primary" pill>edit</b-badge> -->
      </b-list-group-item>
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
import { mapState, mapGetters } from "vuex";
export default Vue.extend({
  name: "ResultComponent",
  computed: {
    ...mapState(["sessions"]),
    ...mapGetters(["totalTime"]),
  },
});
</script>
