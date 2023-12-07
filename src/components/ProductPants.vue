<script setup lang="ts">
import { ref } from "vue";
import pants from "@/assets/FullCollection.json";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const settings = ref({
  itemsToShow: 1,
  snapAlign: "center",
});

const breakpoints = ref({
  700: {
    itemsToShow: 3.5,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 4,
    snapAlign: "start",
  },
});
</script>

<template>
  <div class="product-section-2">
    <div class="product-wrap-pants">
      <Carousel
        v-bind="settings"
        :breakpoints="breakpoints"
        :wrap-around="true"
        :mouseDrag="false"
      >
        <Slide v-for="item in pants" :key="item.name">
          <div class="carousel__item">
            <div class="item-wrap">
              <div class="coming-soon-tag" v-if="item.comingsoon">
                COMING SOON
              </div>
              <a :href="'#/products/productId=' + item.id"
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
    </div>
  </div>
</template>

<style scoped>
.product-wrap-pants {
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
}
.coming-soon-tag {
  position: absolute;
  padding: 5px 10px;
  background-color: #ebe7ea;
}
.product-wrap-pants img {
  width: 100%;
  max-height: 300px;
  height: 100%;
  object-fit: contain;
}
.text-wrap {
  text-align: center;
}
.item-wrap a {
  text-decoration: none;
  color: #636363;
}
</style>
