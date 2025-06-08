<template>
  <header class="flex justify-between shrink-0 px-4 py-8 gap-8">
    <router-link to="/">
      <span class="text-2xl font-bold">Vue-Encore</span>
    </router-link>
    <nav>
      <router-link class="relative" to="/cart">
        <fwb-badge v-if="cartStore.cartCount" class="absolute rounded-full top-0 left-0 ml-3"
          >{{ cartStore.cartCount }}
        </fwb-badge>
        <ShoppingCart class="size-8" />
      </router-link>
    </nav>
  </header>
</template>

<script setup>
import { ShoppingCart } from 'lucide-vue-next'
import { FwbBadge } from 'flowbite-vue'
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore()
</script>

<style scoped></style>
