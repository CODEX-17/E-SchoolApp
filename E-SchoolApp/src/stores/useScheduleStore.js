import { create } from 'zustand'
import axios from 'axios'

export const useScheduleStore = create((set) => ({

    addSchedule: (obj) => {
        axios.post('http://localhost:5001/addschedule', { obj })
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
    },

    getSchedule : () => {
        axios.get('http://localhost:5001/getSchedule')
        .then(res => localStorage.setItem('schedules', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    addSchedule: (obj) => {
        axios.post('http://localhost:5001/addSchedule', {obj})
        .then( res => console.log(res))
        .catch(err => console.error(err))
    },
    
    deleteSchedule: (id) => {
        axios.post(`http://localhost:5001/deleteSchedule`, {id})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },

}))
