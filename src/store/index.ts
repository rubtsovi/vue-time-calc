import Vue from "vue";
import Vuex from "vuex";
import { Duration, WageOptions, SignupCredentials, LoginCredentials } from "@/types";
import { WorkSession } from "@/classes/WorkSessionClass";
import * as firebase from "../firebase";
import { UserInfo } from "../types";
import fb, { User } from "firebase";
import router from "@/router/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sessions: Array<WorkSession>(),
    wageOptions: { hourlyWage: 0, roundTime: false } as WageOptions,
    activeEditMode: null as number | null,
    user: null as UserInfo | null,
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
    setWageOptions(state, payload: WageOptions) {
      Vue.set(state, "wageOptions", payload);
    },
    setUser(state, payload: User | null) {
      Vue.set(
        state,
        "user",
        payload === null
          ? null
          : {
              displayName: payload?.displayName,
              email: payload?.email,
              uid: payload?.uid,
              photoURL: payload?.photoURL,
            }
      );
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
    earnedMoney(state, getters): number {
      if (state.wageOptions.roundTime === "ceil") {
        return (
          (getters.totalTime.hours + Number(getters.totalTime.minutes > 0)) *
          state.wageOptions.hourlyWage
        );
      }

      if (state.wageOptions.roundTime === "floor") {
        return getters.totalTime.hours * state.wageOptions.hourlyWage;
      }

      return (
        (getters.totalTime.hours + getters.totalTime.minutes / 60) * state.wageOptions.hourlyWage
      );
    },
  },
  actions: {
    async signUpWithEmail({ commit }, payload: SignupCredentials) {
      const { user } = await firebase.auth.createUserWithEmailAndPassword(
        payload.email,
        payload.pass
      );

      await user?.updateProfile({ displayName: payload.name });
      commit("setUser", user);
    },
    async loginWithEmail({ commit }, payload: LoginCredentials) {
      const { user } = await firebase.auth.signInWithEmailAndPassword(payload.email, payload.pass);
      commit("setUser", user);
    },
    async logout({ commit }) {
      await firebase.auth.signOut();
      commit("setUser", null);
      if (router.currentRoute.name !== "homepage") {
        router.push({ name: "homepage" });
      }
    },
    async loginInPopup({ commit }, payload: fb.auth.AuthProvider) {
      const { user } = await firebase.auth.signInWithPopup(payload);
      commit("setUser", user);
    },
  },
  modules: {},
});
