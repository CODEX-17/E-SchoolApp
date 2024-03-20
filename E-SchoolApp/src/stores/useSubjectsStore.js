import { create } from 'zustand'
import axios from 'axios'

export const useSubjectsStore = create((set) => ({
    subjects: [],

    getSubjects: () => {
        axios.get('http://localhost:5000/getSubjects')
        .then(res => {
            set({ subjects: res.data })
            localStorage.setItem('subjects', JSON.stringify(res.data))
        })
        .then(err => console.error(err))
    },

    deleteSubject: (id) => {
        axios.post(`http://localhost:5000/deleteSubject`, {id})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },

    addSubject: (obj) => {
        axios.post('http://localhost:5000/addSubject', {obj})
        .then( res => console.log(res))
        .catch(err => console.error(err))
    },

    updateSubject: (obj) => {
        axios.put('http://localhost:5000/updateSubject', {obj})
        .then(res => console.error(res))
        .catch(err => console.error(err))
    }
}))