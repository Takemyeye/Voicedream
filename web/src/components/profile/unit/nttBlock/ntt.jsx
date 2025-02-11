import React from "react";
import { UiSwitch } from "@/ui/switch";

export function Ntt({ title, text, uniqueId, toggle, onToggle }) {
    return (
        <div className="notification">
            <div className="text">
                <h3 style={{ color: "whitesmoke" }}>{title}</h3>
                <h5>{text}</h5>
            </div>
            <UiSwitch 
                uniqueId={uniqueId} 
                toggle={toggle} 
                onToggle={onToggle} 
            />
        </div>
    );
}
