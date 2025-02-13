import React, { useState} from 'react'
import style from './Sidebar.module.css'
import { FaInfoCircle } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { RiAiGenerate } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import logo from '../../../../../../public/assets/logo.png'

const Sidebar = ({ display, setDisplay }) => {

  const [isShowSideBar, setIsShowSidebar] = useState(true)

  return (
    <div 
        className={style.sidebar}
        onClick={() => setIsShowSidebar(!isShowSideBar)}
        style={{ width: isShowSideBar ? 250 : 80, }}
    >
      <button 
        className={isShowSideBar ? style.btnText : style.btnIcon}
        style={{ backgroundColor: display === 'information' ? '#3e3f4017' : 'transparent' }}
        onClick={() => setDisplay('information')}
      >
        <FaInfoCircle/> {isShowSideBar && 'Quiz Information'} 
      </button>

      <button 
        className={isShowSideBar ? style.btnText : style.btnIcon}
        style={{ backgroundColor: display === 'preview' ? '#3e3f4017' : 'transparent' }}
        onClick={() => setDisplay('preview')}
      >
        <VscPreview/> {isShowSideBar && 'Quiz Preview'} 
      </button>

      <button 
        className={isShowSideBar ? style.btnText : style.btnIcon}
        style={{ backgroundColor: display === 'generator' ? '#3e3f4017' : 'transparent' }}
        onClick={() => setDisplay('generator')}
      >
        <RiAiGenerate/> {isShowSideBar && 'Question Generator'} 
      </button>

      <button 
        className={isShowSideBar ? style.btnText : style.btnIcon}
        style={{ backgroundColor: display === 'setup' ? '#3e3f4017' : 'transparent' }}
        onClick={() => setDisplay('setup')}
      >
        <IoSettings/> {isShowSideBar && 'Quiz Setup'} 
      </button>
    </div>
  )
}

export default Sidebar
