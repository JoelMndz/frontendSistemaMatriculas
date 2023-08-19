import { defineStore } from 'pinia'

interface IState {
  professors: IProfessor[]
  professorCurrent: IProfessor | null
  showForm: boolean
}

interface CreateProfesor {
  fullName: string,
  cedula: string,
  dateBirth: number,
  email: string,
  address: string,
  disability: string,
  cv: {
    base64: string,
    fileName: string
  }
}

interface UpdateProfesor {
  fullName: string,
  cedula: string,
  dateBirth: number,
  email: string,
  address: string,
  disability: string,
  cv?: {
    base64: string,
    fileName: string
  }
}

export const useProfessorStore = defineStore('professor', {
  state: (): IState => ({
    professors: [],
    professorCurrent: null,
    showForm: false
  }),

  actions: {

    async getAll(){
      const { data, error } = await useFetchApi('/api/professor', {
        method: 'GET'
      })
      if(!error.value) {
        this.professors = data.value as IProfessor[];
      }
    },

    async create(values: CreateProfesor){
      const { setError } = useErrorStore()
      const { data, error } = await useFetchApi('/api/professor', {
        method: 'POST',
        body: values
      })
      
      const response = data.value as IProfessor
      if(error.value){
        setError({ message: 'Ocurrio un error al crear el profesor'})
      }
      this.professors.push(response)
    },

    async update(id: string, values: UpdateProfesor){
      const { setError } = useErrorStore()
      const { data, error } = await useFetchApi(`/api/professor/${id}`, {
        method: 'PATCH',
        body: values
      })
      const response = data.value as IProfessor
      if(error.value){
        setError({ message: 'Ocurrio un error al actualizar el profesor' })
      }
      this.professors = this.professors.map(x => x._id === response._id ? response: x)
    },

    async delete(id: string) {
      const { setError } = useErrorStore()
      const { data, error } = await useFetchApi(`/api/professor/${id}`, {
        method: 'DELETE'
      })

      const response = data.value as IProfessor
      if(error.value){
        setError({ message: 'Ocurrio un error al eliminar el profesor' })
      }
      this.professors = this.professors.filter(x => x._id !== response._id)
    },

    currentProfessor(professor: IProfessor | null){
      this.professorCurrent = professor
    },

    showModal(modal: boolean){
      this.showForm = modal
    },
  }
})