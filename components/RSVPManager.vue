<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">RSVP Management</h2>
    
    <!-- Tabs for Adding and Searching RSVPs -->
    <div class="flex justify-center mb-6">
      <button @click="activeTab = 'search'" :class="{'bg-teal-500 text-white': activeTab === 'search', 'bg-gray-200 text-gray-800': activeTab !== 'search'}" class="px-4 py-2 rounded-l-lg focus:outline-none">Search RSVPs</button>
      <button @click="activeTab = 'add'" :class="{'bg-teal-500 text-white': activeTab === 'add', 'bg-gray-200 text-gray-800': activeTab !== 'add'}" class="px-4 py-2 rounded-r-lg focus:outline-none">Add RSVP</button>
    </div>

    <div v-if="activeTab === 'search'">
      <!-- Select Event -->
      <div class="mb-4">
        <select v-model="selectedEvent" class="border p-2 rounded w-full">
          <option value="">Select Event</option>
          <option v-for="event in pendingEvents" :key="event.id" :value="event.id">{{ event.name }}</option>
        </select>
      </div>
      
      <!-- Search and Filter -->
      <div class="flex space-x-4 mb-4">
        <input v-model="searchQuery" placeholder="Search RSVPs" class="border p-2 rounded w-full" />
        <select v-model="selectedStatus" class="border p-2 rounded">
          <option value="">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      
      <!-- RSVP List -->
      <ul class="space-y-2">
        <li v-for="rsvp in paginatedRSVPs" :key="rsvp.id" class="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <span class="font-bold">{{ rsvp.name }}</span> - {{ rsvp.email }}
            <span class="text-gray-500">({{ rsvp.status }})</span>
            <p class="text-gray-500">{{ rsvp.notes }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="editRSVP(rsvp)" class="text-blue-500 hover:underline">Edit</button>
            <button @click="deleteRSVP(rsvp.id)" class="text-red-500 hover:underline">Delete</button>
            <button @click="sendReminder(rsvp.email)" class="text-green-500 hover:underline">Send Reminder</button>
          </div>
        </li>
      </ul>
      
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Next</button>
      </div>
    </div>

    <div v-else>
      <!-- Add/Edit RSVP Form -->
      <div class="mt-4">
        <input v-model="newRSVPName" placeholder="Name" class="border p-2 rounded w-full" />
        <input v-model="newRSVPEmail" placeholder="Email" type="email" class="border p-2 rounded w-full mt-2" />
        <select v-model="newRSVPStatus" class="border p-2 rounded w-full mt-2">
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
        </select>
        <textarea v-model="newRSVPNotes" placeholder="Notes" class="border p-2 rounded w-full mt-2"></textarea>
        <select v-model="newRSVPEvent" class="border p-2 rounded w-full mt-2">
          <option value="">Select Event</option>
          <option v-for="event in pendingEvents" :key="event.id" :value="event.id">{{ event.name }}</option>
        </select>
        <button @click="addRSVP" class="mt-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">{{ editMode ? 'Update RSVP' : 'Add RSVP' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rsvps: [],
      newRSVPName: '',
      newRSVPEmail: '',
      newRSVPStatus: 'pending',
      newRSVPNotes: '',
      newRSVPEvent: '',
      searchQuery: '',
      selectedStatus: '',
      selectedEvent: '',
      editMode: false,
      editRSVPId: null,
      currentPage: 1,
      itemsPerPage: 5,
      activeTab: 'search',
      pendingEvents: [
        { id: 1, name: 'Event 1' },
        { id: 2, name: 'Event 2' },
      ],
    }
  },
  computed: {
    filteredRSVPs() {
      return this.rsvps.filter(rsvp => {
        return (
          (!this.selectedEvent || rsvp.eventId === this.selectedEvent) &&
          (!this.searchQuery || rsvp.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || rsvp.email.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
          (!this.selectedStatus || rsvp.status === this.selectedStatus)
        )
      })
    },
    paginatedRSVPs() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredRSVPs.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredRSVPs.length / this.itemsPerPage)
    },
  },
  methods: {
    addRSVP() {
      if (this.newRSVPName.trim() && this.newRSVPEmail.trim() && this.newRSVPEvent.trim()) {
        if (this.editMode) {
          const rsvp = this.rsvps.find(rsvp => rsvp.id === this.editRSVPId)
          rsvp.name = this.newRSVPName
          rsvp.email = this.newRSVPEmail
          rsvp.status = this.newRSVPStatus
          rsvp.notes = this.newRSVPNotes
          rsvp.eventId = this.newRSVPEvent
          this.editMode = false
          this.editRSVPId = null
        } else {
          this.rsvps.push({ id: Date.now(), name: this.newRSVPName, email: this.newRSVPEmail, status: this.newRSVPStatus, notes: this.newRSVPNotes, eventId: this.newRSVPEvent })
        }
        this.newRSVPName = ''
        this.newRSVPEmail = ''
        this.newRSVPStatus = 'pending'
        this.newRSVPNotes = ''
        this.newRSVPEvent = ''
      }
    },
    editRSVP(rsvp) {
      this.newRSVPName = rsvp.name
      this.newRSVPEmail = rsvp.email
      this.newRSVPStatus = rsvp.status
      this.newRSVPNotes = rsvp.notes
      this.newRSVPEvent = rsvp.eventId
      this.editMode = true
      this.editRSVPId = rsvp.id
    },
    deleteRSVP(id) {
      this.rsvps = this.rsvps.filter(rsvp => rsvp.id !== id)
    },
    sendReminder(email) {
      alert(`Reminder sent to ${email}`)
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
  },
}
</script>

<style>
/* Add any additional styling here */
</style>