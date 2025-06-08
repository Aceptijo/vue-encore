import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCountriesStore = defineStore('countries', () => {
  const data = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetchData = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      data.value = response.data.meals || []
    } catch (err) {
      error.value = err.message || 'Fetch countries error'
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, fetchData }
})
