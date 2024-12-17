<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-6">Sign In</h1>
    <form @submit.prevent="signInUser">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded w-full mb-4" required />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 rounded w-full mb-4" required />
      <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 w-full">Sign In</button>
    </form>
    <p class="mt-4">Don't have an account? <nuxt-link to="/signup" class="text-blue-500 hover:underline">Sign Up</nuxt-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['signIn']),
    async signInUser() {
      try {
        await this.signIn({ email: this.email, password: this.password })
        this.$router.push('/')
      } catch (error) {
        console.error('Error signing in:', error)
      }
    },
  },
}
</script>