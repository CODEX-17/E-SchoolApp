import React, { useEffect, useState } from 'react'
import defaultImage from '../../../public/assets/default.png'
import { getImagesByImageID } from '../../services/imageServices'

const ImageRender = ({ image }) => {


  const [renderImage, setRenderImage] = useState(defaultImage)

  useEffect(() => {

    if (typeof(image) === 'string') {
        
        if (image === 'default') {
            return setRenderImage(defaultImage)
        }else {

            const getImage = async () => {
                try {
                    const response = await getImagesByImageID(image)

                    if (response) {
                        return setRenderImage(response)
                    }else {
                        return setRenderImage(defaultImage)
                    }

                } catch (error) {
                    return setRenderImage(defaultImage)
                }
            }

            getImage()

        }
    
    }else {
        const convertedImage = URL.createObjectURL(image)
        return setRenderImage(convertedImage)
    }
  },[])

  return (
      <img 
        src={renderImage} 
        alt="image"
        style={{ 
            width: '100%', 
            height: '100%',
            position: 'relative',

        }}
    />
  )
}

export default ImageRender
