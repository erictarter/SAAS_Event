<template>
    <div class="">
      <h1 class="text-3xl font-bold text-gray-800">Welcome to EventFlow</h1>
      <p class="mt-4 text-gray-600">Plan and manage your events with ease.</p>
      <div class="mt-6 space-y-4">
        <nuxt-link to="/tasks" class="block px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600">Go to Task Board</nuxt-link>
        <nuxt-link to="/rsvp" class="block px-4 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-600">Manage RSVPs</nuxt-link>
        <nuxt-link to="/polls" class="block px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600">Create Polls</nuxt-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeAuth',
  }
  </script>