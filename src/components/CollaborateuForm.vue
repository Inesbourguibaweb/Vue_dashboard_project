<script setup lang="ts">
import { reactive, ref } from 'vue'
import api from '../services/api'
import type { ApiError } from '@/types'

const emit = defineEmits(['collaborateur-added'])

const errorMessage = ref('')
const isSubmitting = ref(false)

const collaborateur = reactive({
  nom: '',
  email: '',
  role: '',
})

const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  try {
    const response = await api.post('/collaborateurs', collaborateur)
    emit('collaborateur-added', response.data)

    // Reset form
    collaborateur.nom = ''
    collaborateur.email = ''
    collaborateur.role = ''
  } catch (error: unknown) {
    const err = error as ApiError
    errorMessage.value = err.response?.data?.message || 'An unexpected error occurred.'
    console.error('There was an error creating the collaborateur!', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mt-4 max-w-md" aria-live="polite">
    <h3 class="text-xl font-bold mb-4">Add Collaborateur</h3>

    <div
      v-if="errorMessage"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline">{{ errorMessage }}</span>
    </div>

    <div class="mb-4">
      <label for="nom" class="block mb-1 font-bold">Name</label>
      <input
        id="nom"
        name="nom"
        v-model="collaborateur.nom"
        type="text"
        required
        class="w-full p-2 border border-gray-300 rounded"
        :aria-invalid="errorMessage ? 'true' : 'false'"
        aria-describedby="nom-error"
      />
      <p v-if="errorMessage" id="nom-error" class="text-red-500 text-xs italic">
        {{ errorMessage }}
      </p>
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
        :aria-invalid="errorMessage ? 'true' : 'false'"
        aria-describedby="email-error"
      />
      <p v-if="errorMessage" id="email-error" class="text-red-500 text-xs italic">
        {{ errorMessage }}
      </p>
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
        :aria-invalid="errorMessage ? 'true' : 'false'"
        aria-describedby="role-error"
      />
      <p v-if="errorMessage" id="role-error" class="text-red-500 text-xs italic">
        {{ errorMessage }}
      </p>
    </div>

    <button
      type="submit"
      class="py-2 px-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 disabled:bg-gray-400"
      :disabled="isSubmitting"
    >
      <span v-if="isSubmitting">Adding...</span>
      <span v-else>Add Collaborateur</span>
    </button>
  </form>
</template>
