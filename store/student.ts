import { defineStore } from "pinia";

interface ICreateStudent{

}

interface IState{
  students: IStudent[],
  showForm: boolean,
  currentStudent: IStudent | null
}

export const useStudentStudentStore = defineStore('student',{
  state: ():IState=>({
    students:[],
    currentStudent: null,
    showForm: false
  }),
  actions: {
    async getAll(){
      const { data, error } = await useFetchApi('/api/student/get-all', {
        method: 'GET'
      })
      if(!error.value){
        this.students = data.value as IStudent[];
      }
    },
    async create(body:ICreateStudent){
      const {setError} = useErrorStore()
      const { data, error } = await useFetchApi('/api/student/create', {
        method: 'POST',
        body: body,
      })
      if(!error.value){
        this.students.push(data.value as IStudent)
      }else{
        setError({message:'Ocurrio un error!'})
      }
    }
  }
})