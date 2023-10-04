<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Navigation from "./components/Navigation.vue";
import NavigationFooter from "./components/NavigationFooter.vue";

// detect whether it is the signup page
const router = useRouter();
const isSignupRoute = ref(router.currentRoute.value.name === "signup");
const isLoginRoute = ref(router.currentRoute.value.name === "login");
const isForgetPasswordRoute = ref(
  router.currentRoute.value.name === "forget-password"
);
const isProductsRoute = ref(router.currentRoute.value.name === "products");

watch(router.currentRoute, (route) => {
  //based on "route.name === the string, isSignupRoute.value = true/false
  isSignupRoute.value = route.name === "signup";
  isLoginRoute.value = route.name === "login";
  isForgetPasswordRoute.value = route.name === "forget-password";
  isProductsRoute.value = route.name === "products";
});
</script>

<template>
  <Navigation
    :darkTextStyle="
      isSignupRoute || isLoginRoute || isForgetPasswordRoute || isProductsRoute
    "
  />
  <!-- Forcing the router-view to recreate its components to redirect the page -->
  <RouterView :key="$route.fullPath" />
  <NavigationFooter />
</template>

<style scoped></style>
