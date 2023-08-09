import { storeToRefs } from "pinia"

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')
  
  if(to.name?.toString() === 'app'){
    return navigateTo('/app/dashboard')
  }

  if (token.value && !to.name?.toString().includes('app')) {
    return navigateTo('/app/dashboard')
  }

  if (!token.value && to.name?.toString().includes('app')) {
    return navigateTo('/login')
  }
})