import { defineStore } from 'pinia'

interface IState {
  grades: IGrade[]
  gradeCurrent: IGrade | null
}

interface CreateGrade {
  name: string
  description: string
  subjects: string[]
}

interface UpdateGrade {
  name: string
  description: string
  subjects: string[]
}

export const useGrade = defineStore('grade', {
  state: (): IState => ({
    grades: [],
    gradeCurrent: null,
  }),

  actions: {

    async getAll (schoolTermId: string) {
      const { data, error } = await useFetchApi(`/api/grade?schoolTermId=${schoolTermId}`, {
        method: 'GET'
      })
      if(!error.value){
        this.grades = data.value as IGrade[];
      }
    },

    async create (values: CreateGrade) {
      const { data, error } = await useFetchApi('/api/grade', {
        method: 'POST',
        body: values
      })

      if (!error.value) {
        const response = data.value as IGrade;
        this.grades.push(response)
      }
    }, 

    async update (id: string, values: UpdateGrade) {
      const { data, error } = await useFetchApi(`/api/grade/${id}`, {
        method: 'PATCH',
        body: values
      })

      if (!error.value) {
        const response = data.value as IGrade;
        this!.grades = this!.grades.map(grade => grade._id === response._id ? response : grade)
        console.log(response)
      }
    },

    async delete (id: string) {
      const { setError } = useErrorStore();
      const { error } = await useFetchApi(`/api/grade/${id}`, {
        method: 'DELETE'
      })

      if(error.value){
        setError({ message: 'No puedes eliminar un curso que tiene uno o mas paralelos'})
        return;
      }
      this.grades = this.grades.filter( grade => grade._id !== id)
    },

    setCurretGrade (grade: IGrade | null) {
      this.gradeCurrent = grade;   
    }
  }
})