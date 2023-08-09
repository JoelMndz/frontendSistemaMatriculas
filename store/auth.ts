import { defineStore } from "pinia"

interface IState{
  user: IUser | null,
  isAutenticated: Boolean
}
export const useAuthStore = defineStore('auth',{
  state: ():IState=>({
    user: null,
    isAutenticated: false
  }),
  actions:{
    async login(email:string, password: string){
      interface ILoginResponse {user:IUser, token:string}
      const {setError} = useErrorStore();
      const {data,error} = await useFetchApi('/api/auth/login',{
        method:'post',
        body:{email, password}
      })
      const response = (data.value as ILoginResponse)
      if(error.value){
        setError({message: 'Credenciales incorrectas!'})
        return
      }
      const token = useCookie('token');
      token.value = response.token       
      this.isAutenticated = true; 
      this.user = response.user;
    },
    logout(){
      const token = useCookie('token')
      token.value = null;
      this.user = null;
      this.isAutenticated = false;
    },
    setIsAuthenticated(state: boolean){
      this.isAutenticated = state;
    }
  }
})