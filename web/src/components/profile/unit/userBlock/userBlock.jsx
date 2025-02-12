import React from "react";
import { Principal } from "./principal";

// styles
import "../../style/userBlock.css"
import { Secondary } from "./secondary";

const UserBlock = ({user}) => {
    if(!user) {return}
    
    return( 
        <>
            <div className="text">
                <h1>User Profile</h1>
                <h5>Manage your account and explore your journey</h5>
            </div>
            <div className="block">
               <Principal user={user}/>
               <Secondary text="Name" data={user.username} className="secondary email-input" />
               <Secondary text="Email" data={user.email} className="secondary email-input" />
            </div>
        </>
    )
}

export default UserBlock;