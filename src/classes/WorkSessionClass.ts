import { Duration, WorkDay } from "../types";
import { convertArrayToMinutes, normalizeTime } from "../helpers";

export class WorkSession {
  private _duration!: Duration;
  private _workDay!: WorkDay;

  public get duration(): Duration {
    return this._duration;
  }

  public set duration(v: Duration) {
    this._duration = v;
  }

  public get workDay(): WorkDay {
    return this._workDay;
  }

  public set workDay(v: WorkDay) {
    this._workDay = {
      from: normalizeTime(v.from),
      to: normalizeTime(v.to),
    };
    const diff: number = convertArrayToMinutes(v.to) - convertArrayToMinutes(v.from);
    if (diff > 1) {
      this._duration = {
        hours: Math.floor(diff / 60),
        minutes: diff % 60,
      };
    }
  }
}
