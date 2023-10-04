<script setup lang="ts">
import { effect, ref } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import homeFeaturedItems from "@/assets/HomeFeaturedItems.json";
import "vue3-carousel/dist/carousel.css";

// const name = "Breakpoints";
// const components = {
//   Carousel,
//   Slide,
//   Navigation,
// };

const settings = ref({
  itemsToShow: 1,
  snapAlign: "center",
});

const breakpoints = ref({
  480: {
    itemsToShow: 2,
    snapAlign: "start",
  },
  768: {
    itemsToShow: 3,
    snapAlign: "start",
  },
  1024: {
    itemsToShow: 4,
    snapAlign: "start",
  },
  1400: {
    itemsToShow: 5,
    snapAlign: "start",
  },
  1600: {
    itemsToShow: 6,
    snapAlign: "start",
  },
});
</script>

<template>
  <div class="home-featured-category">
    <div class="featured-category-wrap">
      <Carousel
        v-bind="settings"
        :wrap-around="true"
        :breakpoints="breakpoints"
        :mouseDrag="false"
      >
        <Slide v-for="slide in homeFeaturedItems" :key="slide.name">
          <div class="carousel__item">
            <a :href="slide.linkUrl">
              <div
                class="featured-category-item"
                :style="{
                  'background-image': 'url(' + slide.imageUrl + ')',
                }"
              >
                <h4>{{ slide.name }}</h4>
                <div class="cta-button">SHOP NOW</div>
              </div>
            </a>
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
.featured-category-wrap {
  background-color: #111;
  padding: 40px;
}
.featured-category-wrap ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}
.featured-category-wrap ul li {
  list-style: none;
  margin: 0 10px;
}
.featured-category-wrap ul li a {
  text-decoration: none;
  color: #fff;
}
.featured-category-item {
  width: 240px;
  height: 400px;
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.featured-category-item h4 {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  text-decoration: none;
  color: #fff;
  font-size: 20px;

  text-align: center;
}
.cta-button {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 14px;
  background-color: #111;
  padding: 10px 20px;
  transition: color 0.3s, background-color 0.3s;
}
.cta-button:hover {
  color: #111;
  background-color: #fff;
}
@media only screen and (max-width: 1600px) {
  .featured-category-item {
    width: 240px;
    height: 400px;
  }
}
@media only screen and (max-width: 1400px) {
  .featured-category-item {
    width: 230px;
    height: 350px;
  }
}
@media only screen and (max-width: 1024px) {
  .featured-category-item {
    width: 220px;
    height: 350px;
  }
  .featured-category-item h4 {
    font-size: 18px;
  }
  .cta-button {
    font-size: 10px;
  }
}

@media only screen and (max-width: 768px) {
  .featured-category-item {
    width: 200px;
    height: 350px;
  }
}

@media only screen and (max-width: 520px) {
  .featured-category-item {
    width: 190px;
    height: 350px;
  }
}

@media only screen and (max-width: 480px) {
  .featured-category-item {
    width: 220px;
    height: 300px;
  }
}
</style>
