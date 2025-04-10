import axios from "axios"
const BASE_URL = 'http://localhost:5001'

export interface Notification {
    acctID: string,
    notificationID: string,
}

export const getNotificationsByAcctID = async (acctID: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/notification/getNotification/${acctID}`)

        if (!response || !Array.isArray(response.data) || response.data.length === 0) {
            return null
        }

        if (response) {
            console.log('Successfully get all notification.')
            return response.data[0]
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}

export const deleteNotification = async (data: Notification) => {
    try {
        const response = await axios.post(`${BASE_URL}/notification/deleteOneNotification`, data)

        if (!response || !Array.isArray(response.data) || response.data.length === 0) {
            return null
        }

        if (response) {
            console.log('Successfully delete notification.')
            return response.data[0]
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}

export const deleteAllNotification = async (notificationID: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/notification/deleteAllNotification/${notificationID}`)

        if (!response || !Array.isArray(response.data) || response.data.length === 0) {
            return null
        }

        if (response) {
            console.log('Successfully delete all notification.')
            return response.data[0]
        }

    } catch (error) {
        console.log('Server error', error)
        return null
    }
}