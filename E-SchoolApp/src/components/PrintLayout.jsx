import React, { useRef, useState } from 'react'
import style from './PrintLayout.module.css'
import html2pdf from 'html2pdf.js'
import { BiExit } from "react-icons/bi"
import { FiEdit } from 'react-icons/fi'
import { SlPrinter } from "react-icons/sl"
import csu from '../assets/csu.png'
import cics from '../assets/cics.png'
import { TiExport } from "react-icons/ti"
import { IoSettingsOutline } from "react-icons/io5";

const PrintLayout = ({ previewShow, questionObj, quizTitle, quizInstructions, choices, fillLayoutSet }) => {

    console.log(questionObj)
    console.log('fillLayoutSet:',fillLayoutSet)
    
    const pdfContainerRef = useRef(null)
    const questionSet = questionObj
    const choicesSet = choices
    const fillLayout = fillLayoutSet
    const questionChoices = questionSet.filter((ques) => ques.questionType === 'choices')
    const questionText = questionSet.filter((ques) => ques.questionType === 'enumeration')
    const questionFill = questionSet.filter((ques) => ques.questionType === 'fill')
    const questionTORF = questionSet.filter((ques) => ques.questionType === 'True Or False')
    const [isShowSetting, setisShowSetting] = useState(false)
    const [enumerationInstruction, setenumerationInstruction] = useState('Read the following questions and write your answers on the blank spaces below.')
    const [fillInstruction, setfillInstruction] = useState('Answer the following questions or complete the statements by writing the appropriate words or amounts in the answer blank.')
    const [choicesInstruction, setchoicesInstruction] = useState('Choose the correct answer and write it on your answer sheet.')
    const [torFInstruction, settorFInstruction] = useState('Write TRUE if the answer is true and write FALSE if the answer is False.')
    const [generalInstruction, setgeneralInstruction] = useState(null)

    const handleExportPDF = () => {
        const content = pdfContainerRef.current;

        if (content) {
          const pdfOptions = {
            margin: 10,
            filename: 'exported-document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };
    
          html2pdf().from(content).set(pdfOptions).save();
        }
      };

  return (
    <div className={style.containerPrint}> 
            <div id={style.menuBtn}>
                <div className='d-flex gap-2'>
                    <TiExport id={style.btnMenu} size={25} title='Export to PDF' onClick={handleExportPDF}/>
                    <IoSettingsOutline id={style.btnMenu} color={isShowSetting && '#099AED'} size={23} title='Setting instructions' onClick={() => setisShowSetting(true)}/>
                </div>
                <div className='d-flex gap-2'>
                    <FiEdit id={style.btnMenu} size={20} title='Edit' onClick={() => previewShow('previewList')}/>
                    <BiExit id={style.btnMenu} size={21} title='Exit' onClick={() => previewShow('generator')}/>
                </div>
            </div>
        <div className={style.contentPrint}>
            {
                isShowSetting ? (
                    <div className={style.settingContainer}>
                        <div className='d-flex justify-content-between'>
                            <h2>Setting Instructions</h2>
                            <button onClick={() => setisShowSetting(false)}>Save</button>
                        </div>
                        <p>General Direction</p>
                        <textarea type="text" value={generalInstruction} placeholder='insert instruction' onChange={(e) => setgeneralInstruction(e.target.value)}/>
                        <p>Enumeration Instruction</p>
                        <textarea type="text" value={enumerationInstruction} placeholder='insert instruction' onChange={(e) => setenumerationInstruction(e.target.value)}/>
                        <p>Multiple Choice Instruction</p>
                        <textarea type="text" value={choicesInstruction} placeholder='insert instruction' onChange={(e) => setchoicesInstruction(e.target.value)}/>
                        <p>Fill in the blank Instruction</p>
                        <textarea type="text" value={fillInstruction} placeholder='insert instruction' onChange={(e) => setfillInstruction(e.target.value)}/>
                        <p>True or False Instruction</p>
                        <textarea type="text" value={torFInstruction} placeholder='insert instruction' onChange={(e) => settorFInstruction(e.target.value)}/>
                    </div>
                ):(
                    <div ref={pdfContainerRef} className={style.examPrint}>
                        <div className={style.header}>
                            <img src={cics} alt="cics" className={style.logo}/>
                            <div className={style.vertical}>
                                <h1>{quizTitle}</h1>
        
                            </div>
                            <img src={csu} alt="cics" className={style.logo}/>
                        </div>
                        <div className='d-flex justify-content-between mt-5 mb-4'>
                            <div className={style.bio}>
                                <p>Name:_________________</p>
                                <p>Section:_________________</p>
                            </div>
                            <div className={style.bio}>
                                <p>Score:_________________</p>
                                <p>Date:_________________</p>
                            </div>
                        </div>
                        {
                            generalInstruction && (
                                <div className={style.instructions}>
                                    <h1>General Direction:</h1>
                                    <p style={{ paddingLeft: '5%'}}>{generalInstruction}</p>
                                </div>
                            )
                        }
                        
                        {
                            questionChoices.length > 0 && (
                                <div className={style.examMultipleChoice}>
                                    <h1><u>Multiple Choice</u></h1>
                                    <p><b>DIRECTION:</b> {choicesInstruction}</p>
                                    {
                                        questionChoices.map((questions, index) => (
                                            <div className={style.questions} key={index}>
                                                <p>{parseInt(index+1)+'. '+questions.questionContent}</p>
                                                {
                                                    choicesSet
                                                        .filter((choices) => choices.choicesID === questions.choicesID)
                                                        .map((choices, index) => (
                                                            <p className={style.choices} key={index}>{choices.letter+'. '+choices.content}</p>
                                                        ))
                                                }
        
                                            </div>
                                        ))
                                    }
                                    
                                </div>
                            )
                        }
        
                        {
                            questionText.length > 0 && (
                                <div className={style.examMultipleChoice}>
                                    <h1><u>Enumeration</u></h1>
                                    <p><b>DIRECTION:</b> {enumerationInstruction} </p>
                                    {
                                        questionText.map((questions, index) => (
                                            <div className={style.questions} key={index}>
                                                <p>{'___________'+parseInt(index+1) +'. '+ questions.questionContent}</p>
        
                                            </div>
                                        ))
                                    }
                                    
                                </div>
                            )
                        }
        
                        {
                            questionFill.length > 0 && (
                                <div className={style.examMultipleChoice}>
                                    <h1><u>Fill in the blank</u></h1>
                                    <p><b>DIRECTION:</b> {fillInstruction} </p>
                                    <div className={style.questions}>
                                        {
                                            questionFill.map((questions, index) => (
                                                <p key={index}>
                                                    {parseInt(index+1) + '. '}
                                                    {
                                                        fillLayout
                                                        .filter((fill) => fill.fillLayoutID === questions.fillLayoutID)
                                                        .map((fill, index) => (
                                                            fill.fillType === 'blank' && ('___________') ||
                                                            fill.fillType === 'text' && (fill.fillContent)
                                                        ))
                                                    }
                                                </p>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
        
                        {
                            questionTORF.length > 0 && (
                                <div className={style.examMultipleChoice}>
                                    <h1><u>True Or False</u></h1>
                                        <p><b>DIRECTION:</b> {torFInstruction} </p>    
                                        {
                                            questionTORF.map((questions, index) => (
                                                <div className={style.questions} key={index}>
                                                    <p>{'___________'+parseInt(index+1)+'. '+ questions.questionContent}</p>
        
                                                </div>
                                            ))
                                        }
                                </div>
                            )
                        }
        
                    </div>
                )
            }

        </div>
    </div>
  ) 
}

export default PrintLayout