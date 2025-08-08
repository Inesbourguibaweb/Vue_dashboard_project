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
  <div style="padding: 20px; border: 1px solid #ccc; border-radius: 8px">
    <h2>Collaborateurs</h2>

    <!-- Formulaire pour ajouter un collaborateur -->
    <CollaborateurForm @collaborateur-added="handleCollaborateurAdded" />

    <!-- Liste des collaborateurs -->
    <ul style="list-style: none; padding: 0">
      <li
        v-for="collaborateur in collaborateurs"
        :key="collaborateur.id"
        style="padding: 10px; border-bottom: 1px solid #ddd"
      >
        <p style="margin: 0; font-weight: bold">{{ collaborateur.nom }}</p>
        <p style="margin: 0; color: gray">{{ collaborateur.email }}</p>
        <p style="margin: 0; font-style: italic">{{ collaborateur.role }}</p>
      </li>
    </ul>
  </div>
</template>
