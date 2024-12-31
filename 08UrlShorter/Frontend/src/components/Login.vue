<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
    <div class="w-full max-w-md">
      <div class="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
        <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              v-model="formData.email"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="you@example.com"
            />
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              v-model="formData.password"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Logging in...' : 'Log In' }}
          </button>
        </form>
        <div class="mt-4 text-center">
          Don't have an account? 
          <router-link to="/" class="text-purple-400 hover:text-purple-300 transition">
            Sign up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      formData: {
        email: "",
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

      const { email, password } = this.formData;

      if (!email || !password) {
        this.error = "Both fields are required";
        this.loading = false;
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/login",
          { email, password },
          { withCredentials: true }
        );

        if (response.data.success) {
          console.log("Logged in successfully:", response.data);

          // Store user or tokens if needed
          const { user, accessToken } = response.data.data;

          // Optionally save tokens to localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("user", JSON.stringify(user));

          // Navigate to home page
          this.$router.push("/home");
        } else {
          this.error = response.data.message || "Login failed";
        }
      } catch (err) {
        console.error("An error occurred during login:", err);
        this.error = "An error occurred. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
