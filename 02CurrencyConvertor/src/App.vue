<template>
  <div
    class="min-h-screen flex justify-center items-center bg-cover bg-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="w-full max-w-lg bg-white rounded-xl shadow-xl p-6 backdrop-blur-md bg-opacity-80">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Currency Converter</h1>

      <form @submit.prevent="convert">
        <!-- From Input -->
        <div class="mb-6">
          <div class="bg-gray-100 p-4 rounded-lg shadow-inner flex items-center gap-4">
            <div class="w-2/3">
              <label class="block text-sm text-gray-600 font-medium mb-1">From</label>
              <input
                type="number"
                v-model="amount"
                placeholder="Enter amount"
                class="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>

            <div class="w-1/3">
              <label class="block text-sm text-gray-600 font-medium mb-1">Currency</label>
              <select
                v-model="from"
                class="w-full px-2 py-2 border rounded-md bg-white outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              >
                <option v-for="currency in currencyOptions" :value="currency" :key="currency">
                  {{ currency.toUpperCase() }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Swap Button -->
        <div class="flex justify-center items-center mb-6">
          <button
            type="button"
            @click="swap"
            class="bg-teal-600 hover:bg-teal-700 text-white text-2xl font-bold p-3 rounded-full shadow-lg transform transition-transform hover:scale-105"
          >
            ↔
          </button>
        </div>

        <!-- To Input -->
        <div class="mb-6">
          <div class="bg-gray-100 p-4 rounded-lg shadow-inner flex items-center gap-4">
            <div class="w-2/3">
              <label class="block text-sm text-gray-600 font-medium mb-1">To</label>
              <input
                type="number"
                v-model="convertedAmount"
                placeholder="Converted amount"
                class="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                disabled
              />
            </div>

            <div class="w-1/3">
              <label class="block text-sm text-gray-600 font-medium mb-1">Currency</label>
              <select
                v-model="to"
                class="w-full px-2 py-2 border rounded-md bg-white outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              >
                <option v-for="currency in currencyOptions" :value="currency" :key="currency">
                  {{ currency.toUpperCase() }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Convert Button -->
        <button
          type="submit"
          class="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-3 rounded-lg shadow-lg transition-colors"
        >
          Convert
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import backgroundImage from './assets/image.png';

export default {
  setup() {
    const amount = ref(0);
    const from = ref("usd");
    const to = ref("inr");
    const convertedAmount = ref(0);

    const currencyInfo = ref({});
    const currencyOptions = computed(() => Object.keys(currencyInfo.value));

    const fetchCurrencyInfo = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${from.value}.json`
        );
        const result = await response.json();
        currencyInfo.value = result[from.value];
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    watchEffect(() => {
      fetchCurrencyInfo();
    });

    const swap = () => {
      const temp = from.value;
      from.value = to.value;
      to.value = temp;
      convertedAmount.value = amount.value;
      amount.value = convertedAmount.value;
    };

    const convert = () => {
      convertedAmount.value = amount.value * (currencyInfo.value[to.value] || 0);
    };

    return {
      amount,
      from,
      to,
      convertedAmount,
      currencyOptions,
      swap,
      convert,
      backgroundImage
    };
  }
};
</script>

<style scoped>
/* Custom styles */
</style>
