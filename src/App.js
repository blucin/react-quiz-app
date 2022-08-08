import React from "react";
import "./index.css";

import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";

export default function App() {

    const [game, setGame] = React.useState(false)

    return (
        <main>
        {
            game
            ?
                <MainPage setGame={setGame}/>
            : 
                <StartPage setGame={setGame}/>
        }
        </main>
    )
}