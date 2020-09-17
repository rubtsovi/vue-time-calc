import { State } from "./state";
import { Duration } from "@/types";
import { GetterTree } from "vuex";
import { WorkSession } from "@/classes/WorkSessionClass";

export enum GettersTypes {
  TOTAL_TIME = "totalTime",
  SESION_IN_EDITION = "activeEditMode",
  EARNED_MONEY = "earnedMoney",
}

export interface Getters {
  [GettersTypes.TOTAL_TIME](state: State): Duration;
  [GettersTypes.EARNED_MONEY](state: State, getters: any): number;
  [GettersTypes.SESION_IN_EDITION](state: State): number | null;
}

export const getters: GetterTree<State, State> & Getters = {
  [GettersTypes.TOTAL_TIME](state) {
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
  [GettersTypes.EARNED_MONEY](state, getters) {
    if (state.wageOptions.roundTime === "ceil") {
      return (
        (getters[GettersTypes.TOTAL_TIME].hours +
          Number(getters[GettersTypes.TOTAL_TIME].minutes > 0)) *
        state.wageOptions.hourlyWage
      );
    }

    if (state.wageOptions.roundTime === "floor") {
      return getters[GettersTypes.TOTAL_TIME].hours * state.wageOptions.hourlyWage;
    }

    return (
      (getters[GettersTypes.TOTAL_TIME].hours + getters[GettersTypes.TOTAL_TIME].minutes / 60) *
      state.wageOptions.hourlyWage
    );
  },
  [GettersTypes.SESION_IN_EDITION](state) {
    return state.activeEditMode;
  },
};
