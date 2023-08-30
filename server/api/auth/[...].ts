import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const runtimeConfig = useRuntimeConfig()
const { API } = runtimeConfig.public
const { SECRET } = runtimeConfig

let responseLogin:any = null

export default NuxtAuthHandler({
  secret: SECRET,
  providers: [
    (CredentialsProvider as any).default({
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Ingrese el email' },
        password: { label: 'Password', type: 'password', placeholder: 'Ingrese el password' }
      },
      async authorize(credentials: any) {
        const data:any = await $fetch(`${API}/api/auth/login`,{
          method:'post',
          body:{
            email:credentials?.email,
            password: credentials?.password
          }
        })    
        responseLogin = data    
        return {
          name: `${data.user.firstName} ${data.user.lastName}`,
          email: data.user.email      
        }
      }
    })
  ],
  callbacks:{
    session(params){
      return {
        ...params.session,
        role: responseLogin.user.role,
        token: responseLogin.token
      }
    }
  }
})