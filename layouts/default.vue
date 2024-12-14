<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-900 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">EventHub</h1>
        <div class="flex items-center">
          <nav v-if="user" class="flex items-center space-x-4">
            <nuxt-link to="/" class="hover:text-gray-400">Home</nuxt-link>
            <nuxt-link to="/tasks" class="hover:text-gray-400">Tasks</nuxt-link>
            <nuxt-link to="/rsvp" class="hover:text-gray-400">RSVP</nuxt-link>
            <nuxt-link to="/polls" class="hover:text-gray-400">Polls</nuxt-link>
          </nav>
          <div v-if="!user" class="relative ml-4">
            <button @click="toggleDropdown" class="flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
              <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D" alt="Profile Icon" class="h-6 w-6 rounded-full mr-2">
              user~name
            </button>
            <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
              <nuxt-link to="/profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</nuxt-link>
              <button @click="signOut" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Sign Out</button>
            </div>
          </div>
          <nuxt-link v-else to="/signin" class="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign In</nuxt-link>
        </div>
      </div>
    </header>
    <main class="flex-grow container mx-auto my-8">
      <nuxt />
    </main>
    <footer class="bg-gray-900 text-white p-4">
      <div class="container mx-auto text-center">
        &copy; 2024 EventFlow. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  data() {
    return {
      user: null,
      dropdownOpen: false,
    }
  },
  async mounted() {
    auth.onAuthStateChanged(user => {
      this.user = user
    })
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    async signOut() {
      await auth.signOut()
      this.$router.push('/signin')
    },
  },
}
</script>

<style>
.container {
  max-width: 1200px;
}
</style>