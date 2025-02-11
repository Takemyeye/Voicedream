import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function DropContainer ({link, text, fontAwesome, onClick}) {
    return (
        <Link to={link} onClick={onClick}>
            <div className="drop-container">
                {fontAwesome && <FontAwesomeIcon icon={fontAwesome} />}
                <h5 style={{color: "rgb(225, 225, 225)"}}>{text}</h5>
            </div>
        </Link>
    );
}
