<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import api from '../services/api'
import type { Client, Collaborateur, ApiError } from '@/types'

const emit = defineEmits(['transaction-added'])

const errorMessage = ref('')
const isSubmitting = ref(false)

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
  isSubmitting.value = true
  errorMessage.value = ''
  try {
    const response = await api.post('/transactions', transaction)
    emit('transaction-added', response.data)

    // Reset form
    transaction.date = ''
    transaction.montant = ''
    transaction.payee = false
    transaction.clientId = ''
    transaction.collaborateurId = ''
  } catch (error: unknown) {
    const err = error as ApiError
    errorMessage.value = err.response?.data?.message || 'An unexpected error occurred.'
    console.error('There was an error creating the transaction!', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchClients()
  fetchCollaborateurs()
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mt-4 max-w-md" aria-live="polite">
    <h3 class="text-xl font-bold mb-4">Add Transaction</h3>

    <div
      v-if="errorMessage"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline">{{ errorMessage }}</span>
    </div>

    <div class="mb-4">
      <label for="date" class="block mb-1 font-bold">Date</label>
      <input
        id="date"
        name="date"
        v-model="transaction.date"
        type="date"
        required
        class="w-full p-2 border border-gray-300 rounded"
        :aria-invalid="errorMessage ? 'true' : 'false'"
        aria-describedby="date-error"
      />
      <p v-if="errorMessage" id="date-error" class="text-red-500 text-xs italic">
        {{ errorMessage }}
      </p>
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
        :aria-invalid="errorMessage ? 'true' : 'false'"
        aria-describedby="montant-error"
      />
      <p v-if="errorMessage" id="montant-error" class="text-red-500 text-xs italic">
        {{ errorMessage }}
      </p>
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
        :aria-invalid="errorMessage ? 'true' : 'false'"
        aria-describedby="client-error"
      >
        <option value="">Select a client</option>
        <option v-for="client in clients" :key="client.id" :value="client.id">
          {{ client.nom }}
        </option>
      </select>
      <p v-if="errorMessage" id="client-error" class="text-red-500 text-xs italic">
        {{ errorMessage }}
      </p>
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
        :aria-invalid="errorMessage ? 'true' : 'false'"
        aria-describedby="collaborateur-error"
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
      <p v-if="errorMessage" id="collaborateur-error" class="text-red-500 text-xs italic">
        {{ errorMessage }}
      </p>
    </div>

    <button
      type="submit"
      class="py-2 px-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 disabled:bg-gray-400"
      :disabled="isSubmitting"
    >
      <span v-if="isSubmitting">Adding...</span>
      <span v-else>Add Transaction</span>
    </button>
  </form>
</template>
