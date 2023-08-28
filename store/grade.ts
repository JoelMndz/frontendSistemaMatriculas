import { defineStore } from 'pinia'

interface IState {
  grades: IGrade[]
  gradeCurrent: IGrade | null
}

interface IGradeResponse {
  gradeCurrent: IGrade
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

    async getAll () {
      const { data, error } = await useFetchApi('/api/grade', {
        method: 'GET'
      })
      if(!error.value){
        this.grades = data.value as IGrade[];
      }
      console.log(data.value)
    },

    async create (values: CreateGrade) {
      const { data, error } = await useFetchApi('/api/grade', {
        method: 'POST',
        body: values
      })

      if (!error.value) {
        const response = data.value as IGradeResponse;
        this.gradeCurrent = response.gradeCurrent;
      }
    }, 

    async update (id: string, values: UpdateGrade) {

      const { data, error } = await useFetchApi(`/api/grade/${id}`, {
        method: 'PATCH',
        body: values
      })

      const response = data.value as IGradeResponse;
      if (!error.value) {
        this.gradeCurrent = response.gradeCurrent;
      }
    },

    async delete (id: string) {
      await useFetchApi(`/api/grade/${id}`, {
        method: 'DELETE'
      })
      this.grades = this.grades.filter( grade => grade._id !== id)
    },

    setCurretGrade (grade: IGrade | null) {
      this.gradeCurrent = grade;   
    }
  }
})