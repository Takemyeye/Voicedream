import React from "react";
import Header from "../header/header";
import UserBlock from './unit/userBlock/userBlock'
import { useUser } from "../../context/UserContext";

const Profile = () => {
    const { user } = useUser();

    return(
        <main>
            <Header />
            <div className="user-panel">
                <UserBlock user={user}/>
            </div>
        </main>
    )
}

export default Profile;