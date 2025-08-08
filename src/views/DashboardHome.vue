<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../services/api'
import type { Summary } from '@/types'

const summary = ref<Summary>({
  total: 0,
  totalPayee: 0,
  totalNonPayee: 0,
})

const fetchSummary = async () => {
  try {
    const response = await api.get('/transactions/summary')
    summary.value = response.data
  } catch (error) {
    console.error('There was an error fetching the transaction summary!', error)
  }
}

onMounted(() => {
  fetchSummary()
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard Summary</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-gray-500 text-sm font-medium mb-2">Total Amount</h2>
        <p class="text-3xl font-bold">{{ summary.total }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-gray-500 text-sm font-medium mb-2">Total Paid</h2>
        <p class="text-3xl font-bold">{{ summary.totalPayee }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-gray-500 text-sm font-medium mb-2">Total Unpaid</h2>
        <p class="text-3xl font-bold">{{ summary.totalNonPayee }}</p>
      </div>
    </div>
  </div>
</template>
