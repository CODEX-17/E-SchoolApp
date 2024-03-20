import { create } from 'zustand'
import axios from 'axios'

export const useChoicesStore = create((set) => ({

    getChoices: () => {
        axios.get('http://localhost:5000/getChoices')
        .then(res => localStorage.setItem('choices', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    addChoices: (obj) => {
        axios.post('http://localhost:5000/addChoices', {obj})
        .then(res => localStorage.setItem('choices', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    deleteChoices: (id) => {
        axios.post(`http://localhost:5000/deleteChoices`, {id})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },

}))
