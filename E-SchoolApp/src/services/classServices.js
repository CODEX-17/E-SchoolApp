import axios from "axios"
const BASE_URL = 'http://localhost:5001'

export const getClassesByAccount = async (acctID) => {
    try {
        
        const response = await axios.get(`${BASE_URL}/classes/getClassesByAccount/${acctID}`)

        if (!response || response.length === 0) {
            return null
        }
        
        if (response) {
            console.log('Successfully get all classes by accountID.')
            return response.data
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}

export const updateClassVisibility = async (id, status) => {
    try {
        
        const response = await axios.patch(`${BASE_URL}/classes/updateClassVisibility/`, {id, status})

        if (!response || response.length === 0) {
            return null
        }
        
        if (response) {
            const classStatus = status ? 'hide' : 'unhide'

            console.log(`Successfully ${classStatus} class.`)
            return response.data
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}

export const addClass = async (data) => {
    try {
        
        const response = await axios.post(`${BASE_URL}/classes/addClass`, data)

        if (!response || response.length === 0) {
            return null
        }
        
        if (response) {
            console.log('Successfully class.')
            return response.data
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}

export const getAllClasses = async () => {
    try {
        
        const response = await axios.get(`${BASE_URL}/classes/getClasses`)

        if (!response || response.length === 0) {
            return null
        }
        
        if (response) {
            console.log('Successfully get all classes.')
            return response.data
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}