<template>
  <div>
    <div
      style="
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Login</div>
        </q-card-section>
        <q-card-section>
          <div style="max-width: 400px">
            <q-form @submit.prevent="login" class="q-gutter-md">
              <q-input
                filled
                v-model="email"
                label="Email"
                :error="!!authStore.errors.email"
                :error-message="authStore.errors.email"
              />

              <q-input
                filled
                type="password"
                v-model="password"
                label="Password"
                :error="!!authStore.errors.password"
                :error-message="authStore.errors.password"
              />

              <div>
                <q-btn label="Login" type="submit" color="primary" />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </div>
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

<style>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>
