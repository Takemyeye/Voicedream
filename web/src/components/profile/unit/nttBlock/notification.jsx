import React, { useState } from "react";
import { Ntt } from "./ntt";

// styles
import "../../style/nttBlock.css";

const Notification = () => {
    const [notification, setNotification] = useState(false);

    const toggleNotification = () => {
        setNotification(prev => !prev);
    };

    return (
        <>
            <div className="text">
                <h2>Notifications</h2>
            </div>
            <div className="block">
                <Ntt 
                    title="Marketing emails"
                    text="Receive emails about new products and offers"
                    toggle={notification} 
                    onToggle={toggleNotification} 
                />
            </div>
        </>
    );
};

export default Notification;
