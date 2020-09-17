export type WorkSession = {
  duration: Time;
  workDay?: WorkDay;
};

export type Time = {
  hours: number;
  minutes: number;
};

export interface Duration {
  hours: number;
  minutes: number;
}

export type WorkDay = {
  from: string;
  to: string;
};

export type roundTime = false | "ceil" | "floor";

export interface WageOptions {
  hourlyWage: number;
  roundTime: roundTime;
}

export interface LoginCredentials {
  email: string;
  pass: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

export interface UserInfo {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  uid?: string;
}

export interface firebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
