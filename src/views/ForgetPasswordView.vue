<script lang="ts">
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    handleResetPassword() {
      // Here, you can process the input.
      // For this example, I'll just log the entered data.
      console.log("Email:", this.email);
      // Typically, you'd send this data to a server for authentication.
    },
  },
};
</script>

<template>
  <div class="forget-password">
    <div class="forget-password-wrap">
      <h2>Reset your password</h2>
      <form @submit.prevent="handleResetPassword">
        <div class="forget-password-email-wrap">
          <input
            v-model="email"
            type="text"
            placeholder="Email"
            id="email"
            required
          />
        </div>
        <button class="forget-password-button" type="submit">SUBMIT</button>
      </form>
      <div class="message-links">
        <div class="forget-password-cancel"><a href="/login">Cancel</a></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forget-password {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0;
}
.forget-password-wrap h2 {
  font-size: 32px;
  font-weight: 500;
  padding-bottom: 20px;
}
.forget-password-wrap input {
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
.forget-password-button {
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
  .forget-password-wrap input {
    max-width: 80vw;
  }
  .forget-password-button {
    width: 80vw;
  }
}
</style>
