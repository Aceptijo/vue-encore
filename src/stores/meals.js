import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useMealsStore = defineStore('mealsByCountry', () => {
  const data = ref({})
  const isLoading = ref(false)
  const error = ref(null)
  const isFiltered = ref(false)

  const fetchMealsByCountry = async (country) => {
    isLoading.value = true
    error.value = null

    if (data.value[country]) return

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`,
      )
      const mealsData = response.data.meals || []
      data.value = {
        ...data.value,
        [country]: mealsData.map((meal) => ({
          ...meal,
          price: Math.floor(Math.random() * 16) + 10,
        })),
      }
    } catch (err) {
      error.value = err.message || 'Fetch meals error'
    } finally {
      isLoading.value = false
    }
  }

  const fetchMealsByCategory = async (category) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      )
      const mealsData = response.data.meals || []
      data.value = {
        [category]: mealsData.map((meal) => ({
          ...meal,
          price: Math.floor(Math.random() * 16) + 10,
        })),
      }
    } catch (err) {
      error.value = err.message || 'Fetch by category error'
    } finally {
      isLoading.value = false
    }
  }

  const clearData = () => {
    data.value = {}
    isFiltered.value = false
  }

  return {
    data,
    isLoading,
    error,
    fetchMealsByCountry,
    fetchMealsByCategory,
    clearData,
    isFiltered,
  }
})
