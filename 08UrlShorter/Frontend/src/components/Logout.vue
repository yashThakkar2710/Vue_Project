<template>
  <div>
    <button @click="logout" class="bg-red-500 text-white py-2 px-4 rounded-md">
      Logout
    </button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      // Clear user data from localStorage or cookies
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user'); // Optional: remove user data

      // Redirect to login page after logout
      router.push('/login');
    };

    return {
      logout,
    };
  },
};
</script>
