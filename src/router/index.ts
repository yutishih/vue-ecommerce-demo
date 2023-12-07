// import { createRouter, createWebHashHistory } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import ForgetPasswordView from "../views/ForgetPasswordView.vue";
import SummerCollectionView from "../views/SummerCollectionView.vue";
import FallCollectionView from "../views/FallCollectionView.vue";
import FullCollectionView from "../views/FullCollectionView.vue";
import ProductsView from "../views/ProductsView.vue";

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      alias: "/home",
    },
    {
      path: "/test",
      name: "test",
      component: TestView,
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/forget-password",
      name: "forget-password",
      component: ForgetPasswordView,
    },
    {
      path: "/summer-collection",
      name: "summer-collection",
      component: SummerCollectionView,
    },
    {
      path: "/fall-collection",
      name: "fall-collection",
      component: FallCollectionView,
    },
    {
      path: "/full-collection",
      name: "full-collection",
      component: FullCollectionView,
    },
    {
      path: "/products/productId=:id",
      name: "products",
      component: ProductsView,
    },
  ],
  // Scrolling to top after routing
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
