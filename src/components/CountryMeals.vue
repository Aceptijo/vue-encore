<template>
  <div class="flex flex-col gap-10 relative">
    <template v-if="searchStore.query">
      <div class="flex flex-wrap justify-start gap-5">
        <div v-for="meal in searchStore.data" :key="meal.idMeal" class="w-[290px]">
          <meal-card :meal="meal" />
        </div>
      </div>
      <div v-if="searchStore.isLoading">Loading!</div>
      <div v-else-if="!searchStore.data.length">Not found!</div>
    </template>
    <template v-else>
      <div v-for="(meals, country) in mealsStore.data" :key="country" class="flex flex-col gap-4">
        <span class="text-2xl"> {{ country }}</span>
        <div class="flex flex-wrap justify-start gap-5">
          <div v-for="meal in meals" :key="meal.idMeal" class="w-[290px]">
            <meal-card :meal="meal" />
          </div>
        </div>
      </div>
      <div ref="bottomRef" class="h-4"></div>
    </template>
  </div>
</template>

<script setup>
import MealCard from '@/components/MealCard.vue'
import { useMealsByCountryStore } from '@/stores/mealsByCountry.js'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useCountriesStore } from '@/stores/countries.js'
import { useSearchMealsStore } from '@/stores/searchMeals.js'

const countries = computed(() => countriesStore.data.map((item) => item.strArea))

const mealsStore = useMealsByCountryStore()
const countriesStore = useCountriesStore()
const searchStore = useSearchMealsStore()

const bottomRef = ref(null)
const currentCountryIndex = ref(0)

const fetchNextCountryMeal = async () => {
  if (currentCountryIndex.value >= countries.value.length) return

  const nextCountry = countries.value[currentCountryIndex.value]

  await mealsStore.fetchMealsByCountry(nextCountry)
  currentCountryIndex.value++
}

onMounted(async () => {
  await countriesStore.fetchData()

  await nextTick()

  await fetchNextCountryMeal()

  await nextTick()

  const observer = new IntersectionObserver(
    async ([entry]) => {
      if (entry.isIntersecting && !mealsStore.isFiltered) {
        await fetchNextCountryMeal()
      }
    },
    {
      rootMargin: '300px',
    },
  )

  if (bottomRef.value) {
    observer.observe(bottomRef.value)

    await nextTick()
    const rect = bottomRef.value.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0

    if (isVisible && !mealsStore.isFiltered) {
      await fetchNextCountryMeal()
    }
  }
})
</script>

<style lang="scss" scoped></style>
