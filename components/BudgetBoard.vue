<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Budget Board</h2>
    
    <!-- Total Budget -->
    <div class="bg-gray-100 p-4 rounded shadow mb-4">
      <h3 class="text-xl font-bold">Total Budget: ${{ totalBudget }}</h3>
    </div>
    
    <!-- Filter and Search -->
    <div class="flex space-x-4 mb-4">
      <input v-model="searchQuery" placeholder="Search items" class="border p-2 rounded w-full" />
      <select v-model="selectedCategory" class="border p-2 rounded">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    
    <!-- Budget Items List -->
    <ul class="space-y-2">
      <li v-for="item in filteredItems" :key="item.id" class="bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <span class="font-bold">{{ item.name }}</span> - ${{ item.amount }} <span class="text-gray-500">({{ item.category }})</span>
        </div>
        <div class="flex space-x-2">
          <button @click="editItem(item)" class="text-blue-500 uppercase font-bold hover:underline">Edit</button>
          <button @click="deleteItem(item.id)" class="text-red-500 uppercase font-bold hover:underline">Delete</button>
        </div>
      </li>
    </ul>
    
    <!-- Add/Edit Item Form -->
    <div class="mt-4">
      <input v-model="newItemName" placeholder="New Item" class="border p-2 rounded w-full" />
      <input v-model="newItemAmount" placeholder="Amount" type="number" class="border p-2 rounded w-full mt-2" />
      <select v-model="newItemCategory" class="border p-2 rounded w-full mt-2">
        <option value="">Select Category</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <button @click="addItem" class="mt-2 bg-green-500 uppercase font-bold text-white px-4 py-2 rounded hover:bg-green-600">{{ editMode ? 'Update Item' : 'Add Item' }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      budgetItems: [],
      newItemName: '',
      newItemAmount: '',
      newItemCategory: '',
      searchQuery: '',
      selectedCategory: '',
      editMode: false,
      editItemId: null,
      categories: ['Food', 'Transport', 'Accommodation', 'Miscellaneous'],
    }
  },
  computed: {
    totalBudget() {
      return this.budgetItems.reduce((total, item) => total + parseFloat(item.amount), 0)
    },
    filteredItems() {
      return this.budgetItems.filter(item => {
        return (
          (!this.searchQuery || item.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
          (!this.selectedCategory || item.category === this.selectedCategory)
        )
      })
    },
  },
  methods: {
    addItem() {
      if (this.newItemName.trim() && this.newItemAmount.trim() && this.newItemCategory.trim()) {
        if (this.editMode) {
          const item = this.budgetItems.find(item => item.id === this.editItemId)
          item.name = this.newItemName
          item.amount = this.newItemAmount
          item.category = this.newItemCategory
          this.editMode = false
          this.editItemId = null
        } else {
          this.budgetItems.push({ id: Date.now(), name: this.newItemName, amount: this.newItemAmount, category: this.newItemCategory })
        }
        this.newItemName = ''
        this.newItemAmount = ''
        this.newItemCategory = ''
      }
    },
    editItem(item) {
      this.newItemName = item.name
      this.newItemAmount = item.amount
      this.newItemCategory = item.category
      this.editMode = true
      this.editItemId = item.id
    },
    deleteItem(id) {
      this.budgetItems = this.budgetItems.filter(item => item.id !== id)
    },
  },
}
</script>

<style>
/* Add any additional styling here */
</style>