<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import navBarItems from "@/assets/NavBarItems.json";
import { ref, onMounted, onUnmounted, computed } from "vue";
import ShoppingCart from "./ShoppingCart.vue";
import Search from "./Search.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//White background for header when scrolling down
const scrolled = ref(false);

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 50;
  };

  window.addEventListener("scroll", handleScroll);

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    document.body.style.overflow = "";
  });
});

// define 'darkTextStyle' props type: parent component(App.vue) will set the value and pass it to here
const props = defineProps({
  darkTextStyle: {
    type: Boolean,
    default: false,
  },
});
//Locking the scroll when Search menu is toggled on
const isSearchToggleOn = ref(false);
const handleSearchToggle = () => {
  isSearchToggleOn.value = !isSearchToggleOn.value;
  if (isSearchToggleOn.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

//Locking the scroll when mobile menu is toggled on
const isNavToggleOn = ref(false);
const handleNavToggle = () => {
  isNavToggleOn.value = !isNavToggleOn.value;
  if (isNavToggleOn.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};
//Locking the scroll when mobile cart is toggled on
const isCartToggleOn = ref(false);
const handleCartToggle = () => {
  isCartToggleOn.value = !isCartToggleOn.value;
  if (isCartToggleOn.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

//Clicking anywhere outside the region to toggle off the mobile menu or cart
const handleOverlayClick = () => {
  isNavToggleOn.value = false;
  isCartToggleOn.value = false;
  document.body.style.overflow = "";
};

// Log out
const store = useStore();
const router = useRouter();
const isLoggedIn = computed(() => store.state.moduleMember.user.isLoggedIn);
const handleLogOutClick = () => {
  if (!isLoggedIn.value) {
    router.push("/login");
  }
  store.dispatch("moduleMember/logout");
};
</script>

<template>
  <!-- 使用:key="isLoggedIn"來強迫整個導覽列重新渲染以更新isLoggedIn狀態 -->
  <div
    :class="{ 'white-bg': scrolled }"
    class="navigation-header"
    :key="isLoggedIn"
  >
    <header :class="{ 'dark-text-navbar': props.darkTextStyle }">
      <div class="logo-wrap">
        <a href="/">
          <img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="50"
            height="50"
        /></a>
      </div>
      <div class="nav-wrap">
        <nav class="nav-flex">
          <ul>
            <li v-for="item in navBarItems" :key="item.name">
              <RouterLink :to="item.link">{{ item.name }}</RouterLink>
            </li>
          </ul>
          <div class="header-icons">
            <div
              :class="{ 'white-bg': scrolled, 'black-bg': !scrolled }"
              class="header-icon-item header-icon-size search"
              @click="handleSearchToggle"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <a @click="handleLogOutClick"
              ><div
                :class="{ 'white-bg': scrolled, 'black-bg': !scrolled }"
                class="header-icon-item header-icon-size user"
              >
                <i class="fa-solid fa-user"></i></div
            ></a>
            <div
              :class="{ 'white-bg': scrolled, 'black-bg': !scrolled }"
              class="header-icon-item header-icon-size shoppingCart"
              @click="handleCartToggle"
            >
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </nav>
      </div>
      <div class="nav-wrap-mobile">
        <div
          :class="{ 'white-bg': scrolled, 'black-bg': !scrolled }"
          class="mobile-nav-icon-padding header-icon-size burgar"
          @click="handleNavToggle"
        >
          <i class="fa-solid fa-bars"></i>
        </div>
        <div
          :class="{ 'white-bg': scrolled, 'black-bg': !scrolled }"
          class="mobile-nav-icon-padding header-icon-size shoppingCart"
          @click="handleCartToggle"
        >
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
      <div class="navigation-drawer" :class="{ show: isNavToggleOn }">
        <div class="drawer-header">
          <div class="logo-wrap">
            <img
              alt="Vue logo"
              class="logo"
              src="@/assets/logo.svg"
              width="50"
              height="50"
            />
          </div>
          <div class="cross header-icon-size" @click="handleNavToggle">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
        <ul class="mobile-page-wrap">
          <li v-for="item in navBarItems" :key="item.name">
            <RouterLink :to="item.link">{{ item.name }}</RouterLink>
          </li>
        </ul>
        <!-- Event Delegation -->
        <ul class="mobile-user-wrap" @click="handleNavToggle">
          <li><a href="/login">Log in</a></li>
          <li><a href="/signup">Create account</a></li>
          <li><a @click="handleSearchToggle">Search</a></li>
        </ul>
      </div>
      <div class="mobile-cart-drawer" :class="{ show: isCartToggleOn }">
        <div class="drawer-header">
          <div class="cart-title">
            <p>Cart</p>
          </div>
          <div class="cross header-icon-size" @click="handleCartToggle">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>

        <div>
          <div class="product-wrap">
            <ShoppingCart />
            <div class="payment-option">
              <div><a>CHECK OUT</a></div>
              <div><a>SHOP Pay</a></div>
              <div><a>Paypal</a></div>
              <div><a>G Pay</a></div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="overlay-dark-bg"
        v-if="isNavToggleOn || isCartToggleOn"
        @click="handleOverlayClick"
      ></div>
    </header>
    <div class="search-bar" :class="{ show: isSearchToggleOn }">
      <Search @close-search="handleSearchToggle" />
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: none;
}
.search-bar.show {
  display: block;
}
.dark-text-navbar .nav-wrap ul li a {
  color: #505050;
}
.dark-text-navbar .nav-wrap .header-icons .black-bg svg {
  color: #505050;
}
.dark-text-navbar .nav-wrap-mobile .black-bg svg {
  color: #505050;
}
.payment-option {
  text-align: center;
}
.payment-option a {
  display: block;
  color: #fff;
  margin: 10px 20px;
  padding: 10px 40px;
  background-color: #363636;
}
.navigation-header {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  z-index: 999;
  height: 80px;
  transition: background-color 0.3s;
}
.navigation-header.white-bg {
  background-color: white;
}

header {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: transparent;
  height: inherit;
  padding: 0 60px;
}
.nav-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.nav-wrap ul {
  display: flex;
}
.nav-wrap ul li {
  list-style: none;
}
.nav-wrap ul li a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 0 20px;
}

.nav-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-icons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-icon-item {
  padding: 0 15px;
}

.navigation-header.white-bg .nav-wrap ul li a {
  color: #505050;
}
.nav-wrap .header-icons .white-bg svg {
  color: #505050;
}
.nav-wrap .header-icons .black-bg svg {
  color: #fff;
}
.nav-wrap-mobile .white-bg svg {
  color: #505050;
}
.nav-wrap-mobile .black-bg svg {
  color: #fff;
}
.nav-wrap-mobile {
  display: none;
}
.header-icon-size {
  font-size: 25px;
}
.mobile-nav-icon-padding {
  padding: 15px;
}
.nav-wrap-mobile {
  z-index: 103;
}
.navigation-drawer {
  position: absolute;
  background-color: #fff;
  top: 0;
  right: 0;
  height: 100vh;
  width: 60vw;
  z-index: 101;
}
.navigation-drawer {
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}
.navigation-drawer.show {
  transform: translateX(0);
}
.navigation-drawer .drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
}

.mobile-cart-drawer {
  position: absolute;
  background-color: #fff;
  top: 0;
  right: 0;
  height: 100vh;
  width: 320px;
  z-index: 101;
}
.mobile-cart-drawer {
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}
.mobile-cart-drawer.show {
  transform: translateX(0);
}

.mobile-cart-drawer .drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px;
  padding: 20px 0;
  border-bottom: #d1d1d1 2px solid;
}
.navigation-drawer ul li {
  list-style: none;
}
.navigation-drawer ul li a {
  text-decoration: none;
}
.navigation-drawer .mobile-page-wrap {
  margin-bottom: 20px;
}
.navigation-drawer .mobile-page-wrap li {
  padding-bottom: 20px;
}
.navigation-drawer .mobile-page-wrap li a {
  color: #636363;
  font-size: 28px;
  font-weight: 400;
}
.navigation-drawer .mobile-user-wrap li {
  padding-bottom: 10px;
}
.navigation-drawer .mobile-user-wrap li a {
  color: #636363;
  cursor: pointer;
}
.overlay-dark-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
@media only screen and (max-width: 768px) {
  .nav-wrap {
    display: none;
  }
  .nav-wrap-mobile {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 99;
  }
  .navigation-drawer .mobile-page-wrap li a {
    font-size: 24px;
  }
}
</style>
