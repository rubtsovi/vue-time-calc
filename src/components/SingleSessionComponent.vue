<template>
  <b-list-group-item class="d-flex justify-content-between align-items-center">
    <div class="row w-100 pr-4">
      <div class="col-1">{{ index + 1 }}.</div>
      <div class="col">
        <div v-if="!editMode">
          <div>
            <strong>Hours:</strong> {{ session.duration.hours }}
            <strong>Minutes:</strong>
            {{ session.duration.minutes }}
          </div>
          <div class="small" v-if="session.workDay">
            (from: {{ session.workDay.from }}, to: {{ session.workDay.to }})
          </div>
        </div>
        <div v-else class="pr-5">
          <time-input
            v-if="!session.workDay"
            :time="session.duration"
            @change="editSessionDuration($event)"
          />
          <work-day-input v-else :workDay="session.workDay" @change="editSessionWorkDay($event)" />
        </div>
      </div>
    </div>
    <div class="actions" :class="{ 'active-edit': activeEditMode !== null }">
      <template v-if="activeEditMode === null">
        <div class="action-icon edit" @click="toggleEditMode" v-b-tooltip.hover.ds400 title="Edit">
          <b-icon icon="pencil" :variant="null" class="edit-icon" />
        </div>
        <div
          class="action-icon bg-danger"
          @click="removeSession(index)"
          v-b-tooltip.hover.ds400
          title="Delete"
        >
          <b-icon icon="x" variant="white" />
        </div>
      </template>
      <template v-if="activeEditMode === index">
        <div
          class="action-icon bg-success"
          :class="{ disabled: $v.$invalid }"
          @click="save"
          v-b-tooltip.hover.ds400
          title="Save"
        >
          <b-icon icon="check2" variant="white" class="edit-icon" />
        </div>
        <div class="action-icon bg-warning" v-b-tooltip.hover.ds400 title="Discard" @click="revert">
          <b-icon icon="arrow-clockwise" variant="white" />
        </div>
      </template>
    </div>
  </b-list-group-item>
</template>

<script lang="ts">
import Vue from "vue";

import { RuleDecl } from "vue/types/options";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Mutation, Getter } from "vuex-class";
import { Validations } from "vuelidate-property-decorators";

import { Duration, WorkDay } from "../types";
import { WorkSession } from "@/classes/WorkSessionClass";
import TimeInput from "./TimeInputComponent.vue";
import WorkDayInput from "./WorkDayInputComponent.vue";
import { validDuration, validWorkDay } from "@/validators";

@Component({
  name: "SingleSession",
  components: {
    TimeInput,
    WorkDayInput,
  },
})
export default class SingleSessionComponent extends Vue {
  private editMode: boolean;
  private backupValue: { workDay?: WorkDay; duration?: Duration };

  @Prop()
  private index!: number;

  @Prop()
  private session!: WorkSession;

  @Getter("activeEditMode")
  private activeEditMode!: boolean;

  @Mutation("removeSession")
  private removeSession!: (index: number) => void;

  @Mutation("activateEditMode")
  private activateEditMode!: (index: number | null) => void;

  public constructor() {
    super();
    this.editMode = false;
    this.backupValue = {};
  }

  public get time(): Duration {
    return this.session.duration;
  }

  public get workDay(): WorkDay | undefined {
    return this.session.workDay;
  }

  public created() {
    this.backupSession();
  }

  public editSessionDuration(duration: Duration) {
    this.session.duration = duration;
  }
  public editSessionWorkDay(workDay: WorkDay) {
    this.session.workDay = workDay;
  }
  public toggleEditMode() {
    this.editMode = !this.editMode;
    this.activateEditMode(this.editMode ? this.index : null);
  }
  public backupSession(): void {
    if (this.workDay) {
      this.backupValue.workDay = Object.assign({}, this.session.workDay);
    } else {
      this.backupValue.duration = Object.assign({}, this.session.duration);
    }
  }
  public save() {
    this.backupSession();
    this.toggleEditMode();
  }
  public revert(): void {
    if (this.backupValue.workDay) {
      this.session.workDay = this.backupValue.workDay;
    } else if (this.backupValue.duration) {
      this.session.duration = this.backupValue.duration;
    }
    this.toggleEditMode();
  }

  @Validations()
  validations() {
    let rules: RuleDecl;
    if (this.session.workDay) {
      rules = {
        workDay: {
          validWorkDay,
        },
      };
      return rules;
    }

    rules = {
      time: {
        validDuration,
      },
    };

    return rules;
  }
}
</script>

<style lang="scss" scoped>
.actions {
  position: absolute;
  right: $list-group-item-padding-x;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  transition: opacity 0.2s linear;
  @include media-breakpoint-up(lg) {
    opacity: 0;
  }
  &.active-edit {
    opacity: 1;
    .edit {
      background-color: $success;
    }
  }
}
.action-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.edit {
    background-color: $gray-200;
  }
  &.delete {
    background-color: $danger;
  }
  &:not(:last-of-type) {
    margin-right: map-get($map: $spacers, $key: 2);
  }
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

.list-group-item:hover {
  .actions {
    opacity: 1;
  }
}

.row {
  margin-left: -5px;
  margin-right: -5px;
  > div {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
