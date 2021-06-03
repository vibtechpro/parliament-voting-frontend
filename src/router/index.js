import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login.vue";
import Dashboard from "../views/users/Dashboard.vue";
import Otp from "../views/auth/Otp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { requiresVisitor: true, showBackgroundImage: true }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true, showMenubar: true, showBackgroundImage: false, menuBackgroundColor: "red darken-4"  }
  },
  {
    path: "/otp-verify",
    name: "Otp",
    component: Otp,
    meta: { requiresAuth: true, showBackgroundImage: true }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
