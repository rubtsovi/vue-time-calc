<template>
  <div id="login-view" class="py-5 container">
    <div class="row my-n4">
      <div id="email-login-container" class="col-12 col-md-6 py-4 order-md-2">
        <!-- <pre>{{ $v }}</pre> -->
        <b-card title="Login with email" v-if="!signUpActive">
          <b-form @submit.prevent>
            <b-form-group label="Your email" label-for="user-email">
              <b-form-input
                :state="checkFieldState('userEmail')"
                type="email"
                v-model.lazy.trim="userEmail"
                id="user-email"
                @input="
                  $v.userEmail.$touch();
                  isEmailExists = true;
                "
              />
              <b-form-invalid-feedback v-if="$v.userEmail.$dirty && !$v.userEmail.isExists">
                There is no user with this email. Please create new account.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="$v.userEmail.$dirty && !$v.userEmail.email">
                Provided email is incorrect
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="$v.userEmail.$dirty && !$v.userEmail.required">
                This field is required
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Password" label-for="user-password">
              <b-form-input
                :state="checkFieldState('userPassword')"
                type="password"
                v-model.lazy.trim="userPassword"
                id="user-password"
                @input="
                  $v.userPassword.$touch();
                  isPasswordCorrect = true;
                "
              />
              <b-form-invalid-feedback v-if="$v.userPassword.$dirty && !$v.userPassword.required">
                This field is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="$v.userPassword.$dirty && !$v.userPassword.minLength">
                The minimum password length is 6 signs
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="$v.userPassword.$dirty && !$v.userPassword.isCorrect">
                Password is invalid.
              </b-form-invalid-feedback>
            </b-form-group>
            <div>
              <button
                @click="login({ email: userEmail, pass: userPassword })"
                class="btn btn-primary"
                :disabled="($v.userEmail.$invalid && $v.userPassword.$invalid) || isFetchingAuth"
              >
                Log In
              </button>
              <b-spinner variant="primary" v-if="isFetchingAuth" small class="align-middle ml-2" />
            </div>
            <div class="extras">
              <div class="btn btn-sm btn-link pl-0">Forgot Password</div>
              <div class="btn btn-sm btn-link pl-0" @click="toggleSignUpForm">
                Create an Account
              </div>
            </div>
          </b-form>
        </b-card>
        <b-card title="Sign up with email" v-else>
          <b-form @submit.prevent>
            <b-form-group label="Your email" label-for="user-email">
              <b-form-input
                :state="checkFieldState('userEmail')"
                type="email"
                v-model.lazy.trim="userEmail"
                id="user-email"
                @input="
                  $v.userEmail.$touch();
                  isEmailNotInUse = true;
                "
              />
              <b-form-invalid-feedback v-if="$v.userEmail.$dirty && !$v.userEmail.email">
                Provided email is incorrect
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="$v.userEmail.$dirty && !$v.userEmail.notInUse">
                The email address is already in use by another account.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="$v.userEmail.$dirty && !$v.userEmail.required">
                This field is required
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Password" label-for="user-password">
              <b-form-input
                :state="checkFieldState('userPassword')"
                type="password"
                v-model.lazy.trim="userPassword"
                id="user-password"
                @input="$v.userPassword.$touch()"
              />
              <b-form-invalid-feedback v-if="$v.userPassword.$dirty && !$v.userPassword.required">
                This field is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="$v.userPassword.$dirty && !$v.userPassword.minLength">
                The minimum password length is 6 signs
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Your name" label-for="user-name">
              <b-form-input
                type="text"
                v-model.lazy.trim="userName"
                id="user-name"
                :state="checkFieldState('userName')"
                @input="$v.userName.$touch()"
              />
              <b-form-invalid-feedback v-if="$v.userName.$dirty && !$v.userName.required">
                This field is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="$v.userName.$dirty && !$v.userName.minLength">
                User name must have at least 3 signs
              </b-form-invalid-feedback>
            </b-form-group>
            <div>
              <button
                @click="signUp({ email: userEmail, pass: userPassword, name: userName })"
                class="btn btn-primary"
                :disabled="$v.$invalid || isFetchingAuth"
              >
                Sign up
              </button>
              <b-spinner variant="primary" v-if="isFetchingAuth" small class="align-middle ml-2" />
            </div>
            <div class="extras">
              <div class="btn btn-sm btn-link pl-0" @click="toggleSignUpForm">Return to login</div>
            </div>
          </b-form>
        </b-card>
      </div>
      <div class="col-12 col-md-6 py-4 order-md-1">
        <div id="social-login-container">
          <button @click="googlePopup" class="btn btn-lg" id="google-btn">
            Login with Google <font-awesome-icon :icon="['fab', 'google']" />
          </button>
          <button @click="facebookPopup" class="btn btn-lg" id="facebook-btn">
            Login with Facebook <font-awesome-icon :icon="['fab', 'facebook-f']" />
          </button>
          <button @click="githubPopup" class="btn btn-lg" id="github-btn">
            Login with Github <font-awesome-icon :icon="['fab', 'github']" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Action, State } from "vuex-class";
import { Validate } from "vuelidate-property-decorators";
import { LoginCredentials, SignupCredentials, WageOptions } from "@/types";
import { required, email, minLength } from "vuelidate/lib/validators";
import { FirebaseError } from "firebase";
import { googleProvider, facebookProvider, githubProvider } from "../firebase";
import { ActionTypes, Actions } from "../store/actions";
import { StateTypes } from "@/store/state";

@Component({
  name: "LoginView",
})
export default class LoginViewComponent extends Vue {
  @Validate(() => ({
    required,
    email,
    notInUse: (value: string, vm: LoginViewComponent) => {
      return vm.isEmailNotInUse;
    },
    isExists: (value: string, vm: LoginViewComponent) => {
      return vm.isEmailExists;
    },
  }))
  private userEmail = "";

  @Validate(() => ({
    required,
    minLength: minLength(6),
    isCorrect: (value: string, vm: LoginViewComponent) => {
      return vm.isPasswordCorrect;
    },
  }))
  private userPassword = "";

  private signUpActive = false;
  @Validate(() => ({ required, minLength: minLength(3) }))
  private userName = "";

  private isFetchingAuth = false;
  private isEmailNotInUse = true;
  private isEmailExists = true;
  private isPasswordCorrect = true;

  @State(StateTypes.WAGE_OPTIONS)
  private wageOptions!: WageOptions;

  @Action("signUpWithEmail")
  private signUpWithEmail!: (
    payload: Parameters<Actions[ActionTypes.EMAIL_SIGNUP]>[1]
  ) => ReturnType<Actions[ActionTypes.EMAIL_SIGNUP]>;

  @Action("loginWithEmail")
  private loginWithEmail!: (
    payload: Parameters<Actions[ActionTypes.EMAIL_LOGIN]>[1]
  ) => ReturnType<Actions[ActionTypes.EMAIL_LOGIN]>;

  @Action("loginInPopup")
  private loginInPopup!: (
    payload: Parameters<Actions[ActionTypes.POPUP_LOGIN]>[1]
  ) => ReturnType<Actions[ActionTypes.POPUP_LOGIN]>;

  public login(credentials: LoginCredentials) {
    this.isFetchingAuth = true;
    this.loginWithEmail(credentials)
      .then(() => {
        this.isFetchingAuth = false;
        this.$router.push({ name: "homepage" });
      })
      .catch((err: FirebaseError) => {
        if (err.code === "auth/user-not-found") {
          this.isEmailExists = false;
        }
        if (err.code === "auth/wrong-password") {
          this.isPasswordCorrect = false;
        }
        this.isFetchingAuth = false;
      });
  }

  public signUp(credentials: SignupCredentials): void {
    this.isFetchingAuth = true;
    this.isEmailNotInUse = true;
    this.signUpWithEmail(credentials)
      .then(() => {
        this.isFetchingAuth = false;
        this.$router.push({ name: "homepage" });
      })
      .catch((err: FirebaseError) => {
        if (err.code === "auth/email-already-in-use") {
          this.isEmailNotInUse = false;
        }
        this.isFetchingAuth = false;
      });
  }

  public toggleSignUpForm() {
    this.signUpActive = !this.signUpActive;
    if (!this.signUpActive) {
      this.isEmailNotInUse = true;
    } else {
      this.isEmailExists = true;
      this.isPasswordCorrect = true;
    }
  }

  public googlePopup() {
    this.loginInPopup(googleProvider).then(() => {
      this.$router.push({ name: "homepage" });
    });
  }

  public facebookPopup() {
    this.loginInPopup(facebookProvider).then(() => {
      this.$router.push({ name: "homepage" });
    });
  }

  public githubPopup() {
    this.loginInPopup(githubProvider).then(() => {
      this.$router.push({ name: "homepage" });
    });
  }

  public checkFieldState(fieldName: string) {
    const { $dirty, $error } = this.$v[fieldName];
    return $dirty ? !$error : null;
  }
}
</script>

<style lang="scss" scoped>
#login-view {
  flex-grow: 1;
  display: flex;
  align-items: center;
  > .row {
    flex-basis: calc(100% + #{$grid-gutter-width});
  }
}

#email-login-container {
  @include media-breakpoint-up(md) {
    border-left: $border-width solid $border-color;
  }
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    width: 100%;
    max-width: 480px;
  }
}

#social-login-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 480px;
  align-items: stretch;
  height: 100%;
  justify-content: center;
  button {
    text-align: center;
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
    svg {
      margin-left: map-get($map: $spacers, $key: 2);
    }
  }
}

#google-btn {
  @include button-variant(#ea4335, #ea4335);
}
#facebook-btn {
  @include button-variant(#3b5998, #3b5998);
}
#github-btn {
  @include button-variant(#333, #333);
}
</style>
