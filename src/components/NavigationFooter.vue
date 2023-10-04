<script setup lang="ts">
import footerNavItems from "@/assets/FooterNavItems.json";
import socialMedia from "@/assets/SocialMedia.json";
</script>

<template>
  <div class="navigation-footer">
    <footer>
      <div class="footer-content-wrap">
        <div class="footer-content">
          <div class="logo-wrap">
            <img
              alt="Vue logo"
              class="logo"
              src="@/assets/logo.svg"
              width="50"
              height="50"
            />
          </div>
          <div class="nav-wrap">
            <nav>
              <ul>
                <li v-for="item in footerNavItems" :key="item.name">
                  <RouterLink :to="item.link">{{ item.name }}</RouterLink>
                </li>
              </ul>
            </nav>
          </div>
          <div class="footer-bottom">
            <div class="content-wrap">
              <div class="social">
                <div
                  class="icon-wrap"
                  v-for="icon in socialMedia"
                  :key="icon.name"
                >
                  <a :href="icon.link"><img :src="icon.image" /></a>
                </div>
              </div>
              <div class="copyright"><p>© 2023, Chris Heria.</p></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer-content-wrap {
  display: block;
  background-color: #f0eeea;
}
.footer-content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 0 60px 0;
}
.footer-content .logo-wrap {
  padding-bottom: 20px;
}
.logo-wrap,
.nav-wrap {
  padding-left: 40px;
}
.footer-content ul {
  padding: 0;
}
.footer-content li {
  list-style: none;
  padding-bottom: 10px;
}
.footer-content li a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
}
.footer-content li a:hover {
  color: #111;
}
.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}

.social {
  display: flex;
  justify-content: center;
  align-items: center;
}
.social .icon-wrap {
  padding: 50px 10px 20px 10px;
}
.social .icon-wrap a img {
  transition: opacity 0.3s ease;
}
.social .icon-wrap a:hover img {
  opacity: 0.7;
}
.social img {
  width: 40px;
  height: 40px;
}
.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 768px) {
  .logo-wrap,
  .nav-wrap {
    padding-left: 40px;
  }
}
</style>
