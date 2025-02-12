import React from "react";

export function Secondary ({text, data, className}) {

    return(
       <div className={className}>
            <h5>{text}</h5>
            <input type="text" value={data} readOnly />
       </div>
    )
}