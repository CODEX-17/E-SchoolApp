import axios from "axios"
const BASE_URL = 'http://localhost:5001'

export const getImagesByImageID = async (imageID) => {
    try {
        const response = await axios.get(`${BASE_URL}/images/getImagesByImageID/${imageID}`)

        if (response) {
            return `${BASE_URL}/${response.data[0].data}`
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}