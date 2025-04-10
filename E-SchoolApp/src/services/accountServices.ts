import axios from "axios"
const BASE_URL = 'http://localhost:5001'

export const getProfileDataByAcctID = async (acctID: string) => {
    try {
        
        const response = await axios.get(`${BASE_URL}/accounts/getProfileDataByAcctID/${acctID}`)

        if (!response || !Array.isArray(response.data) || response.data.length === 0) {
            return null
        }
        
        if (response) {
            console.log('Successfully get all classes by accountID.')
            return response.data[0]
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}

export const verifyAccount = async (email: string, password: string) => {
    try {
        
        const response = await axios.post(`${BASE_URL}/accounts/verifyAccount`, { email, password })

        if (!response || !Array.isArray(response.data) || response.data.length === 0) {
            return null
        }
        
        if (response) {
            console.log('Successfully verify this account.')
            return response.data[0]
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}



 