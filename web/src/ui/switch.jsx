import React from "react";

// styles
import "./styles/switch.css";

export function UiSwitch({ uniqueId, toggle, onToggle }) {
    return (
        <div className="toggle-switch">
            <input 
                className="toggle-input" 
                id={uniqueId} 
                type="checkbox" 
                checked={toggle || false} 
                onChange={onToggle} 
            />
            <label 
                className="toggle-label" 
                htmlFor={uniqueId}
                onClick={onToggle} 
            ></label>
        </div>
    );
}
