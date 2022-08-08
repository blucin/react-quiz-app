import React from "react";

export default function Question(props) {

    function handleChange(event) {
        let tempArr = [...props.prevFormData]
        tempArr[props.questionIndex].formData = event.target.value
        props.setFormData(tempArr)
    }

    // wrap options string array into button tags
    const option_btns = props.questionOptions.map(option => (
        <>
            <input
                className="radio--input"
                type="radio"

                //form handeling 
                name = {props.id}
                value = {option}

                //correct rendering
                id = {option}
                onChange={e => handleChange(e)}
            />

            <label 
                htmlFor={option}
                className="radio--labeltext"
            > 
                {option} 
            </label>
        </>
    ))

    return(
        <>
            <p className="questions--text"> {props.questionText} </p>
            {option_btns}
            <div className="question--separator"></div>
        </>
    )
}
