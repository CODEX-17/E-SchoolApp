import { create } from 'zustand'
import axios from 'axios'

export const useReactionsStore = create((set) => ({

    getReactions: () => {
        axios.get('http://localhost:5000/getReactions')
        .then(res => localStorage.setItem('reactions', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    addReactions: (obj) => {
        axios.post('http://localhost:5000/addReactions', {obj})
        .then( res => console.log(res))
        .catch(err => console.error(err))
    },

    deleteReactions: (reactID) => {
        axios.post(`http://localhost:5000/deleteReactions`, {reactID})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },

}))
