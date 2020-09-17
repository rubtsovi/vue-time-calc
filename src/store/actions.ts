import { Mutations, MutationTypes } from "./mutations";
import { ActionContext, ActionTree } from "vuex";
import { State } from "./state";
import { LoginCredentials, SignupCredentials } from "@/types";
import * as fb from "../firebase";
import router from "@/router/router";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    mutationName: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export enum ActionTypes {
  EMAIL_SIGNUP = "signUpWithEmail",
  EMAIL_LOGIN = "loginWithEmail",
  POPUP_LOGIN = "loginInPopup",
  LOGOUT = "logout",
}

export interface Actions {
  [ActionTypes.EMAIL_LOGIN](
    { commit }: AugmentedActionContext,
    payload: LoginCredentials
  ): Promise<void>;
  [ActionTypes.POPUP_LOGIN](
    { commit }: AugmentedActionContext,
    payload: firebase.auth.AuthProvider
  ): Promise<void>;
  [ActionTypes.LOGOUT]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.EMAIL_SIGNUP](
    { commit }: AugmentedActionContext,
    payload: SignupCredentials
  ): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.EMAIL_LOGIN]({ commit }, payload) {
    const { user } = await fb.auth.signInWithEmailAndPassword(payload.email, payload.pass);
    commit(MutationTypes.SET_USER, user);
  },
  async [ActionTypes.POPUP_LOGIN]({ commit }, payload) {
    const { user } = await fb.auth.signInWithPopup(payload);
    commit(MutationTypes.SET_USER, user);
  },
  async [ActionTypes.LOGOUT]({ commit }) {
    await fb.auth.signOut();
    commit(MutationTypes.SET_USER, null);
    if (router.currentRoute.name !== "homepage") {
      router.push({ name: "homepage" });
    }
  },
  async [ActionTypes.EMAIL_SIGNUP]({ commit }, payload) {
    const { user } = await fb.auth.createUserWithEmailAndPassword(payload.email, payload.pass);
    await user?.updateProfile({ displayName: payload.name });
    commit(MutationTypes.SET_USER, user);
  },
};
