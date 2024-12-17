<template>
  <div class="flex flex-col min-h-screen">
    <transition name="fade">
      <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
        <div class="loader"></div>
      </div>
    </transition>
    <header class="bg-gray-900 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <nuxt-link to="/"><h1 class="text-2xl font-bold">EventFlow</h1></nuxt-link>
        <div class="flex items-center">
          <nav v-if="user" class="flex items-center space-x-6 text-gray-400">
            <nuxt-link to="/" exact-active-class="text-white" class="hover:text-gray-200 flex items-center space-x-1">
              <i class="material-icons">home</i>
              <span>Home</span>
            </nuxt-link>
            <nuxt-link to="/tasks" exact-active-class="text-white" class="hover:text-gray-200 flex items-center space-x-1">
              <i class="material-icons">assignment</i>
              <span>Tasks</span>
            </nuxt-link>
            <nuxt-link to="/rsvp" exact-active-class="text-white" class="hover:text-gray-200 flex items-center space-x-1">
              <i class="material-icons">event</i>
              <span>RSVP</span>
            </nuxt-link>
            <nuxt-link to="/polls" exact-active-class="text-white" class="hover:text-gray-200 flex items-center space-x-1">
              <i class="material-icons">poll</i>
              <span>Polls</span>
            </nuxt-link>
          </nav>
          <div v-if="user" class="relative ml-4">
            <button @click="toggleDropdown" class="flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
              <i class="material-icons mr-2">account_circle</i>
              {{ user.email }}
              <i class="material-icons ml-2">expand_more</i>
            </button>
            <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
              <nuxt-link to="/profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-1">
                <i class="material-icons">account_circle</i>
                <span>Profile</span>
              </nuxt-link>
              <button @click="handleSignOut" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-1">
                <i class="material-icons">exit_to_app</i>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          <nuxt-link v-else to="/signin" class="ml-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center space-x-1">
            <i class="material-icons mr-1">login</i>
            <strong>SIGN IN</strong>
          </nuxt-link>
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
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      dropdownOpen: false,
    }
  },
  computed: {
    ...mapState(['user', 'loading']),
  },
  methods: {
    ...mapActions(['signOut', 'setLoading']),
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    async handleSignOut() {
      try {
        await this.signOut()
        this.$router.push('/signin')
      } catch (error) {
        console.error('Error signing out:', error)
      }
    },
  },
  watch: {
    '$route'() {
      this.setLoading(true)
      setTimeout(() => {
        this.setLoading(false)
      }, 750) // Adjust the timeout duration as needed
    },
  },
  mounted() {
    this.setLoading(true)
    setTimeout(() => {
      this.setLoading(false)
    }, 750) // Adjust the timeout duration as needed
  },
}
</script>

<style>
.container {
  max-width: 1200px;
}
.underline {
  text-decoration: underline;
}
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid rgba(219, 39, 119, 1);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin .45s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>