// vue augmentation
import Vue, { ComponentOptions } from "vue";

import { ValidationRule } from "vuelidate/lib/validators";
import { Validation } from "vuelidate/vuelidate";
import { RuleDecl, DynamicDecl } from "vue/types/options";

declare module "vue/types/vue" {
  interface ComponentOptions<V extends Vue> {
    validations?: RuleDecl | DynamicDecl;
  }
}
