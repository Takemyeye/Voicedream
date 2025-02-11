import React from "react";
import Header from "../header/header";
import UserBlock from './unit/userBlock/userBlock'

const Profile = () => {

    return(
        <main>
            <Header />
            <div className="user-panel">
                <UserBlock />
            </div>
        </main>
    )
}

export default Profile;