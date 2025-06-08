import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSearchMealsStore = defineStore('search', () => {
  const data = ref([])
  const query = ref('')
  const isLoading = ref(false)
  const error = ref(null)

  const searchMeals = async (queryParams) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${queryParams}`,
      )

      data.value = (response.data.meals || []).map((meal) => ({
        ...meal,
        price: Math.floor(Math.random() * 16) + 10,
      }))
    } catch (err) {
      error.value = err.message || 'Search error'
    } finally {
      isLoading.value = false
    }
  }

  return { searchMeals, data, isLoading, error, query }
})
