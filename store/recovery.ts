import { defineStore } from "pinia"
import { useErrorStore } from "./error"

interface IState{
  email: string | null,
  sendedCode: boolean
}

export const useRecoveryStore = defineStore('recovery',{
  state: ():IState=>({
    email: null,
    sendedCode: false
  }),
  actions:{
    async sendCode(email:string) {
      const { setError } = useErrorStore();
      const { error } = await useFetchApi("/api/auth/send-code-recovery", {
        method: "put",
        body: {email},
      })
      if (error.value) {
        setError({message: error.value.data?.message ?? 'Ocurrio un error'});
        return;
      }
      this.email = email
      this.sendedCode = true;
    },

    async updatePassword(body:{code:string,password:string}){
      const { setError } = useErrorStore();
      const { error } = await useFetchApi("/api/auth/update-password-recovery", {
        method: "put",
        body:{...body,email:this.email},
      })
      if (error.value) {
        setError({message: error.value.data?.message ?? 'Ocurrio un error'})
        return
      }
      this.resetData()
      navigateTo('/login')
    },

    resetData(){
      this.email = null
      this.sendedCode = false
    }
  }
})