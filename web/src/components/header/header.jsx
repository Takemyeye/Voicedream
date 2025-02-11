import React, { useEffect } from "react";
import UserHeader from "./unit/user";
import Navigation from './unit/nav';
import { useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext"; 
import Cookies from "js-cookie";
import "./style/header.css";

const Header = () => {
    const { user, setToken } = useUser();
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
    }, [location, setToken]);

    return (
        <header>
            <Navigation />
            <UserHeader user={user}/>
        </header>
    );
};

export default Header;
