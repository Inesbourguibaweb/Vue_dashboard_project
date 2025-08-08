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
  <form @submit.prevent="handleSubmit" class="collaborateur-form">
    <h3>Add Collaborateur</h3>

    <div class="form-group">
      <label for="nom">Name</label>
      <input id="nom" name="nom" v-model="collaborateur.nom" type="text" required />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" name="email" v-model="collaborateur.email" type="email" required />
    </div>

    <div class="form-group">
      <label for="role">Role</label>
      <input id="role" name="role" v-model="collaborateur.role" type="text" required />
    </div>

    <button type="submit">Add Collaborateur</button>
  </form>
</template>

<style scoped>
.collaborateur-form {
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
input {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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
