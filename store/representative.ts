import { defineStore } from "pinia"

interface ICreateRepresentative{
  fullName:string,
  cedula: string,
  email: string,
  cedulaFile:{
    base64:string,
    fileName: string
  },
  birthDate: number,
  address: string,
}

interface IUpdateRepresentative{
  id: string,
  fullName:string,
  cedula: string,
  email: string,
  cedulaFile?:{
    base64:string,
    fileName: string
  },
  birthDate: number,
  address: string,
}

interface IState{
  representatives: IRepresentative[],
  showForm: boolean,
  currentRepresentative: IRepresentative | null,
}

export const useRepresentativeStore = defineStore('representative',{
  state: ():IState=>({
    representatives: [],
    showForm: false,
    currentRepresentative: null,
  }),
  actions:{
    async getAll(){
      const { data, error } = await useFetchApi('/api/representative/get-all', {
        method: 'GET'
      })
      if(!error.value){
        this.representatives = data.value as IRepresentative[];
      }
    },
    async create(body:ICreateRepresentative){
      const {setError} = useErrorStore()
      const { data, error } = await useFetchApi('/api/representative/create', {
        method: 'POST',
        body: body,
      })
      if(!error.value){
        this.representatives.push(data.value as IRepresentative)
      }else{
        setError({message:'Ocurrio un error!'})
      }
    },  
    async update(body:IUpdateRepresentative){
      const {setError} = useErrorStore()
      
      const { data, error } = await useFetchApi('/api/representative/update', {
        method: 'PATCH',
        body: body,
      })
      if(!error.value){
        const representative = data.value as IRepresentative
        this.representatives = this.representatives.map(x => x._id === representative._id ? representative : x)
      }else{
        setError({message:'Ocurrio un error!'})
      }
    },  
    async delete(id:string){
      const {setError} = useErrorStore()
      const { data, error } = await useFetchApi(`/api/representative/delete/${id}`, {
        method: 'DELETE',
      })
      if(!error.value){
        const representative = data.value as IRepresentative
        this.representatives = this.representatives.filter(x => x._id !== representative._id)
      }else{
        setError({message:'Ocurrio un error!'})
      }
    },  
    setShowForm(payload:boolean){
      this.showForm = payload
    },
    setCurrentRepresentative(payload:IRepresentative | null){
      this.currentRepresentative = payload
    }
  }
})