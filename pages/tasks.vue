<template>
  <div class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TaskBoard />
      <BudgetBoard />
    </div>
  </div>
</template>

<script>
import TaskBoard from '~/components/TaskBoard.vue'
import BudgetBoard from '~/components/BudgetBoard.vue'

export default {
  components: {
    TaskBoard,
    BudgetBoard,
  },
}
</script>