import axios from "axios"
import { Class } from "../types/interfaces"
const BASE_URL = 'http://localhost:5001'

export const getClassesByAccount = async (acctID: string) => {
    try {
        
        const response = await axios.get(`${BASE_URL}/classes/getClassesByAccount/${acctID}`)

        if (!response || !response.data || response.data.length === 0) {
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

export const updateClassVisibility = async (id: number, status: boolean) => {
    try {
        
        const response = await axios.patch(`${BASE_URL}/classes/updateClassVisibility/`, {id, status})

        if (!response || !response.data || response.data.length === 0) {
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

export const addClass = async (data: Class) => {
    try {
        
        const response = await axios.post(`${BASE_URL}/classes/addClass`, data)

        if (!response || !response.data || response.data.length === 0) {
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

        if (!response || !response.data || response.data.length === 0) {
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

interface Data {
    classCode: string,
    acctID: string,
}

export const joinClassByClassCode = async (data: Data) => {

    try {
        
        const response = await axios.post(`${BASE_URL}/classes/joinClassByClassCode`, data)

        if (!response || !response.data || response.data.length === 0) {
            return null
        }
        
        if (response) {
            console.log('Successfully join class.')
            return response.data
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}