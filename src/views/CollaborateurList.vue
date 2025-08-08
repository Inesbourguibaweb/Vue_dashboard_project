<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../services/api'
import CollaborateurForm from '../components/CollaborateuForm.vue'
import type { Collaborateur } from '@/types'

const collaborateurs = ref<Collaborateur[]>([])

const fetchCollaborateurs = async () => {
  try {
    const response = await api.get('/collaborateurs')
    collaborateurs.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des collaborateurs', error)
  }
}

const handleCollaborateurAdded = (newCollaborateur: Collaborateur) => {
  collaborateurs.value.push(newCollaborateur)
}

onMounted(() => {
  fetchCollaborateurs()
})
</script>

<template>
  <div class="p-5 border border-gray-300 rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Collaborateurs</h2>
    <CollaborateurForm @collaborateur-added="handleCollaborateurAdded" />

    <ul class="list-none p-0 mt-4">
      <li
        v-for="collaborateur in collaborateurs"
        :key="collaborateur.id"
        class="py-2 border-b border-gray-300"
      >
        <p class="m-0 font-bold">{{ collaborateur.nom }}</p>
        <p class="m-0 text-gray-500">{{ collaborateur.email }}</p>
        <p class="m-0 italic">{{ collaborateur.role }}</p>
      </li>
    </ul>
  </div>
</template>
