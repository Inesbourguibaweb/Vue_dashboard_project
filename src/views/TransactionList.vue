<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../services/api'
import TransactionForm from '../components/TransactionForm.vue'
import type { Transaction } from '@/types'

const transactions = ref<Transaction[]>([])

const fetchTransactions = async () => {
  try {
    const response = await api.get('/transactions')
    transactions.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions', error)
  }
}

const handleTransactionAdded = (newTransaction: Transaction) => {
  transactions.value.push(newTransaction)
}

onMounted(() => {
  fetchTransactions()
})
</script>

<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Transactions</h2>
    <TransactionForm @transaction-added="handleTransactionAdded" />
    <ul class="mt-6 divide-y divide-gray-200">
      <li v-for="transaction in transactions" :key="transaction.id" class="py-4">
        <p class="text-lg font-semibold">Amount: {{ transaction.montant }}</p>
        <p class="text-sm text-gray-600">
          Date: {{ transaction.date }} - {{ transaction.payee ? 'Paid' : 'Not Paid' }}
        </p>
      </li>
    </ul>
  </div>
</template>
