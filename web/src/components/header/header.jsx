import React from "react";
import UserHeader from "./unit/user";
import Navigation from './unit/nav';

// styles
import "./style/header.css";

const Header = () => {

    return (
        <header>
            <Navigation />
            <UserHeader />
        </header>
    )
}

export default Header;