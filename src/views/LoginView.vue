<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const store = useStore();
const router = useRouter();

//Randomly generate a token(not secure)
function generateRandomToken(length = 32) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const handleLogin = () => {
  if (email.value === "admin" && password.value === "admin") {
    const FIXED_TOKEN = generateRandomToken(64);
    const user = {
      email: email.value,
      token: FIXED_TOKEN,
    };
    store.dispatch("moduleMember/login", user);
    console.log("logged in successfully");
    console.log("Is logged in:", store.state.moduleMember.user.isLoggedIn);
    router.push("/");
  } else {
    console.error("Invalid email or password");
  }
};

const handleLogout = () => {
  store.dispatch("moduleMember/logout");
};
</script>

<template>
  <div class="login">
    <div class="login-wrap">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="login-email-wrap">
          <input
            v-model="email"
            type="text"
            placeholder="Email"
            id="email"
            required
          />
        </div>
        <div class="login-password-wrap">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            id="password"
            required
          />
        </div>
        <button class="login-button" type="submit">SIGN IN</button>
      </form>
      <div class="message-links">
        <div class="forget-password-message">
          <a href="#/forget-password">Forgot your password?</a>
        </div>
        <div class="create-account"><a href="#/signup">Create account</a></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0;
}
.login-wrap h2 {
  font-size: 32px;
  font-weight: 500;
  padding-bottom: 20px;
}
.login-wrap input {
  max-width: 50vw;
  width: 500px;
  font-size: 18px;
  background: none;
  border: 1px solid #d3d3d3;
  outline: none;
  padding: 15px;
  margin: 5px 0;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.login-button {
  background-color: #111;
  font-size: 16px;
  color: #fff;
  padding: 15px 40px;
  margin: 10px 0;
  border: none;
}
.message-links {
  display: flex;
  align-items: center;
}
.message-links div {
  padding: 0 5px;
}
.message-links a {
  color: #969696;
  text-decoration: none;
}

@media (max-width: 480px) {
  .login-wrap input {
    max-width: 80vw;
  }
  .login-button {
    width: 80vw;
  }
}
</style>
