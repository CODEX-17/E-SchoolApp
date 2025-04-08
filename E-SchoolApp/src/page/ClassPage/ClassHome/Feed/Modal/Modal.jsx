import React, { useState, useRef, useContext } from 'react'
import style from './Modal.module.css'
import { getFileByFileID } from '../../../../../services/fileServices'
import { BiExit } from "react-icons/bi"
import { IoCloseCircle, IoDocumentText } from "react-icons/io5"
import { FaFileImage, FaRegImages } from "react-icons/fa6"
import { MdSend, MdOutlineAttachment } from "react-icons/md"
import generateFullname from '../../../../../utils/generateFullname'
import ImageRender from '../../../../../components/ImageRender/ImageRender'
import { UserDetailContext } from '../../../../../context/UserDetailContext'


const Modal = ({ setIsShowModal }) => {

    const { userDetails } = useContext(UserDetailContext)

    const [postContent, setPostContent] = useState('')
    const [docxFiles, setdocxFiles] = useState(null)
    const [file, setFile] = useState(null)

    const inputImageFileRef = useRef(null)
    const inputFilesRef = useRef(null)
    const inputImageFileRefComment = useRef(null)
    const inputFilesRefComment = useRef(null)
    
    
    const handleUploadFilesClick = () => {
        inputFilesRef.current.click()
    }

    const handleUploadImageClick = () => {
        inputImageFileRef.current.click()
    }

    const handleGetFiles = (e, type) => {
        const file = e.target.files
        const fileList = Array.from(file)

        if (type === 'file') {
            setFile(fileList)
        }else {
            setdocxFiles(fileList)
        }

        
    }
    
    // // Submit new post
    // const handlePost = () => {

    //     // insert current post in variable
    //     let updated = [...currentPost]
        
    //     let updatedPost = {
    //         postID: generateID(),
    //         acctID: userAccount.acctID,
    //         name: generateFullname(),
    //         timePosted: time,
    //         datePosted: date,
    //         postContent,
    //         replyID: generateID(),
    //         image: file,
    //         file: docxFiles,
    //         heartCount,
    //         likeCount,
    //         classCode: currentClassCode,
    //         subjectName,
    //         postType: 'normal',
    //         quizID: 'none',
    //         schedID: 'none',
    //         schedStatus: 'no',
    //         dueStatus: 'no',
    //         closeStatus: 'no',
    //         duration: 0,
    //         random: 'none',
    //     }

    //     // if image is not null it return unique id
    //     if (updatedPost.image) {
    //         updatedPost.imageID = generateID()
    //     }else {
    //         updatedPost.imageID = 'none'
    //     }

    //     // if file is not null it return unique id
    //     if (updatedPost.file) {
    //         updatedPost.fileID = generateID()
    //     }else {
    //         updatedPost.fileID = 'none'
    //     }

    //     // add post in variable
    //     updated.push(updatedPost)
    //     // setCurrentPost(updated)

    //     console.log('updatedPost', updatedPost)

    //     // API for adding post
    //     axios.post('http://localhost:5001/post/addPost', updatedPost )
    //     .then((res) => {
    //         const data = res.data
    //         console.log(data.message)

    //         //API for adding image of post
    //         if (updatedPost.image) {
                
    //             const images = updatedPost.image
    //             const formData = new FormData
    //             formData.append('imageID', updatedPost.imageID)
    //             formData.append('dateUploaded', updatedPost.datePosted)
    //             formData.append('timeUploaded', updatedPost.timePosted)
    //             formData.append('acctID', updatedPost.acctID)
    //             formData.append('classCode', updatedPost.classCode)

    //             for (let i = 0; i < images.length; i++) {
    //                 formData.append('image', images[i])
    //             }
                
    //             axios.post('http://localhost:5001/images/addImage', formData )
    //             .then((res) => {
    //                 const data = res.data
    //                 setshowLoading(true)
    //                 getImagesByClassCode()
    //                 console.log(data.message)
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })

    //         }

    //         //API for adding docs of post
    //         if (updatedPost.file) {
                
    //             const files = updatedPost.file
    //             const formData = new FormData
    //             formData.append('fileID', updatedPost.fileID)
    //             formData.append('dateUploaded', updatedPost.datePosted)
    //             formData.append('timeUploaded', updatedPost.timePosted)
    //             formData.append('acctID', updatedPost.acctID)
    //             formData.append('classCode', updatedPost.classCode)
                
    //             for (let i = 0; i < files.length; i++) {
    //                 formData.append('file', files[i])
    //             }

    //             axios.post('http://localhost:5001/files/addFiles', formData)
    //             .then((res) => {
    //                 const data = res.data
    //                 getFilesByClassCode()
    //                 console.log(data.message)
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })

    //         }

    //         // reset variables
    //         setPostContent('')
    //         setFile(null)
    //         setdocxFiles(null)
    //         setshowPostModal(false)

    //         //Update post
    //         socket.emit('UpdatePost', currentClassCode)

    //         // notification for success
    //         const message = 'posted successfully'
    //         notify(message, 'success')
            
    //     })
    //     .catch((err) => console.log(err))

    // }

    const handlePost = () => {

    }

  return (
    <div className={style.container}>
        <div className={style.modal}>
            <div className='d-flex w-100 align-items-center justify-content-between'>
                <div className='d-flex gap-2 align-items-center'>
                    <div className={style.imageContainer}>
                        <ImageRender image={userDetails?.fileID} />
                    </div>
                    <p>{generateFullname()}</p>
                </div>
                <BiExit 
                    size={20} 
                    title='closed' 
                    cursor={'pointer'} 
                    onClick={() => setIsShowModal(false)}
                />
            </div>
            <div className={style.bodyPostModal}>
                {
                    file && 
                    <div className={style.fileListPost}>
                        {
                            file.map((data, index) => (
                                <div className={style.imageContainer}>
                                    <IoCloseCircle id={style.deleteImagePreview} size={25} onClick={() => deleteImageInPostModal(index)}/>
                                    <ImageRender image={data} />
                                </div>
                            ))
                        }
                    </div>
                }

                {
                    docxFiles && 
                    <div className={style.fileListPost}>
                        {
                            docxFiles.map((data, index) => (
                            <div className={style.fileDivPreview} key={index}>
                                <IoCloseCircle id={style.deleteImagePreview} size={25} onClick={() => deleteFilesInPostModal(index)}/>
                                <IoDocumentText size={25} color='white'/>
                                <p>{data.name}</p>
                            </div>
                            ))
                        }
                    </div>
                }
                   
                <textarea 
                    placeholder='Share your thoughts here...' 
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                ></textarea>

                <div className='d-flex w-100 mt-2 mb-3 gap-2 justify-content-end'>
                    <div 
                        className={style.uploadContainer} 
                        onClick={handleUploadImageClick}
                        title='Upload Image'
                    >
                        <input 
                            type="file"
                            ref={inputImageFileRef}
                            accept='image/*'
                            onChange={(e) => handleGetFiles(e, 'file')}
                            style={{ display:'none'}}
                            multiple
                        />
                        <FaRegImages color='#099AED' size={15} />
                    </div>
                    <div 
                        className={style.uploadContainer} 
                        onClick={handleUploadFilesClick}
                        title='Upload Docs'
                    >
                        <input 
                            type="file"
                            ref={inputFilesRef}
                            accept=".doc, .docx, .pdf, .txt, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={(e) => handleGetFiles(e, 'docs')}
                            style={{ display:'none'}}
                            multiple
                        />
                        <MdOutlineAttachment color='#099AED' size={15} />
                    </div>
                </div>
                
                <button className={style.btnPostModal} onClick={handlePost}>Post</button>
            </div>
        </div>      
    </div>
  )
}

export default Modal
