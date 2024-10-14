import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import OptionView from "../views/OptionView.vue";
import CompositionView from "../views/CompositionView.vue";
import PiniaView from "@/views/PiniaView.vue";
import UserView from "@/views/UserView.vue";
import CekView from "@/views/CekView.vue";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
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
  {
    path: "/cek",
    name: "cek",
    component: CekView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !Cookies.get("authToken")) {
    router.replace("/");
  }
  if (to.meta.guest && Cookies.get("authToken")) {
    router.replace("/user");
  }
  next();
});

export default router;
