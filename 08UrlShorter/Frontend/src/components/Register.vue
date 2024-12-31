<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="w-full max-w-md bg-gray-800 rounded-lg p-6">
      <h1 class="text-2xl font-bold text-center text-white mb-6">
        Create an Account
      </h1>

      <div v-if="error" class="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1.5 text-gray-300">
            Username
          </label>
          <input
            type="text"
            v-model="formData.userName"
            class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 text-gray-300 focus:text-white"
            placeholder="Your username"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1.5 text-gray-300">
            Email
          </label>
          <input
            type="email"
            v-model="formData.email"
            class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 text-gray-300 focus:text-white"
            placeholder="you@example.com"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1.5 text-gray-300">
            Password
          </label>
          <input
            type="password"
            v-model="formData.password"
            class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 text-gray-300 focus:text-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200"
        >
          {{ loading ? "Creating Account..." : "Create Account" }}
        </button>
      </form>

      <div class="mt-4 text-center">
        Already have an account? 
        <router-link to="/login" class="text-purple-400 hover:text-purple-300">
          Log in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      formData: {
        email: "",
        userName: "",
        password: "",
      },
      loading: false,
      error: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.error = "";

      const { email, userName, password } = this.formData;

      if (!email || !userName || !password) {
        this.error = "All fields are required.";
        this.loading = false;
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/register",
          { email, userName, password },
          { withCredentials: true }
        );

        if (response.data.success) {
          this.formData = { email: "", userName: "", password: "" };
          this.$router.push("/home");
        } else {
          this.error = "Registration failed. Please try again.";
        }
      } catch (err) {
        this.error = "Something went wrong. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
