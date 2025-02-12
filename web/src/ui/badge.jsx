import React from "react";

// styles
import "./styles/badge.css"

export function UiBadge ({className, text}) {

    return(
        <div className={`badge-container ${className}`}>{text}</div>
    )
}