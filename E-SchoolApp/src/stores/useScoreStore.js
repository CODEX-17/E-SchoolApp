import { create } from 'zustand'
import axios from 'axios'

export const useScoreStore = create((set) => ({

    addScore: (obj) => {
        axios.post('http://localhost:5000/addScore', {obj})
        .then(res => console.error(res.data))
        .catch(err => console.error(err))
    },

    getScore: () => {
        axios.get('http://localhost:5000/getScore')
        .then(res => localStorage.setItem('scores', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },


}))
