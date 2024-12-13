<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">RSVP Management</h2>
    <ul class="space-y-2">
      <li v-for="rsvp in rsvps" :key="rsvp.id" class="bg-white p-4 rounded shadow">
        {{ rsvp.name }} - {{ rsvp.email }}
      </li>
    </ul>
    <div class="mt-4">
      <input v-model="newRSVPName" placeholder="Name" class="border p-2 rounded w-full" />
      <input v-model="newRSVPEmail" placeholder="Email" type="email" class="border p-2 rounded w-full mt-2" />
      <button @click="addRSVP" class="mt-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Add RSVP</button>
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
    }
  },
  methods: {
    addRSVP() {
      if (this.newRSVPName.trim() && this.newRSVPEmail.trim()) {
        this.rsvps.push({ id: Date.now(), name: this.newRSVPName, email: this.newRSVPEmail })
        this.newRSVPName = ''
        this.newRSVPEmail = ''
      }
    },
  },
}
</script>