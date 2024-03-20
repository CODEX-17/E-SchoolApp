import { create } from 'zustand'
import axios from 'axios'

export const useBankStore = create((set) => ({

    getBank: () => {
        axios.get('http://localhost:5000/getBank')
        .then(res => localStorage.setItem('bank', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

   addBank: (obj) => {
        axios.post('http://localhost:5000/addBank', {obj})
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
   },

}))
