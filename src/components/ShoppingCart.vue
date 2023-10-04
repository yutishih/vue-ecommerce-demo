<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const cart = computed(() => store.state.moduleCart.cart);
const summaryFromCart = computed(
  () => store.getters["moduleCart/summaryFromCart"]
);
// const addToCart = (product: { id: number; name: string; price: number }) => {
//   store.commit("moduleCart/addToCart", product);
// };
const incrementFromCart = (productId: number) => {
  console.log(productId);
  store.commit("moduleCart/incrementFromCart", productId);
};
const decrementFromCart = (productId: number) => {
  store.commit("moduleCart/decrementFromCart", productId);
};
const removeFromCart = (productId: number) => {
  store.commit("moduleCart/removeFromCart", productId);
};

const products = ref([]);
onMounted(async () => {
  try {
    const response = await fetch("/FullCollection.json");
    if (!response.ok) throw new Error("Failed to load products");
    products.value = await response.json();
  } catch (error) {
    console.error(error);
  }
});

// Load cart from localStorage when component is mounted
onMounted(() => {
  const savedCart = localStorage.getItem("cart") || "[]";
  //Check if the cart data is an array
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) {
        store.commit("moduleCart/loadCart", parsedCart);
      } else {
        console.error("Invalid cart data:", parsedCart);
        store.commit("moduleCart/loadCart", []);
      }
    } catch (e) {
      console.error("Failed to parse cart data:", e);
      store.commit("moduleCart/loadCart", []);
    }
  }
});
// Watch the cart and save to localStorage whenever it changes
watch(
  cart,
  (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  },
  { deep: true }
);
</script>

<template>
  <div class="shopping-cart-wrap">
    <div>
      <div v-if="cart.length <= 0" class="empty-cart-message">
        <p>Your cart is currently empty.</p>
      </div>
      <div v-else class="product-wrap">
        <div class="product-list">
          <div v-for="item in cart" :key="item.id" class="product-item">
            <div class="product-image">
              <img :src="item.image" />
              <div @click="removeFromCart(item.id)" class="remove-item">
                Remove
              </div>
            </div>
            <div class="product-info">
              <div class="product-name p-item">
                {{ item.name }}
              </div>
              <div class="product-type p-item">{{ item.type }}</div>
              <div class="product-price p-item">${{ item.price }}</div>
              <div class="product-quantity p-item">
                <a @click="decrementFromCart(item.id)"
                  ><i class="fa-solid fa-minus"></i
                ></a>
                <input type="number" min="0" v-model="item.quantity" />
                <a @click="incrementFromCart(item.id)"
                  ><i class="fa-solid fa-plus"></i
                ></a>
              </div>
            </div>
          </div>
          <div class="subtotal">
            <p>Subtotal</p>
            <p>${{ summaryFromCart }}</p>
          </div>
          <div class="shipping-message">
            Shipping & taxes calculated at checkout
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100px;
  min-width: 90px;
}
.product-quantity a {
  font-size: 18px;
  cursor: pointer;
}
.product-quantity input[type="number"] {
  width: 100%;
  font-size: 16px;
  text-align: center;
  background: none;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.product-quantity input[type="number"]::-webkit-inner-spin-button,
.product-quantity input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.product-type {
  color: #969696;
}
.product-list {
  padding-top: 20px;
}
.product-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
}
.product-info {
  padding: 0 10px;
}
.p-item {
  max-width: 150px;
  width: 100%;
  padding-bottom: 2px;
}
.subtotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 10px 20px;
}
.shipping-message {
  padding: 0 20px 10px 20px;
  font-size: 12px;
}
.remove-item {
  font-size: 12px;
  cursor: pointer;
}
.product-image img {
  width: 60px;
}
.empty-cart-message {
  padding: 30px;
}
</style>
