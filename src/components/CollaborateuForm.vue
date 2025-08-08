<script setup lang="ts">
import { reactive } from 'vue'
import api from '../services/api'

const emit = defineEmits(['collaborateur-added'])

const collaborateur = reactive({
  nom: '',
  email: '',
  role: '',
})

const handleSubmit = async () => {
  try {
    const response = await api.post('/collaborateurs', collaborateur)
    emit('collaborateur-added', response.data)

    // Reset form
    collaborateur.nom = ''
    collaborateur.email = ''
    collaborateur.role = ''
  } catch (error) {
    console.error('There was an error creating the collaborateur!', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mt-4 max-w-md">
    <h3 class="text-xl font-bold mb-4">Add Collaborateur</h3>

    <div class="mb-4">
      <label for="nom" class="block mb-1 font-bold">Name</label>
      <input
        id="nom"
        name="nom"
        v-model="collaborateur.nom"
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
        v-model="collaborateur.email"
        type="email"
        required
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div class="mb-4">
      <label for="role" class="block mb-1 font-bold">Role</label>
      <input
        id="role"
        name="role"
        v-model="collaborateur.role"
        type="text"
        required
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <button
      type="submit"
      class="py-2 px-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700"
    >
      Add Collaborateur
    </button>
  </form>
</template>
