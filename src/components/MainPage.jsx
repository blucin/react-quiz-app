import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import yellowBlob from "../images/mainpage--yellow--blob.svg"
import blueBlob from "../images/startpage--blue--blob.svg"


// Question is an array of object with questionText and optionArrays for mcq
export default function MainPage(props) {
    const [allQuestions, setAllQuestions] = React.useState([])

    const [showScore, setShowScore] = React.useState(false)
    const [score, setScore] = React.useState(0)    

    function setOptions (correct_answer, incorrect_answers) {
        const options = [correct_answer, ...incorrect_answers]
        // shuffle options before returning
        options.sort(() => Math.random() - 0.5)
        return options
    }

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(jsonobj => {
                setAllQuestions(jsonobj.results.map(obj => (
                    {
                        questions: obj.question,
                        options: setOptions(obj.correct_answer, obj.incorrect_answers),
                        correct_answer: obj.correct_answer,
                        formData: "",
                        id: nanoid()
                    }
                )))
            })
    }, [])

    
    const questions = allQuestions.map((obj,index)=> {
        return(
            <Question
                //for rendering
                id = {obj.id}
                questionText = {obj.questions}
                questionOptions = {obj.options}

                //for form data (to collect selected option)
                prevFormData = {allQuestions}
                setFormData = {setAllQuestions}
                questionIndex = {index}
            />
        )
    })

    function handleSubmit(event) {
        event.preventDefault()
        console.log(allQuestions)

        // set score
        allQuestions.map(obj=>{
            if(obj.formData == obj.correct_answer)
                setScore(prevScore => prevScore + 1)
        })

        // set show score to true to end the quiz
        setShowScore(true)
    }

    return(
        <div className="mainpage--container">
            <form id="questions" onSubmit={handleSubmit}>{questions}</form>

            {showScore
            ?
                <div className="score--container">
                    <p className="score--text">You scored {score}/5 correct answers</p>
                    <button 
                        className="btn playagain--btn"
                        onClick={() => props.setGame(false)}
                    >
                        Play again
                    </button>
                </div>
            :
            
                <button
                    form="questions"
                    type="submit" 
                    className="btn checkanswer--btn"
                > 
                    Check answers 
                </button>
            }
            
        </div>
    )
}
