import { create } from 'zustand'
import axios from 'axios'

export const useClassStore = create((set)=> ({

    classes: [],

    addClass: (className , classDesc, classCode, imageID, membersID) => {
        axios.post('http://localhost:5000/addClass', {className, classDesc, classCode, imageID, membersID})
        .then(res => console.log(res))
        .catch(err => console.error(err))
    },

    addClasses: (obj) => {
        axios.post('http://localhost:5000/addClasses', {obj})
        .then(res => console.log(res))
        .catch(err => console.error(err))
    },

    updateClass: (obj) => {
        axios.put('http://localhost:5000/updateClass', {obj})
        .then(res => console.error(res))
        .catch(err => console.error(err))
    },

    getClass: () => {
        axios.get('http://localhost:5000/getClass')
        .then(res => {
            set({ classes: res.data})
            localStorage.setItem('class', JSON.stringify(res.data))
        })
        .catch(err => console.error(err))
    },

    hideClass: (classCode, state) => {
        axios.put('http://localhost:5000/hideClass', { classCode, state })
        .then(res => console.log(res))
        .catch(err => console.error(err))
    },

    deleteClass: (classID) => {
        axios.post('http://localhost:5000/deleteClass', { classID })
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }

}))