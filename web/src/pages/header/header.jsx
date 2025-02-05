import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";

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
            const response = await fetch("http://localhost:3001/api/current_user", {
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
        <header className="w-full h-[10vh] flex flex-row items-center justify-around bg-[#1D1D1D]">
            <Link to="/" className="text-white text-2xl font-semibold">
                <h1>VoiceDream</h1>
            </Link>
            <nav className="w-[300px] h-full flex flex-row items-center justify-between">
                <h3 className="text-gray-300 relative cursor-pointer hover:text-white hover:after:w-full">Home</h3>
                <h3 className="text-gray-300 relative cursor-pointer hover:text-white hover:after:w-full">About</h3>
                <h3 className="text-gray-300 relative cursor-pointer hover:text-white hover:after:w-full">Speach</h3>
                <h3 className="text-gray-300 relative cursor-pointer hover:text-white hover:after:w-full">Story</h3>
                <h3 className="text-gray-300 relative cursor-pointer hover:text-white hover:after:w-full">Profile</h3>
            </nav>
            <div className="flex items-center">
                <div className="user">
                    {user ? (
                        <div className="user">
                            <img className="w-10 h-10 rounded-full border border-white/25" src={user.avatar} alt="User" />
                        </div>
                    ) : (
                        <button onClick={() => window.location = "http://localhost:3001/api/google"} className="bg-transparent text-white border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors">Sign In</button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
