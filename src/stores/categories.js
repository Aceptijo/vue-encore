import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCategoriesStore = defineStore('categories', () => {
  const data = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetchData = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      data.value = response.data.meals || []
    } catch (err) {
      error.value = err.message || 'Fetch categories error'
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, fetchData }
})
