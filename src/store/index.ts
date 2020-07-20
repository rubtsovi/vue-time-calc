import Vue from "vue";
import Vuex from "vuex";
import { Duration } from "@/types";
import { WorkSession } from "@/classes/WorkSessionClass";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sessions: Array<WorkSession>(),
    activeEditMode: null as number | null,
  },
  mutations: {
    addSession(state, payload: WorkSession): void {
      state.sessions.push(payload);
    },
    removeSession(state, index: number): void {
      state.sessions.splice(index, 1);
    },
    activateEditMode(state, payload: number | null): void {
      Vue.set(state, "activeEditMode", payload);
    },
  },
  getters: {
    totalTime(state): Duration {
      let reducedWorkSessions: Duration = {
        hours: 0,
        minutes: 0,
      };

      state.sessions.forEach((workSession: WorkSession) => {
        let hours: number = reducedWorkSessions.hours + workSession.duration.hours;
        let minutes: number = reducedWorkSessions.minutes + workSession.duration.minutes;
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;

        reducedWorkSessions = { hours, minutes };
      });

      return reducedWorkSessions;
    },
    activeEditMode(state): number | null {
      return state.activeEditMode;
    },
  },
  actions: {},
  modules: {},
});
