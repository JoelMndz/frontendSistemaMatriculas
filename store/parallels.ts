import { defineStore } from 'pinia'

interface IState {
  parallels: IParallel[]
  parallelCurrent: IParallel | null
  showForm: boolean
}

interface CreteParallel {
  name: string,
  quotas: number,
  _grade: string,
  _professor: string
}

interface UpdateParallel {
  name: string,
  quotas: number,
  _grade: string,
  _professor: string
}

export const useParallelStore = defineStore('parallels', {
  state: (): IState => ({
    parallels: [],
    parallelCurrent: null,
    showForm: false
  }),
  actions: {

    async create (values: CreteParallel) {
      const { setError } = useErrorStore();
      const { gradeCurrent } = useGrade();
      const { data, error } = await useFetchApi('/api/parallel', {
        method: 'POST',
        body: values
      })
      
      if(error.value){
        setError({ message: 'Este nombre de paralelo ya existe en este curso'})
        return;
      }

      const response = data.value as IParallel
      gradeCurrent!.parallels.push({ ...response, professors: [response._professor as IProfessor] })

      console.log("store create", response)
    },

    async update (id: string, values: UpdateParallel) {
    const { setError } = useErrorStore();
      const { gradeCurrent } = useGrade();
      const { data, error } = await useFetchApi(`/api/parallel/${id}`, {
        method: "PATCH",
        body: values
      })

      if(error.value){  
        setError({ message: 'Este nombre de paralelo ya existe en este curso'})
        return;
      }
      const response = data.value as IParallel;

      response.professors = [response._professor as IProfessor]
      gradeCurrent!.parallels = gradeCurrent!.parallels.map(parallel => parallel._id === response._id ? response : parallel)
      console.log(response)
    },

    async delete (id: string) {
      const { setError } = useErrorStore();
      const { grades } = useGrade();
      const { error } = await useFetchApi(`/api/parallel/${id}`, {
        method: 'DELETE'
      }) 

      if(error.value){
        setError({ message: 'ocurrio un error al eliminar el paralelo'})
        return;
      }

      this.parallels = this.parallels.filter(parallel => parallel._id !== id)
      if(grades && grades.length > 0){
        for(const grade of grades){
          grade.parallels = grade.parallels.filter(parallel => parallel._id !== id)
        }
      }
    },

    currentParallel (parallel: IParallel | null) {
      this.parallelCurrent = parallel;
    },

    openModalParallel (modal: boolean) {
      this.showForm = modal
    }
  }
})