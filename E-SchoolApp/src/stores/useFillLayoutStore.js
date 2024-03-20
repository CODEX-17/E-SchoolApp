import { create } from 'zustand'
import axios from 'axios'

export const useFillLayoutStore = create((set) => ({

    getFillLayout: () => {
        axios.get('http://localhost:5000/getFillLayout')
        .then(res => localStorage.setItem('fillLayout', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    addFillLayout: (obj) => {
        axios.post('http://localhost:5000/addFillLayout', {obj})
        .then( res => console.log(res))
        .catch(err => console.error(err))
    },

    deleteFillLayout: (id) => {
        axios.post(`http://localhost:5000/deleteFillLayout`, {id})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    }

}))
