import { create } from 'zustand'
import axios from 'axios'

export const useMemberStore = create((set)=> ({

    members: [],

    getMembers: () => {
        axios.get('http://localhost:5001/getMembers')
        .then((res) => localStorage.setItem('members', JSON.stringify(res.data)))
        .catch((error) => console.error(error))
    },

    deleteMembers: (ID) => {
        axios.post(`http://localhost:5001/deleteMembers`, {ID})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },

    addMembers: (membersID, acctID, firstName, midleName, lastName, memberType) => {

        console.log(membersID, acctID, firstName, midleName, lastName, memberType)

        axios.post(`http://localhost:5001/addMembers`, { 
            membersID,
            acctID,
            firstName,
            midleName,
            lastName,
            memberType,
        })
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },

    addMember: (obj) => {
        axios.post('http://localhost:5001/addMember', {obj})
        .then( res => console.log(res))
        .catch(err => console.error(err))
    },

    updateMember: (obj) => {
        axios.put('http://localhost:5001/updateMember', {obj})
        .then(res => console.error(res))
        .catch(err => console.error(err))
    },

    deleteMembers: (acctID) => {
        axios.put(`http://localhost:5001/deleteMembers`, { acctID })
        .then( res => console.log(res))
        .catch(err => console.log(err))
    }

}))