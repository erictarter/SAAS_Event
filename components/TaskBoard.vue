<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Task Board</h2>
    <ul class="space-y-2">
      <li v-for="task in tasks" :key="task.id" class="bg-white p-4 rounded shadow">
        {{ task.name }}
      </li>
    </ul>
    <div class="mt-4">
      <input v-model="newTask" placeholder="New Task" class="border p-2 rounded w-full" />
      <button @click="addTask" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Task</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: '',
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({ id: Date.now(), name: this.newTask })
        this.newTask = ''
      }
    },
  },
}
</script>