import { create } from 'zustand'
import axios from 'axios'

export const useRefresh = create((set) => ({

    getAccounts: () => {
        axios.get('http://localhost:5000/getAccounts')
        .then(res => localStorage.setItem('accounts', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getChoices: () => {
        axios.get('http://localhost:5000/getChoices')
        .then(res => localStorage.setItem('choices', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getClass: () => {
        axios.get('http://localhost:5000/getClass')
        .then(res => localStorage.setItem('class', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getComments: () => {
        axios.get('http://localhost:5000/getComments')
        .then(res => localStorage.setItem('comments', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getFiles: () => {
        axios.get('http://localhost:5000/getFiles')
        .then(res => localStorage.setItem('Files', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getFilllayout: () => {
        axios.get('http://localhost:5000/getFilllayout')
        .then(res => localStorage.setItem('filllayout', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getFriends: () => {
        axios.get('http://localhost:5000/getFriends')
        .then(res => localStorage.setItem('friends', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getImage: () => {
        axios.get('http://localhost:5000/getImage')
        .then(res => localStorage.setItem('image', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getMembers: () => {
        axios.get('http://localhost:5000/getMembers')
        .then(res => localStorage.setItem('members', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getMessages: () => {
        axios.get('http://localhost:5000/getMessages')
        .then(res => localStorage.setItem('messages', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getPost: () => {
        axios.get('http://localhost:5000/getPost')
        .then(res => localStorage.setItem('post', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getQuestionBank: () => {
        axios.get('http://localhost:5000/getQuestionBank')
        .then(res => localStorage.setItem('questionbank', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getQuestions: () => {
        axios.get('http://localhost:5000/getQuestions')
        .then(res => localStorage.setItem('questions', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getQuiz: () => {
        axios.get('http://localhost:5000/getQuiz')
        .then(res => localStorage.setItem('quiz', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getReactions: () => {
        axios.get('http://localhost:5000/getReactions')
        .then(res => localStorage.setItem('eactions', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getSchedule: () => {
        axios.get('http://localhost:5000/getSchedule')
        .then(res => localStorage.setItem('schedule', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getScores: () => {
        axios.get('http://localhost:5000/getScores')
        .then(res => localStorage.setItem('scores', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    getSubject: () => {
        axios.get('http://localhost:5000/getSubject')
        .then(res => localStorage.setItem('subject', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

}))
