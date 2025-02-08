import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Voices = () => {
    const [token] = useState(Cookies.get("token"));
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
            } catch (err) {
                console.error("error", err);
            }
        };

        fetchVoices();
    }, [token]);

    return (
        <div className="voices">
             {voices.length > 0 ? (
                voices.map((voices, index) => (
                    <div className="voice" key={index}>
                        <p>{index + 1}</p>
                        <p>{voices.voiceId}</p>
                    </div>
                ))
            ) : (
                <p>0 storie</p>
            )}
        </div>
    );
};

export default Voices;
