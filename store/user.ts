import {defineStore} from "pinia";

interface ICreate{
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'secretary'
}

interface IState{
  users: IUser[],
  showForm: boolean
}

export const useUserStore = defineStore('user',{
  state:():IState=>({
    users: [],
    showForm: false
  }),
  actions:{
    async getAll(){
      const {data,error} = await useFetchApi('/api/user/get-all')
      if(!error.value)
        this.users = data.value as IUser[]
    },

    async create(body:ICreate){
      const {setError} = useErrorStore()
      const {data,error} = await useFetchApi('/api/user/create',{
        method:'POST',
        body
      })

      if(!error.value)
        this.users.push(data.value as IUser)
      else
        setError({message: error.value.data?.message ?? 'Ocurrió un error'})        
    },

    setShowForm(payload:boolean){
      this.showForm = payload
    }
  },

})