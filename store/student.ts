import { defineStore } from "pinia";

interface ICreateStudent{
  fullName:string,
  cedula: string,
  birthDate: number,
  fatherName: string,
  motherName: string,
  address: string,
  disability: string,
  allergies: string,
  cedulaFile:{
    base64:string,
    fileName: string
  },
  bulletinFile:{
    base64:string,
    fileName: string
  },
  _representative1: string,
  _representative2: string | null,
}

interface IUpdateStudent{
  _id: string,
  fullName:string,
  cedula: string,
  birthDate: number,
  fatherName: string,
  motherName: string,
  address: string,
  disability: string,
  allergies: string,
  cedulaFile?:{
    base64:string,
    fileName: string
  },
  bulletinFile?:{
    base64:string,
    fileName: string
  },
  _representative1: string,
  _representative2: string | null,
}

interface IState{
  students: IStudent[],
  showForm: boolean,
  currentStudent: IStudent | null
}

export const useStudentStore = defineStore('student',{
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
    },
    async delete(id:string){
      const {setError} = useErrorStore()
      const { data, error } = await useFetchApi(`/api/student/delete/${id}`, {
        method: 'DELETE',
      })
      if(!error.value){
        const student = data.value as IStudent
        this.students = this.students.filter(x => x._id !== student._id)
      }else{
        setError({message:'Ocurrio un error!'})
      }
    },
    async update(body:IUpdateStudent){
      const {setError} = useErrorStore()
      const { data, error } = await useFetchApi('/api/student/update', {
        method: 'PATCH',
        body: body,
      })
      if(!error.value){
        const student = data.value as IStudent
        this.students = this.students.map(x => x._id === student._id ? student : x)
      }else{
        setError({message:'Ocurrio un error!'})
      }
    },
    setShowForm(payload:boolean){
      this.showForm = payload
    },
    setCurrentStudent(payload:IStudent | null){
      this.currentStudent = payload
    }
  }
})