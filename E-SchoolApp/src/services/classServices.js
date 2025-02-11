import axios from "axios"
const BASE_URL = 'http://localhost:5001'

export const getClassesByAccount = async () => {
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