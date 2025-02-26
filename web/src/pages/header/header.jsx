import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, Link } from "react-router-dom";
import '@/styles/header.css';

const Header = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
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
            const response = await fetch("https://cp.voicedream.space/api/current_user", {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`,
                },
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

    return (
        <header>
            <Link to="/">
                <h1 style={{color: "whitesmoke"}}>VoiceDream</h1>
            </Link>
            <nav>
                <Link to="/"><h3>Home</h3></Link>
                <Link to="/"><h3>About</h3></Link>
                <Link to="/speech"><h3>Speech</h3></Link>
                <Link to="/story"><h3>Story</h3></Link>
                <Link to="/create"><h3>VoiceDream</h3></Link>
            </nav>
            <div className="container">
                <div className="user">
                    {user ? (
                        <div className="user">
                            <div className="balance">
                                <h5>Balance: {user.credit}</h5>
                            </div>
                            <img src={user.avatar} alt="User" />
                        </div>
                    ) : (
                        <Link to="/auth">
                            <button>Sign In</button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
