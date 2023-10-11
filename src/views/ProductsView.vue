<script setup lang="ts">
import { type Ref, ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import type { ProductTypes } from "../types/ProductTypes";

const currentSlide = ref(0);
const slideTo = (val: number) => {
  currentSlide.value = val;
};

//Vue Router
const route = useRoute();
const productId = route.params.id;

//vuex store
const store = useStore();
const fullCollection: Ref<ProductTypes[]> = ref([]);
const selectedProduct: Ref<ProductTypes> = ref(null);

onMounted(async () => {
  try {
    const response = await fetch("/FullCollection.json");
    if (!response.ok) throw new Error("Failed to load products");
    fullCollection.value = await response.json();
    filterSelectedProduct();
  } catch (error) {
    console.error(error);
  }
});
const filterSelectedProduct = () => {
  selectedProduct.value = fullCollection.value.find(
    (product) => product?.id === Number(productId)
  );
};

const cart = computed(() => store.state.cart);

const quantity = ref(1);
const addToCart = (product: ProductTypes) => {
  if (product) {
    store.commit("moduleCart/addToCart", {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity.value,
      image: product.image,
    });
    // Store the item into local, the rest code is in ShoppingCart.vue
    localStorage.setItem("cart", JSON.stringify(store.state.moduleCart.cart));
  }
};

//watch the params
watch(
  () => route.params.id,
  (newId) => {
    filterSelectedProduct();
  }
);

//Filtered items for recommendations
const recommendedItems = computed(() => {
  return fullCollection.value
    .filter((item) => item?.category === "vest")
    .slice(0, 4);
});
</script>

<template>
  <div class="products" v-if="selectedProduct">
    <div class="products-flex">
      <div class="products-wrap">
        <div class="item-wrap-grid">
          <div class="items-carousel">
            <Carousel
              id="gallery"
              :items-to-show="1"
              :wrap-around="false"
              v-model="currentSlide"
            >
              <Slide
                v-for="(imgUrl, imgName) in selectedProduct.carouselImg"
                :key="imgName"
              >
                <div class="carousel__item">
                  <img :src="imgUrl" />
                </div>
              </Slide>
              <template #addons>
                <Navigation />
              </template>
            </Carousel>

            <Carousel
              id="thumbnails"
              :items-to-show="5"
              :wrap-around="true"
              v-model="currentSlide"
              ref="carousel"
            >
              <Slide
                v-for="(imgUrl, imgName, index) in selectedProduct.carouselImg"
                :key="imgName"
              >
                <div class="carousel__item" @click="slideTo(index)">
                  <img :src="imgUrl" />
                </div>
              </Slide>
            </Carousel>
          </div>
          <div class="items-information">
            <form>
              <h5>FULL COLLECTION</h5>
              <h2>{{ selectedProduct.name }}</h2>
              <p>${{ selectedProduct.price }}</p>
              <div class="color-selection">
                <h5>Color</h5>
                <div class="color_wrap">
                  <div
                    class="color_wrap_padding"
                    v-for="(colorObj, colorName) in selectedProduct.color"
                    :key="colorName"
                  >
                    <a :href="colorObj.colorUrl">
                      <span>
                        <div
                          class="color-selection-bg-image"
                          :style="{
                            'background-image':
                              'url(' + colorObj.colorImg + ')',
                          }"
                        ></div>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="size-selection">
                <h5>Size</h5>
                <div class="size-wrap">
                  <div class="size-options">
                    <div
                      class="variant-field"
                      v-for="(sizeCode, sizeName) in selectedProduct.size"
                      :key="sizeName"
                    >
                      <input
                        :id="'size-' + sizeCode"
                        class="visually-hidden variant-input"
                        type="radio"
                        name="Size"
                        :value="sizeCode"
                      />
                      <label
                        class="variant__button-label"
                        :for="'size-' + sizeCode"
                        >{{ sizeCode }}</label
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="quantity-selection">
                <input
                  type="number"
                  min="1"
                  v-model.number="quantity"
                  placeholder="QUANTITY"
                />
              </div>
              <div class="add-to-cart-button">
                <button @click.prevent="addToCart(selectedProduct)">
                  ADD TO CART
                </button>
              </div>
            </form>
            <div class="items-desc">
              <h5>{{ selectedProduct.message?.title }}</h5>
              <p>
                {{ selectedProduct.message?.desc }}
              </p>
              <h5>{{ selectedProduct.message?.detail.title }}</h5>
              <p>{{ selectedProduct.message?.detail.text1 }}</p>
              <p>{{ selectedProduct.message?.detail.text2 }}</p>
              <p>{{ selectedProduct.message?.detail.text3 }}</p>
              <p>{{ selectedProduct.message?.detail.text4 }}</p>
              <p>{{ selectedProduct.message?.detail.text5 }}</p>
              <p>{{ selectedProduct.message?.detail.text6 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="items-recommended">
      <div class="items-recommended-wrap">
        <div class="title">
          <h3>You May Also Like</h3>
          <hr />
        </div>
        <div class="item-display">
          <div class="item-display-wrap">
            <div v-for="item in recommendedItems" :key="item?.id">
              <div class="item-wrap">
                <div class="coming-soon-tag" v-if="item?.comingsoon">
                  COMING SOON
                </div>
                <a href="#">
                  <img :src="item?.image" />
                  <div class="text-wrap">
                    <h4>{{ item?.name }}</h4>
                    <p>${{ item?.price }}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-flex {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
}
.products-wrap {
  padding: 0 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
}
.item-wrap-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 60px;
  padding: 40px 0;
}
.items-information h5 {
  font-size: 18px;
  padding-bottom: 10px;
}
.items-information h2 {
  font-size: 28px;
  padding-bottom: 10px;
}
.items-information p {
  font-size: 16px;
  padding-bottom: 10px;
}
.items-information input[type="number"] {
  font-size: 16px;
  padding: 15px;
  background: none;
  border: 1px solid #d3d3d3;
  outline: none;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.items-information input[type="number"]::-webkit-inner-spin-button,
.items-information input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.color-selection {
  padding: 10px 0;
}
.color_wrap {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
.color_wrap_padding {
  padding-right: 10px;
}
.size-wrap {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
.size-wrap a {
  padding-right: 10px;
}
.quantity-selection {
  padding-bottom: 15px;
}
.add-to-cart-button button {
  width: 75%;
  color: #fff;
  background-color: #111;
  border: 1px solid #111;
  font-size: 16px;
  padding: 20px;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s;
}
.add-to-cart-button button:hover {
  background-color: #fff;
  color: #111;
}
.items-desc {
  padding: 20px 0;
}
.items-desc h5 {
  font-weight: 500;
}
.carousel__item {
  width: 100%;
  height: auto;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel__item img {
  max-width: 100%;
  width: auto;
  height: 100%;
  cursor: pointer;
}
.carousel__slide {
  padding: 10px;
}
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
.item-display {
  margin: 0 10px;
}
.item-display-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  min-width: min-content;
}
.item-wrap {
  text-align: center;
  padding: 0 10px;
}
.item-wrap a {
  text-decoration: none;
  color: #111;
}
.item-wrap img {
  max-width: 360px;
  min-width: 250px;
  width: 100%;
}
.items-recommended-wrap {
  padding: 60px 0;
}
.items-recommended-wrap .title h3 {
  text-align: center;
}
.items-recommended-wrap .title hr {
  background-color: #ebe7df;
  border: none;
  height: 2px;
  max-width: 100px;
  width: 100%;
  margin: 20px auto;
  text-align: center;
}
.text-wrap {
  text-align: center;
}

.coming-soon-tag {
  position: absolute;
  padding: 5px 10px;
  background-color: #ebe7ea;
}

.color_wrap_padding span {
  display: inline-block;
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin: 3px 5px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.4s;
}
.color-selection-bg-image {
  width: 56px;
  height: 56px;
  background-size: cover;
  border-radius: inherit;
}
.size-options {
  display: flex;
  align-items: center;
}
.visually-hidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
}

.variant__button-label {
  display: inline-block;
  padding: 5px 15px;
  margin: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.variant-input:checked + .variant__button-label {
  border: 1px solid #464646;
}

@media (max-width: 1480px) {
  .item-display {
    overflow-x: auto;
    white-space: nowrap;
  }
  .item-display::-webkit-scrollbar {
    display: none; /* Hide scrollbar for WebKit browsers */
  }
  .item-display {
    -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer and Edge */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
  }
}

@media (max-width: 768px) {
  .item-wrap-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 60px;
  }
  .add-to-cart-button button {
    width: 100%;
  }
  .item-display .item-wrap {
    display: inline-block;
    margin-right: 10px;
  }
  .coming-soon-tag {
    display: none;
  }
}
</style>
