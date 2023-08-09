import { defineStore } from "pinia"

interface IState{
  error: IError | null
}

export const useErrorStore = defineStore('error',{
  state: ():IState=>({
    error: null
  }),
  getters:{
    errorMesssage(state){
      return state.error?.message ?? null;
    },
    showError(state){
      return !state.error
    }
  },
  actions:{
    resetError(){
      this.error = null;
    },
    setError(error: IError){
      this.error = error;
    },
  }
})