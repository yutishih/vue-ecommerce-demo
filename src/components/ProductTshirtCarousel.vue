<script setup lang="ts">
import { ref } from "vue";
import Tshirts from "@/assets/FullCollection.json";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const settings = ref({
  itemsToShow: 1,
  snapAlign: <any>"center",
});

const breakpoints = ref({
  700: {
    itemsToShow: 3.5,
    snapAlign: <any>"center",
  },
  1024: {
    itemsToShow: 6,
    snapAlign: <any>"start",
  },
});
</script>

<template>
  <div class="home-product-carousel">
    <div class="product-wrap-tshirt">
      <Carousel
        v-bind="settings"
        :breakpoints="breakpoints"
        :wrap-around="true"
        :mouseDrag="false"
      >
        <Slide v-for="item in Tshirts" :key="item.name">
          <div class="carousel__item">
            <div class="item-wrap">
              <div class="coming-soon-tag" v-if="item.comingsoon">
                COMING SOON
              </div>
              <a :href="'/products/productId=' + item.id"
                ><img :src="item.image" />
                <div class="text-wrap">
                  <h4>{{ item.name }}</h4>
                  <p>${{ item.price }}</p>
                </div>
              </a>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      <div class="cta">
        <a href="/full-collection">SHOP NOW</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-product-carousel {
  padding: 20px 0;
}
.product-wrap-tshirt {
  position: relative;
  padding: 40px 0;
}
.product-wrap-tshirt img {
  width: 100%;
  max-height: 300px;
  height: 100%;
  object-fit: contain;
}
.product-wrap-tshirt .cta {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 0 0;
}
.product-wrap-tshirt .cta a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  background-color: #111;
  padding: 15px 40px;
  border: 1px solid #111;
  transition: color 0.3s, background-color 0.3s;
}
.product-wrap-tshirt .cta a:hover {
  color: #111;
  background-color: #fff;
}
.coming-soon-tag {
  position: absolute;
  padding: 5px 10px;
  background-color: #ebe7ea;
}
.item-wrap a {
  text-decoration: none;
  color: #636363;
}
</style>
