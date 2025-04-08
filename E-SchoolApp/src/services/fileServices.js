import axios from "axios"
const BASE_URL = 'http://localhost:5001'

export const getFileByFileID = async (fileID) => {
    try {
        const response = await axios.get(`${BASE_URL}/files/getFileByFileID/${fileID}`)

        if (response) {
            return `${BASE_URL}/${response.data[0].name}`
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}
