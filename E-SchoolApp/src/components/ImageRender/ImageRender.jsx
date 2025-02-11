import React, { useEffect, useState } from 'react'
import defaultImage from '../../../public/assets/default.png'
import { getFileByFileID } from '../../services/fileServices'

const ImageRender = ({ image }) => {

  const [renderImage, setRenderImage] = useState(defaultImage)

  useEffect(() => {

    if (typeof(image) == 'string') {
        
        if (image === 'default') {
            setRenderImage(defaultImage)
        }else {

            const getImage = async () => {
                try {
                    const response = await getFileByFileID(image)
                  
                    if (response) {
                        setRenderImage(response)
                    }else {
                        setRenderImage(defaultImage)
                    }

                } catch (error) {
                    setRenderImage(defaultImage)
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
