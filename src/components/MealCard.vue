<template>
  <fwb-card>
    <div class="flex flex-col items-center p-4 gap-4">
      <img :alt="meal.strMealThumg" :src="meal.strMealThumb" class="rounded-lg" />
      <span class="h-12 text-center"> {{ meal.strMeal }}</span>
      <div class="flex justify-between items-center w-full">
        <span class="text-xl font-bold"> {{ meal.price }}$</span>
        <app-meal-counter v-if="isInCart" :mealItem="mealItem" />
        <fwb-button v-else class="cursor-pointer" @click="handleAddToCart">Buy</fwb-button>
      </div>
    </div>
  </fwb-card>
</template>

<script setup>
import { FwbCard } from 'flowbite-vue'
import { FwbButton } from 'flowbite-vue'

const props = defineProps({
  meal: Object,
})

import { useCartStore } from '@/stores/cart.js'
import AppMealCounter from '@/components/AppMealCounter.vue'
import { computed } from 'vue'

const cartStore = useCartStore()

const handleAddToCart = () => {
  cartStore.addToCart(props.meal)
}

const mealItem = computed(() => {
  return cartStore.cart.find((item) => item.idMeal === props.meal.idMeal)
})

const isInCart = computed(() => !!mealItem.value)
</script>

<style lang="scss" scoped></style>
