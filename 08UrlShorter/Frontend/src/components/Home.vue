<template>
  <div class="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4">
    <h1 class="font-bold text-2xl">Generate your short URLs</h1>
    <div class="flex flex-col gap-2">
      <input
        type="text"
        v-model="url"
        class="px-4 py-2 focus:outline-purple-600 rounded-md"
        placeholder="Enter your URL"
      />
      <button
        @click="generate"
        class="bg-purple-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white"
      >
        Generate
      </button>
      <button
        @click="showUrl"
        class="bg-purple-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white"
      >
        All URLs
      </button>
      <button
        @click="updateUrl"
        class="bg-purple-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white"
      >
        Update the URL
      </button>

      <!-- Logout Button -->
      <button
        @click="logout"
        class="bg-red-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white"
      >
        Logout
      </button>
    </div>

    <div v-if="generated">
      <span class="font-bold text-lg">www.{{ shortUrl }}.com</span>
      <!-- <code><a :href="'https://www.' + shortUrl + '.com'" target="_blank">Visit</a></code> -->
    </div>

    <div v-if="showUrls">
      <h1 class="font-bold text-lg">Your all URLs</h1>
      <span
        v-for="url in allUrls"
        :key="url"
        class="font-thin text-lg"
      >
        {{ url }}
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Shorten",
  setup() {
    const url = ref("");
    const shortUrl = ref("");
    const generated = ref(false);
    const allUrls = ref([]);
    const userId = ref(null);
    const showUrls = ref(false);
    const router = useRouter();

    // Generate short URL
    const generate = async () => {
      if (!url.value) {
        alert("Enter your URL");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/url/saveurl",
          { originalUrl: url.value },
          { withCredentials: true }
        );
        shortUrl.value = response.data.data.shortId;
        generated.value = true;
        userId.value = response.data.data.user;
      } catch (error) {
        console.error("Something went wrong", error);
      }

      url.value = "";
    };

    // Show all URLs for the logged-in user
    const showUrl = async () => {
      if (!userId.value) {
        alert("No user ID available.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/url/user-urls/${userId.value}`,
          { withCredentials: true }
        );
        const data = response.data.data;
        allUrls.value = data.map((item) => item.originalUrl);
        showUrls.value = true;
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };

    // Update URL
    const updateUrl = () => {
      router.push(`/update/${userId.value}`);
    };

    // Logout function
    const logout = () => {
      // Clear localStorage or cookies (wherever you're storing the auth data)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Redirect to login page
      router.push("/login");
    };

    return {
      url,
      shortUrl,
      generated,
      allUrls,
      showUrls,
      generate,
      showUrl,
      updateUrl,
      logout,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
