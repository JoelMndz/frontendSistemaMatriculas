import { defineStore } from 'pinia'

interface IState{
  enrollments: IEnrollment[]
  currentEnrollment: IEnrollment | null
  showForm: boolean
}

interface UpdateEnrollmet {
  _student: string;
  _parallel: string;
}

interface CreateEnrollment {
  _student: string;
  _parallel: string;
}

export const useEnrollmentStore = defineStore('enrollment', {

  state: (): IState => ({
    enrollments: [],
    currentEnrollment: null,
    showForm: false,
  }),

  actions: {

    async getAll() {
      const { data, error } = await useFetchApi('/api/enrollment', {
        method: 'GET'
      });

      if (!error.value) {
        this.enrollments = data.value as IEnrollment[];
      }
    },

    async create(values: CreateEnrollment) {
      const { setError } = useErrorStore();
      const { data, error } = await useFetchApi('/api/enrollment', {
        method: 'POST',
        body: values
      });

      if (error.value) {
        setError({ message: 'El estudiante tiene una matricula registrada en este parelelo' })
        return;
      }

      const response = data.value as IEnrollment;
      this.enrollments.push(response);

      await this.getAll()
    }, 

    async update(id: string, values: UpdateEnrollmet) {
      const { setError } = useErrorStore()
      const { data, error } = await useFetchApi(`/api/enrollment/${id}`, {
        method: 'PATCH',
        body: values
      });

      if (error.value) {
        setError({ message: 'error al actualizar la matricula' });
      }

      const response = data.value as IEnrollment
      this.enrollments = this.enrollments.map((enrollment) => 
        enrollment._id === response._id ? response : enrollment
      );
    },

    async delete(id: string) {
      const { data } = await useFetchApi(`/api/enrollment/${id}`, {
        method: 'DELETE'
      })
      
      const response = data.value as IEnrollment
      this.enrollments = this.enrollments.filter(enrollment => enrollment._id !== response._id)
    },

    setCurrentEnrollment(enrollment: IEnrollment | null) {
      this.currentEnrollment = enrollment
    },

    modalEnrollment (modal: boolean) {
      this.showForm = modal
    }
  }
})