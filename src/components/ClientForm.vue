<script setup lang="ts">
import { reactive } from 'vue'
import api from '../services/api'

const emit = defineEmits(['client-added'])

const client = reactive({
  nom: '',
  email: '',
  telephone: '',
})

const handleSubmit = async () => {
  try {
    const response = await api.post('/clients', client)
    emit('client-added', response.data)

    client.nom = ''
    client.email = ''
    client.telephone = ''
  } catch (error) {
    console.error('There was an error creating the client!', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mt-4 max-w-md">
    <h3 class="text-xl font-bold mb-4">Add Client</h3>

    <div class="mb-4">
      <label for="nom" class="block mb-1 font-bold">Name</label>
      <input
        id="nom"
        name="nom"
        v-model="client.nom"
        type="text"
        required
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div class="mb-4">
      <label for="email" class="block mb-1 font-bold">Email</label>
      <input
        id="email"
        name="email"
        v-model="client.email"
        type="email"
        required
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div class="mb-4">
      <label for="telephone" class="block mb-1 font-bold">Telephone</label>
      <input
        id="telephone"
        name="telephone"
        v-model="client.telephone"
        type="text"
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <button
      type="submit"
      class="py-2 px-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700"
    >
      Add Client
    </button>
  </form>
</template>
