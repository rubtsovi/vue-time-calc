import { UserInfo, WageOptions } from "@/types";
import { WorkSession } from "@/classes/WorkSessionClass";

export enum StateTypes {
  SESSIONS = "sessions",
  WAGE_OPTIONS = "wageOptions",
  ACTIVE_SESSION = "activeEditMode",
  USER = "user",
}

export const state = {
  [StateTypes.SESSIONS]: Array<WorkSession>(),
  [StateTypes.WAGE_OPTIONS]: { hourlyWage: 0, roundTime: false } as WageOptions,
  [StateTypes.ACTIVE_SESSION]: null as number | null,
  [StateTypes.USER]: null as UserInfo | null,
};

export type State = typeof state;
