import React, { useEffect, useState } from "react";
import defaultImage from "../../../public/assets/default.png";
import { getFileByFileID } from "../../services/fileServices";

interface ImageRenderProps {
  image: string | File;
}

/**
 * 📸 `ImageRender` component
 * This component takes either a `File` object or a file ID string.
 * It fetches and displays the image using a fallback if needed.
 *
 * @param image - Either a File or a string (fileID, FILE or "default")
 * @returns Rendered <img> tag with proper source
 */

export default function ImageRender({ image }: ImageRenderProps) {
  if (!image) return null;

  const [renderImage, setRenderImage] = useState<string | File | string[]>(
    defaultImage
  );

  useEffect(() => {
    if (typeof image == "string") {
      if (image.includes("http://")) {
        setRenderImage(image);
        return;
      }

      if (image === "default") {
        setRenderImage(defaultImage);
      } else {
        const getImage = async () => {
          try {
            const response = await getFileByFileID(image);

            if (response) {
              setRenderImage(response);
            } else {
              setRenderImage(defaultImage);
            }
          } catch (error) {
            setRenderImage(defaultImage);
          }
        };

        getImage();
      }
    } else {
      const convertedImage = URL.createObjectURL(image);
      return setRenderImage(convertedImage);
    }
  }, []);

  return (
    <img
      src={typeof renderImage === "string" ? renderImage : ""}
      title="Insert Image FileType or FileID"
      alt="image"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    />
  );
}
