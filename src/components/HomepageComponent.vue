<template>
  <div>
    <div id="hero-section" class="py-5 bg-secondary">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12 col-md-8 col-lg-6">
            <h1>Meet Timmy</h1>
            <p class="lead">
              Your personal assistant which helps you to count how long you've worked and how much
              you've earned.
            </p>
            <p class="lead">
              Also with this app you can plan your project and manage your time in smart way
            </p>
            <router-link v-if="!user" :to="{ name: 'login' }" class="btn btn-lg btn-dark mr-3"
              >Login</router-link
            >
            <a href="#how-it-works" @click.prevent="scrollTo" class="btn btn-lg btn-outline-dark"
              >Learn more</a
            >
          </div>
          <div class="col-12 col-md-4 col-lg-6 text-center">
            <img
              src="../../public/images/pexels-flickr-149290-removebg-preview.png"
              class=""
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div id="how-it-works" class="py-5">
      <div class="container">
        <div class="h1 text-center mb-5">How it works?</div>
        <div class="row mt-n3 align-items-center mb-5">
          <div class="col-12 py-3 col-md-6 order-md-2">
            <img src="../../public/images/calculator.svg" alt="" width="28" class="mb-2" />
            <h4>Calculator</h4>
            <p>
              If your salary depends on time you've worked, then this feature made for you. Just
              provide time spent on your work or time of start and finish work, and Timmy will show
              you total work time. Optionally you could type hourly wage to let Timmy calculate how
              much you've earned.
            </p>
            <router-link :to="{ name: 'calculator' }" class="btn btn-primary">
              Try it now
            </router-link>
          </div>
          <div class="col-12 py-3 col-md-6 order-md-1">
            <img
              src="../../public/images/agence-olloweb-qfp4-Ud6Fyg-unsplash.jpg"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
        <div class="row my-n3 align-items-center">
          <div class="col-12 py-3 col-md-6">
            <img src="../../public/images/puzzle.svg" alt="" width="28" class="mb-2" />
            <h4>Project planner</h4>
            <p>
              This feauture is very helpful if you know how to divide project into single task and
              you're able to define how much time (more or less) will take every of them. Just tell
              Timmy that you work at this moment on some task and Timmy will warn you if you spend
              to much time resolving this. The only difficult is to remember about the start and the
              finish of work.
            </p>
            <router-link :to="{ name: 'planner' }" class="btn btn-primary">Try it now</router-link>
          </div>
          <div class="col-12 py-3 col-md-6">
            <img
              src="../../public/images/luke-chesser-JKUTrJ4vK00-unsplash.jpg"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="tech-stack" class="border-top py-4">
      <div class="container">
        <div class="h2 text-center mb-5">Built with</div>
        <div class="d-flex my-n3 justify-content-center flex-wrap align-items-center">
          <div class="px-4 py-3">
            <img height="48" src="../../public/images/vuejs.svg" alt="" />
          </div>
          <div class="px-4 py-3">
            <img height="48" src="../../public/images/webpack.svg" alt="" />
          </div>
          <div class="px-4 py-3">
            <img height="48" src="../../public/images/typescript.svg" alt="" />
          </div>
          <div class="px-4 py-3">
            <img height="48" src="../../public/images/bootstrap.svg" alt="" />
          </div>
          <div class="px-4 py-3">
            <img height="48" src="../../public/images/firebase.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import { StateTypes } from "@/store/state";
import { UserInfo } from "@/types";

@Component({
  name: "Homepage",
})
export default class HomepageComponent extends Vue {
  @State(StateTypes.USER)
  private user!: UserInfo | null;

  public scrollTo(e: MouseEvent): void {
    const target = e.target;
    if (target) {
      const sectionToScroll = document.querySelector((target as HTMLAnchorElement).hash);
      sectionToScroll?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
}
</script>

<style lang="scss" scoped>
#hero-section {
  min-height: calc(100vh - 67px);
  height: 1px;
  position: relative;
  overflow: hidden;
  @include media-breakpoint-up(md) {
    min-height: 600px;
  }
  > .container {
    &,
    & > .row {
      height: 100%;
    }
  }
  h1,
  p,
  div {
    color: $white;
  }
}
</style>
