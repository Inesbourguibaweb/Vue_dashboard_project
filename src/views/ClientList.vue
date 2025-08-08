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
  <div>
    <h2>Clients</h2>
    <ClientForm @client-added="handleClientAdded" />
    <div v-if="clients.length > 0">
      <div v-for="client in clients" :key="client.id" class="client-item">
        <p>
          <strong>{{ client.nom }}</strong>
        </p>
        <p>{{ client.email }}</p>
      </div>
    </div>
    <p v-else>No clients found.</p>
  </div>
</template>

<style scoped>
.client-item {
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
}
</style>
