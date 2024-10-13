<template>
  <div>
    <h4>UserView</h4>
    <table border="1" style="margin: 0 auto">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in userStore.users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button>delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useUserStore } from "@/store/UserStore";
export default {
  name: "UserView",
  setup() {
    let userStore = useUserStore();

    onMounted(() => {
      userStore.getUser();
    });

    return {
      userStore,
    };
  },
};
</script>

<style></style>
