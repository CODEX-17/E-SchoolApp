import { create } from 'zustand'
import axios from 'axios'

export const useQuestionsStore = create((set) => ({

    questions: [],
    getQuestion: () => {
        axios.get('http://localhost:5000/getQuestion')
        .then(res => {
            set({questions: res.data})
            localStorage.setItem('questions', JSON.stringify(res.data))
        })
        .catch(err => console.log(err))
    },

    addQuestions: (dataObj) => {

            axios.post('http://localhost:5000/questions', { dataObj })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        
    },

    updateQuestions: (id, questionID) => {
       
        axios.put('http://localhost:5000/updateQuestions', { id, questionID })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },

    addChoicesDataBase: (dataObj) => {

        for (let int = 0; int < dataObj.length; int++) {
            const choices = dataObj[int]
            for (let i = 0; i < choices.length; i++) {
                const questionID = data[i].questionID
                const letter = data[i].letter
                const content = data[i].content
                const correct = data[i].correct
                
                
            }
        
        }
    },

    addQuestion: (obj) => {
        axios.post('http://localhost:5000/addQuestion', {obj})
        .then( res => console.log(res))
        .catch(err => console.error(err))
    },

    deleteQuestions: (id) => {
        axios.post(`http://localhost:5000/deleteQuestions`, {id})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },


}))