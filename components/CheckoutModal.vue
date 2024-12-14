<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Checkout</h2>
        <p class="mb-4">You are about to subscribe to the <strong :class="planColor">{{ plan.name }}</strong> plan for <strong>${{ plan.price }}/month</strong>.</p>
        <form @submit.prevent="checkout">
          <div class="mb-4">
            <label for="cardNumber" class="block text-gray-700">Card Number</label>
            <input type="text" id="cardNumber" v-model="cardNumber" class="mt-2 block w-full border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" required>
          </div>
          <div class="mb-4">
            <label for="expiryDate" class="block text-gray-700">Expiration Date</label>
            <input type="text" id="expiryDate" v-model="expiryDate" placeholder="MM/YY" class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" required>
          </div>
          <div class="mb-4">
            <label for="cvv" class="block text-gray-700">CVV</label>
            <input type="text" id="cvv" v-model="cvv" class="mt-2 block w-full border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" required>
          </div>
          <button type="submit" class="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Proceed to Payment</button>
          <button type="button" @click="close" class="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      plan: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      }
    },
    computed: {
      planColor() {
        switch (this.plan.name) {
          case 'Basic':
            return 'text-indigo-600';
          case 'Pro':
            return 'text-teal-600';
          case 'Enterprise':
            return 'text-pink-600';
          default:
            return 'text-gray-800';
        }
      },
    },
    methods: {
      checkout() {
        // Implement checkout logic here
        alert(`Proceeding to payment with card number: ${this.cardNumber}`);
        this.close();
      },
      close() {
        this.$emit('close');
      },
    },
  }
  </script>