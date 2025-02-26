import React from "react";

export function BlockUser ({ userId, username, email, credit, provider }) {

    return(
        <div className="block userBlock">
            <h4>{userId}</h4>
            <h4>{username}</h4>
            <h4>{email}</h4>
            <h4>{credit}</h4>
            <h4>{provider}</h4>
        </div>
    )
}