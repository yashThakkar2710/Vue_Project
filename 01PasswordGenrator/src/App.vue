<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-gray-800 rounded-lg shadow-md p-6 text-orange-400">
      <h1 class="text-2xl font-semibold text-center text-white mb-6">
        Password Generator
      </h1>

      <!-- Password Display -->
      <div class="mb-4">
        <div class="flex items-center bg-gray-700 rounded-lg overflow-hidden">
          <input
            type="text"
            v-model="password"
            class="w-full bg-transparent text-white py-2 px-3 outline-none"
            readonly
            ref="passwordRef"
          />
          <button
            @click="copyPasswordToClipboard"
            class="bg-blue-600 text-white px-4 py-2 hover:bg-blue-500 transition"
          >
            Copy
          </button>
        </div>
      </div>

      <!-- Length Slider -->
      <div class="mb-4">
        <label class="block text-sm text-white mb-2">
          Password Length: <span class="font-semibold">{{ length }}</span>
        </label>
        <input
          type="range"
          min="6"
          max="100"
          v-model="length"
          class="w-full cursor-pointer"
        />
      </div>

      <!-- Options -->
      <div class="space-y-4">
        <div class="flex items-center">
          <input
            type="checkbox"
            v-model="numberAllowed"
            id="numberInput"
            class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="numberInput" class="ml-2 text-sm text-white font-medium">
            Include Numbers
          </label>
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            v-model="charAllowed"
            id="characterInput"
            class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="characterInput" class="ml-2 text-sm text-white font-medium">
            Include Special Characters
          </label>
        </div>
      </div>

      <!-- Generate Button -->
      <button
        @click="generatePassword"
        class="w-full mt-6 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
        Generate Password
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      length: 8,
      numberAllowed: false,
      charAllowed: false,
      password: "",
    };
  },
  methods: {
    generatePassword() {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (this.numberAllowed) str += "0123456789";
      if (this.charAllowed) str += "!@#$%^&*-_+=[]{}~`";

      for (let i = 0; i < this.length; i++) {
        const num = Math.floor(Math.random() * str.length);
        pass += str[num];
      }

      this.password = pass;
    },

    copyPasswordToClipboard() {
      const passwordRef = this.$refs.passwordRef;
      passwordRef.select();
      passwordRef.setSelectionRange(0, 999);
      window.navigator.clipboard.writeText(this.password);
      alert("Password copied to clipboard!");
    },
  },
  watch: {
    // Automatically generate password whenever any of the parameters change
    length() {
      this.generatePassword();
    },
    numberAllowed() {
      this.generatePassword();
    },
    charAllowed() {
      this.generatePassword();
    },
  },
  mounted() {
    this.generatePassword(); // Generate password when the app is first loaded
  },
};
</script>

<style scoped>
/* Custom styles */
body {
  font-family: 'Arial', sans-serif;
}
</style>
