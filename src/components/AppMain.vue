<template>
  <main class="overflow-hidden flex-1 flex flex-col px-4 pb-9 gap-10 scrollbar-custom">
    <app-search v-if="route.path === '/'" />
    <div class="overflow-auto flex-1">
      <RouterView />
    </div>
    <cart-summary v-if="route.path === '/cart'" />
  </main>
</template>

<script setup>
import AppSearch from '@/components/AppSearch.vue'

import { useRoute } from 'vue-router'
import CartSummary from '@/components/CartSummary.vue'

const route = useRoute()
</script>
