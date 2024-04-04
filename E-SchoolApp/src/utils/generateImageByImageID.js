import axios from "axios"
import { images } from "mammoth"
import { useEffect } from "react"

export default (imageID) => {

    useEffect(() => {
        axios.get('http://localhost:5001/images/getImages')
        .then((res) => {
            const imagesList = res.data
            const filter = imagesList.filter((data) => data.imageID === imageID).map((data) => data.data)
            if (filter.length > 0) {
                const url = 'http://localhost:5001/'
                return url+filter[0]
            }else {
                return false
            }

        })
        .catch((err) => console.log(err))
      },[])

}