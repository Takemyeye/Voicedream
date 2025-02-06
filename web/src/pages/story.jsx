import React from "react";
import Header from './header/header';
import Create from "./storyUnit/create";
import Stories from "./storyUnit/stories";

const Story = () => {

    return (
        <main>
            <Header />
            <Create />
            <Stories />
        </main>
    )
}

export default Story;