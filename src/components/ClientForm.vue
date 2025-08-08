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

    // Reset form
    client.nom = ''
    client.email = ''
    client.telephone = ''
  } catch (error) {
    console.error('There was an error creating the client!', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="client-form">
    <h3>Add Client</h3>

    <div class="form-group">
      <label for="nom">Name</label>
      <input id="nom" name="nom" v-model="client.nom" type="text" required />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" name="email" v-model="client.email" type="email" required />
    </div>

    <div class="form-group">
      <label for="telephone">Telephone</label>
      <input id="telephone" name="telephone" v-model="client.telephone" type="text" />
    </div>

    <button type="submit">Add Client</button>
  </form>
</template>

<style scoped>
.client-form {
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
