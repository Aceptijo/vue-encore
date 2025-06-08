<template>
  <div class="flex items-center rounded-lg">
    <fwb-button
      class="cursor-pointer"
      color="dark"
      size="sm"
      @click="cartStore.decreaseQuantity(mealItem.idMeal)"
    >
      <Minus />
    </fwb-button>
    <span class="px-3 text-lg font-bold">{{ mealItem?.quantity }}</span>
    <fwb-button
      class="cursor-pointer"
      color="dark"
      size="sm"
      @click="cartStore.increaseQuantity(mealItem.idMeal)"
    >
      <Plus />
    </fwb-button>
  </div>
</template>

<script setup>
import { FwbButton } from 'flowbite-vue'
import { Minus, Plus } from 'lucide-vue-next'

import { useCartStore } from '@/stores/cart.js'

defineProps({
  mealItem: Object,
})

const cartStore = useCartStore()
</script>
