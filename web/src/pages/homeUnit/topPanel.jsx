import React from "react";
import UiButton from '@/ui/button';

const TopPanel = () => {
    return (
        <div className="top-panel">
            <div className="text">
                <h1>Craft Your Epic Tale</h1>
                <h3>Bring your stories to life with our intuitive story creation tool</h3>
                <UiButton text="Start Writing"/>
            </div>
        </div>
    )
}

export default TopPanel;