import { MutationTree } from "vuex";

import { State } from "./state";
import { WorkSession } from "@/classes/WorkSessionClass";
import { UserInfo, WageOptions } from "@/types";

export enum MutationTypes {
  ADD_SESSION = "addSession",
  REMOVE_SESSION = "removeSession",
  ACTIVATE_EDIT_MODE = "activateEditMode",
  SET_WAGE_OPTIONS = "setWageOptions",
  SET_USER = "setUser",
}

export interface Mutations<S = State> {
  [MutationTypes.ADD_SESSION](state: S, payload: WorkSession): void;
  [MutationTypes.REMOVE_SESSION](state: S, payload: number): void;
  [MutationTypes.SET_USER](state: S, payload: UserInfo | null): void;
  [MutationTypes.SET_WAGE_OPTIONS](state: S, payload: WageOptions): void;
  [MutationTypes.ACTIVATE_EDIT_MODE](state: S, payload: number | null): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_SESSION](state, payload: WorkSession) {
    state.sessions.push(payload);
  },
  [MutationTypes.REMOVE_SESSION](state, payload: number) {
    state.sessions.splice(payload, 1);
  },
  [MutationTypes.SET_USER](state, payload: UserInfo | null) {
    state.user =
      payload === null
        ? null
        : {
            displayName: payload.displayName,
            email: payload.email,
            uid: payload.uid,
            photoURL: payload.photoURL,
          };
  },
  [MutationTypes.SET_WAGE_OPTIONS](state, payload: WageOptions) {
    state.wageOptions = payload;
  },
  [MutationTypes.ACTIVATE_EDIT_MODE](state, payload: number | null) {
    state.activeEditMode = payload;
  },
};
