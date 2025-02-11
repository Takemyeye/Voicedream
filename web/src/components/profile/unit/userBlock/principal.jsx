import React from "react";

export function Principal ({user}) {
    if(!user) {return}

    return(
        <div className="principal">
            <img src={user.avatar} alt="avatar" />
            <div className="user-data">
                <h2>{user.username}</h2>
                <h5>{user.email}</h5>
            </div>
        </div>
    )
}