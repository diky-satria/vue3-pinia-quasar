<!-- <template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <span v-if="authStore.me">
        <router-link to="/option">Option</router-link> |
        <router-link to="/composition">Composition</router-link> |
        <router-link to="/pinia">Pinia</router-link> |
        <router-link to="/user">User</router-link> |

        <button @click="logout">Logout</button>
      </span>
      <span v-else><router-link to="/login">Login</router-link></span>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { useAuthStore } from "@/store/AuthStore";

export default {
  name: "App",
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

<style></style> -->

<template>
  <router-view />
</template>

<script>
export default {};
</script>

<style></style>
