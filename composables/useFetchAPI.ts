import { Session } from "next-auth"
import { UseFetchOptions } from "nuxt/app"

export const useFetchApi = async <T>(
  url: string,
  options?: UseFetchOptions<T>
) => {
  const runtimeConfig = useRuntimeConfig()
  const { API } = runtimeConfig.public
  const {data:session} = useAuth()
  
  let token = session?.value ? (session.value as Session & ISession).token : null;

  const { data, error, execute } = await useFetch(`${url}`, {
    ...options,
    baseURL: API,
    headers: !token ? {} : { Authorization: `Bearer ${token}` }
  })

  return { data, error, execute }
}
