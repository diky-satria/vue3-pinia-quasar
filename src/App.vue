<template>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
