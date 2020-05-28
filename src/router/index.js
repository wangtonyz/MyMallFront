import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/Mall/Login";
import Register from "@/Mall/Register";
import Home from "@/Mall/Home";
import CheckOrder from "@/components/CheckOrder";
import CreateOrder from "@/components/CreateOrder";


Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/checkorder",
      name: "CheckOrder",
      component: CheckOrder
    },
    {
      path: "/createorder",
      name: "CreateOrder",
      component: CreateOrder
    },
  ]
});

export default router;
