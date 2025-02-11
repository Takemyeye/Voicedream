import React from "react";

// styles
import "../../style/userBlock.css"

const UserBlock = () => {

    return( 
        <>
            <div className="text">
                <h1>User Profile</h1>
                <h5>Manage your account and explore your journey</h5>
            </div>
            <div className="block">
                <div className="user-block">
                    <div className="principal"></div>
                </div>
            </div>
        </>
    )
}

export default UserBlock;