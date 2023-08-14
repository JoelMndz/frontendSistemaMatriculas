import { defineStore } from "pinia"

interface IState {
  schools: ISchoolTerm[]
  schoolCurrent: ISchoolTerm | null
}

interface ICreateResponse {
  schoolCurrent: ISchoolTerm
}

interface IUpdateResponse {
  schoolCurrent: ISchoolTerm
}

interface UpdateSchoolTerm {
  name: string
  description: string
}

interface CreateSchoolTerm {
  name: string
  description: string
}

export const useSchoolTerm = defineStore("school", {
  state: (): IState => ({
    schools: [],
    schoolCurrent: null
  }),
  actions: {
    async getAll() {
      const { data, error } = await useFetchApi("/api/school-term", {
        method: "GET",
      })

      if (!error.value) {
        this.schools = data.value as ISchoolTerm[]
        
      }
    },

    async create(values: CreateSchoolTerm) {
      const { data, error } = await useFetchApi("/api/school-term", {
        method: "POST",
        body: values
      })
      const response = data.value as ICreateResponse
      if (!error.value) {
        this.schoolCurrent = response.schoolCurrent
      }
    },

    async update(id: string, values: UpdateSchoolTerm) {
      const { data, error } = await useFetchApi(`/api/school-term/${id}`, {
        method: "PATCH",
        body: values
      })
      console.log(useCookie("token"))
      const response = data.value as IUpdateResponse
      if (!error.value) {
        this.schoolCurrent = response.schoolCurrent
      }
    },

    async delete(id: string) {
      await useFetchApi(`/api/school-term/${id}`, {
        method: "DELETE"
      })

      this.schools = this.schools.filter((school) => school._id !== id)
    },

    setSchoolTermCurrent(school: ISchoolTerm) {
      this.schoolCurrent = school
    }
  }
})
