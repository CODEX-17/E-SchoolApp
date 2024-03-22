import { create } from 'zustand'
import axios from 'axios'

export const useFriendStore = create((set) => ({

    getFriend: () => {
        axios.get('http://localhost:5001/getFriend')
        .then(res => localStorage.setItem('friends', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    deleteFriend: (friendAcctID) => {
        axios.post(`http://localhost:5001/deleteFriend`, {friendAcctID})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },

    addFriend: (obj) => {
        axios.post(`http://localhost:5001/addFriend`, {obj})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },

    updateFriend: (obj) => {
        axios.put('http://localhost:5001/updateFriend', {obj})
        .then(res => console.error(res))
        .catch(err => console.error(err))
    }

}))
