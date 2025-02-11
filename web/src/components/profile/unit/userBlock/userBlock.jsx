import React from "react";

// styles
import "../../style/userBlock.css"

const UserBlock = ({user}) => {

    return( 
        <>
            <div className="text">
                <h1>User Profile</h1>
                <h5>Manage your account and explore your journey</h5>
            </div>
            <div className="block">
                <div className="principal">
                    <img src={user.avatar} alt="avatar" />
                    <div className="user-data">
                        <h2>{user.username}</h2>
                        <h5>{user.email}</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserBlock;