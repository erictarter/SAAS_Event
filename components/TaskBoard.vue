<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Task Board</h2>
    
    <!-- Filter and Search -->
    <div class="flex space-x-4 mb-4">
      <input v-model="searchQuery" placeholder="Search tasks" class="border p-2 rounded w-full" />
      <select v-model="selectedCategory" class="border p-2 rounded">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    
    <!-- Task List -->
    <ul class="space-y-2">
      <li v-for="task in filteredTasks" :key="task.id" class="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <input type="checkbox" v-model="task.completed" class="mr-2" />
          <span :class="{ 'line-through text-gray-500': task.completed }">{{ task.name }}</span>
          <span class="text-gray-500">({{ task.category }})</span>
          <span class="text-gray-500"> - Due: {{ task.dueDate }}</span>
        </div>
        <div class="flex space-x-2">
          <button @click="editTask(task)" class="text-blue-500 uppercase font-bold hover:underline">Edit</button>
          <button @click="deleteTask(task.id)" class="text-red-500 uppercase font-bold hover:underline">Delete</button>
        </div>
      </li>
    </ul>
    
    <!-- Add/Edit Task Form -->
    <div class="mt-4">
      <input v-model="newTaskName" placeholder="New Task" class="border p-2 rounded w-full" />
      <input v-model="newTaskDueDate" placeholder="Due Date" type="date" class="border p-2 rounded w-full mt-2" />
      <select v-model="newTaskCategory" class="border p-2 rounded w-full mt-2">
        <option value="">Select Category</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <button @click="addTask" class="mt-2 bg-indigo-500 uppercase font-bold text-white px-4 py-2 rounded hover:bg-indigo-600">{{ editMode ? 'Update Task' : 'Add Task' }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTaskName: '',
      newTaskDueDate: '',
      newTaskCategory: '',
      searchQuery: '',
      selectedCategory: '',
      editMode: false,
      editTaskId: null,
      categories: ['Work', 'Personal', 'Urgent', 'Miscellaneous'],
    }
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        return (
          (!this.searchQuery || task.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
          (!this.selectedCategory || task.category === this.selectedCategory)
        )
      })
    },
  },
  methods: {
    addTask() {
      if (this.newTaskName.trim() && this.newTaskDueDate.trim() && this.newTaskCategory.trim()) {
        if (this.editMode) {
          const task = this.tasks.find(task => task.id === this.editTaskId)
          task.name = this.newTaskName
          task.dueDate = this.newTaskDueDate
          task.category = this.newTaskCategory
          this.editMode = false
          this.editTaskId = null
        } else {
          this.tasks.push({ id: Date.now(), name: this.newTaskName, dueDate: this.newTaskDueDate, category: this.newTaskCategory, completed: false })
        }
        this.newTaskName = ''
        this.newTaskDueDate = ''
        this.newTaskCategory = ''
      }
    },
    editTask(task) {
      this.newTaskName = task.name
      this.newTaskDueDate = task.dueDate
      this.newTaskCategory = task.category
      this.editMode = true
      this.editTaskId = task.id
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },
  },
}
</script>

<style>
/* Add any additional styling here */
</style>