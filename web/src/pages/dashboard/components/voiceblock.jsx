import React from "react";

export function Blockvoice ({ userId, voiceId, voiceName }) {

    return(
        <div className="block voiceBlock">
            <h4>{voiceId}</h4>
            <h4>{voiceName}</h4>
            <h4>{userId}</h4>
        </div>
    )
}