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
  <form @submit.prevent="handleSubmit" class="transaction-form">
    <h3>Add Transaction</h3>

    <!-- Date -->
    <div class="form-group">
      <label for="date">Date</label>
      <input id="date" name="date" v-model="transaction.date" type="date" required />
    </div>

    <!-- Amount -->
    <div class="form-group">
      <label for="montant">Amount</label>
      <input id="montant" name="montant" v-model="transaction.montant" type="number" required />
    </div>

    <!-- Paid -->
    <div class="form-group">
      <label>
        <input type="checkbox" name="payee" v-model="transaction.payee" />
        Paid
      </label>
    </div>

    <!-- Client -->
    <div class="form-group">
      <label for="clientId">Client</label>
      <select id="clientId" name="clientId" v-model="transaction.clientId" required>
        <option value="">Select a client</option>
        <option v-for="client in clients" :key="client.id" :value="client.id">
          {{ client.nom }}
        </option>
      </select>
    </div>

    <!-- Collaborator -->
    <div class="form-group">
      <label for="collaborateurId">Collaborator</label>
      <select
        id="collaborateurId"
        name="collaborateurId"
        v-model="transaction.collaborateurId"
        required
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

    <button type="submit">Add Transaction</button>
  </form>
</template>

<style scoped>
.transaction-form {
  margin-top: 1rem;
  max-width: 400px;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}
input,
select {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input[type='checkbox'] {
  width: auto;
  margin-right: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #1565c0;
}
</style>
