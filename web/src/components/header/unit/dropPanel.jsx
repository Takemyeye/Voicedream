import React from "react";
import { DropContainer } from "./dropUnit/drop-container";
import { faUser, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";

// styles
import "../style/dropDown.css";

export function DropDown () {

    const LogOut = () => {
        Cookies.remove("token");
    }
    return(
        <div className="drop-panel">
            <DropContainer 
                link="/profile"
                text="Profile"
                fontAwesome={faUser}
            />
            <DropContainer 
                text="Card"
                fontAwesome={faCreditCard}
            />
            <DropContainer
                link={"/"}
                onClick={LogOut}
                text="LogOut"
                fontAwesome={faArrowRightFromBracket}
            />
        </div>
    )
}