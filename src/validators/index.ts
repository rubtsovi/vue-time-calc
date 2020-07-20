import { ValidationRule } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";

import { convertArrayToMinutes } from "@/helpers";
import { Duration, WorkDay } from "@/types";

export const validDuration: ValidationRule = helpers.withParams(
  { type: "validDuration" },
  (value: Duration): boolean => {
    if (null === value.hours) {
      return false;
    }

    if (0 === value.hours) {
      return value.minutes > 0;
    }

    return true;
  }
);

export const validWorkDay: ValidationRule = helpers.withParams(
  { type: "validWorkDay" },
  (value: WorkDay): boolean => {
    return convertArrayToMinutes(value.to) - convertArrayToMinutes(value.from) > 0;
  }
);
