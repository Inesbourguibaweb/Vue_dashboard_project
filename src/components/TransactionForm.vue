<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import api from '../services/api'
import type { Client, Collaborateur } from '@/types'

const emit = defineEmits(['transaction-added'])

const transaction = reactive({
  date: '',
  montant: '',
  payee: false,
  clientId: '',
  collaborateurId: '',
})

const clients = ref<Client[]>([])
const collaborateurs = ref<Collaborateur[]>([])

const fetchClients = async () => {
  try {
    const response = await api.get('/clients')
    clients.value = response.data
  } catch (error) {
    console.error('Error fetching clients', error)
  }
}

const fetchCollaborateurs = async () => {
  try {
    const response = await api.get('/collaborateurs')
    collaborateurs.value = response.data
  } catch (error) {
    console.error('Error fetching collaborateurs', error)
  }
}

const handleSubmit = async () => {
  try {
    const response = await api.post('/transactions', transaction)
    emit('transaction-added', response.data)

    // Reset form
    transaction.date = ''
    transaction.montant = ''
    transaction.payee = false
    transaction.clientId = ''
    transaction.collaborateurId = ''
  } catch (error) {
    console.error('There was an error creating the transaction!', error)
  }
}

onMounted(() => {
  fetchClients()
  fetchCollaborateurs()
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mt-4 max-w-md">
    <h3 class="text-xl font-bold mb-4">Add Transaction</h3>

    <div class="mb-4">
      <label for="date" class="block mb-1 font-bold">Date</label>
      <input
        id="date"
        name="date"
        v-model="transaction.date"
        type="date"
        required
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div class="mb-4">
      <label for="montant" class="block mb-1 font-bold">Amount</label>
      <input
        id="montant"
        name="montant"
        v-model="transaction.montant"
        type="number"
        required
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div class="mb-4">
      <label class="flex items-center">
        <input type="checkbox" name="payee" v-model="transaction.payee" class="mr-2" />
        Paid
      </label>
    </div>

    <div class="mb-4">
      <label for="clientId" class="block mb-1 font-bold">Client</label>
      <select
        id="clientId"
        name="clientId"
        v-model="transaction.clientId"
        required
        class="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Select a client</option>
        <option v-for="client in clients" :key="client.id" :value="client.id">
          {{ client.nom }}
        </option>
      </select>
    </div>

    <!-- Collaborator -->
    <div class="mb-4">
      <label for="collaborateurId" class="block mb-1 font-bold">Collaborator</label>
      <select
        id="collaborateurId"
        name="collaborateurId"
        v-model="transaction.collaborateurId"
        required
        class="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Select a collaborator</option>
        <option
          v-for="collaborateur in collaborateurs"
          :key="collaborateur.id"
          :value="collaborateur.id"
        >
          {{ collaborateur.nom }}
        </option>
      </select>
    </div>

    <button
      type="submit"
      class="py-2 px-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700"
    >
      Add Transaction
    </button>
  </form>
</template>
