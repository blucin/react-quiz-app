import React from "react";

export default function StartPage (props) {
    return(
        <div className="startpage--container">

            <h1 className="startpage--title">Quizzical</h1>

            <p className="startpage--description">
                Some description if needed
            </p>

            <button 
                type="button" 
                className="btn"
                onClick={() => props.setGame(true)}
            >
                Start quiz
            </button>
        </div>
    )
}