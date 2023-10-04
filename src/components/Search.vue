<script setup lang="ts">
import PopularSearches from "../assets/PopularSearches.json";
import BrowseCategories from "../assets/BrowseCategories.json";

//Emit the request to parent component, and parent will update the state
const emit = defineEmits(["close-search"]);
const handleCloseSearch = () => {
  emit("close-search");
};
</script>

<template>
  <div class="search-wrap">
    <div class="search-bg-color">
      <div class="search-height">
        <div class="toggle-off" @click="handleCloseSearch">
          <i class="fa-solid fa-xmark" style="color: #636363"></i>
        </div>
        <div class="search-align-center">
          <div class="search-bar-wrap">
            <form>
              <div class="input-border-bottom">
                <input type="search" placeholder="Search our store" />
                <button type="submit">
                  <i
                    class="fa-solid fa-magnifying-glass"
                    style="color: #636363"
                  ></i>
                </button>
              </div>
            </form>
            <div class="result-wrap">
              <div class="results-popular">
                <p class="results-popular__title">Popular searches</p>
                <ul class="results-popular__links">
                  <li v-for="item in PopularSearches" :key="item.name">
                    <a :href="item.linkUrl">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="results-popular">
                <p class="results-popular__title">Browse categories</p>
                <ul class="results-popular__links">
                  <li v-for="item in BrowseCategories" :key="item.name">
                    <a :href="item.linkUrl">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bg-color {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.toggle-off {
  position: absolute;
  right: 0;
  font-size: 25px;
  padding: 25px 40px;
}
.search-height {
  max-height: 100vh;
  height: 100%;
}
.search-align-center {
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-bar-wrap {
  max-width: 63vw;
}
.search-bar-wrap form {
  padding-bottom: 20px;
}
.input-border-bottom {
  border-bottom: 2px solid #d3d3d3;
}
.input-border-bottom input {
  color: #636363;
  width: 60vw;
  height: 50px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  outline: none;
  font-size: 24px;
}
.input-border-bottom button {
  font-size: 25px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
}
.result-wrap {
  color: #636363;
}
.results-popular {
  padding: 20px 0;
}
.results-popular ul {
  padding: 0;
  margin: 0;
}
.results-popular ul li {
  display: inline-block;
  font-size: 24px;
  list-style: none;
  padding-right: 20px;
}
.results-popular ul li a {
  text-decoration: none;
  color: #636363;
}
@media only screen and (max-width: 1300px) {
  .search-bar-wrap {
    max-width: 65vw;
  }
}
@media only screen and (max-width: 768px) {
  .search-bar-wrap {
    max-width: 70vw;
  }
  .result-wrap {
    display: none;
  }
}
@media only screen and (max-width: 400px) {
  .search-bar-wrap {
    max-width: 75vw;
  }
}
</style>
