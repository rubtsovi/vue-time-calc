import { ComponentOptions } from "vue/types/umd";
import { BSpinner } from "bootstrap-vue";

export const ButtonSpinnerMixin: ComponentOptions<Vue> = {
  methods: {
    insertSpinner<T extends HTMLElement>(el: T, variant = "primary", small = true) {
      const spinner = new BSpinner({
        propsData: {
          variant,
          small,
        },
      });
      spinner.$mount();
      el.after(spinner.$el);
    },
  },
};
