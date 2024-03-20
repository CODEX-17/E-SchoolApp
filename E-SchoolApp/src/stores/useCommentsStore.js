import { create } from 'zustand'
import axios from 'axios'

export const useCommentsStore = create((set) => ({

    getComments: () => {
        axios.get('http://localhost:5000/getComments')
        .then(res => localStorage.setItem('comments', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    addComments: (obj) => {
        axios.post('http://localhost:5000/addComments', {obj})
        .then( res => console.log(res))
        .catch(err => console.error(err))
    },

    deleteComments: (reactID) => {
        axios.post(`http://localhost:5000/deleteComments`, {reactID})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },

}))
