import { create } from 'zustand'
import axios from 'axios'

export const usePostStore = create((set) => ({

    uploadPost: (postSet) => {
        const postID = postSet.postID
        const acctID = postSet.acctID
        const datePosted = postSet.datePosted
        const fileID = postSet.fileID
        const heartCount = postSet.heartCount
        const imageID = postSet.imageID
        const likeCount = postSet.likeCount
        const name = postSet.name
        const postContent = postSet.postContent
        const replyID = postSet.replyID
        const subjectName = postSet.subjectName
        const timePosted = postSet.timePosted
        const classCode = postSet.classCode
        const postType = postSet.postType
        const quizID = postSet.quizID
        const schedID = postSet.schedID
        const duration = postSet.duration
        const random = postSet.random

        axios.post('http://localhost:5000/uploadPost', { 
            postID,
            acctID,
            name,
            timePosted,
            datePosted,
            postContent,
            replyID,
            imageID,
            fileID,
            heartCount,
            likeCount,
            classCode,
            subjectName,
            postType,
            quizID,
            schedID,
            duration,
            random,
        } )
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
    },

    addPost: (obj) => {
        axios.post('http://localhost:5000/addPost', {obj})
        .then( res => console.log(res))
        .catch(err => console.error(err))
    },

    updatePost: (obj) => {
        axios.put('http://localhost:5000/updatePost', {obj})
        .then(res => console.error(res))
        .catch(err => console.error(err))
    },

    deletePost: (id) => {
        axios.delete('http://localhost:5000/deletePost/'+id)
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
    },

    getPost: () => {
        axios.get('http://localhost:5000/getPost')
        .then(res => localStorage.setItem('post', JSON.stringify(res.data)))
        .catch(err => console.error(err))
    },

    deletePost: (id) => {
        axios.post(`http://localhost:5000/deletePost`, {id})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    },


}))
