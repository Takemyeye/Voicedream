import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";
import { DropDown } from "./dropPanel";

// styles
import "../style/userHeader.css";

const UserHeader = ({ user }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleUserClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <>
            {user ? (
                <div className="user" onClick={handleUserClick}>
                    <div className="balance-block">
                        <h5>Balance: {user.credit}</h5>
                    </div>
                    <div className="avatar">
                        <img src={user.avatar} alt="avatar" />
                    </div>
                    {isDropdownVisible && <DropDown />}
                </div>
            ) : (
                <div className="user">
                    <Link to="/login">
                        <div className="avatar">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};

export default UserHeader;
