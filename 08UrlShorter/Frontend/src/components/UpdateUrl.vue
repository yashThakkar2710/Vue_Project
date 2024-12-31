<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
      <h1 class="text-3xl font-semibold mb-4 text-center">Update URL</h1>
      <form @submit.prevent="handleUpdate">
        <input
          v-model="shortUrl"
          placeholder="Enter short URL"
          required
          class="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <input
          v-model="longUrl"
          placeholder="Enter new long URL"
          required
          class="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Update URL
        </button>
      </form>
    </div>
    <div v-if="showUrl" class="mt-4">
      <h1 class="font-bold text-lg">Updated URL:</h1>
      <p class="text-gray-800">{{ newLongUrl }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "UpdateUrl",
  data() {
    return {
      longUrl: "",
      shortUrl: "",
      newLongUrl: "",
      showUrl: false,
    };
  },
  setup() {
    const route = useRoute();
    const userId = route.params.userId;
    return { userId };
  },
  methods: {
    async handleUpdate() {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/v1/url/update-url/${this.userId}`,
          { shortId: this.shortUrl, originalUrl: this.longUrl },
          { withCredentials: true }
        );
        this.newLongUrl = response.data.data.originalUrl;
        this.showUrl = true;
      } catch (error) {
        console.error("Error updating URL:", error);
        alert("Failed to update the URL. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
