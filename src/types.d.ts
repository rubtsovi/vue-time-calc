export type WorkSession = {
  duration: Time;
  workDay?: WorkDay;
};

export type Time = {
  hours: number;
  minutes: number;
};

export type Duration = {
  hours: number;
  minutes: number;
};

export type WorkDay = {
  from: string;
  to: string;
};

export type roundTime = false | "ceil" | "floor";

export interface WageOptions {
  hourlyWage: number;
  roundTime: roundTime;
}
