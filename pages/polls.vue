<template>
  <div class="p-4">
    <div class="flex justify-center mb-6">
      <button @click="activeTab = 'new'" :class="{'bg-pink-500 text-white': activeTab === 'new', 'bg-gray-200 text-gray-800': activeTab !== 'new'}" class="px-4 py-2 rounded-l-lg focus:outline-none">New Poll</button>
      <button @click="activeTab = 'existing'" :class="{'bg-pink-500 text-white': activeTab === 'existing', 'bg-gray-200 text-gray-800': activeTab !== 'existing'}" class="px-4 py-2 rounded-r-lg focus:outline-none">Existing Polls</button>
    </div>
    <div v-if="activeTab === 'new'">
      <NewPoll />
    </div>
    <div v-else>
      <PollList />
    </div>
  </div>
</template>

<script>
import NewPoll from '~/components/NewPoll.vue'
import PollList from '~/components/PollList.vue'

export default {
  components: {
    NewPoll,
    PollList,
  },
  data() {
    return {
      activeTab: 'new',
    }
  },
}
</script>