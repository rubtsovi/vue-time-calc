export function transformTime(time: string): number[] {
  if (time !== "") {
    return time
      .split(":")
      .splice(0, 2)
      .map((v: string) => Number(v));
  }
  return Array(2).fill(0);
}

export function convertArrayToMinutes(time: number[] | string): number {
  if (typeof time === "string") {
    if (time === "") {
      return 0;
    }
    time = transformTime(time);
  }

  const hours = time[0];
  const minutes = time[1];

  return minutes + hours * 60;
}

export function normalizeTime(time: string): string {
  return time.replace(/(\d{2}):(\d{2}):(\d{2})/, "$1:$2");
}
