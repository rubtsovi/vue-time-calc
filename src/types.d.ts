export type WorkSession = {
  duration: Time;
  workDay?: WorkDay;
};

export type Time = {
  hours: number;
  minutes: number;
};

export type WorkDay = {
  from: string;
  to: string;
};
