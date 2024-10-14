<template>
  <q-layout view="hhh lpr fff">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title style="display: flex; justify-content: space-between">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <q-btn
            v-if="authStore.me"
            @click="logout"
            color="red"
            label="Logout"
          />
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab v-if="authStore.me" to="/option" label="Option" />
        <q-route-tab
          v-if="authStore.me"
          to="/composition"
          label="Composition"
        />
        <q-route-tab v-if="authStore.me" to="/pinia" label="Pinia" />
        <q-route-tab v-if="authStore.me" to="/user" label="User" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <div style="padding: 40px 0">
        <slot />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useAuthStore } from "@/store/AuthStore";

export default {
  name: "LayoutDashboard",
  setup() {
    let authStore = useAuthStore();
    const logout = () => {
      authStore.logout();
    };

    return {
      authStore,
      logout,
    };
  },
};
</script>

<style></style>
