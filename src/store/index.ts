import Vue from "vue";
import Vuex from "vuex";
import { WorkSession, Time } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sessions: Array<WorkSession>(),
  },
  mutations: {
    addSession(state, payload: WorkSession): void {
      state.sessions.push(payload);
    },
  },
  getters: {
    totalTime(state): Time {
      const reducedWorkSessions: WorkSession = state.sessions.reduce(
        (prev: WorkSession, curr: WorkSession) => {
          let hours: number = prev.duration.hours + curr.duration.hours;
          let minutes: number = prev.duration.minutes + curr.duration.minutes;
          hours += Math.floor(minutes / 60);
          minutes = minutes % 60;

          return { duration: { hours, minutes } };
        }
      );

      return reducedWorkSessions.duration;
    },
  },
  actions: {},
  modules: {},
});
