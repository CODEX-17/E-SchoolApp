import { create } from 'zustand'
import axios from 'axios'

export const useQuizStore = create((set) => ({

    getQuiz: () => {
        axios.get('http://localhost:5001/getQuiz')
        .then(result => localStorage.setItem('quiz', JSON.stringify(result.data)))
        .catch(err => console.error(err))
    },

    addQuiz: (obj) => {
        axios.post('http://localhost:5001/addQuiz', {obj})
        .then( res => console.log(res))
        .catch(err => console.error(err))
    },

    deleteQuiz: (quizID) => {
        axios.post(`http://localhost:5001/deleteQuiz`, {quizID})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },

}))
