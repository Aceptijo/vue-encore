<template>
  <div class="flex gap-4 w-full justify-between">
    <div class="w-1/2">
      <fwb-input v-model="searchStore.query" class="w-full" placeholder="Search meals" size="lg" />
    </div>
    <div class="w-1/2 flex gap-4">
      <fwb-select
        v-model="country"
        :options="countries"
        class="w-1/2"
        placeholder="Select a country"
        size="lg"
      />
      <fwb-select
        v-model="category"
        :options="categories"
        class="w-1/2"
        placeholder="Select a category"
        size="lg"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { FwbSelect } from 'flowbite-vue'
import { FwbInput } from 'flowbite-vue'

const country = ref('')
const category = ref('')

import { useCountriesStore } from '@/stores/countries.js'
import { useCategoriesStore } from '@/stores/categories.js'
import { useSearchMealsStore } from '@/stores/searchMeals.js'
import { onMounted } from 'vue'
import { useMealsByCountryStore } from '@/stores/mealsByCountry.js'

const countriesStore = useCountriesStore()
const categoriesStore = useCategoriesStore()
const searchStore = useSearchMealsStore()
const mealsStore = useMealsByCountryStore()

const categories = computed(() => {
  return categoriesStore.data.map((category) => ({
    name: category.strCategory,
    value: category.strCategory,
  }))
})

const countries = computed(() => {
  return countriesStore.data.map((country) => ({
    name: country.strArea,
    value: country.strArea,
  }))
})

let debounce = null

watch(
  () => searchStore.query,
  (newQuery) => {
    if (debounce) clearTimeout(debounce)
    debounce = setTimeout(() => {
      searchStore.searchMeals(newQuery)
    }, 400)
  },
)

watch(country, async (newCountry) => {
  if (!newCountry) return

  searchStore.query = ''
  mealsStore.clearData()
  mealsStore.isFiltered = true
  await mealsStore.fetchMealsByCountry(newCountry)
})

onMounted(() => {
  countriesStore.fetchData()
  categoriesStore.fetchData()
})
</script>

<style lang="scss" scoped></style>
