import axios, { AxiosError } from "axios"
import { Class } from "../types/interfaces"
const BASE_URL = 'http://localhost:5001'

interface ErrorResponse {
    message: string;
}

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

interface ClassInfo {
    className: string,
    classDesc: string | null,
    classCode: string,
    acctID: string,
    file?: File | null,
}

export const addClass = async (data: ClassInfo) => {
    
    try {

        const formData = new FormData

        formData.append('className', data?.className)
        formData.append('classDesc', data?.classDesc ?? '')
        formData.append('classCode', data?.classCode)
        formData.append('acctID', data?.acctID)
        
        if (data?.file) {
            formData.append('file', data.file);
        }
        
        const response = await axios.post(`${BASE_URL}/classes/addClass`, formData)

        if (!response || !response.data || response.data.length === 0) {
            return { message: 'No data store.' }
        }
        
        if (response) {
            console.log('Successfully class.')
            return response.data
        }

    } catch (error) {
        console.log('Server error', error)
        return { message: 'An error occurred while fetching classes.' }
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

        const axiosError = error as AxiosError<ErrorResponse>;

        // Log the error to understand where it failed
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with error:', axiosError.response.data);
            console.error('Status:', axiosError.response.status);
            console.error('Headers:', axiosError.response.headers);
            return axiosError.response.data; // return server error message
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error('No response received:', axiosError.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', axiosError.message);
        }

        return { message: 'An error occurred while fetching classes.' };
    
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