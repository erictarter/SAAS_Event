<template>
    <div class="p-4 max-w-md mx-auto">
      <h1 class="text-3xl font-bold mb-6">Sign In</h1>
      <form @submit.prevent="signIn">
        <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded w-full mb-4" />
        <input v-model="password" type="password" placeholder="Password" class="border p-2 rounded w-full mb-4" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Sign In</button>
      </form>
    </div>
  </template>
  
  <script>
  import { auth } from '~/plugins/firebase'
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      async signIn() {
        try {
          await auth.signInWithEmailAndPassword(this.email, this.password)
          this.$router.push('/')
        } catch (error) {
          console.error('Error signing in:', error)
        }
      },
    },
  }
  </script>