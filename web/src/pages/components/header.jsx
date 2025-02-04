import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import '@/styles/header.css';

const Header = () => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
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
                    "Authorization": token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error("Failed to fetch user data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <header>
            <h1>VoiceDream</h1>
            <nav>
                <span>Home</span>
                <span>About</span>
                <span>Speech</span>
                <span>Story</span>
                <span>Profile</span>
            </nav>
            <div className="container">
                <div className="user">
                    {userData ? (
                        <div>
                            <img src={userData.avatarUrl || "user"} alt="User" />
                            <span>{userData.name}</span>
                        </div>
                    ) : (
                        <button onClick={() => window.location = "http://localhost:3001/api/google"}>Sign In</button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
