<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">USER~NAME</h1>

    <!-- User Information Section -->
    <div class="bg-blue-100 p-6 rounded-lg shadow-lg mb-6 flex items-center">
      <i class="material-icons text-blue-500 mr-2">account_circle</i>
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">myemail@gmail.com</h2>
      </div>
    </div>

    <!-- Upcoming Events Section -->
    <div class="bg-green-100 p-6 rounded-lg shadow-lg mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <i class="material-icons text-green-500 mr-2">event</i>
        Upcoming Events
      </h2>
      <ul class="list-disc list-inside">
        <li v-for="event in upcomingEvents" :key="event.id" class="text-gray-600">{{ event.name }} - {{ event.date }}</li>
      </ul>
    </div>

    <!-- Event History Section -->
    <div class="bg-yellow-100 p-6 rounded-lg shadow-lg mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <i class="material-icons text-yellow-500 mr-2">history</i>
        Event History
      </h2>
      <ul class="list-disc list-inside">
        <li v-for="event in pastEvents" :key="event.id" class="text-gray-600">{{ event.name }} - {{ event.date }}</li>
      </ul>
    </div>

    <!-- Subscription Plan Section -->
    <div class="bg-purple-100 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <i class="material-icons text-purple-500 mr-2">subscriptions</i>
        Subscription Plan
      </h2>
      <p><strong>Current Plan:</strong> {{ subscriptionPlan.name }}</p>
      <p><strong>Price:</strong> ${{ subscriptionPlan.price }}/month</p>
      <nuxt-link to="/plans" class="hover:text-gray-400">
        <button class="mt-4 uppercase font-bold bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Upgrade Plan</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  data() {
    return {
      user: null,
      pastEvents: [
        { id: 1, name: 'Event 1', date: '2023-01-01' },
        { id: 2, name: 'Event 2', date: '2023-02-01' },
      ],
      upcomingEvents: [
        { id: 1, name: 'Event 3', date: '2023-03-01' },
        { id: 2, name: 'Event 4', date: '2023-04-01' },
      ],
      subscriptionPlan: {
        name: 'Basic',
        price: 0,
      },
    }
  },
  async mounted() {
    this.user = auth.currentUser
  },
  methods: {
    async signOut() {
      await auth.signOut()
      this.$router.push('/signin')
    },
  },
}
</script>