import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const addToCart = (meal) => {
    const existing = cart.value.find((item) => item.idMeal === meal.idMeal)

    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ ...meal, quantity: 1 })
    }
  }

  const increaseQuantity = (idMeal) => {
    const meal = cart.value.find((item) => item.idMeal === idMeal)
    if (meal) meal.quantity++
  }

  const decreaseQuantity = (idMeal) => {
    const index = cart.value.findIndex((i) => i.idMeal === idMeal)
    if (index !== -1) {
      const item = cart.value[index]
      if (item.quantity > 1) {
        item.quantity--
      } else {
        cart.value.splice(index, 1)
      }
    }
  }

  const removeFromCart = (mealId) => {
    cart.value = cart.value.filter((meal) => meal.idMeal !== mealId)
  }

  const resetCart = () => {
    cart.value = []
  }

  const cartCount = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cart.value.reduce((sum, meal) => sum + meal.price * meal.quantity, 0)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    resetCart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    cartCount,
  }
})
