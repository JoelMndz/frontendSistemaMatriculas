//NO TOCAR

import { defineStore } from "pinia"

interface IState{
  token: string | null,
  user: any,
  counter: number,
  data:any
}
export const useAuthStore = defineStore('auth',{
  state: ():IState=>({
    token: null,
    user: null,
    counter: 0,
    data: []
  }),
  actions:{
    async loadData(){
      const {data} = await useLazyFetch('https://api.nuxtjs.dev/mountains')
      this.data = data;
      console.log(this.data);
      
    },
    aumentar(){
      this.counter++;
    },
    eliminar(){
      this.data = [];
    }
  }
})