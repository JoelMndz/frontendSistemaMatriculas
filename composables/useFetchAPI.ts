import { UseFetchOptions } from "nuxt/app"
import { useAuthStore } from "~/store/auth"

export const useFetchApi = async <T>(
  url: string,
  options?: UseFetchOptions<T>
) => {
  const runtimeConfig = useRuntimeConfig()
  const { API } = runtimeConfig.public
  const token = useCookie("token")

  const { data, error, execute } = await useFetch(`${url}`, {
    ...options,
    baseURL: API,
    headers: !token.value ? {} : { Authorization: `Bearer ${token.value}` }
  })

  return { data, error, execute }
}
