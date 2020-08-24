<template>
  <div>
    <div id="logged-in-user-menu" v-if="user">
      <div id="photo-container">
        <img v-if="user.photoURL" :src="user.photoURL" alt="" />
        <font-awesome-icon v-else :icon="['fas', 'user']" />
      </div>
      {{ user.displayName || user.email }}
      <b-nav-item @click="logout">Logout</b-nav-item>
    </div>
    <b-nav-item v-else :to="{ name: 'login' }">Login</b-nav-item>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action } from "vuex-class";
import { UserInfo } from "@/types";

@Component({
  name: "LoggedInUserMenu",
})
export default class LoggedInUserMenuComponent extends Vue {
  @State("user")
  private user!: UserInfo | null;

  @Action("logout")
  public logout!: () => void;
}
</script>

<style lang="scss" scoped>
#logged-in-user-menu {
  display: flex;
  align-items: center;
  padding-left: $nav-link-padding-x;
}

#photo-container {
  width: $nav-link-height;
  height: $nav-link-height;
  border: $border-width solid $border-color;
  border-radius: 50%;
  margin-right: map-get($map: $spacers, $key: 2);
  overflow: hidden;
  line-height: $nav-link-height + 0.5;
  font-size: 2rem;
  color: $border-color;
  text-align: center;
  img {
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
  }
}
</style>
