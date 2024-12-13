<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-900 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Event Collaboration Tool</h1>
        <nav>
          <nuxt-link to="/" class="mr-4 hover:text-gray-400">Home</nuxt-link>
          <nuxt-link to="/tasks" class="mr-4 hover:text-gray-400">Tasks</nuxt-link>
          <nuxt-link to="/rsvp" class="mr-4 hover:text-gray-400">RSVP</nuxt-link>
          <nuxt-link to="/polls" class="hover:text-gray-400">Polls</nuxt-link>
        </nav>
      </div>
    </header>
    <main class="flex-grow container mx-auto my-8">
      <nuxt />
    </main>
    <footer class="bg-gray-900 text-white p-4">
      <div class="container mx-auto text-center">
        &copy; 2023 Event Collaboration Tool. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style>
.container {
  max-width: 1200px;
}
</style>