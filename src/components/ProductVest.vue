<script setup lang="ts">
import items from "@/assets/FullCollection.json";
</script>

<template>
  <div class="product-section-1">
    <div class="product-width">
      <div class="product-wrap">
        <div class="product-item" v-for="item in items" :key="item.name">
          <a :href="'/products/productId=' + item.id">
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
      <div class="product-button">
        <a href="/full-collection">VIEW COLLECTION</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-width {
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 15px;
}
.product-wrap {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2rem 1rem;
}

.product-item {
  box-sizing: border-box;
}
.coming-soon-tag {
  position: absolute;
  padding: 5px 10px;
  background-color: #ebe7ea;
}
.product-item img {
  width: 100%;
  max-height: 335px;
  height: 100%;
  object-fit: contain;
}
.product-item a {
  text-decoration: none;
  color: #111;
}
.text-wrap {
  text-align: center;
}
.product-button {
  margin: 40px 0;
  text-align: center;
}
.product-button a {
  text-decoration: none;
  padding: 10px 20px;
  background-color: #111;
  color: #fff;
  border: 1px solid #111;
  transition: color 0.3s, background-color 0.3s;
}
.product-button a:hover {
  background-color: #fff;
  color: #111;
}

@media only screen and (max-width: 1024px) {
  .product-wrap {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem 1rem;
  }
  .product-item {
    padding-bottom: 50px;
  }
  .product-item img {
    max-height: 300px;
  }
}
</style>
