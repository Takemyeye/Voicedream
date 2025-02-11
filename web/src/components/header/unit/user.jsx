import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useLocation, Link } from "react-router-dom";
import { DropDown } from "./dropPanel";
import Cookies from "js-cookie";

// styles
import "../style/userHeader.css";

const UserHeader = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get("token");

        if (tokenFromUrl) {
            Cookies.set("token", tokenFromUrl);
            setToken(tokenFromUrl);
            window.location = "/";
        } else {
            const savedToken = Cookies.get("token");
            if (savedToken) {
                setToken(savedToken);
            }
        }
    }, [location]);

    useEffect(() => {
        if (token) {
            fetchCurrentUser(token);
        }
    }, [token]);

    const fetchCurrentUser = async (token) => {
        try {
            const response = await fetch("http://localhost:3001/api/current_user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.error("Failed to fetch user data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

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
