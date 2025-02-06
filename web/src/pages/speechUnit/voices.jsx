import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Voices = () => {
    const [ token ] = useState(Cookies.get("token"));
    const [voices, setVoices] = useState([]);
    
    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/getVoice`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    throw new Error(`error: ${res.status}`);
                }

                const data = await res.json();
                setVoices(data.voices || []);
                console.log('voices:', data);
            } catch (err) {
                console.error("error", err);
            }
        };

        fetchVoices(); 
    }, []);

    return (
        <div className="speaches">

        </div>
    )
}
export default Voices;
