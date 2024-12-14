<template>
  <div class="p-4 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">Subscription Plans</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div @click="openModal('Pro', 10)" class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
        <h3 class="text-2xl font-bold text-teal-600">Pro</h3>
        <p class="mt-4 text-gray-600">$10/month</p>
        <ul class="mt-4 text-gray-600 list-disc list-inside">
          <li>All Basic features</li>
          <li>Advanced RSVP management and reminders</li>
          <li>Polling features</li>
        </ul>
      </div>
      <div @click="openModal('Enterprise', 30)" class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
        <h3 class="text-2xl font-bold text-pink-600">Enterprise</h3>
        <p class="mt-4 text-gray-600">$30/month</p>
        <ul class="mt-4 text-gray-600 list-disc list-inside">
          <li>All Pro features</li>
          <li>Exportable reports</li>
          <li>Integrations with third-party tools like Google Calendar</li>
        </ul>
      </div>
    </div>
    <CheckoutModal :show="showModal" :plan="selectedPlan" @close="closeModal" />
  </div>
</template>

<script>
import CheckoutModal from '~/components/CheckoutModal.vue'

export default {
  name: 'PlansPage',
  components: {
    CheckoutModal,
  },
  data() {
    return {
      showModal: false,
      selectedPlan: {},
    }
  },
  methods: {
    openModal(name, price) {
      this.selectedPlan = { name, price };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
}
</script>