import React, { useEffect, useState } from 'react'
import style from './FileClass.module.css'
import { FaFilter } from "react-icons/fa"
import { FaImage } from "react-icons/fa6"
import { BsThreeDotsVertical } from "react-icons/bs"
import { CgSoftwareDownload } from "react-icons/cg"
import { MdDeleteOutline } from "react-icons/md"
import { SiFiles } from "react-icons/si"
import axios from 'axios'


const FilesClass = ({classCode}) => {

  const [currentClassCode, setCurrentClassCode] = useState(classCode)
  const userAccount = JSON.parse(localStorage.getItem('user'))

  const [filesList, setfilesLists] = useState([])
  const [renderedFiles, setrenderedFiles] = useState([])
  const [selectedFile, setselectedFile] = useState(null)
  
  //showVariables
  const [isShowOption, setIsShowOption] = useState(false)

  useEffect(() => {

    if (currentClassCode) {

      //API get all files by ClassCode
      axios.get('http://localhost:5001/files/getAllFilesAndImages/' + currentClassCode)
      .then((res) => {
        const files = res.data
        setfilesLists(files)
        setrenderedFiles(files)
      })
      .catch((err) => console.log(err))
    }
    listTheYears()
  },[])

  //Download files
  const handleDownloadFile = (fileName) => {
    const url = 'http://localhost:5001/'
    window.location.href = url + fileName
  }

  //Delete file by fileID and fileName
  const handleDeleteFiles = (index) => {
    const selectedFileToDelete = filesList[index]
    console.log(selectedFileToDelete)
    
    if (selectedFileToDelete) {

      //If the file is image
      if (selectedFileToDelete.type === 'image/jpeg') {
        const imageDetails = {
          imageID: selectedFileToDelete.imageID,
          name: [selectedFileToDelete.data]
        }

        //API to delete image in database
        axios.delete('http://localhost:5001/images/deleteImage', { data: imageDetails })
        .then((res) => {
          const result = res.data
          console.log(result.message)
        })
        .catch((err) => console.log(err))
      }else {

        const fileDetails = {
          fileID: selectedFileToDelete.fileID,
          name: selectedFileToDelete.data
        }
  
        //API to delete file in database
        axios.delete('http://localhost:5001/files/deleteFiles', { data: fileDetails })
          .then((res) => {
            const result = res.data
            console.log(result.message)
          })
            .catch((err) => console.log(err))
    
      }

      //Delete data in filesList
      const filter = filesList.filter((data, index) => index !== index)
      setrenderedFiles(filter)
      setfilesLists(filter)

    }

  }


  const handleFilterData = (e) => {
    e.preventDefault()
    const value = e.target.value
    
    if (value === 'all') {
      setrenderedFiles(filesList)
    }else if(value === 'image') {
      const filter = filesList.filter((data) => data.type === 'image/jpeg' || data.type === 'image/gif' || data.type === 'image/png')
      setrenderedFiles(filter)
    }else {
      const filter = filesList.filter((data) => data.type === 'application/vnd.openxmlformats-officedocument.pres' || data.type === 'application/pdf')
      setrenderedFiles(filter)
    }

  }

  const listTheYears = () => {
    if (filesList) {
      //Get the year only
      const filterYears = filesList.map((data) => data.dateUploaded.substring(11, 15))
      
      //Remove duplicate values
      const removeDuplicate = [...new Set(filterYears)]

      //Remove no value
      const cleanArray = removeDuplicate.filter((data) => data !== '')

      return cleanArray
    }
  }


  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Files</h2>
        <div className={style.filterDiv}>
          
        </div>
      </div>
      <div className={style.filerSection}>
        <p>Search:</p>
        <div className={style.filterDiv}>
  
          <FaFilter size={15}/>

          <select className={style.select} onChange={handleFilterData}>
            <option value='all'>All</option>
            <option value='image'>Image</option>
            <option value='doc'>Docs</option>
          </select>

          <select className={style.select}>
            <option value='all'>all</option>
          {
            filesList.length > 0 && (
              listTheYears().map((data, index) => (
                <option value='pdf' key={index}>{data}</option>
              ))
            )
          }
            
            
          </select>

        </div>
      </div>
      
      <div className={style.listContainer}>
        {
          renderedFiles.length > 0 ? (
            renderedFiles.map((data, index) => (
              <div className={style.card} key={index}>
                {
                  data.type === 'image/jpeg' ? (
                    <FaImage color='white'/>
                  ):(
                    <SiFiles color='white'/>
                  )
                }
                <p>{data.data}</p>
                <BsThreeDotsVertical cursor={'pointer'} onClick={() => {setIsShowOption(!isShowOption), setselectedFile(index)}}/>
                  {
                    isShowOption && index === selectedFile && (
                      <div className={style.optionCard}>
                        <div className={style.boxIcon}>
                          <CgSoftwareDownload title='download' onClick={() => handleDownloadFile(data.data)}/>
                        </div>
                        {
                          //If the user is admin previlage to delete files
                          userAccount.acctype === 'faculty' && 
                            <div className={style.boxIcon}>
                              <MdDeleteOutline title='delete' onClick={() => handleDeleteFiles(index)}/>
                            </div>
                        }
                      </div>
                    )
                  }   
              </div>
            ))
            
          ) : (
            <div className={style.noFilesDiv}>
              No files
            </div>
          )
        }
        

        
        
        
      </div>
    </div>
  )
}

export default FilesClass