// eslint-disable-next-line vue/block-lang
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import ClientForm from '@/components/ClientForm.vue'
import type { Client } from '@/types'

const clients = ref<Client[]>([])

const fetchClients = async () => {
  try {
    const response = await api.get('/clients')
    clients.value = response.data
  } catch (error) {
    console.error('There was an error fetching the clients!', error)
  }
}

const handleClientAdded = (newClient: Client) => {
  clients.value.push(newClient)
}

onMounted(() => {
  fetchClients()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Clients</h2>
    <ClientForm @client-added="handleClientAdded" />
    <div v-if="clients.length > 0" class="mt-4">
      <div v-for="client in clients" :key="client.id" class="border-b border-gray-200 py-2">
        <p class="font-bold">{{ client.nom }}</p>
        <p>{{ client.email }}</p>
      </div>
    </div>
    <p v-else class="mt-4">No clients found.</p>
  </div>
</template>
