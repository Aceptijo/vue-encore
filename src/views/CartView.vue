<template>
  <div class="w-full flex justify-center h-full">
    <div v-if="cartStore.cartCount" class="flex flex-col w-full pr-4 gap-4">
      <cart-meal-card v-for="meal in cartStore.cart" :key="meal.idMeal" :meal="meal" />
    </div>
    <div
      v-if="!cartStore.cartCount"
      class="flex justify-center items-center gap-4 flex-col max-w-2xs text-center"
    >
      <div class="flex gap-4 items-center">
        <span class="text-lg font-bold">Your cart is empty!</span>
        <ShoppingCart class="size-5" />
      </div>
      <span>
        It looks like you haven't added any items yet. Start exploring our menu and fill your cart
        with delicious dishes!
      </span>
      <fwb-button>
        <router-link to="/">
          <span>Browse menu</span>
        </router-link>
      </fwb-button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.js'
import CartMealCard from '@/components/CartMealCard.vue'
import { FwbButton } from 'flowbite-vue'
import { ShoppingCart } from 'lucide-vue-next'

const cartStore = useCartStore()
</script>

<style scoped></style>
