<template>
  <fwb-card class="w-full flex-row !max-w-full p-0 relative" variant="horizontal">
    <div class="flex w-full p-4 gap-10 items-center">
      <img :alt="meal.strMeal" :src="meal.strMealThumb" class="h-40 w-40 rounded-lg object-cover" />
      <div class="flex flex-col gap-4">
        <span class="text-xl">{{ meal.strMeal }}</span>
        <app-meal-counter v-if="mealItem" :mealItem="mealItem" />
      </div>
    </div>
    <fwb-button class="absolute top-0 right-0 m-4" @click="handleRemove(meal.idMeal)">
      <X />
    </fwb-button>
    <span class="text-xl font-bold absolute bottom-0 right-0 m-4"
      >{{ meal.price * meal.quantity }} $</span
    >
  </fwb-card>
</template>

<script setup>
import { FwbCard } from 'flowbite-vue'
import { FwbButton } from 'flowbite-vue'
import { X } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart.js'
import AppMealCounter from '@/components/AppMealCounter.vue'
import { computed } from 'vue'

const props = defineProps({
  meal: Object,
})

const cartStore = useCartStore()

const handleRemove = (idMeal) => {
  cartStore.removeFromCart(idMeal)
}

const mealItem = computed(() => {
  return cartStore.cart.find((item) => item.idMeal === props.meal.idMeal)
})
</script>

<style scoped></style>
