import React, { useEffect, useState } from 'react'
import style from './PreviewQuiz.module.css'
import { BiExit } from "react-icons/bi"
import { FiEdit } from 'react-icons/fi'
import sample from '../assets/sample.jpg'
import { SlPrinter } from "react-icons/sl";


const PreviewQuiz = ({ onData, quizTitle, choices, questionObj, imageSetQuestion, fillLayoutSet, finalQuestionSet}) => {

const questionSet = finalQuestionSet
const imageSet = imageSetQuestion
const choicesSet = choices
const fillLayout = fillLayoutSet

console.log(finalQuestionSet)
console.log('choices:', choices)

useEffect(() => {
    choicesSet.filter((data) => data.choicesID === 'cPc8PQ5T').map((data) => console.log('filter:', data))
},[])



  return (
    <div className={style.container}>
        <div className={style.content}>
            <div className={style.header}>
                <p id={style.quizTitle}>Quiz title</p>
                <h2>{quizTitle ? quizTitle : 'Insert Title'}</h2>
                <div id={style.menuBtn}>
                    <SlPrinter id={style.btnMenu} size={21} title='Print' onClick={() => onData('printLayout')}/>
                    <FiEdit id={style.btnMenu} size={21} title='Edit' onClick={() => onData('previewList')}/>
                    <BiExit id={style.btnMenu} size={22} title='Exit' onClick={() => onData('generator')}/>
                </div>
            </div>
           
            {
                questionSet?.map((questions, index) => (
                    console.log('question:', questionSet),
                    questions.questionType === 'enumeration' && questions.imageID === 'none' && (

                        <div className={style.quizContainer} key={index}>
                            <div className={style.topquizContainer}>
                                <div id={style.circle}>Q{questions.questionNumber}</div>
                                <div className={style.titlesDiv}>
                                    <p>Question:</p>
                                    <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                    <p style={{ fontSize: '8pt'}}><i>{questions.keySensitive ? 'key senstive answer.' : 'not key senstive answer.'}</i></p>
                                </div>
                            </div>
                            <div className={style.botquizContainer}>
                                <p style={{ margin: '0', fontSize: '10pt'}}>Answer:</p>
                                <textarea id={style.textAnswer}>
                                    {questions.questionAnswerText}
                                </textarea>
                            </div>
                        </div>

                    ) ||

                    questions.questionType === 'enumeration' && questions.imageID != 'none' && (

                        <div className={style.quizContainer} key={index}>
                            <div className={style.topquizContainer}>
                                <div id={style.circle}>Q{questions.questionNumber}</div>
                                <div className={style.titlesDiv}>
                                    <p>Question:</p>
                                    <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                    <p style={{ fontSize: '8pt'}}><i>{questions.keySensitive ? 'key senstive answer.' : 'not key senstive answer.'}</i></p>
                                </div>
                            </div>
                            <div className={style.botquizContainerImage}>
                                <div className={style.botLeft}>
                                    <p style={{ margin: '0', fontSize: '10pt'}}>Answer:</p>
                                    <textarea id={style.textAnswer}>
                                        {questions.questionAnswerText}
                                    </textarea>
                                </div>
                                <div className={style.botRight}>
                                    {imageSet
                                            .filter((image) => image.imageID === questions.imageID)
                                            .map((images, index) => (
                                            <img
                                                key={index} // Don't forget to add a key to each dynamically rendered element
                                                src={URL.createObjectURL(images.file)}
                                                alt="image"
                                                className={style.imgQuestion}
                                            />
                                            ))
                                    }
                                </div>
                                
                            </div>
                        </div>

                    ) ||

                    questions.questionType === 'choices' && questions.imageID === 'none' && (

                        <div className={style.quizContainer} key={index}>
                            <div className={style.topquizContainer}>
                                <div id={style.circle}>Q{questions.questionNumber}</div>
                                <div className={style.titlesDiv}>
                                    <p>Question:</p>
                                    <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                    <p style={{ fontSize: '8pt'}}><i>Choose {choicesSet.filter((choices) => choices.choicesID === questions.choicesID && choices.correct === true).length} answers.</i></p>
                                </div>
                            </div>
                            <div className={style.botquizContainerChoices}>
                                {choicesSet.filter((choices) => choices.choicesID === questions.choicesID).map((choice, index) => (
                                    <div key={index} className={choice.correct ? style.choicesActive : style.choices }>{choice.letter}. {choice.content}</div>
                                ))}
                            </div>
                        </div>
                    ) ||

                    questions.questionType === 'choices' && questions.imageID != 'none' && (

                        <div className={style.quizContainer} key={index}>
                            <div className={style.topquizContainer}>
                                <div id={style.circle}>Q{questions.questionNumber}</div>
                                <div className={style.titlesDiv}>
                                    <p>Question:</p>
                                    <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                    <p style={{ fontSize: '8pt'}}><i>Choose {choicesSet.filter((choices) => choices.choicesID === questions.choicesID && choices.correct === true).length} answers.</i></p>
                                </div>
                            </div>
                            <div className={style.botquizContainerImage}>
                                <div className={style.botLeft}>
                                    <div className={style.botListChoices}>
                                    {choicesSet.filter((choices) => choices.choicesID === questions.choicesID)
                                    .map((choice, index) => (
                                        <div key={index} className={choice.correct ? style.choicesActiveImage : style.choicesImage }>{choice.letter}. {choice.content}</div>
                                    ))}
                                    </div>
                                </div>
                                <div className={style.botRight}>
                                    {imageSet
                                        .filter((image) => image.imageID === questions.imageID)
                                        .map((images, index) => (
                                        <img
                                            key={index} // Don't forget to add a key to each dynamically rendered element
                                            src={URL.createObjectURL(images.file)}
                                            alt="image"
                                            className={style.imgQuestion}
                                        />
                                        ))
                                    }
                                 </div>
                                
                            </div>
                        </div>
                    ) ||

                    questions.questionType === 'fill' && questions.imageID === 'none' && (

                        <div className={style.quizContainer} key={index}>
                            <div className={style.topquizContainer}>
                                <div id={style.circle}>Q{questions.questionNumber}</div>
                                <div className={style.titlesDiv}>
                                    <p>Question:</p>
                                    <div className={style.fillContentList}>
                                        {
                                            fillLayout
                                                .filter((fill) => fill.fillLayoutID === questions.fillLayoutID)
                                                .map((fill, index) => (
                                                    fill.fillType === 'text' && (<h2 className={style.fillText} title='text' key={index}>{fill.fillContent}</h2>) ||
                                                    fill.fillType === 'blank' && (<div className={style.fillBlank} title='answer' key={index}><u>{fill.fillContent}</u></div>)
                                                ))
                                        }
                                    </div>
                                    <p style={{ fontSize: '8pt'}}><i>Choose {fillLayout.filter((fill) => fill.fillType === 'blank' && fill.fillLayoutID === questions.fillLayoutID).length} answers.</i></p>
                                </div>
                            </div>
                            
                        </div>
                    ) || 

                    questions.questionType === 'fill' && questions.imageID !== 'none' && (
                        <div className={style.quizContainer} key={index}>
                            <div className={style.topquizContainer}>
                                <div className={style.leftDivFill}>
                                    <div id={style.circle}>Q{questions.questionNumber}</div>
                                    <div className={style.titlesDivFill}>
                                        <p>Question:</p>
                                        <div className={style.fillContent}>
                                            {
                                                fillLayout
                                                    .filter((fill) => fill.fillLayoutID === questions.fillLayoutID)
                                                    .map((fill, index) => (
                                                        fill.fillType === 'text' && (<h2 className={style.fillText} title='text' key={index}>{fill.fillContent}</h2>) ||
                                                        fill.fillType === 'blank' && (<h2 className={style.fillBlank} title='answer' key={index}><u>{fill.fillContent}</u></h2>)
                                                    ))
                                            }
                                        
                                        </div>
                                        <p style={{ fontSize: '8pt'}}><i>Choose {fillLayout.filter((fill) => fill.fillType === 'blank' && fill.fillLayoutID === questions.fillLayoutID).length} answers.</i></p>
                                    </div>
                                </div>
                                <div className={style.rightDivFill}>
                                    {imageSet
                                            .filter((image) => image.imageID === questions.imageID)
                                            .map((images, index) => (
                                            <img
                                                id={style.imgFill}
                                                key={index} // Don't forget to add a key to each dynamically rendered element
                                                src={URL.createObjectURL(images.file)}
                                                alt="image"
                                                className={style.imgQuestion}
                                            />
                                            ))
                                        }
                                </div>
                                
                            </div>
                            
                        </div>
                    ) ||

                    questions.questionType === 'True Or False' && questions.imageID === 'none' && (

                        <div className={style.quizContainer} key={index}>
                            <div className={style.topquizContainer}>
                                <div id={style.circle}>Q{questions.questionNumber}</div>
                                <div className={style.titlesDiv}>
                                    <p>Question:</p>
                                    <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                    <p style={{ fontSize: '8pt'}}><i>{questions.required ? 'required to answer.' : 'not required to answer.'}</i></p>
                                </div>
                            </div>
                            <div className={style.botquizContainer}>
                                <p style={{ margin: '0', fontSize: '10pt'}}>Answer:</p>
                                <div className='d-flex justify-content-center'>
                                    <div className={questions.questionAnswerText === true ? style.choicesActive : style.choices }>true</div>
                                    <div className={questions.questionAnswerText === false ? style.choicesActive : style.choices }>false</div>
                                </div>
                            </div>
                        </div>

                    ) ||

                    questions.questionType === 'True Or False' && questions.imageID != 'none' && (

                        <div className={style.quizContainer} key={index}>
                            <div className={style.topquizContainer}>
                                <div id={style.circle}>Q{questions.questionNumber}</div>
                                <div className={style.titlesDiv}>
                                    <p>Question:</p>
                                    <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                    <p style={{ fontSize: '8pt'}}><i>{questions.required ? 'required to answer.' : 'not required to answer.'}</i></p>
                                </div>
                            </div>
                            <div className={style.botquizContainerImage}>
                                <div className={style.botLeft}>
                                    <p style={{ margin: '0', fontSize: '10pt'}}>Answer:</p>
                                    <div className='d-flex'>
                                        <div className={questions.questionAnswerText === true ? style.choicesActive : style.choices }>true</div>
                                        <div className={questions.questionAnswerText === false ? style.choicesActive : style.choices }>false</div>
                                    </div>
                                </div>
                                <div className={style.botRight}>
                                    {imageSet
                                            .filter((image) => image.imageID === questions.imageID)
                                            .map((images, index) => (
                                            <img
                                                key={index} // Don't forget to add a key to each dynamically rendered element
                                                src={URL.createObjectURL(images.file)}
                                                alt="image"
                                                className={style.imgQuestion}
                                            />
                                            ))
                                    }
                                </div>
                                
                            </div>
                        </div>

                    )


                    
                ))
            }


             {/* choices Quiz with image */}

             
            <div className='w-100 d-flex justify-content-end'>
                <button className={style.btnSubmit}>Submit</button>
            </div>
            


            
        </div>
    </div>
  )
}

export default PreviewQuiz