import React, { useContext, useState } from 'react'
import style from  './MultipleChoice.module.css'
import { MdDeleteOutline } from "react-icons/md";
import { NotificationContext } from '../../../../../../context/NotificationContext';

const MultipleChoice = () => {

  const { notify } = useContext(NotificationContext)

  const [choice, setChoices] = useState([
        {
            letter: 'A',
            answer: '',
            isCorrect: false,
        },
        {
            letter: 'B',
            answer: '',
            isCorrect: false,
        },
        {
            letter: 'C',
            answer: '',
            isCorrect: false,
        },
        {
            letter: 'D',
            answer: '',
            isCorrect: false,
        },
  ])

  const handleAddChoice = () => {

    const lastChoicesCharCode = choice.at(-1).letter.charCodeAt(0)

    setChoices((prevData) => [...prevData,
        {
            letter: String.fromCharCode(lastChoicesCharCode + 1),
            answer: '',
            isCorrect: false,
        }
    ])

  }

  const handleDeleteChoices = (index) => {
    if (index > 3) {
        setChoices((prevData) => {
            return prevData
            .filter((data, i) => i !== index)
            .map((data, i) => ({
                ...data,
                letter: data.letter = String.fromCharCode(65 + i)
            }))
        })
    }else {
        notify('Unable to delete.', false)
    }
    
  }

  return (
    <div className={style.container}>
        <div className='d-flex flex-column border border-secondary p-2 rounded d-flex align-items-start justify-content-center'>
            <h3>Direction</h3>
            <p className='fs-6 text-justify'>When creating multiple-choice questions, each question must have <b>four main answer choices labeled A, B, C, and D.</b> Additional choices may be added as needed. If a selected choice is correct, the corresponding <b>checkbox</b> should be checked automatically. Any <b>unchecked</b> choices will be considered incorrect answers.</p>
        </div>
        <hr />
        <div className="d-flex w-100 flex-column mb-4">
            <label>Question</label>
            <textarea 
                placeholder='ex.What color is this?'
            ></textarea>
            <p id={style.errorMessage}>asdas</p>
        </div>
        <div className='d-flex w-100 gap-2'>
            <label>Choices:</label>
            <p id={style.errorMessage}>asdas</p>
        </div>
        
        <div className='d-flex flex-wrap w-100 h-auto p-2 gap-2 justify-content-center mb-2'>
            {
                choice.map((choices, index) => (
                <div 
                    className={style.card} 
                    key={index}
                    style={{ backgroundColor: choices.isCorrect ? 'rgba(0, 128, 0, 0.150)' : '#fff' }}
                >
                    <b>{choices.letter}</b>
                    <input 
                        type="text" 
                        placeholder='Enter answer'
                        value={choices.answer}
                        onChange={(e) => {
                            setChoices((prevChoices) =>
                                prevChoices.map((choice, i) =>
                                    i === index ? { ...choice, answer: e.target.value } : choice
                                )
                            );
                        }}
                    />
                    <input 
                        type="checkbox"
                        checked={choices.isCorrect}
                        onChange={(e) => {
                            setChoices((prevChoices) =>
                                prevChoices.map((choice, i) =>
                                    i === index ? { ...choice, isCorrect: e.target.checked } : choice
                                )
                            )
                        }}
                    />
                    <MdDeleteOutline 
                        size={30}
                        title='delete'
                        cursor={'pointer'}
                        onClick={() => handleDeleteChoices(index)}
                    />
                </div>
                ))
            }
            
        </div>
        <div className='d-flex w-100 justify-content-center mb-5 gap-2'>
            <button 
                style={{ width: 'fit-content', borderRadius: 5 }}
                onClick={handleAddChoice}
            >+ add choices</button>
            <button 
                style={{ width: 'fit-content', borderRadius: 5 }}
                onClick={handleAddChoice}
            >Add Question</button>
        </div>
    </div>
  )
}

export default MultipleChoice
