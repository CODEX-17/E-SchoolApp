import { useState, useEffect } from "react";
import axios from "axios";

const useImageLoader = (imageID) => {
    const [imageUrl, setImageUrl] = useState(null)
 
    useEffect(() => {
        axios.get('http://localhost:5001/images/getImages')
            .then((res) => {
                const imagesList = res.data
                const filter = imagesList.filter((data) => data.imageID === imageID).map((data) => data.data)

                if (filter.length > 0) {
                    const url = 'http://localhost:5001/'
                    setImageUrl(url + filter[0])
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [imageID])

    return imageUrl
};

export default useImageLoader
