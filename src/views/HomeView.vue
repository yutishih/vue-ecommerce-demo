<script setup lang="ts">
import HomeCarousel from "../components/HomeCarousel.vue";
import ProductVest from "../components/ProductVest.vue";
import ProductPants from "../components/ProductPants.vue";
import ProductTshirtCarousel from "../components/ProductTshirtCarousel.vue";
</script>

<template>
  <div class="home">
    <div class="main-banner-wrap">
      <div class="main-banner-img">
        <div class="main-title">
          <h1>WEIGHT VEST</h1>
          <p>
            Improve your running speed, endurance, and muscular strength with a
            Heria weight vest.
          </p>
          <a href="/full-collection">SHOP NOW</a>
        </div>
      </div>
    </div>
    <HomeCarousel />
    <ProductVest />

    <div class="sub-banner-1">
      <div class="content-wrap">
        <div class="background-image">
          <div class="text-wrap">
            <h2>NOW AVAILABLE</h2>
            <p>
              Experience the perfect combination of comfort, style, and
              functionality in one go-to piece of activewear.
            </p>
          </div>
        </div>
      </div>
    </div>
    <ProductPants />
    <div class="sub-banner-2">
      <div class="content-wrap">
        <div class="background-image">
          <div class="text-wrap">
            <h2>T-SHIRTS & TANK TOPS</h2>
            <p>
              Exceptional softness and luxurious cotton fabrics paired with
              original designs.
            </p>
            <a href="/full-collection">SHOP NOW</a>
          </div>
        </div>
      </div>
    </div>
    <ProductTshirtCarousel />
    <div class="sub-banner-3">
      <div class="content-wrap">
        <div class="background-image">
          <div class="text-wrap">
            <a href="/full-collection">SHOP NOW</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navigation-footer {
  width: 100%;
  left: 0;
  right: 0;
  height: 500px;
}
.main-banner-img {
  position: relative;
  background-image: url(/banner_1.jpg);
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
}
.main-title {
  position: absolute;
  color: #fff;
  bottom: 0;
  text-align: center;
  left: 50%;
  transform: translate(-50%, -50%);
}
.main-title h1 {
  font-size: 48px;
}
.main-title p {
  font-size: 20px;
  margin: 0 0 20px 0;
}
.main-title a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  background-color: #111;
  padding: 15px 40px;
  border: 0px;
}
.main-title a:hover {
  color: #111;
  background-color: #fff;
  transition: 0.25s ease-in;
}

.sub-banner-1 .background-image {
  position: relative;
  height: 550px;
  background-image: url(/banner_2.jpg);
  background-size: cover;
}
.sub-banner-1 .background-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
}
.sub-banner-1 .text-wrap {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  text-align: center;
}
.sub-banner-1 .text-wrap h2 {
  color: #fff;
  font-size: 42px;
}
.sub-banner-1 .text-wrap p {
  color: #fff;
  font-size: 20px;
}

.sub-banner-2 .background-image {
  position: relative;
  background-image: url(/banner_3.jpg);
  height: 550px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 30%;
}
.sub-banner-2 .background-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
}
.sub-banner-2 .text-wrap {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.sub-banner-2 .text-wrap h2 {
  color: #fff;
  font-size: 42px;
}
.sub-banner-2 .text-wrap p {
  color: #fff;
  font-size: 20px;
  margin: 0 0 20px 0;
}

.sub-banner-2 .text-wrap a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  background-color: #111;
  padding: 15px 40px;
  border: 0px;
  transition: color 0.3s, background-color 0.3s;
}
.sub-banner-2 .text-wrap a:hover {
  background-color: #fff;
  color: #111;
}

.sub-banner-3 .background-image {
  position: relative;
  background-image: url(/banner_4.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 0;
  height: 750px;
}
.sub-banner-3 .background-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
}
.sub-banner-3 .text-wrap {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}
.sub-banner-3 .text-wrap a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  background-color: #111;
  padding: 15px 40px;
  border: 0px;
  transition: color 0.3s, background-color 0.3s;
}
.sub-banner-3 .text-wrap a:hover {
  color: #111;
  background-color: #fff;
}
@media only screen and (max-width: 768px) {
  .main-banner-img {
    background-position: 50%;
  }
  .main-title {
    width: 360px;
    transform: translate(-50%, -40%);
  }
  .main-title h1 {
    font-size: 32px;
  }
  .sub-banner-1 .text-wrap {
    width: 400px;
  }
  .sub-banner-1 .text-wrap h2 {
    font-size: 28px;
  }
  .sub-banner-2 .text-wrap {
    width: 400px;
  }
  .sub-banner-2 .text-wrap h2 {
    font-size: 28px;
  }
}
</style>
