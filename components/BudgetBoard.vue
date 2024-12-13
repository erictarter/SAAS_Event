<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Budget Board</h2>
    <ul class="space-y-2">
      <li v-for="item in budgetItems" :key="item.id" class="bg-white p-4 rounded shadow">
        {{ item.name }} - ${{ item.amount }}
      </li>
    </ul>
    <div class="mt-4">
      <input v-model="newItemName" placeholder="New Item" class="border p-2 rounded w-full" />
      <input v-model="newItemAmount" placeholder="Amount" type="number" class="border p-2 rounded w-full mt-2" />
      <button @click="addItem" class="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Item</button>
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
    }
  },
  methods: {
    addItem() {
      if (this.newItemName.trim() && this.newItemAmount.trim()) {
        this.budgetItems.push({ id: Date.now(), name: this.newItemName, amount: this.newItemAmount })
        this.newItemName = ''
        this.newItemAmount = ''
      }
    },
  },
}
</script>