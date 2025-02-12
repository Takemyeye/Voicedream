import React from "react";
import Header from "../header/header";
import UserBlock from './unit/userBlock/userBlock'
import { useUser } from "../../context/UserContext";
import Notification from './unit/nttBlock/notification';
import UserCreated from './unit/userCreated/userCreated';

const Profile = () => {
    const { user } = useUser();

    return(
        <main>
            <Header />
            <div className="user-panel">
                <UserBlock user={user}/>
                <Notification />
                <UserCreated user={user}/>
            </div>
        </main>
    )
}

export default Profile;