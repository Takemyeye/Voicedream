import React from "react";
import { Link } from "react-router-dom";

// styles
import "../style/navigation.css";

const Navigation = () => {

    return(
        <nav>
            <Link to="/">
                <div className="title-container">
                    <img src="img/abstract.png" alt="" />
                    <h2>VoiceDream</h2>
                </div>
            </Link>
            <Link to="/">
                <h3>Home</h3>
            </Link>
            <Link to="/about">
                <h3>About</h3>
            </Link>
            <Link to="/create">
                <h3>Create</h3>
            </Link>
            <Link to="/story">
                <h3>Story</h3>
            </Link>
        </nav>
    )
}

export default Navigation;