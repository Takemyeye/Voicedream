import React from "react";
import Header from "./header/header";
import Create from "./speechUnit/create";
import Voices from './speechUnit/voices';
import TTS from "./speechUnit/text";

const Speech = () => {
    
    return (
        <main>
            <Header />
            <Create />
            <TTS/>
            <Voices />
        </main>
    )
}

export default Speech;