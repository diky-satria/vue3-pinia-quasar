import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import OptionView from "../views/OptionView.vue";
import CompositionView from "../views/CompositionView.vue";
import PiniaView from "@/views/PiniaView.vue";
import UserView from "@/views/UserView.vue";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { guest: true },
  },
  {
    path: "/option",
    name: "option",
    component: OptionView,
    meta: { auth: true },
  },
  {
    path: "/composition",
    name: "composition",
    component: CompositionView,
    meta: { auth: true },
  },
  {
    path: "/pinia",
    name: "pinia",
    component: PiniaView,
    meta: { auth: true },
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !Cookies.get("authToken")) {
    router.replace("/login");
  }
  if (to.meta.guest && Cookies.get("authToken")) {
    router.replace("/user");
  }
  next();
});

export default router;
