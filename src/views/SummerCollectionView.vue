<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import fullCollection from "@/assets/FullCollection.json";

// Filter items where "summer" is true
const summerCollection = computed(() =>
  fullCollection.filter((item) => item.season.summer)
);

//Loading items by scrolling down, 8 for each load
const displayedItems = ref(8);
const isLoading = ref(false);

//Count if all items in the list have been loaded
const allItemsLoaded = computed(
  () => displayedItems.value >= summerCollection.value.length
);

const loadMore = () => {
  if (
    !isLoading.value &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
  ) {
    isLoading.value = true;
    // Use a timeout to simulate async loading behavior. You can replace this with actual async calls if needed.
    setTimeout(() => {
      displayedItems.value += 8;
      isLoading.value = false;
    }, 1000); // Simulate a 1 second loading time
  }
};
onMounted(() => {
  window.addEventListener("scroll", loadMore);
});
onUnmounted(() => {
  window.removeEventListener("scroll", loadMore);
});
</script>

<template>
  <div class="full-collection">
    <div class="main-banner-wrap">
      <div class="main-banner-img">
        <div class="main-title">
          <h1>SUMMER COLLECTION</h1>
        </div>
      </div>
    </div>
    <div class="product-width">
      <div class="product-wrap">
        <div
          class="product-item"
          v-for="item in summerCollection.slice(0, displayedItems)"
          :key="item.name"
        >
          <a :href="'#/products/productId=' + item.id">
            <div class="coming-soon-tag" v-if="item.comingsoon">
              COMING SOON
            </div>
            <img :src="item.image" />
            <div class="text-wrap">
              <h4>{{ item.name }}</h4>
              <p>${{ item.price }}</p>
            </div>
          </a>
        </div>
      </div>
      <div v-if="isLoading && !allItemsLoaded" class="loading-icon-wrap">
        <img src="/loadingIcon.gif" alt="Loading..." />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-banner-img {
  position: relative;
  background-image: url(../assets/images/banner_5.jpg);
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 10%;
}
.main-banner-img::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
}
.main-title {
  position: absolute;
  color: #fff;
  font-size: 24px;
  text-align: center;
}
.product-width {
  width: 100%;
  max-width: 1600px;
  margin: 50px auto;
  padding: 50px 15px;
}
.product-wrap {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2rem 1rem;
}
.product-item a {
  text-decoration: none;
  color: #111;
}
.product-item img {
  width: 100%;
  max-height: 380px;
  height: 100%;
  object-fit: contain;
}
.text-wrap {
  text-align: center;
}

.coming-soon-tag {
  position: absolute;
  padding: 5px 10px;
  background-color: #ebe7ea;
}
.loading-icon-wrap {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.loading-icon-wrap img {
  width: 10%;
}
@media only screen and (max-width: 768px) {
  .product-wrap {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem 1rem;
  }
  .main-title {
    font-size: 16px;
  }
  .product-item {
    padding-bottom: 50px;
  }
  .product-item img {
    max-height: 300px;
  }
}
</style>
