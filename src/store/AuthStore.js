import { defineStore } from "pinia";
import axios from "@/interceptors/axios";
import { ref } from "vue";
import Cookies from "js-cookie";
import router from "@/router";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const errors = ref([]);
    const me = ref(null);

    const login = async (email, password) => {
      errors.value = [];
      try {
        let response = await axios.post("/api/v1/auth/login", {
          email,
          password,
        });
        Cookies.set("authToken", response.data.token);

        getMe();

        router.replace("/user");

        return true;
      } catch (err) {
        errors.value = err.response.data.errors;
        return false;
      }
    };

    const getMe = async () => {
      try {
        let response = await axios.get("/api/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        });
        me.value = response.data.data;
        return true;
      } catch (err) {
        return false;
      }
    };

    const logout = () => {
      localStorage.removeItem("auth");
      me.value = null;
      Cookies.remove("authToken");

      router.replace("/");
    };

    return { login, errors, me, getMe, logout };
  },
  {
    persist: {
      key: "auth",
      storage: localStorage,
      pick: ["me"],
    },
  }
);
