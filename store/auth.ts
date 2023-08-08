import { defineStore } from "pinia"

interface IState{
  user: IUser | null,
  counter: number,
  data:any
}
export const useAuthStore = defineStore('auth',{
  state: ():IState=>({
    user: null,
    counter: 0,
    data: []
  }),
  getters:{
    isAuthenticated(state){
      return !!state.user
    }
  },
  actions:{
    async login(email:string, password: string){
      interface ILoginResponse {user:IUser, token:string}
      const {data,error} = await useFetchApi('/api/auth/login',{
        method:'post',
        body:{email, password}
      })
      const response = (data.value as ILoginResponse)
      if(!error.value){
        const token = useCookie('token');
        token.value = response.token        
        this.user = response.user;
        console.log(this.user);
        console.log(this.isAuthenticated);        
      }
    },
    async loadData(){
      // const {data} = await useFetch('https://api.nuxtjs.dev/mountains',{server:false})
      const {data} = await useLazyFetch('https://api.nuxtjs.dev/mountains')
      this.data = data;
      
    },
    aumentar(){
      this.counter++;
    },
    eliminar(){
      this.data = [];
    },
    setData(data:any){
      this.data = data;
    }
  }
})