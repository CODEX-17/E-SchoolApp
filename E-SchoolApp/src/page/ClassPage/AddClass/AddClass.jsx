import React, { useState } from 'react'
import style from './AddClass.module.css'
import logo from '../../../../public/assets/logo.png'
import whiteLogo from '../../../../public/assets/logo-white.png'

const AddClass = () => {

  const [showExcellInputCard, setshowExcellInputCard] = useState(false)
  const [excel, setExcel] = useState(null)
  
  const handleCreateClass = () => {

  }

  return (
    <div>
        <div className={style.container}>
            <h1 id={style.mainTitle}>Join or Create a Class</h1>
            <div className={style.horizontal}>
                <div className={style.card}>
                    <img src={logo} width={144} alt="logo" />
                    <h2>Create Class</h2>
                    <button onClick={handleCreateClass}>Create</button>
                </div>
                {
                    !showExcellInputCard ? (
                        <div className={style.card}>
                            <img src={excel} width={200} alt="logo" />
                            <h2>Import Excel</h2>
                            <button onClick={() => selectExcellInputCard(true)}>Import</button>
                        </div>
                    ) : (
                        <div className={style.card} style={{ backgroundColor: '#D0E7D2'}}>
                            <BiExit size={20} id={style.iconExit} onClick={() => selectExcellInputCard(false)}/>
                            <input type="file" id={style.importExcelFile} accept='.xlsx' onChange={handleFileImport}/>
                            <button onClick={handleExcelFileSubmit} style={{ backgroundColor: '#099AED'}}>Upload</button>
                        </div>
                    )
                }
                
                <div className={style.card}>
                    <img src={whiteLogo} width={144} alt="Whitelogo" />
                    <h2 id={style.joinText}>Join in Class with ClassCode</h2>
                    <input type="text" />
                    <button>Create</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default AddClass
