<template>
  <div v-if="cartStore.cartCount" class="flex flex-col">
    <div class="flex justify-between">
      <span class="text-lg">Order amount:</span>
      <span class="text-xl font-bold">{{ cartStore.totalPrice }}$</span>
    </div>
    <div class="flex justify-between">
      <span class="text-lg">Delivery amount:</span>
      <span class="text-xl font-bold">10$</span>
    </div>
    <div class="flex justify-between">
      <span class="text-lg">Total order amount:</span>
      <span class="text-xl font-bold">{{ cartStore.totalPrice + 10 }}$</span>
    </div>
    <fwb-button class="self-end mt-4" @click="handleReset">
      <span>Confirm</span>
    </fwb-button>
  </div>
</template>

<script setup>
import { FwbButton } from 'flowbite-vue'
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore()

const handleReset = () => {
  cartStore.resetCart()
  alert('Congratulations, you have spent half your salary :)')
}
</script>
