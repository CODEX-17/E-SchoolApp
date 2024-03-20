import { create } from 'zustand'
import axios from 'axios'

export const useFilesStore = create((set) => ({

    getFiles: () => {
        axios.get('http://localhost:5000/getALLfiles')
        .then((res) => localStorage.setItem('files', JSON.stringify(res.data)))
        .catch((error) => console.error(error))
    },

    addFiles: (obj) => {
        axios.post('http://localhost:5000/addFiles', {obj})
        .then(res => console.log(res.data))
        .catch((error) => console.error(error))
    },

    uploadFiles: (docsFiles) => {
        const {fileID, file} = docsFiles
        const formData = new FormData()
        formData.append('file', file)
        formData.append('fileID', fileID)

        axios.post('http://localhost:5000/uploadFile', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
        })
        .then(res => console.log(res.data))
        .catch(error => console.log(error)) 
    },

    deleteFiles: (id) => {
        axios.post(`http://localhost:5000/deleteFiles`, {id})
        .then( res => console.log(res))
        .catch(err => console.log(err))
    }


}))
