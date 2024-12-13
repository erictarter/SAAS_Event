<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Polling</h2>
    <ul class="space-y-2">
      <li v-for="poll in polls" :key="poll.id" class="bg-white p-4 rounded shadow">
        {{ poll.question }}
      </li>
    </ul>
    <div class="mt-4">
      <input v-model="newPoll" placeholder="New Poll Question" class="border p-2 rounded w-full" />
      <button @click="addPoll" class="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Add Poll</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      polls: [],
      newPoll: '',
    }
  },
  methods: {
    addPoll() {
      if (this.newPoll.trim()) {
        this.polls.push({ id: Date.now(), question: this.newPoll })
        this.newPoll = ''
      }
    },
  },
}
</script>