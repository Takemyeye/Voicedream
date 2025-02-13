import React from "react";
import Header from "./header/header";
import Create from "./speechUnit/create";
import Voices from './speechUnit/voices';

const Speech = () => {
    
    return (
        <main>
            <Header />
            <Create />
            <Voices />
        </main>
    )
}

export default Speech;