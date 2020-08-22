<template>
  <div>
    <b-button v-b-toggle.hourly-wage-options class="pl-0" variant="link text-reset">
      Hourly wage options
      <font-awesome-icon :icon="['fas', 'chevron-right']" class="ml-2" />
    </b-button>
    <b-collapse id="hourly-wage-options">
      <b-card>
        <label for="hourly-wage">Set your hourly wage</label>
        <b-form-input id="hourly-wage" v-model.number.lazy.trim="hourlyWage" class="mb-3" />
        <b-form-group label="Round your total work time">
          <b-form-radio v-model="roundTime" name="roundTime" :value="false"
            >Don't round</b-form-radio
          >
          <b-form-radio v-model="roundTime" name="roundTime" value="ceil">Ceil</b-form-radio>
          <b-form-radio v-model="roundTime" name="roundTime" value="floor">Floor</b-form-radio>
        </b-form-group>
        <div class="text-right mb-n3">
          <b-button variant="link" v-b-toggle.hourly-wage-options size="sm" class="pr-0"
            >Hide this</b-button
          >
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { WageOptions, roundTime } from "@/types";

@Component({
  name: "WageOptions",
})
export default class WageOptionsComponent extends Vue {
  @State("wageOptions")
  private wageOptions!: WageOptions;

  private hourlyWage = 0;
  private roundTime: roundTime = false;

  private mounted() {
    this.hourlyWage = this.wageOptions.hourlyWage;
    this.roundTime = this.wageOptions.roundTime;
  }

  @Mutation("setWageOptions")
  private setWageOptions!: (payload: WageOptions) => void;

  @Watch("hourlyWage")
  private onHourlyWageChange() {
    this.setWageOptions({ hourlyWage: this.hourlyWage, roundTime: this.roundTime });
  }

  @Watch("roundTime")
  private onRoundTimeChange() {
    this.setWageOptions({ hourlyWage: this.hourlyWage, roundTime: this.roundTime });
  }
}
</script>

<style lang="scss" scoped>
button {
  box-shadow: none !important;
}
</style>
