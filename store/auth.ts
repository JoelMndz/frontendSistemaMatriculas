import { defineStore } from "pinia"

interface IState{
  user: IUser | null,
  counter: number,
  data:any
}
interface ILoginResponse {
  user: IUser
  token: string
}

interface IRegisterResponse {
  user: IUser
  token: string
}

interface Register {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth',{
  state: ():IState=>({
    user: null,
    counter: 0,
    data: []
  }),
  getters:{
    isAuthenticated(state){
      return !!useCookie('token').value
    }
  },
  actions:{
    async register(values: Register) {
      const { data, error } = await useFetchApi("/api/auth/register-admin", {
        method: "post",
        body: values,
      })
      const response = data.value as IRegisterResponse
      if (!error.value) {
        const token = useCookie('token');
        token.value = response.token      
        this.user = response.user;
      }
    },

    async login(email:string, password: string){
      const {data,error} = await useFetchApi('/api/auth/login',{
        method:'post',
        body:{email, password}
      })
      const response = (data.value as ILoginResponse)
      if(!error.value){
        const token = useCookie('token');
        token.value = response.token      
        this.user = response.user;    
        
      }
    },
    logout(){
      const token = useCookie('token')
      token.value = null;
      this.user = null;
    }
  }
})