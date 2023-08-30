import { Session } from "next-auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const {data} = useAuth()
  
  let token = data?.value ? (data.value as Session & ISession).token : null;
  
  if(to.name?.toString() === 'app'){
    return navigateTo('/app/dashboard')
  }

  if (token && !to.name?.toString().includes('app')) {
    return navigateTo('/app/dashboard')
  }

  if (!token && to.name?.toString().includes('app')) {
    return navigateTo('/login')
  }
})