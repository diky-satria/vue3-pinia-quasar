<template>
  <LayoutDashboard>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </LayoutDashboard>
</template>

<script>
import LayoutDashboard from "@/components/LayoutDashboard.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    LayoutDashboard,
  },
};
</script>
