<script lang="ts">
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  },
  methods: {
    handleSignup() {
      // Here, you can process the input.
      // For this example, I'll just log the entered data.
      console.log("First name:", this.firstname);
      console.log("Last name:", this.lastname);
      console.log("Email:", this.email);
      console.log("Password:", this.password);
      // Typically, you'd send this data to a server for authentication.
    },
  },
};
</script>

<template>
  <div class="signup">
    <div class="signup-wrap">
      <h2>Create Account</h2>
      <form @submit.prevent="handleSignup">
        <div class="signup-firstname-wrap">
          <input
            v-model="firstname"
            type="text"
            placeholder="First Name"
            id="firstname"
            required
          />
        </div>
        <div class="signup-lastname-wrap">
          <input
            v-model="lastname"
            type="text"
            placeholder="Last Name"
            id="lastname"
            required
          />
        </div>
        <div class="signup-email-wrap">
          <input
            v-model="email"
            type="text"
            placeholder="Email"
            id="email"
            required
          />
        </div>
        <div class="signup-password-wrap">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            id="password"
            required
          />
        </div>
        <button class="signup-button" type="submit">CREATE</button>
      </form>
      <div class="message-links">
        <div class="return-to-store-message">
          <a href="/">Return to Store</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0;
}
.signup-wrap h2 {
  font-size: 32px;
  font-weight: 500;
  padding-bottom: 20px;
}
.signup-wrap input {
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
.signup-button {
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
  .signup-wrap input {
    max-width: 80vw;
  }
  .signup-button {
    width: 80vw;
  }
}
</style>
