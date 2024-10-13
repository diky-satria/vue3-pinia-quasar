<template>
  <div>
    <h4>Login</h4>
    <form @submit.prevent="login">
      <input type="text" v-model="email" /><br />
      <div style="color: red" v-if="authStore.errors.email">
        {{ authStore.errors.email }}
      </div>

      <input type="text" v-model="password" />
      <br />
      <div style="color: red" v-if="authStore.errors.password">
        {{ authStore.errors.password }}
      </div>
      <button type="submit">Login</button>
    </form>

    <div>{{ authStore.me }}</div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/AuthStore";
import { ref } from "vue";
export default {
  name: "LoginView",
  setup() {
    let authStore = useAuthStore();

    let email = ref("");
    let password = ref("");

    const login = async () => {
      const isSuccess = await authStore.login(email.value, password.value);
      if (isSuccess) {
        email.value = "";
        password.value = "";
      }
    };

    return {
      authStore,
      email,
      password,
      login,
    };
  },
};
</script>

<style></style>
