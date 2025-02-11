import React, { useEffect, useState } from 'react'
import style from './LeaderBoard.module.css'
import { GiTrophy } from "react-icons/gi"
import io from 'socket.io-client'
import { BsAwardFill } from "react-icons/bs";
import axios from 'axios'
const socket = io.connect('http://localhost:5001')

const LeaderBoard = () => {
  
  const [currentSubject, setcurrentSubject] = useState()
  const [currentQuizID, setcurrentQuizID] = useState()
  const [selectedQuiz, setselectedQuiz] = useState([])
  const [selectedScores, setselectedScores] = useState([])
  const [scores, setscores] = useState()
  const [quiz, setquiz] = useState()

  const [subjects, setSubject] = useState([])
 
  useEffect(() => {

    //GET ALL QUIZ
    axios.get('http://localhost:5001/quiz/getQuiz')
    .then((res) => setquiz(res.data))
    .catch((err) => console.log(err))

    //GET ALL SCORE
    axios.get('http://localhost:5001/scores/getScores')
    .then((res) => setscores(res.data))
    .catch((err) => console.log(err))

    //GET ALL SUBJECT
    axios.get('http://localhost:5001/subject/getSubject')
    .then((res) => setSubject(res.data))
    .catch((err) => console.log(err))
    
  },[])


  const generateName = (scoreID) => {
    const filter = scores.filter((scr) => scr.scoreID === scoreID).map((scr) => scr.fullname)
    return filter[0]
  }

  const handleSelectSubject = (e) => {
    e.preventDefault()
    const value = e.target.value
    setcurrentSubject(value)
    const filter = quiz.filter((quiz) => quiz.subjectName === value)
    setselectedQuiz(filter)
  }

  const handleSelectQuiz = (quizID) => {
    setcurrentQuizID(quizID)
    const filter = scores.filter((score) => score.quizID === quizID)
    const sorted = filter.sort((a, b) => b.score - a.score)
    setselectedScores(sorted)
  }
    
  return (
    <div className={style.container}>
        <div className={style.content}>
            <div className={style.header}>
                <h2><GiTrophy color='#FFC107' size={30}/> LeaderBoard</h2>
            </div>
            
            <select value={currentSubject} className={style.select} onChange={handleSelectSubject}>
                {
                    subjects.map((sub) => (
                        <option value={sub.subjectName}>{sub.subjectName}</option>
                    ))
                }
                
            </select>
            <div className={style.listQuiz}>
            

            {
                selectedQuiz.length > 0 ?
                    selectedQuiz.map((quiz) => (
                        <div className={currentQuizID === quiz.quizID ? style.cardQuizActive : style.cardQuiz} onClick={() =>handleSelectQuiz(quiz.quizID)}>
                            <h2>{quiz.quizTitle}</h2>
                            <div className='d-flex flex-column align-items-center'>
                                <p>date</p>
                                <p>{quiz.time} {quiz.date}</p>
                            </div>
                        </div>
                    ))
                : 'no quiz created'
            }
                

            </div>
        </div>
        <div className={style.content}>
            <div className={style.rightCon}>
                <h2>Rank</h2>

                <div className={style.listScores}>
                    {
                        selectedScores.length > 0 ?
                            selectedScores.map((score, index) => (
                                <div className={index < 3 ? style.cardScoreHigh : style.cardScore}>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <div id={index < 3 ? style.circleHigh :  style.circle}>{index+1}</div>
                                        <h2>{generateName(score.scoreID)} {index < 3 && <BsAwardFill color='#FFC107'/>}</h2> 
                                    </div>
                                    <div className='d-flex flex-column align-items-center'>
                                        <p>score</p>
                                        <h2>{score.score}</h2>
                                    </div>
                                </div>
                            ))
                        : 'no selected quiz'
                    }

                </div>
                
            </div>
        </div>
    </div>
  )
}

export default LeaderBoard