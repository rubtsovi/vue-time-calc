import Vue from "vue";
import Vuex from "vuex";
import { WorkSession } from "@/types";

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
    totalTime(state): WorkSession {
      return state.sessions.reduce((prev: WorkSession, curr: WorkSession) => {
        let hours: number = prev.hours + curr.hours;
        let minutes: number = prev.minutes + curr.minutes;
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;

        return { hours, minutes };
      });
    },
  },
  actions: {},
  modules: {},
});
