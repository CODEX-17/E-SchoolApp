import React from 'react'
import style from './FileClass.module.css'
import { FaFilter } from "react-icons/fa";

const FilesClass = () => {
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

          <select className={style.select}>
            <option value='all'>All</option>
            <option value='pdf'>Image</option>
            <option value='doc'>Docs</option>
          </select>

          <select className={style.select}>
            <option value='all'>ALL</option>
            <option value='pdf'>2023</option>
            <option value='doc'>2034</option>
          </select>

        </div>
      </div>
      
      <div className={style.listContainer}>
        <div className={style.card}>dasdsad</div>
        <div className={style.card}>dasdsad</div>
        <div className={style.card}>dasdsad</div>
        <div className={style.card}>dasdsad</div>
        <div className={style.card}>dasdsad</div>
        
      </div>
    </div>
  )
}

export default FilesClass