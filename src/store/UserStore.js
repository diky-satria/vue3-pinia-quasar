import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/interceptors/axios";
import Cookies from "js-cookie";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);

  const getUser = async () => {
    try {
      let response = await axios.get("/api/v1/user", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      users.value = response.data.data.rows;

      return true;
    } catch (err) {
      return false;
    }
  };

  return { users, getUser };
});
