<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6">Sign Up</h1>
    <form @submit.prevent="signUpUser">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded w-full mb-4" required />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 rounded w-full mb-4" required />
      <button type="submit" class="bg-indigo-500 text-white px-4 py-2 uppercase font-bold rounded hover:bg-indigo-600 w-full">Sign Up</button>
    </form>
    <p class="mt-4">Already have an account? <nuxt-link to="/signin" class="text-blue-500 hover:underline">Sign In</nuxt-link></p>
  </div>
</template>

<script>
import { auth, createUserWithEmailAndPassword } from '~/plugins/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async signUpUser() {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password)
        const user = userCredential.user
        console.log('User signed up:', user)
        this.$router.push('/')
      } catch (error) {
        console.error('Error signing up:', error)
      }
    },
  },
}
</script>